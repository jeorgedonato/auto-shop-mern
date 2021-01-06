import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'

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
    signUp: (root, args, context, info) => {
      return User.create(args)
    }
  }
}
