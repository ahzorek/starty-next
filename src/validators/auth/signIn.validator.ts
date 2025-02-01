import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string()
    .email({ message: 'Por favor, insira um email.' }),
  password: z.string()
    .min(1, { message: 'Por favor, insira uma senha' })
});

// Tipo inferido do schema
export type SignInFormData = z.infer<typeof signInSchema>;
