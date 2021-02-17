import express from 'express'
import path from 'path'
import connectDB from './config/db'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import typeDefs from './typeDefs'
import authMiddleware from './middleware/auth'
import resolvers from './resolvers'
import { ApolloServer } from 'apollo-server-express'
import schemaDirectives from './directives'
const PORT = process.env.PORT || 3003
const app = express()
const INPROD = process.env.NODE_ENV === 'production'

connectDB()

app.disable('x-powered-by')
app.use(bodyParser.json())
// const corsOptions = {
//   // origin: 'http://localhost:3003',
//   credentials: true
// }
app.use(cors())
app.use(cookieParser())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground: INPROD ?
      false :
      {
        settings: {
          'request.credentials': 'same-origin'
        }
      },
  context: ({ req, res }) => ({ req, res })
  // schema: schemaWithMiddleWare
})

server.applyMiddleware({ app, cors: false })

// Serve static assets in production
if (INPROD) {
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