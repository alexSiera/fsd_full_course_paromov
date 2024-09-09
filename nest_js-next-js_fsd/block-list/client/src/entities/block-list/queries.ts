import {
  blockListControllerAddBlockListItem,
  blockListControllerGetList,
  blockListControllerRemoveBlockItem,
} from "@/shared/api/generated";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const blockListKey = ["block-list"] as unknown[];

export function useBlockListQuery({ q }: { q?: string }) {
  const queryKey = blockListKey.concat([{ q }]);

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    queryFn: () => blockListControllerGetList({ q }),
    placeholderData: keepPreviousData,
  });
}

export function useAddBlockItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockListControllerAddBlockListItem,
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: blockListKey });
    },
  });
}

export function useRemoveBlockItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockListControllerRemoveBlockItem,
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: blockListKey });
    },
  });
}
