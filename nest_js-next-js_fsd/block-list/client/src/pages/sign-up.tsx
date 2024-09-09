import { SignUpForm } from "@/features/auth";
import { UiFormLayout } from "@/shared/ui/layouts/ui-form-page-layout";
import { UiHeader } from "@/shared/ui/ui-header";
import React from "react";

export const SignUpPage = () => {
  return (
    <UiFormLayout header={<UiHeader />} form={<SignUpForm />} title="Sign Up" />
  );
};
