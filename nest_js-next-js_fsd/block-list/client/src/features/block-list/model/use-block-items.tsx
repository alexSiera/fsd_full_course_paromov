import { useBlockListQuery } from "@/entities/block-list/queries";
import { useDebouncedValue } from "@/shared/lib/react-std";
import { useState } from "react";

export const useBlockItems = () => {
  const [q, setQ] = useState("");

  const blockListQuery = useBlockListQuery({ q: useDebouncedValue(q, 400) });

  const items = blockListQuery.data?.items ?? [];

  return { items, isLoading: blockListQuery.isPending, q, setQ };
};
