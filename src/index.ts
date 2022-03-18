import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './generate-typedefs';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  resolvers: {
    Query: {
      getTransactionList: [],
    },
  },
  typeDefs: typeDefs,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
