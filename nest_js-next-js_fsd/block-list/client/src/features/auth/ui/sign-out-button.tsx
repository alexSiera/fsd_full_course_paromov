import { UiButton } from "@/shared/ui/ui-button";
import React from "react";
import { useSignOut } from "../model/use-sign-out";

export const SignOutButton = () => {
  const { signOut, isLoading } = useSignOut();

  return (
    <UiButton variant="outlined" disabled={isLoading} onClick={signOut}>
      Sign Out
    </UiButton>
  );
};
