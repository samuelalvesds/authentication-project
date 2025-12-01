import { Router } from "express";
import * as pingController from '../controllers/ping'
import * as authController from '../controllers/auth'
import * as privateController from '../controllers/private'


export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping)

mainRouter.post('/auth/signin', authController.singin)
mainRouter.post('/auth/signup', authController.signup)

mainRouter.post('/auth/useotp', authController.useOTP)

mainRouter.get('/private', privateController.test);