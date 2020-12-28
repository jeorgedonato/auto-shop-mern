import express from 'express'
import path from 'path'
import connectDB from './config/db'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { ApolloServer } from 'apollo-server-express'
const PORT = process.env.PORT || 3002
const app = express()

connectDB()

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.applyMiddleware({ app })

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(PORT)
  console.log(`🌎 ==> API server now on port http://localhost:${PORT}${server.graphqlPath} !`)
})