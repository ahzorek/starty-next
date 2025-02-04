"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/auth-client'; 
import { signUpSchema, SignUpFormData } from '@/validators/auth/signUp.validator';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), // Integração com Zod
  });

  const onSubmit = async (data: SignUpFormData) => {
    const { email, password, name } = data;

    const { data: response, error } = await signUp.email(
      { email, password, name },
      {
        onRequest: (ctx) => {
          console.log("CONTEXT RUNNING: ", ctx);
          return ctx;
        },
        onSuccess: (ctx) => {
          // Redirecionar para o dashboard
          console.log("Sign-up successful!", ctx);
          alert("Sign-up successful!")
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="grid w-full gap-2 bg-white p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* Campo Nome */}
        <input
          className="border border-gray-200 text-gray-500 p-1"
          type="text"
          placeholder="Nome"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

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
          Sign Up
        </button>
      </form>
    </div>
  );
}