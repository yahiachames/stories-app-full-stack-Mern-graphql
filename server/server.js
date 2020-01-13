const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = `
type Query {
    hello : String
}
`;

const resolvers = {
  Query: {
    hello: () => "Hello World"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
