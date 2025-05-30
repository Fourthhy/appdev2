const Joi = require('joi');

const signUpSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(8)
        .max(32)
        .pattern(new RegExp("^[a-zA-Z0-9_]+$"), 'alphanumeric and underscore')
        .required()
        .messages({
            'string.min': "Minimum of 8 characters required",
            'string.max': "Username cannot exceed to 32 characters",
            'string.empty': "Username is required",
            'any.required': "Username is required",
            'string.pattern': "Username can only contain alphanumeric characters and an underscore"
        }),
    email: Joi.string()
        .alphanum()
        .email({ tlds: { allow: [".com", ".net"] } })
        .required()
        .messages({
            'string.empty': "Email is required",
            'any.required': "Email is  required",
            'string.email': "Please enter a valid email address with .com or .net domain"
        }),
    password: Joi.string()
        .min(6)
        .max(32)
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
        .required()
        .messages({
            'string.min': "Minimum of 8 characters required",
            'string.max': "Password cannot exceed to 32 characters",
            'string.pattern.base': "Password must only contain alphanumeric characters",
            'any.required': "Password is required",
            'string.empty': "Password is required"
        })
})

const signInSchema = Joi.object({
    username: Joi.string()
        .alphanum(),
    email: Joi.string()
        .alphanum()
        .email({ tlds: { allow: [".com", ".net"] } })
        .messages({
            'string.email': "Please enter a valid email address"
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': "Password is required",
            'any.required': "Password is required"
        }),
}).xor('username', 'email')
    .messages({
        'object.xor': "Provide email or password"
    })

module.exports = {
    signUpSchema,
    signInSchema
}   