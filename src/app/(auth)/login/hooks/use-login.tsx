import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLazyNotify } from '@/hooks/use-lazy-notify';

import { useLoginMutation } from '../queries';

const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export function useLoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data).unwrap();
      router.push('/dashboard');
    } catch (error) {
      // handled by useLazyNotify
    }
  };

  useLazyNotify({
    isLoading,
    isSuccess,
    error,
    successMessage: 'Login successful!',
    errorMessage: 'Login failed. Please check your credentials.',
  });

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
  };
}
