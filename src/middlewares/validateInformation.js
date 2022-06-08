import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import connection from "../../database.js"
import signUpSchema from "./schemas/signUpSchema.js"
import signInSchema from "./schemas/signInSchema.js"
import shortenURLSchema from "./schemas/shortenURLSchema.js"

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

    try {
        const exists = await connection.query(
            `SELECT * FROM users 
        WHERE users.email = $1
        `,
            [email]
        )
        if (!exists.rows[0]) return res.sendStatus(401)

        const passwordCheck = bcrypt.compareSync(
            password,
            exists.rows[0].password
        )
        if (!passwordCheck) return res.sendStatus(401)

        res.locals.user = exists.rows[0]

        next()
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function validateURL(req, res, next) {
    const validation = shortenURLSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "").trim()
    if (!token) return res.sendStatus(401)

    const exists = await connection.query(
        `SELECT * FROM tokens
        WHERE tokens.name = $1
        `,
        [token]
    )
    if (!exists.rows[0]) return res.sendStatus(401)

    const key = process.env.JWT_SECRET
    const tokenVerification = jwt.verify(token, key)
    if (!tokenVerification) return res.sendStatus(401)

    res.locals.user = exists.rows[0]
    next()
}

export async function validateUrlID(req, res, next) {
    try {
    } catch (e) {}
}
