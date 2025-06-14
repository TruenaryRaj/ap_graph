import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type user {
    id: Int
    email: String
    password: String
  }

  type Query{
    getUser: [user!]!
  }

  type Mutation{
    addUser( email: String!, password: String!) : String
    editUser( id: Int!, email: String!, password: String!) : String
    deleteUser( id: Int!) : String

}
`;
