import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mocks } from "../../apollo/mocks";
import { typeDefs } from "../../apollo/typeDefs";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const apolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks,
  }),
});

const cors = Cors();

const apolloHandler = startServerAndCreateNextHandler(apolloServer);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  await apolloHandler(req, res);
}
