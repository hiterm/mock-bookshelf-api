import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await apolloServer.start();
  return await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export default handler;
