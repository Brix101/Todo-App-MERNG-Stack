const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validation");
const { Password } = require("../../utils/Password");

const User = require("../../models/User");

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username }).populate("todos");

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const isMatch = await Password.compare(user.password, password);
      if (!isMatch) {
        errors.general = "Incorrect password";
        throw new UserInputError("Incorrect password", { errors });
      }
      return {
        ...user._doc,
        id: user._id,
        token: user.generateJwt(),
        todos: user.todos,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
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
