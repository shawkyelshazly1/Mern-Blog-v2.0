const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.registerSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

exports.postSchema = Joi.object({
  title: Joi.string().required().min(3).max(50),
  content: Joi.string().required().min(10),
  author: Joi.string().required(),
});

exports.commentSchema = Joi.object({
  content: Joi.string().required().min(3).max(300),
  author: Joi.string().required(),
  post: Joi.string().required(),
});
