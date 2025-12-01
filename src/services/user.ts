import { email } from 'zod';
import { id } from "zod/v4/locales";
import { prisma } from "../libs/prisma"


export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email }
    });
    return user;
}

export const createUser = async (name: string, email: string) => {
    const newUser = await prisma.user.create({
        data: {
            name,
            email
        }
    })
    return newUser;
}