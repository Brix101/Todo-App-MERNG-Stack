const { model, Schema } = require("mongoose");

const todoSchema = new Schema({
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now() },
  dueDate: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

todoSchema.set("toObject", { virtuals: true });
todoSchema.set("toJSON", { virtuals: true });

module.exports = model("Todo", todoSchema);
