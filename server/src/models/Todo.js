const { model, Schema } = require("mongoose");

const TodoSchema = new Schema({
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", TodoSchema);
