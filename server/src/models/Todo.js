const { model, Schema } = require("mongoose");

const todoSchema = new Schema({
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

todoSchema.set("toObject", { virtuals: true });
todoSchema.set("toJSON", { virtuals: true });

module.exports = model("Todo", todoSchema);
