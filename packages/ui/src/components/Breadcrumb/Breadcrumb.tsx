import { BreadcrumbRoot } from './BreadcrumbRoot';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

/**
 * @example
 *
 * Breadcrumb 컴포넌트 사용 예시입니다.
 *
 * Link와 함께 사용하는 경우:
 * <Breadcrumb>
 *   <Breadcrumb.Item>
 *     <Link href="/">
 *       <Icon name="stack" size={32} color="grey900" />
 *     </Link>
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item>
 *     <Link href="/">경제</Link>
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item active>
 *     <Link href="/">기초 경제 지식</Link>
 *   </Breadcrumb.Item>
 * </Breadcrumb>
 *
 * 일반적인 사용:
 * <Breadcrumb>
 *   <Breadcrumb.Item>
 *     <Icon name="stack" size={32} color="grey900" />
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item>경제</Breadcrumb.Item>
 *   <Breadcrumb.Item active>기초 경제 지식</Breadcrumb.Item>
 * </Breadcrumb>
 */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
});

export type { BreadcrumbProps } from './BreadcrumbRoot';
export type { BreadcrumbItemProps } from './BreadcrumbItem';
export type { BreadcrumbSeparatorProps } from './BreadcrumbSeparator';
