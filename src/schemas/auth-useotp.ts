import z from "zod";




export const authUseOTPSchema = z.object({
    id: z.string({ error: 'Invalid ID' }),
    code: z.string({ error: 'Invalid OTP' }).length(6, '6 number required')
})