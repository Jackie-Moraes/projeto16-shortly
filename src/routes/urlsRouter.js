import { Router } from "express"

import { validateURL } from "../middlewares/validateInformation.js"
import { shortenURL } from "../controllers/urlsController.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateURL, shortenURL)

export default urlsRouter
