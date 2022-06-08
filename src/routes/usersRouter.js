import { Router } from "express"

import {
    validateSignIn,
    validateSignUp,
    validateUser,
} from "../middlewares/validateInformation.js"
import { getUserInfo, signIn, signUp } from "../controllers/usersController.js"

const usersRouter = Router()

usersRouter.post("/signup", validateSignUp, signUp)
usersRouter.post("/signin", validateSignIn, signIn)
usersRouter.get("/users/:id", validateUser, getUserInfo)

export default usersRouter
