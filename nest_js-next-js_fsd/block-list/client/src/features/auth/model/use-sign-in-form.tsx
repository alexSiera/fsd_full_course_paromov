import { authControllerSignIn } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
};

export const useSignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInFormData>();

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess() {
      router.push(ROUTES.HOME);
    },
  });

  const signUp = (data: SignInFormData) => {
    signInMutation.mutate(data);
  };

  const errorMessage = signInMutation.error ? "Sign in failed" : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit(signUp),
    isLoading: signInMutation.isPending,
  };
};
