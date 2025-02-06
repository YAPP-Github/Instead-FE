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
import { useEffect, useRef, useState } from 'react';
import { isNil, isNotNil, mergeRefs } from '@repo/ui/utils';
import { UploadedImages } from './UploadedImages';
import { useParams, useSearchParams } from 'next/navigation';
import { useGroupPostsQuery } from '@web/store/query/useGroupPostsQuery';

export function PostEditor() {
  const methods = useForm();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams.get('post');
  const { data } = useGroupPostsQuery(1, Number(id));
  const post = data?.data?.posts.find((post) => post.id === Number(postId));
  const { register, handleSubmit, setValue, watch } = useForm();
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 탐색기용 ref
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    handleResizeHeight();
  }, [watch('editor')]);

  useEffect(() => {
    setValue('editor', post?.content);
    setValue('images', post?.postImages);
  }, [post]);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  const handleEmojiClick = (emojiData: any) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      // 현재 커서 위치(선택 영역의 시작과 끝)를 가져옴
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = watch('editor') || '';
      // 현재 텍스트를 커서 기준으로 두 부분으로 나눈 후, 사이에 이모지 삽입
      const newValue =
        currentValue.slice(0, start) +
        emojiData.emoji +
        currentValue.slice(end);
      setValue('editor', newValue);
      // 약간의 딜레이 후에 텍스트 에어리어에 포커스를 주고 커서 위치를 조정
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + emojiData.emoji.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    } else {
      // textareaRef가 없으면 기존 방식으로 끝에 추가
      setValue('editor', (watch('editor') || '') + emojiData.emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleFiles = (files: FileList) => {
    // 최대 4개 파일만 처리 (필요에 따라 maxFiles 값을 조정하세요)
    const fileArray = Array.from(files).slice(0, 4);
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const imageUrl = prevImages[index];
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      return prevImages.filter((_, i) => i !== index);
    });
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
          >{`${489}/1000`}</Text>
          <Button variant="neutral" size="small">
            저장
          </Button>
        </div>
      </div>

      <div className={editArea} onDragOver={handleDragOver} onDrop={handleDrop}>
        {images.length > 0 && (
          <UploadedImages images={images} onRemove={handleRemoveImage} />
        )}
        <textarea
          rows={1}
          className={textarea}
          placeholder="메시지를 입력하세요"
          {...register('editor', {
            value: '초기값',
          })}
          ref={mergeRefs(register('editor').ref, textareaRef)}
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
