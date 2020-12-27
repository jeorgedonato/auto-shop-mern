const {gql} = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(email: String!, password: String!, firstname: String!, lastname: String!)
  }

  extend type User {
    id: ID!
    email: String!
    firstname: String!
    lastname: String!
    createdAt: String!
  }
`