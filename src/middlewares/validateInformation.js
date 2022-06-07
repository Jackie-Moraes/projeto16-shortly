import bcrypt from "bcrypt"

import connection from "../../database.js"
import signUpSchema from "./schemas/signUpSchema.js"
import signInSchema from "./schemas/signInSchema.js"

export async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    next()
}

export async function validateSignIn(req, res, next) {
    const { email, password } = req.body

    const validation = signInSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    const exists = await connection.query(
        `SELECT * FROM users 
        WHERE $1 = users.email
        `,
        [email]
    )
    if (!exists.rows[0]) return res.sendStatus(401)

    const passwordCheck = bcrypt.compareSync(password, exists.rows[0].password)
    if (!passwordCheck) return res.sendStatus(401)

    res.locals.user = exists.rows[0]

    next()
}
