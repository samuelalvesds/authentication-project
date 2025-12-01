import z, { email } from "zod";


export const authSignUpSchema = z.object({
    name: z.string({ error: 'Campo name é obrigatório' }),
    email: z.string({ error: 'Campo e-mail é obrigatório' }).email('E-mail inválido')
})