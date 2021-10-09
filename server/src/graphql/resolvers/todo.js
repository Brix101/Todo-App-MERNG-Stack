const { AuthenticationError, UserInputError } = require("apollo-server");

const Todo = require("../../models/Todo");
const User = require("../../models/User");
const { authorization } = require("../../utils/auth");

module.exports = {
  Query: {
    async getTodos(_, args, context) {
      try {
        const user = authorization(context);
        const logUser = await User.findById(user._id);
        const todos = await Todo.find({ owner: logUser.id })
          .populate("owner")
          .sort({ createdAt: -1 });
        return todos;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getTodo(_, { todoId }) {
      try {
        const todo = await Todo.findById(todoId);
        if (todo) {
          return todo;
        } else {
          throw new Error("Todo not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createTodo(_, { todo }, context) {
      const user = authorization(context);

      const newTodo = new Todo({
        todo,
        owner: user,
      });
      const res = await newTodo.save();
      const logUser = await User.findById(user._id);
      logUser.todos.push(res);
      const resUp = await logUser.save();

      return res;
    },
    async deleteTodo(_, { id }, context) {
      try {
        const user = authorization(context);
        const logUser = await User.find({ _id: user._id });
        const todo = await Todo.findOne({
          $and: [{ _id: id }, { owner: logUser }],
        });
        if (todo) {
          await todo.delete();
          return "Todo deleted Successfully";
        } else {
          return new AuthenticationError("Action not Allowed");
        }
      } catch (error) {
        return new UserInputError("Todo Not Found");
      }
    },
  },
};
