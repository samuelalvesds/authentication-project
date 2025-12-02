import z, { email } from "zod";

export const authSignInSchema = z.object({
    email: z.string({ error: 'Email field is required' }).email({ error: 'Invalid e-mail' })
})