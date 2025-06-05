import {useMutation} from '@tanstack/react-query';
import {updateUser} from 'src/services/user';

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
  });
