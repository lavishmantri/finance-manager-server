import { GraphQLScalarType, Kind } from 'graphql';

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

const MAX_INT = 2147483647;
const MIN_INT = -2147483648;
const coerceIntString = value => {
  if (Array.isArray(value)) {
    throw new TypeError(
      `IntString1 cannot represent an array value: [${String(value)}]`,
    );
  }
  if (Number.isInteger(value)) {
    if (value < MIN_INT || value > MAX_INT) {
      throw new TypeError(
        `Value is integer but outside of valid range for 32-bit signed integer: ${String(
          value,
        )}`,
      );
    }
    return value;
  }
  return String(value);
};
const IntStringBool = new GraphQLScalarType({
  name: 'IntStringBool',
  serialize: coerceIntString,
  parseValue: coerceIntString,
  parseLiteral(ast) {
    console.log('AST: ', ast.kind);
    if (ast.kind === Kind.INT) {
      return coerceIntString(parseInt(ast.value, 10));
    }
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }

    if (ast.kind === Kind.BOOLEAN) {
      return ast.value;
    }
    return undefined;
  },
});

export const intStringResolver = {
  IntStringBool,
};
