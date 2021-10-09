const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

module.exports.generateToken = (_id, email, username) => {
  const payload = {
    _id,
    email,
    username,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

module.exports.authorization = (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
