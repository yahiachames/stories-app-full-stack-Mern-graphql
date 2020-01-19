const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const User = require("./models/User");
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("mongoDB is connected"))
  .catch(e => console.log("err happend", e));

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (token && token !== null) {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      return {
        currentUser,
        User
      };
    } else {
      return {
        User
      };
    }
  }
});
server.applyMiddleware({ app });
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
