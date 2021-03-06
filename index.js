import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import chalk from "chalk"
dotenv.config()

import usersRouter from "./src/routes/usersRouter.js"
import urlsRouter from "./src/routes/urlsRouter.js"

const app = express()
app.use(cors())
app.use(express.json())

// Routers
app.use(usersRouter)
app.use(urlsRouter)

app.listen(process.env.PORT || 4000, () =>
    console.log(
        chalk.blue.bold(`Server running on port ${process.env.PORT || 4000}`)
    )
)
