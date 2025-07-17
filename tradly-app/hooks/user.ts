import { updateUser } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
  });
