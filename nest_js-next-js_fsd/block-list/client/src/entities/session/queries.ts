import { authControllerGetSessionInfo } from "@/shared/api/generated";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sessionKey = ["session"];

export const useSessionQuery = () => {
  return useQuery({
    queryKey: sessionKey,
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useResetSession = () => {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries({ queryKey: sessionKey });
};
