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

  type Query{
    getTodo: [todo!]!
  }

  type Mutation{
    addUser( email: String!, password: String!) : String
    editUser( id: Int!, password: String!) : String
    deleteUser( id: Int!) : String
    loginUser(email: String!, password: String!) : String

    addTodo( title: String!, description: String!) : String
    editTodo( id: Int!, title: String!, description: String!) : String
    deleteTodo( id: Int!) : String
}
`;
