import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Routers

app.listen(process.env.PORT || 4000, () =>
    console.log(
        chalk.blue.bold(`Server running on port ${process.env.PORT || 4000}`)
    )
)
