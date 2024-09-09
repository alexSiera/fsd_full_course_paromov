import { ROUTES } from "@/shared/constants/routes";
import { UiButton } from "@/shared/ui/ui-button";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";
import React from "react";
import { useSignInForm } from "../model/use-sign-in-form";

export const SignInForm = () => {
  const { handleSubmit, register, isLoading, errorMessage } = useSignInForm();

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <UiTextField
        label="Email"
        inputProps={{
          type: "email",
          ...register("email", { required: true }),
        }}
      />
      <UiTextField
        label="Password"
        inputProps={{
          type: "password",
          ...register("password", { required: true }),
        }}
      />
      <UiButton disabled={isLoading} variant="primary">
        Sign in
      </UiButton>
      <UiLink className="text-center" href={ROUTES.SIGN_UP}>
        Sign up
      </UiLink>
      {errorMessage ? (
        <div className="text-rose-500">{errorMessage}</div>
      ) : null}
    </form>
  );
};
