import z, { email } from "zod";


export const authSignUpSchema = z.object({
    name: z.string({ error: 'Name field is required' }),
    email: z.string({ error: 'Email field is required' }).email('Invalid e-mail')
})