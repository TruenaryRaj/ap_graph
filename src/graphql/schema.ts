import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type user {
    id: Int
    email: String
    password: String
  }

  type todo{
  id: Int
  title: String
  description: String
  userId: Int
  }

  type loginResponse{
  accessToken: String
  refreshToken: String
  }
  
  type returnMessage{
  message: String
  }

  type Query{
    getTodo: [todo!]!
  }

  type Mutation{
    addUser( email: String!, password: String!) : returnMessage!
    editUser( id: Int!, password: String!) : returnMessage!
    deleteUser( id: Int!) : returnMessage!
    loginUser(email: String!, password: String!) : returnMessage!
    refreshToken(refreshToken: String!): loginResponse!
    verifyCode(email: String!, code: String!) : loginResponse!

    addTodo( title: String!, description: String!) : returnMessage!
    editTodo( id: Int!, title: String!, description: String!) : returnMessage!
    deleteTodo( id: Int!) : returnMessage!
}
`;