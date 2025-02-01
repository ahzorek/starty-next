"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth-client';
import { SignInFormData, signInSchema } from '@/validators/auth/signIn.validator';
import { redirect, useRouter } from 'next/navigation';

export default function SignInForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors}} = useForm<SignInFormData>({resolver: zodResolver(signInSchema)});

  const onSubmit = async (data: SignInFormData) => {
    const { email, password } = data;

    const { data: response, error } = await signIn.email(
      { email, password },
      {
        onRequest: (ctx) => {
          console.log("CONTEXT RUNNING: ", ctx);
          return ctx;
        },
        onSuccess: (ctx) => {
          // Redirecionar para o dashboard
          console.log("Sign-up successful!", ctx);
          router.push('/dashboard')
        },
        onError: (ctx) => {
          if(ctx.error.status === 403) {
            console.error(ctx.error)
            alert("Email precisa ser verificado")
        }
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="grid w-full gap-2 bg-white p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* Campo Email */}
        <input
          className="border border-gray-200 text-gray-500 p-1"
          type="email"
          placeholder="E-mail"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        {/* Campo Senha */}
        <input
          className="border border-gray-200 text-gray-500 p-1"
          type="password"
          placeholder="Senha"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        {/* Botão de Cadastro */}
        <button type="submit" className="bg-blue-600 text-white p-4">
          Sign In
        </button>
      </form>
    </div>
  );
}