import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  {
    getTodos {
      id
      todo
      isCompleted
      createdAt
    }
  }
`;
