const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      const user = await User.findOne({ username: currentUser.username });
      return user;
    }
  },

  Mutation: {
    signupUser: async (root, { username, password, email }, { User }) => {
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
