import {useMutation} from '@tanstack/react-query';
import {uploadImage} from 'src/services';

export const useUploadImage = () =>
  useMutation({
    mutationFn: uploadImage,
  });
