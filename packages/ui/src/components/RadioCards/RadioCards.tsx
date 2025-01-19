import { RadioCardsRoot } from './RadioCardsRoot';
import { RadioCardsItem } from './RadioCardsItem';
import { RadioCardsLabel } from './RadioCardsLabel';
import { RadioCardsDescription } from './RadioCardsDescription';
import { RadioCardsBadge } from './RadioCardsBadge';
import { RadioCardsIcon } from './RadioCardsIcon';

/**
 * RadioCards 컴포넌트는 사용자가 여러 옵션 중 하나를 선택할 수 있는 카드 형태의 라디오 버튼 그룹입니다.
 * 제어 및 비제어 방식을 모두 지원합니다.
 *
 * @example
 * ```tsx
 * // 비제어 방식 - defaultValue를 통해 초기값만 설정
 * <RadioCards defaultValue="1" columns={2}>
 *   <RadioCards.Item value="1">
 *     <RadioCards.Badge>X Premium 계정 전용</RadioCards.Badge>
 *     <RadioCards.Label>짧은 게시물</RadioCards.Label>
 *     <RadioCards.Description>140자</RadioCards.Description>
 *   </RadioCards.Item>
 * </RadioCards>
 *
 * // 제어 방식 - value와 onChange를 통해 상태 관리
 * const [value, setValue] = useState("1");
 *
 * <RadioCards
 *   value={value}
 *   onChange={setValue}
 *   columns={2}
 * >
 *   <RadioCards.Item value="1">
 *     <RadioCards.Badge>X Premium 계정 전용</RadioCards.Badge>
 *     <RadioCards.Label>짧은 게시물</RadioCards.Label>
 *     <RadioCards.Description>140자</RadioCards.Description>
 *   </RadioCards.Item>
 * </RadioCards>
 *
 * // react-hook-form과 함께 사용
 * const { register, handleSubmit, watch } = useForm({
 *   defaultValues: {
 *     postLength: "1"
 *   }
 * });
 *
 * // 현재 선택된 값 실시간 확인
 * const selectedValue = watch("postLength");
 *
 * <form onSubmit={handleSubmit((data) => console.log(data))}>
 *   <RadioCards
 *     {...register("postLength")}
 *     defaultValue="1"
 *     columns={2}
 *   >
 *     <RadioCards.Item value="1">
 *       <RadioCards.Label>짧은 게시물</RadioCards.Label>
 *     </RadioCards.Item>
 *   </RadioCards>
 * </form>
 *
 * // Icon이 있는 예시
 * <RadioCards defaultValue="1" columns={2}>
 *   <RadioCards.Item
 *     value="1"
 *     leftAddon={<RadioCards.Icon name="picture" size={24} />}
 *   >
 *     <RadioCards.Label>짧은 게시물</RadioCards.Label>
 *     <RadioCards.Description>140자</RadioCards.Description>
 *   </RadioCards.Item>
 * </RadioCards>
 *
 * // 비활성화된 아이템 예시
 * <RadioCards defaultValue="1" columns={2}>
 *   <RadioCards.Item value="1" disabled>
 *     <RadioCards.Label>짧은 게시물</RadioCards.Label>
 *     <RadioCards.Description>140자</RadioCards.Description>
 *   </RadioCards.Item>
 * </RadioCards>
 * ```
 */
export const RadioCards = Object.assign(RadioCardsRoot, {
  Item: RadioCardsItem,
  Icon: RadioCardsIcon,
  Label: RadioCardsLabel,
  Description: RadioCardsDescription,
  Badge: RadioCardsBadge,
});

export type { RadioCardsProps } from './RadioCardsRoot';
export type { RadioCardsItemProps } from './RadioCardsItem';
export type { RadioCardsLabelProps } from './RadioCardsLabel';
export type { RadioCardsDescriptionProps } from './RadioCardsDescription';
export type { RadioCardsBadgeProps } from './RadioCardsBadge';
export type { RadioCardsIconProps } from './RadioCardsIcon';
