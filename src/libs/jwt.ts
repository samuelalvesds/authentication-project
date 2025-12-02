import { id } from 'zod/v4/locales';

import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../types/ExtendedRequest";
import { error } from "console";

export const createJWT = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string);
}

export const verifyJWT = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ error: 'Access denied' })
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err, decoded: any) => {
            if (err) {
                res.status(500).json({ error: 'Access denied' })
                return;
            };
            req.userId = decoded.id;
            next();
        }
    )

}