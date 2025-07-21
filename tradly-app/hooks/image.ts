import { uploadImage } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () =>
  useMutation({
    mutationFn: uploadImage,
  });
