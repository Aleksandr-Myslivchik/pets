import { gql } from '@apollo/client'

const userFragment = gql`
  fragment userWithNoAge on User {
      id,username,posts {
        title, content
      }
  }
`

export const getUsers = gql`
  fragment userWithNoAge on User {
      id,username,posts {
        title, content
      }
  }
  query {
    getAllUsers {
      ...userWithNoAge
    }
  }
`

export const getUserById = gql`
  query getUser($id: ID) {
      getUser(id: $id) {
        id, username, age
      }
    }
  
`

