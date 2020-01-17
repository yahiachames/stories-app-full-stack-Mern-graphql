const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const User = require("./models/User");
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("mongoDB is connected"))
  .catch(e => console.log("err happend", e));

const schema = makeExecutableSchema({ typeDefs, resolvers });
app.use(cors());
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token !== null) {
    console.log(token);
  }
  return next();
});
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
