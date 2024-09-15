import Joi from 'joi';
// Sign-up schema
export const UsersShemasign = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "at least 6 characters contain an upper,lowercase letter,and num.",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required()
});

// Login schema
export const UsersShemalogin = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
});