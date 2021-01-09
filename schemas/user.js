import Joi from 'joi'

export default Joi.object().keys({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).required().label('Password'),
  firstname: Joi.string().max(254).required().label('Firstname'),
  lastname: Joi.string().max(254).required().label('Lastname')
//  email_confirm
//  profile_picture
})