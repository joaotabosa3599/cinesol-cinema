import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const halfTicketSchema = z.object({
    isEligible: z.boolean().default(false),
    age: z.number().optional(),
    cpf: z.string().optional(),
    institution: z.string().optional(),
    institutionVerification: z.boolean().default(false),
    documentUrl: z.string().optional(),
    status: z.enum(['pendente', 'aprovado', 'rejeitado']).default('pendente'),
});

export type HalfTicketData = z.infer<typeof halfTicketSchema>;

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    halfTicket: halfTicketSchema.optional(),
});

export type UserData = z.infer<typeof userSchema>;