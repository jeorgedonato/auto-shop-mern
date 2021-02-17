import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import * as Auth from '../helpers/auth'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const [, , context] = args

      await Auth.checkSignedIn(context.req)

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
