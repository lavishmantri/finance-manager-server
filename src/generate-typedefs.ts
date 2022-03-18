import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

export const typeDefs = loadSchemaSync(`${__dirname}/**/*.graphql`, {
  loaders: [new GraphQLFileLoader()],
});
