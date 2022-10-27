import { ApolloServer } from "@apollo/server";
import { nextHandler } from "apollo-server-nextjs";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mocks } from "../../apollo/mocks";
import { typeDefs } from "../../apollo/typeDefs";

const apolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks,
  }),
});

export default nextHandler(apolloServer);
