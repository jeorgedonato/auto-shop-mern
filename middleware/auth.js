import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server-express'
import config from 'config'
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    throw new AuthenticationError('No token, authorization denied')
  }

  try {
    await jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        throw new UserInputError('Token is not valid')
      } else {
        req.user = decoded.user
        // console.log(decoded)
        next()
      }
    })
  } catch (err) {
    console.error(err)
    throw new ApolloError('Server Error')
  }
}
