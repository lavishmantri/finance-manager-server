import { GraphQLScalarType } from 'graphql';

export const dateResolver = {
  Date: new GraphQLScalarType<Date, number>({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value: string) => {
      return new Date(value); // value from the client
    },
    serialize: (value: Date) => {
      return value.getTime(); // value sent to the client
    },
  }),
};
