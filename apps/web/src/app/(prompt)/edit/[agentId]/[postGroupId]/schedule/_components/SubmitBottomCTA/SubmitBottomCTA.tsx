import { FixedBottomCTA, FixedBottomCTAProps, Icon } from '@repo/ui';
import { ROUTES } from '@web/routes';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { IdParams, POST_STATUS } from '@web/types';
import { useRouter } from 'next/navigation';

type SubmitBottomCTAProps = Omit<IdParams, 'postId'> & FixedBottomCTAProps;

export function SubmitBottomCTA({
  agentId,
  postGroupId,
  children,
  ...props
}: SubmitBottomCTAProps) {
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const hasReadyToUploadPosts =
    posts.data.posts[POST_STATUS.READY_TO_UPLOAD].length > 0;

  const router = useRouter();

  return (
    <FixedBottomCTA
      type="submit"
      leftAddon={<Icon name="checkCalendar" size={20} />}
      onClick={() =>
        router.push(
          ROUTES.EDIT.SCHEDULE({
            agentId: agentId,
            postGroupId: postGroupId,
          })
        )
      }
      disabled={!hasReadyToUploadPosts}
      {...props}
    >
      {children}
    </FixedBottomCTA>
  );
}
