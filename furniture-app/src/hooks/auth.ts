import {useMutation} from '@tanstack/react-query';
import {login, register} from 'src/services';

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });
