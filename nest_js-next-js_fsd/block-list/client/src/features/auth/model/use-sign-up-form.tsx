import { authControllerSignUp } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type SignUpFormData = {
  email: string;
  password: string;
};

export const useSignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const signUpMutation = useMutation({
    mutationFn: authControllerSignUp,
    onSuccess() {
      router.push(ROUTES.HOME);
    },
  });

  const signUp = (data: SignUpFormData) => {
    signUpMutation.mutate(data);
  };

  const errorMessage = signUpMutation.error ? "Sign up failed" : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit(signUp),
    isLoading: signUpMutation.isPending,
  };
};
