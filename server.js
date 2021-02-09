import express from 'express'
import path from 'path'
import connectDB from './config/db'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import typeDefs from './typeDefs'
import authMiddleware from './middleware/auth'
import resolvers from './resolvers'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'
const PORT = process.env.PORT || 3002
const app = express()

connectDB()

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

const executableSchema = makeExecutableSchema({ typeDefs, resolvers })
const schemaWithMiddleWare = applyMiddleware(executableSchema, authMiddleware)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req, res }) => ({ req, res }),
  // schema: schemaWithMiddleWare
})

server.applyMiddleware({ app, cors: false })

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