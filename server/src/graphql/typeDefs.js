const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    todos: [Todo]
  }
  type Todo {
    id: ID!
    todo: String!
    isCompleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getTodos: [Todo]
    getTodo(todoId: ID): Todo
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createTodo(todo: String): Todo!
    deleteTodo(todoId: ID): String!
  }
`;
