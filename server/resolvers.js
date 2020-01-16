const User = require("./models/User");

exports.resolvers = {
  Mutation: {
    signupUser: async (root, { username, password, email }, context) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("username was used ");
      }
      const newUser = new User({
        username,
        password,
        email
      });
      await newUser.save();
      return "Created User";
    }
  }
};
