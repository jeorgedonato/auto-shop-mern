const {gql} = require("apollo-server-express");


const root = gql `
  type Query {
    _: String
  }

  type Mutations {
    _: String
  }

  type Subscription {
    _: String
  }
`