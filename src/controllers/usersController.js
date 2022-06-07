import connection from "../../database.js"
import dayjs from "dayjs"
import bcrypt from "bcrypt"

export async function signUp(req, res) {
    const { email, name, password } = req.body
    try {
        const passwordHash = bcrypt.hashSync(password, 10)
        const now = dayjs().format("DD/MM/YYYY")
        const query = await connection.query(
            `INSERT INTO users (email, name, password, "createdAt") VALUES ($1, $2, $3, $4)`,
            [email, name, passwordHash, now]
        )
        return res.sendStatus(201)
    } catch (e) {
        res.status(500).send(e)
    }
}
