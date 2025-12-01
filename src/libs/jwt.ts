
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../types/ExtendedRequest";

export const createJWT = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string);
}

export const verifyJWT = async (req: ExtendedRequest, res: Response, next: NextFunction) => {

}