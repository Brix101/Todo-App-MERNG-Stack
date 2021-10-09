const todoResolvers = require("./todo");
const userResolvers = require("./user");

module.exports = {
  Query: {
    ...todoResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation,
  },
};
