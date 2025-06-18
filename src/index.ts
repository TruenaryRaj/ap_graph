import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { buildContext } from './context';

dotenv.config();

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: buildContext
  });

  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'GraphQL server is healthy',
    });
  });

  await server.start();

  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
