import { email } from 'zod';
import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { getUserByEmail } from "../services/user";
import { generateOtp } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";

export const singin: RequestHandler = async (req, res) => {

    // Data validate
    const data = authSignInSchema.safeParse(req.body) // Meu safeParse retorna sucess, data e error.
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors })
        return;
    }

    // Verify if user exist
    const user = await getUserByEmail(data.data.email);
    if (!user) {
        res.json({
            error: "User not found"
        })
        return;
    }

    // Generate OTP Code for this user
    const otp = generateOtp(user.id)

    // Send Email with the OTP code for user
    await sendEmail(
        user.email,
        'LOGIN CODE: ' + (await otp).code,
        "'Here's your sing-in code:'" + (await otp).code
    )


    // Return otp code id
    res.json({ id: (await otp).id })
}