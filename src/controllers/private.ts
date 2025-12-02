import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/ExtendedRequest";
import { getUserById } from "../services/user";
import { error } from "console";


export const test = async (req: ExtendedRequest, res: Response) => {
    if (!req.userId) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    const user = await getUserById(req.userId);
    if (!user) {
        res.status(401).json({ error: 'Access denied' })
        return;
    }

    res.json({ user })
}