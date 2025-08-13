import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/graphql",
  {
    headers: { "Content-Type": "application/json" },
  }
);
