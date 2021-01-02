import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    cart(id: ID!): Cart
    carts: [Cart!]!
  }

  type Cart {
    id: ID!
    userId: ID!
    quantity: Int!
    itemId: ID!
    createdAt: String!
  }
`