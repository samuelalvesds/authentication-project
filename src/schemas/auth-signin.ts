import z, { email } from "zod";

export const authSignInSchema = z.object({
    email: z.string({ message: 'Campo email é obrigatório' }).email('E-mail inválido')
    //email: z.email('Campo email é obrigatório')
})