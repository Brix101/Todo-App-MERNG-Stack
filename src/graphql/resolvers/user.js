const User = require("../../models/User");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const newUser = new User({
        email,
        username,
        password,
      });

      const res = await newUser.save();
      return {
        ...res._doc,
        id: res._id,
        token: res.generateJwt(),
      };
    },
  },
};
