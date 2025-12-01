import z, { email } from "zod";

export const authSignInSchema = z.object({
    email: z.string({ error: 'Campo e-mail é obrigatório' }).email({ error: 'E-mail Inválido' })
})