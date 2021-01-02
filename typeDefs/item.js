import { gql } from 'apollo-server-express'

export default gql`
 extend type Query {
    item(id: ID!): Item
    items: [Item!]!
  }

  type Item {
    id: ID!
    userId: ID!
    quantity: Int!
    createdAt: String!
  }
`
