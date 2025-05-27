import { Badge, Text } from '@repo/ui';
import Image from 'next/image';
import * as style from './style.css';
import { useGetPostQuery } from '@web/store/query/useGetPostQuery';
import { ScheduleDetailPageProps } from '../../type';
import { useRouter } from 'next/navigation';
import { isNil } from '@repo/ui/utils';
import { ROUTES } from '@web/routes';

type ScheduleDetailContentProps = ScheduleDetailPageProps;

export function ScheduleDetailContent({ params }: ScheduleDetailContentProps) {
  const { data: post } = useGetPostQuery({
    agentId: Number(params.agentId),
    postGroupId: Number(params.postGroupId),
    postId: Number(params.postId),
  });

  const router = useRouter();

  if (isNil(post)) {
    router.push(ROUTES.ERROR);
    return;
  }

  return (
    <>
      <div className={style.titleSectionStyle}>
        <Text.H1 fontSize={28} fontWeight="bold" color="grey1000">
          {post.data.summary}
        </Text.H1>
        <Badge size="large" variant="neutral" shape="square">
          요약
        </Badge>
      </div>
      <Text.P
        fontSize={18}
        fontWeight="medium"
        color="grey800"
        className={style.contentStyle}
      >
        {post.data.content}
      </Text.P>
      {post.data.postImages.length > 0 &&
        post.data.postImages.map((image) => (
          <div key={image.id} className={style.imageWrapperStyle}>
            <Image
              src={image.url}
              alt={`업로드 예정인 이미지 ${image.id}`}
              width={185.5}
              height={240}
              className={style.imageStyle}
            />
          </div>
        ))}
    </>
  );
}
