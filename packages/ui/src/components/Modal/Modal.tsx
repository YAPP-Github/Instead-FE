'use client';

import { ForwardRefExoticComponent } from 'react';
import { ModalRoot } from './ModalRoot';
import type { ModalProps } from './ModalRoot';
import { Title } from './compounds/Title/Title';
import { Description } from './compounds/Description/Description';
import { Icon } from './compounds/Icon/Icon';
import { CTA } from './compounds/CTA/CTA';
import { DoubleCTA } from './compounds/DoubleCTA/DoubleCTA';

type ModalComposition = {
  Title: typeof Title;
  Description: typeof Description;
  Icon: typeof Icon;
  CTA: typeof CTA;
  DoubleCTA: typeof DoubleCTA;
};

/**
 * Modal 컴포넌트
 *
 * @example overlay-kit과 함께 사용하기
 * ```tsx
 * const openModal = () =>
 *   overlay.open(({ isOpen, close, unmount }) => (
 *     <Modal
 *       open={isOpen}
 *       onClose={close}
 *       onExited={unmount}
 *       icon={<Modal.Icon name="notice" color="warning500" />}
 *       doubleCTA={
 *         <Modal.DoubleCTA
 *           cancelProps={{
 *             children: '취소',
 *             onClick: close,
 *           }}
 *           confirmProps={{
 *             children: '나가기',
 *             onClick: () => {
 *               close();
 *             },
 *           }}
 *         />
 *       }
 *     >
 *       <Modal.Title>정말 나가시겠어요?</Modal.Title>
 *       <Modal.Description>
 *         {`이 페이지를 나가면 \n 작성한 내용은 저장되지 않아요`}
 *       </Modal.Description>
 *     </Modal>
 *   ));
 * ```
 *
 * @property {boolean} open - 모달 열기 여부
 * @property {VoidFunction} onOpen - 모달이 열릴 때 호출되는 함수
 * @property {VoidFunction} onClose - 모달이 닫힐 때 호출되는 함수
 * @property {VoidFunction} onExited - 모달이 완전히 닫힌 후 호출되는 함수
 * @property {VoidFunction} onDimmerClick - 모달 배경 클릭 시 호출되는 함수
 * @property {boolean} isCloseOnDimmerClick - 모달 배경 클릭 시 모달 닫힘 여부
 * @property {boolean} showDimmer - 모달 배경 표시 여부
 * @property {ReactNode} icon - 아이콘 컴포넌트
 * @property {ReactNode} cta - CTA 버튼
 * @property {ReactNode} doubleCTA - Double CTA 버튼들
 * @property {ReactNode} children - 자식 요소
 */
export const Modal: ForwardRefExoticComponent<ModalProps> & ModalComposition =
  Object.assign(ModalRoot, {
    Title,
    Description,
    Icon,
    CTA,
    DoubleCTA,
  });

Modal.displayName = 'Modal';

export type { ModalProps } from './ModalRoot';
export type { ModalTitleProps } from './compounds/Title/Title';
export type { ModalDescriptionProps } from './compounds/Description/Description';
export type { ModalIconProps } from './compounds/Icon/Icon';
export type { ModalCTAProps } from './compounds/CTA/CTA';
export type { ModalDoubleCTAProps } from './compounds/DoubleCTA/DoubleCTA';
