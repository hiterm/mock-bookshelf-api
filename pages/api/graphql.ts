import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-micro";
import { mocks } from "../../apollo/mocks";
import { typeDefs } from "../../apollo/typeDefs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks,
  }),
});

export default apolloServer
  .start()
  .then(() => apolloServer.createHandler({ path: "/api/graphql" }));
