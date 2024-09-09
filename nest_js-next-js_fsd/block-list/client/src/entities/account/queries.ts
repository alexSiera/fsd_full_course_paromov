import {
  accountControllerGetAccount,
  accountControllerPatchAccount,
} from "@/shared/api/generated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const accountKey = ["account"];

export function useAccountQuery() {
  return useQuery({
    queryKey: accountKey,
    queryFn: accountControllerGetAccount,
  });
}

export function useUpdateAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountControllerPatchAccount,
    // 1 ое решение мы не делаем лишний запрос, работает быстрее но менее стабильно.
    // onSuccess(data) {
    //   queryClient.setQueryData(accountKey, data);
    // },

    // 2 ое решение мы делаем лишний запрос, работает более стабильно.
    // onSettled, чтобы обновить кеш после того как сработал запрос.
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: accountKey });
    },
  });
}
