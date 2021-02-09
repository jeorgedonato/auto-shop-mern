import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import jwt from 'jsonwebtoken'
import config from 'config'

export default {
  Query: {
    users: (root, args, { req }, info) => {
      // TODO: Auth, projection
      console.log(req)
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid user ID.')
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
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

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err
            res.cookie('token', token, { httpOnly: true })
            res.json({ token })
            console.log(token)
          }
        )

        // return user
      } catch (err) {
        console.log(err)
        throw new UserInputError(err)
      }
    }
  }
}
