import gql from 'graphql-tag';

export const query_get_user_by_email = gql` query ($emailStr:String!) {
    userByEmail(email: $emailStr) {
        userId
        email
        name
        roleId
        createdAt
        updatedAt
    }
}`;

export const mutation_create_user = gql` mutation ($createUserInput:CreateUserInput!) {
    createUser(
      createUserInput: $createUserInput
    ){
        userId
        email
        name
        roleId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_update_user = gql` mutation ($updateUserInput:UpdateUserInput!) {
    updateUser(
      updateUserInput: $updateUserInput
    ){
        userId
        email
        name
        roleId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_delete_user = gql` mutation($UserIdStr: String!) {
    removeUser(userId: $UserIdStr)
  }`;