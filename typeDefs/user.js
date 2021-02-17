import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    user(id: ID!): User @auth
    users: [User!]! @auth
    me: User @auth
  }

  extend type Mutation {
    signUp(email: String!, password: String!, firstname: String!, lastname: String!) : User @guest
    signIn(email: String!, password: String!) : String @guest
    logOut: Boolean @auth
  }

  type User {
    id: ID!
    email: String!
    firstname: String!
    lastname: String!
    createdAt: String!
  }
`
