"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/auth-client';
import { signUpSchema, SignUpFormData } from '@/validators/auth/signUp.validator';
import { Button, Callout, Card, Flex, IconButton, TextField } from '@radix-ui/themes';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SignUp() {
	const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });
	const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

	const onSubmit = async (data: SignUpFormData) => {
		const { email, password, name } = data;

		const { data: response, error } = await signUp
			.email({
				email,
				password,
				name,
				fetchOptions: {
					onRequest: (ctx) => {
						//console.log("CONTEXT RUNNING: ", ctx);
						return ctx;
					},
					onSuccess: (ctx) => {
						// Redirecionar para o dashboard
						console.log("Sign-up successful!", ctx);
						toast.success("Registrado com Sucesso!")
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				}
			});
	};

	return (
		<Card>
			<Flex p="2" direction="column" gap="3" width="323px">
				<form onSubmit={handleSubmit(onSubmit)} className="contents">
					{/* Campo Nome */}
					<TextField.Root
						type="text"
						placeholder="Nome"
						{...register('name')}
					/>
					{errors.name && (
						<Callout.Root color='red' size="1" highContrast>
							<Callout.Text>
								{errors.name.message}
							</Callout.Text>
						</Callout.Root>
					)}

					{/* Campo Email */}
					<TextField.Root
						type="email"
						placeholder="E-mail"
						{...register('email')}
					/>
					{errors.email && (
						<Callout.Root color='red' size="1" highContrast>
							<Callout.Text>
								{errors.email.message}
							</Callout.Text>
						</Callout.Root>
					)}

					{/* Campo Senha */}
					<TextField.Root
						type={isPasswordVisible ? "text" : "password"}
						placeholder="Senha"
						{...register('password')}
					>
						<TextField.Slot />
						<TextField.Slot>
							<IconButton onClick={() => setPasswordVisible(!isPasswordVisible)} color='gray' size="1" variant="ghost">
								{isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
							</IconButton>
						</TextField.Slot>
					</TextField.Root>
					{errors.password && (
						<Callout.Root color='red' size="1" highContrast>
							<Callout.Text>
								{errors.password.message}
							</Callout.Text>
						</Callout.Root>
					)}

					{/* Botão de Cadastro */}
					<Button type="submit" size="3" >
						Sign Up
					</Button>
				</form>
			</Flex>
		</Card>
	);
}