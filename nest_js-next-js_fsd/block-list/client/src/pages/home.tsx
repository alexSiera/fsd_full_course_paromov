import { useQuery } from "@tanstack/react-query";
import { authControllerGetSessionInfo } from "../shared/api/generated";

export function HomePage() {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => authControllerGetSessionInfo(),
  });
  return <main>{data?.email}</main>;
}
