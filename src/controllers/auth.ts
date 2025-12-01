import { id } from 'zod/v4/locales';

import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { createUser, getUserByEmail } from "../services/user";
import { generateOtp, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authSignUpSchema } from "../schemas/auth-signup"
import { createJWT } from "../libs/jwt";
import { authUseOTPSchema } from "../schemas/auth-useotp";

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



export const signup: RequestHandler = async (req, res) => {

    // Verify data
    const data = authSignUpSchema.safeParse(req.body)
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors })
        return;
    }

    // Verify if user email exist.
    const user = await getUserByEmail(data.data.email);
    if (user) {
        res.json({ error: 'This e-mail already exist' });
    }

    // Create a user
    const newUser = await createUser(data.data.name, data.data.email);

    // Return the new user data
    res.status(200).json({ user: newUser });
}


export const useOTP: RequestHandler = async (req, res) => {

    // Verify if data exist
    const data = authUseOTPSchema.safeParse(req.body)
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors })
        return;
    }

    // Validate OTP
    const user = await validateOTP(data.data.id, data.data.code)
    if (!user) {
        res.json({ error: 'Invalid or expired OTP' })
        return
    }

    // Create JWT
    const token = createJWT(user.id)

    // Return JWT
    res.json({ token, user })
}   