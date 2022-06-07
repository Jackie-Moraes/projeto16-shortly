import signUpSchema from "./schemas/signUpSchema.js"

export async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    next()
}
