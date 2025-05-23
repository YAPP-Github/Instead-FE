import { useToast } from '@repo/ui/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PersonalizeFormValues } from '@web/app/personalize/[agentId]/type';
import { PUT } from '@web/shared/server';
import { IdParams } from '@web/types';
import { getAgentDetailQueryOptions } from '../query/useGetAgentDetailQuery';

type MutationUpdatePersonalSetting = Pick<IdParams, 'agentId'>;

type UpdatePersonalRequest = PersonalizeFormValues;

/**
 * 계정 개인화 설정 수정 API
 *
 * 사용자가 연동한 SNS 계정의 개인화 설정을 변경합니다.
 *
 * 변경되는 필드만 채워주시면 됩니다!
 *
 */
export function useUpdatePersonalSettingMutation({
  agentId,
}: MutationUpdatePersonalSetting) {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePersonalRequest) =>
      PUT(`v1/agents/${agentId}/personal-setting`, data),
    onSuccess: () => {
      toast.success('저장되었어요.');
      queryClient.invalidateQueries(
        getAgentDetailQueryOptions({
          agentId: Number(agentId),
        })
      );
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
