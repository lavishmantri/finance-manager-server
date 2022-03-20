import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from './generate-typedefs';
import { connectdb } from './utils/db';
import {
  graphqlUploadExpress, // A Koa implementation is also exported.
} from 'graphql-upload';
import { resolvers } from './api/resolvers';

const initServer = () => {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  return new ApolloServer({
    resolvers,
    typeDefs: typeDefs,
  });
};

const init = async () => {
  await connectdb();
  console.log('Connection established');

  const server = initServer();

  // The `listen` method launches a web server.
  await server.start();

  const app = express();

  // Need to use this before calling applyMiddleware
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });
  const appInfo = await app.listen({ port: 4000 });

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

init();
