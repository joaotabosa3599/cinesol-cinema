import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(3, "Mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    age: z.number().optional(),
    cpf: z.string().optional(),
    institution: z.string().optional(),
    institutionVerification: z.boolean().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;