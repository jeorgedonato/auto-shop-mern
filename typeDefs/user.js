import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(email: String!, password: String!, firstname: String!, lastname: String!) : User
    signIn(email: String!, password: String!) : String
  }

  type User {
    id: ID!
    email: String!
    firstname: String!
    lastname: String!
    createdAt: String!
  }
`
