import { z } from 'zod';

// Expressão regular para validar a senha
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*()_+{}|:"<>?~`]).{8,}$/;

export const signUpSchema = z.object({
  name: z.string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome não pode ter mais de 100 caracteres.' }),

  email: z.string()
    .email({ message: 'Por favor, insira um email válido.' })
    .max(100, { message: 'O email não pode ter mais de 100 caracteres.' }),

  password: z.string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .regex(passwordRegex, {
      message:
        'A senha deve conter pelo menos 1 número, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula.',
    }),
});

// Tipo inferido do schema
export type SignUpFormData = z.infer<typeof signUpSchema>;