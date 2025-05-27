import { DELETE } from '@web/shared/server';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';
import { clearClientSideTokens } from '@web/utils/clearTokens';

/**
 * 로그아웃 API
 */
export function useLogoutMutation() {
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: () => DELETE(`auth/logout`),
    onSuccess: () => {
      toast.success('로그아웃이 완료되었어요.');
      router.push(ROUTES.JOIN);
      clearClientSideTokens();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
