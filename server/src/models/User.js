const { model, Schema } = require("mongoose");
const { Password } = require("../utils/Password");
const { generateToken } = require("../utils/auth");

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now() },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.methods.generateJwt = function generateJwt() {
  const token = generateToken(this._id, this.email, this.username);
  return token;
};

module.exports = model("User", UserSchema);
