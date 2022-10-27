// import { ApolloSandbox } from "@apollo/sandbox/react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";

import "graphiql/graphiql.css";

const fetcher = createGraphiQLFetcher({
  url: "http://localhost:3000/api/graphql",
});

export default function EmbeddedSandbox() {
  return <GraphiQL fetcher={fetcher} />;
}
