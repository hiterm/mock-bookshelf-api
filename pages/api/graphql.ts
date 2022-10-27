import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Router } from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { mocks } from "../../apollo/mocks";
import { typeDefs } from "../../apollo/typeDefs";

export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Router) {
  return new Promise((resolve, reject) => {
    fn(req as any, res as any, (result) => {
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
apolloServer.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
const apolloMiddleware = expressMiddleware(apolloServer);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, apolloMiddleware as any);
}
