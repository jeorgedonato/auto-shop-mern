import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import jwt from 'jsonwebtoken'
import config from 'config'
import { signOut } from '../helpers/auth'

export default {
  Query: {
    users: async (root, args, { req, res }, info) => {
      // TODO: Auth, projection
      return User.find({})
    },
    user: async (root, { id }, { req, res }, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid user ID.')
      }
      return await User.findById(id)
    },
    me: async (root, args, { req, res }, info) => {
      // const token = req.cookies.token
      return await User.findById(req.user.id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req, res }, info) => {
      try {
        await signUp.validateAsync(args, { abortEarly: false })

        await User.create(args)
      } catch (err) {
        console.log(err)
        throw new UserInputError(err)
      }
    },
    signIn: async (root, args, { req, res }, info) => {
      try {
        const message = 'Incorrect email or password. Please try again.'
        await signIn.validateAsync(args, { abortEarly: false })
        const { email, password } = args

        const user = await User.findOne({ email })
        if (!user) {
          throw new AuthenticationError(message)
        }
        if (!await user.matchesPassword(password)) {
          throw new AuthenticationError(message)
        }

        const payload = {
          user: {
            id: user._id
          }
        }
        const token = jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 }
        )

        res.cookie('token', token, { httpOnly: true })

        return token
      } catch (err) {
        console.log(err)
        throw new UserInputError(err)
      }
    },
    logOut: async (root, args, { req, res }, info) => {
      return await signOut(req, res)
    }
  }
}
