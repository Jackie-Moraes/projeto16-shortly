import { Router } from "express"

import { validateSignUp } from "../middlewares/validateInformation.js"
import { signUp } from "../controllers/usersController.js"

const usersRouter = Router()

usersRouter.post("/signup", validateSignUp, signUp)

export default usersRouter
