import { ApolloServer } from "@apollo/server";
import { nextHandler } from "apollo-server-nextjs";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mocks } from "../../apollo/mocks";
import { typeDefs } from "../../apollo/typeDefs";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors();

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
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const apolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks,
  }),
});

const apolloMiddleWare = nextHandler(apolloServer);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  await runMiddleware(req, res, apolloMiddleWare);
}
