const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

module.exports.generateToken = (_id, email, username) => {
  const payload = {
    _id,
    email,
    username,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};
