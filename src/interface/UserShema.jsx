import Joi from 'joi';
// Sign-up schema
export const UsersShemasign = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
});

// Login schema
export const UsersShemalogin = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
});