const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.resolvers = {
  Query: {
    hello: () => console.log("hello chmisa")
  },

  Mutation: {
    signupUser: async (root, { username, password, email }, context) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("username was used ");
      }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        username,
        password: hash,
        email
      });

      await newUser.save();

      const token = jwt.sign({ username, email }, process.env.SECRET, {
        expiresIn: "1d"
      });

      return { token };
    }
  }
};
