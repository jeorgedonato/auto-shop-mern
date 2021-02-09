import Joi from '@hapi/joi'

const email = Joi.string().email().required().label('email').messages({
  'any.required': 'Email is required',
  'string.empty': 'username cannot be an empty field',
  'string.email': 'Must be a valid email'
})

const password = Joi.string().regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).required().min(8).max(30).label('Password').messages({
  'string.pattern.base': 'Password must contain an uppercase and lowercase letter, a digit, and must be between 8 - 30 characters',
  'any.required': 'Password is required'
})

const firstname = Joi.string().max(254).required().label('Firstname').messages({
  'any.required': 'Firstname is required'
})

const lastname = Joi.string().max(254).required().label('Lastname').messages({
  'any.required': 'Lastname is required'
})

export const signUp = Joi.object().keys({
  email, password, firstname, lastname
})

export const signIn = Joi.object().keys({
  email, password
})
