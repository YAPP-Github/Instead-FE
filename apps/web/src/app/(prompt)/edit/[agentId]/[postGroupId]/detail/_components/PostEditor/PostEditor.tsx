'use client';

import { IconButton } from '@repo/ui/IconButton';
import {
  editArea,
  emojiPicker,
  saveArea,
  textarea,
  toolBar,
  tools,
  wrapper,
} from './PostEditor.css';
import { Spacing } from '@repo/ui/Spacing';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import EmojiPicker from 'emoji-picker-react';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useRef, useState } from 'react';
import { isNotNil, mergeRefs } from '@repo/ui/utils';
import { UploadedImages } from './UploadedImages';
import { useParams, useSearchParams } from 'next/navigation';
import { uploadImages } from '@web/shared/image-upload/ImageUpload';
import { validateFiles } from '@web/utils';

import { useUpdatePostMutation } from '@web/store/mutation/useUpdatePostMutation';
import { Post, PostGroupLength } from '@web/types';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useToast } from '@repo/ui/hooks';
import { DetailPageContext } from '../../EditDetail';

const POST_LENGTH: Record<PostGroupLength, number> = {
  LONG: 1000,
  MEDIUM: 300,
  SHORT: 140,
};

export function PostEditor() {
  const toast = useToast();
  const { agentId, postGroupId } = useParams();
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get('postId'));
  const { loadingPosts } = useContext(DetailPageContext);
  const isPostLoading = loadingPosts.includes(postId);
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });
  const maxLength = POST_LENGTH[posts.data.postGroup.length];
  const post = Object.values(posts.data.posts)
    .flat()
    .find((post) => post.id === postId);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{
    content: string;
    imageUrls: string[];
  }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      imageUrls: [],
      content: '',
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { mutate: modifyPost, isPending } = useUpdatePostMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
    postId,
  });
  const content = watch('content');
  const imageUrls = watch('imageUrls');

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    handleResizeHeight();
  }, [watch('content')]);

  useEffect(() => {
    setValue('content', post?.content ?? '');
    const urls = post?.postImages.map((img) => img.url) || [];
    setValue('imageUrls', urls);
  }, [post]);

  const onSubmit = async (data: {
    imageUrls: string[];
    content: Post['content'];
  }) => {
    const updateType = data.imageUrls.length > 0 ? 'CONTENT_IMAGE' : 'CONTENT';

    if (updateType === 'CONTENT') {
      modifyPost({
        updateType: 'CONTENT',
        content: data.content,
      });
    } else {
      modifyPost({
        updateType: 'CONTENT_IMAGE',
        ...data,
      });
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      // 현재 커서 위치(선택 영역의 시작과 끝)를 가져옴
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = watch('content') || '';
      // 현재 텍스트를 커서 기준으로 두 부분으로 나눈 후, 사이에 이모지 삽입
      const newValue =
        currentValue.slice(0, start) +
        emojiData.emoji +
        currentValue.slice(end);
      setValue('content', newValue);
      // 약간의 딜레이 후에 텍스트 에어리어에 포커스를 주고 커서 위치를 조정
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + emojiData.emoji.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    } else {
      // textareaRef가 없으면 기존 방식으로 끝에 추가
      setValue('content', (watch('content') || '') + emojiData.emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleFiles = async (files: FileList) => {
    // 최대 4개 파일만 처리 (필요에 따라 maxFiles 값을 조정하세요)
    const maxFiles = 4;

    const existingImageUrls = watch('imageUrls') || [];

    if (existingImageUrls.length + files.length > maxFiles) {
      toast.error(`이미지는 최대 ${maxFiles}장까지 업로드할 수 있어요.`, {
        duration: 3000,
      });
      return;
    }

    const fileArray = Array.from(files);

    if (!validateFiles(fileArray)) {
      toast.error(
        '유효하지 않은 파일이 포함되어 있어요. 이미지 파일(최대 5MB)만 업로드 가능해요.'
      );
      return;
    }

    const uploadedUrls = await uploadImages(fileArray);
    setValue('imageUrls', [...existingImageUrls, ...uploadedUrls]);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleRemoveImage = (url: string) => {
    setValue(
      'imageUrls',
      isNotNil(imageUrls)
        ? imageUrls.filter((prevUrl: string) => prevUrl !== url)
        : []
    );
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // event.preventDefault();
    // if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
    //   handleFiles(event.dataTransfer.files);
    //   event.dataTransfer.clearData();
    // }
  };

  return (
    <div className={wrapper}>
      <div className={toolBar}>
        <div className={tools}>
          <IconButton
            icon="picture"
            onClick={() => fileInputRef.current?.click()}
          />
          <IconButton
            icon="smile"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div className={emojiPicker}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <div className={saveArea}>
          <Text
            color="grey400"
            fontSize={16}
            fontWeight="medium"
          >{`${content.length}/${maxLength}`}</Text>
          <Button
            variant="neutral"
            size="small"
            onClick={handleSubmit(onSubmit)}
            isLoading={isPending}
            disabled={isNotNil(errors.content?.type)}
          >
            저장
          </Button>
        </div>
      </div>

      <div className={editArea} onDragOver={handleDragOver} onDrop={handleDrop}>
        {imageUrls?.length > 0 && (
          <UploadedImages images={imageUrls} onRemove={handleRemoveImage} />
        )}
        <textarea
          rows={1}
          className={textarea}
          placeholder="메시지를 입력하세요"
          {...register('content', { required: true, maxLength: maxLength })}
          ref={mergeRefs(register('content').ref, textareaRef)}
        />
      </div>

      <Spacing size={24} />
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
}
