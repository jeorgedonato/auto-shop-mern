import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
import { signUp } from '../schemas'

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: Auth, projection

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
    }
  }
}
