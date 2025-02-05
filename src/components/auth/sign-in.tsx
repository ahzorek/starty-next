"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth-client';
import { SignInFormData, signInSchema } from '@/validators/auth/signIn.validator';
import { useRouter } from 'next/navigation';
import { Button, Card, Flex, IconButton, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInFormData) => {
    const { email, password } = data;

    const { data: response, error } = await signIn.email({
      email,
      password,
      callbackURL: '/dashboard',
      fetchOptions: {
        onRequest: (ctx) => {
          //console.log("CONTEXT RUNNING: ", ctx);
          setLoading(true);
          return ctx;
        },
        onSuccess: (ctx) => {
          // Redirecionar para o dashboard
          console.log("Sign-up successful!", ctx);
          toast.success("Autenticado com sucesso", {
            duration: 1000,
            onAutoClose: () => router.push('/dashboard')
          });
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            toast.warning("Email precisa ser verificado");
            setLoading(false);
            return;
          }
          setLoading(false);
          toast.error(ctx.error.message);
        },
      }
    });
  };

  return (
    <Card variant='surface'>
      <Flex direction="column" as='div' gap="3" minWidth="323px">
        <form onSubmit={handleSubmit(onSubmit)} className='contents'>
          {/* Campo Email */}
          <TextField.Root
            //className="border border-gray-200 text-gray-500 p-1"
            type="email"
            placeholder="E-mail"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* Campo Senha */}
          <TextField.Root
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Senha"
            {...register('password')}
          >
            <TextField.Slot />
            <TextField.Slot>
              <IconButton type='button' onClick={() => setPasswordVisible(!isPasswordVisible)} color='gray' size="1" variant="ghost">
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          {/* Botão de Cadastro */}
          <Button size="3" type="submit" loading={isLoading}>
            Sign In
          </Button>
        </form>
      </Flex>
    </Card>
  );
}