import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mocks } from "../../apollo/mocks";
import { typeDefs } from "../../apollo/typeDefs";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const cors = Cors();

const apolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks,
  }),
});

export default startServerAndCreateNextHandler(apolloServer);
