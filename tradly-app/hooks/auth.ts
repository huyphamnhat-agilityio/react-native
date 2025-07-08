import { login } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
