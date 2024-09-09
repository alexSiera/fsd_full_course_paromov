import { SignInForm } from "@/features/auth";
import { UiFormLayout } from "@/shared/ui/layouts/ui-form-page-layout";
import { UiHeader } from "@/shared/ui/ui-header";
import React from "react";

export const SignInPage = () => {
  return (
    <UiFormLayout header={<UiHeader />} form={<SignInForm />} title="Sign In" />
  );
};
