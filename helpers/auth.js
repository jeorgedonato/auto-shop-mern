import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server-express'
import config from 'config'
import jwt from 'jsonwebtoken'

export const checkSignedIn = async req => {
  const token = req.cookies.token
  // console.log('Im in the helper')
  if (!token) {
    throw new AuthenticationError('You must be signed in.')
  }

  try {
    await jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        throw new UserInputError('Token is not valid')
      } else {
        req.user = decoded.user
        // console.log(decoded)
        // next()
      }
    })
  } catch (err) {
    console.error(err)
    throw new ApolloError('Server Error')
  }
}

export const checkSignedOut = req => {
  if (req.cookies.token) {
    throw new AuthenticationError('You are already signed in.')
  }
}

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    res.clearCookie('token')
    resolve(true)
  }
)
