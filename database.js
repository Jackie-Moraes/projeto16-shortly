import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

// const databaseConfig = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// }

// const connection = new Pool(databaseConfig)

const user = process.env.PSQL_USER
const password = process.env.PSQL_PASSWORD
const host = "localhost"
const port = 5432
const database = "shortly"

const connection = new Pool({
    user,
    password,
    host,
    port,
    database,
})

export default connection
