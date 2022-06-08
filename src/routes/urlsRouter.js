import { Router } from "express"

import {
    validateToken,
    validateURL,
    validateUrlDelete,
} from "../middlewares/validateInformation.js"
import {
    deleteUrl,
    getUrlById,
    redirectToUrl,
    shortenURL,
} from "../controllers/urlsController.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateURL, validateToken, shortenURL)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", redirectToUrl)
urlsRouter.delete("/urls/:id", validateToken, validateUrlDelete, deleteUrl)

export default urlsRouter
