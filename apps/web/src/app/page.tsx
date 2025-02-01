'use client';

import { useForm } from 'react-hook-form';
import { Icon } from '@repo/ui/Icon';
import { Toast } from '@repo/ui/Toast';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import { Badge } from '@repo/ui/Badge';
import { Checkbox } from '@repo/ui/Checkbox';
import { Label } from '@repo/ui/Label';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { TextField } from '@repo/ui/TextField';
import { RadioCards } from '@repo/ui/RadioCards';
import { Skeleton } from '@repo/ui/Skeleton';
import { Modal } from '@repo/ui/Modal';
import { Spinner } from '@repo/ui/Spinner';
import Link from 'next/link';
import { overlay } from 'overlay-kit';
import { useModal } from '@repo/ui/hooks';
import { useToast } from '@repo/ui/hooks';

type FormValues = {
  topic: string;
  aiUpgrade: string;
};

export default function Home() {
  const toast = useToast();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      topic: '',
      aiUpgrade: '',
    },
  });

  const modal = useModal();

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    notify1(); // 성공 토스트 표시
  };

  const toastNotify1 = () => {
    toast.success('생성된 본문이 업데이트 됐어요!', 3000);
  };

  const toastNotify2 = () => {
    toast.error('생성된 본문이 업데이트 됐어요!', 3000);
  };

  const toastNotify3 = () => {
    toast.default('생성된 본문이 업데이트 됐어요!', 3000);
  };

  const toastNotify4 = () => {
    toast.custom('메시지', {
      duration: 5000,
      leftAddon: {
        type: 'lottie',
        props: {
          animationData: 'loadingBlack',
          width: '24px',
          height: '24px',
        },
      },
    });
  };

  const toastNotify5 = () => {
    toast.custom('메시지', {
      duration: 5000,
      leftAddon: {
        type: 'icon',
        props: {
          name: 'twinkle',
          size: 24,
          color: 'primary600',
          type: 'fill',
        },
      },
    });
  };

  const notify1 = () =>
    overlay.open(({ isOpen, close, unmount }) => (
      <Toast
        open={isOpen}
        onClose={close}
        leftAddon={<Toast.Icon toastType="success" />}
        onExited={unmount}
      >
        생성된 본문이 업데이트 됐어요!
      </Toast>
    ));

  const notify2 = () =>
    overlay.open(({ isOpen, close, unmount }) => (
      <Toast
        open={isOpen}
        onClose={close}
        leftAddon={<Toast.Icon toastType="error" />}
        onExited={unmount}
      >
        1개 이상의 게시물을 선택해주세요
      </Toast>
    ));

  const notify3 = () =>
    overlay.open(({ isOpen, close, unmount }) => (
      <Toast
        open={isOpen}
        onClose={close}
        leftAddon={
          <Icon name="stack" color="primary600" type="fill" size={24} />
        }
        onExited={unmount}
      >
        1개 이상의 게시물을 선택해주세요
      </Toast>
    ));

  const openModal = () =>
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal
        open={isOpen}
        onClose={close}
        onExited={unmount}
        icon={<Modal.Icon name="notice" color="warning500" />}
        doubleCTA={
          <Modal.DoubleCTA
            cancelProps={{
              children: '취소',
              onClick: close,
            }}
            confirmProps={{
              children: '나가기',
              onClick: () => {
                close();
              },
            }}
          />
        }
      >
        <Modal.Title>정말 나가시겠어요?</Modal.Title>
        <Modal.Description>
          {`이 페이지를 나가면 \n 작성한 내용은 저장되지 않아요`}
        </Modal.Description>
      </Modal>
    ));

  const handleAlertModal = () => {
    modal.alert({
      title: '알림',
      description: '작업이 완료되었습니다.',
      icon: <Modal.Icon name="notice" color="primary500" />,
      alertButton: '확인',
    });
  };

  const handleAsyncAlertModal = async () => {
    const result = modal.asyncAlert({
      title: '비동기 작업 중',
      description: '잠시만 기다려주세요...',
      icon: <Modal.Icon name="notice" color="grey500" />,
      alertButton: '확인',
      onAlertClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
    });

    if (await result) {
      notify1();
    }
  };

  const handleConfirmModal = () => {
    modal.confirm({
      title: '정말 나가시겠어요?',
      description: '이 페이지를 나가면\n작성한 내용은 저장되지 않아요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '나가기',
      cancelButton: '취소',
    });
  };

  const handleAsyncConfirmModal = async () => {
    const result = modal.asyncConfirm({
      title: '변경사항을 저장하시겠습니까?',
      description: '저장하지 않은 변경사항은 모두 사라집니다.',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '저장',
      cancelButton: '취소',
      onConfirmClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      onCancelClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
    });

    if (await result) {
      notify1();
    }
  };

  const CustomModalContent = () => {
    return (
      <>
        <Modal.Icon name="stack" color="grey900" />
        <Modal.Title>커스텀 모달</Modal.Title>
        <Modal.Description>
          원하는 대로 모달 내용을 구성할 수 있습니다.
        </Modal.Description>
        <Modal.DoubleCTA
          confirmProps={{
            children: '확인',
            variant: 'primary',
            size: 'large',
          }}
          cancelProps={{
            children: '취소',
          }}
        />
      </>
    );
  };

  const handleCustomModal = () => {
    modal.custom(<CustomModalContent />, {
      isCloseOnDimmerClick: true,
    });
  };

  const handleCustomBlankModal = () => {
    modal.custom(<></>, {
      isCloseOnDimmerClick: true,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      웹 1팀 파이팅!
      <div style={{ display: 'flex', gap: '8px' }}>
        <Icon size={24} name="stack" type="stroke" />
        <Icon size={24} name="stack" type="fill" />
        <Icon size={24} name="stack" type="stroke" color="warning300" />
        <Icon name="xCircle" color="primary600" type="stroke" size={24} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={notify1}>success 토스트 열기</button>
        <button onClick={notify2}>warning 토스트 열기</button>
        <button onClick={notify3}>아이콘 개발자 지정 토스트 열기</button>
        <button onClick={openModal}>모달 열기</button>
        <button onClick={handleAlertModal}>Alert 모달</button>
        <button onClick={handleAsyncAlertModal}>비동기 Alert 모달</button>
        <button onClick={handleConfirmModal}>Confirm 모달</button>
        <button onClick={handleAsyncConfirmModal}>비동기 Confirm 모달</button>
        <button onClick={handleCustomModal}>커스텀 모달</button>
        <button onClick={handleCustomBlankModal}>커스텀 빈 모달</button>
        <button onClick={toastNotify1}>useToast success 토스트 열기</button>
        <button onClick={toastNotify2}>useToast warning 토스트 열기</button>
        <button onClick={toastNotify3}>useToast default 토스트 열기</button>
        <button onClick={toastNotify4}>
          useToast custom lottie 토스트 열기
        </button>
        <button onClick={toastNotify5}>useToast custom icon 토스트 열기</button>
      </div>
      <Text.H1 color="grey950" fontSize={28} fontWeight="semibold">
        Text 컴포넌트
      </Text.H1>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          size="large"
          variant="primary"
          leftAddon={<Icon name="twinkle" />}
        >
          생성하기
        </Button>
        <Button
          size="large"
          variant="primary"
          leftAddon={<Icon name="twinkle" />}
          disabled
        >
          생성하기
        </Button>
        <Button
          size="large"
          variant="primary"
          leftAddon={<Icon name="twinkle" />}
          isLoading
        >
          생성하기
        </Button>
        <Button size="small" variant="neutral">
          다음
        </Button>
        <Button size="small" variant="neutral" disabled>
          다음
        </Button>
        <Button size="small" variant="neutral" isLoading>
          다음
        </Button>
        <Button size="large" variant="text">
          이전
        </Button>
        <Button size="small" variant="text">
          이전
        </Button>
        <Button size="small" variant="text" isLoading>
          이전
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Badge size="medium" variant="neutral" shape="round">
          X Premium 계정 전용
        </Badge>
        <Badge size="medium" variant="primary" shape="round">
          X Premium 계정 전용
        </Badge>
        <Badge size="medium" variant="pink" shape="square">
          전체 적용
        </Badge>
        <Badge size="medium" variant="blue" shape="square">
          개별 적용
        </Badge>
        <Badge size="large" variant="neutral" shape="square">
          요약
        </Badge>
      </div>
      <Checkbox />
      <Checkbox label="체크박스" />
      <Checkbox label="체크박스" disabled checked />
      <Checkbox label="체크박스" disabled />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Label variant="default">어떤 글을 생성할까요?</Label>
        <Label variant="required">어떤 글을 생성할까요?</Label>
        <Label variant="optional">어떤 글을 생성할까요?</Label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField id="basic-field">
            <TextField.Label>주제</TextField.Label>
            <TextField.Input
              placeholder="주제를 적어주세요"
              maxLength={5000}
              {...register('topic', {
                required: '주제를 입력해주세요',
                maxLength: {
                  value: 500,
                  message: '500자 이내로 입력해주세요',
                },
              })}
            />
          </TextField>

          <TextField id="ai-field" variant="button">
            <TextField.Label>AI 업그레이드</TextField.Label>
            <TextField.Input
              placeholder="AI에게 요청하여 글 업그레이드하기"
              maxLength={5000}
              showCounter
              {...register('aiUpgrade')}
            />
            <TextField.Submit type="submit" />
          </TextField>

          <TextField id="ai-field" variant="button" isError>
            <TextField.Label>AI 업그레이드</TextField.Label>
            <TextField.Input
              placeholder="AI에게 요청하여 글 업그레이드하기"
              maxLength={5000}
              showCounter
              {...register('aiUpgrade')}
            />
            <TextField.Submit type="submit" />
          </TextField>
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <Icon name="stack" size={32} color="grey900" />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/">경제</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Link href="/">기초 경제 지식</Link>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Icon name="stack" size={32} color="grey900" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>경제</Breadcrumb.Item>
          <Breadcrumb.Item active>기초 경제 지식</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Chip variant="green" leftAddon={<Chip.Icon variant="green" />}>
          업로드할 글
        </Chip>
        <Chip variant="grey" leftAddon={<Icon name="circle" type="fill" />}>
          생성된 글
        </Chip>
        <Chip variant="purple" leftAddon={<Icon name="circle" type="fill" />}>
          수정 중인 글
        </Chip>
        <Chip
          variant="purple"
          rightAddon={
            <Text color="purple600" fontSize={16} fontWeight="semibold">
              무작위로 업로드 돼요
            </Text>
          }
          closable
        >
          전체선택
        </Chip>
      </div> */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          backgroundColor: 'grey',
        }}
      >
        <Spinner color="black" size="small" />
        <Spinner color="black" size="large" />
        <Spinner color="white" size="small" />
        <Spinner color="white" size="large" />
      </div>
      <div style={{ margin: '2rem' }}>
        <RadioCards defaultValue="1" columns={2}>
          <RadioCards.Item value="1">
            <RadioCards.Badge>X Premium 계정 전용</RadioCards.Badge>
            <RadioCards.Label>짧은 게시물</RadioCards.Label>
            <RadioCards.Description>140자</RadioCards.Description>
          </RadioCards.Item>

          <RadioCards.Item value="2">
            <RadioCards.Badge>X Premium 계정 전용</RadioCards.Badge>
            <RadioCards.Label>짧은 게시물</RadioCards.Label>
            <RadioCards.Description>140자</RadioCards.Description>
          </RadioCards.Item>

          <RadioCards.Item
            value="3"
            leftAddon={<RadioCards.Icon name="picture" size={24} />}
          >
            <RadioCards.Label>짧은 게시물</RadioCards.Label>
            <RadioCards.Description>140자</RadioCards.Description>
          </RadioCards.Item>

          <RadioCards.Item value="4" disabled>
            <RadioCards.Label>짧은 게시물</RadioCards.Label>
            <RadioCards.Description>140자</RadioCards.Description>
          </RadioCards.Item>

          <RadioCards.Item
            value="5"
            leftAddon={<RadioCards.Icon name="picture" size={24} />}
          >
            <RadioCards.Label>짧은 게시물</RadioCards.Label>
          </RadioCards.Item>

          <RadioCards.Item value="6" disabled>
            <RadioCards.Label>짧은 게시물</RadioCards.Label>
          </RadioCards.Item>
        </RadioCards>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.8rem',
          margin: '2rem',
          minWidth: '700px',
        }}
      >
        <Skeleton width="30rem" height="2rem" radius={16} />
        <Skeleton width="15rem" height="15rem" radius={4} />
        <Skeleton width="15rem" height="15rem" />
      </div>
    </div>
  );
}
