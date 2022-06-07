import joi from "joi"

const shortenURLSchema = joi.object({
    url: joi.string().uri().required(),
})

export default shortenURLSchema
