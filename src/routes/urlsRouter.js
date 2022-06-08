import { Router } from "express"

import { validateURL } from "../middlewares/validateInformation.js"
import {
    getUrlById,
    redirectToUrl,
    shortenURL,
} from "../controllers/urlsController.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateURL, shortenURL)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", redirectToUrl)

export default urlsRouter
