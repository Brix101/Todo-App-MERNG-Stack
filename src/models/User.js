const { model, Schema } = require("mongoose");
const { Password } = require("../services/Password");
const { generateToken } = require("../services/auth");

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now() },
});

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.methods.generateJwt = function generateJwt() {
  const token = generateToken(this.email, this._id, this.username);
  return token;
};

module.exports = model("User", UserSchema);
