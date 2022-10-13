import gql from 'graphql-tag';

export const query_get_person_by_email = gql` query ($emailStr:String!) {
    personByEmail(email: $emailStr) {
        personId
        email
        phone
        name
        age
        status
        userId
        disciplineId
        createdAt
        updatedAt
    }
}`;

export const mutation_create_person = gql` mutation ($createPersonInput:CreatePersonInput!) {
    createPerson(
      createPersonInput: $createPersonInput
    ){
        personId
        email
        phone
        name
        age
        status
        userId
        disciplineId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_update_person = gql` mutation ($updatePersonInput:UpdatePersonInput!) {
    updatePerson(
      updatePersonInput: $updatePersonInput
    ){
        personId
        email
        phone
        name
        age
        status
        userId
        disciplineId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_delete_person = gql` mutation($PersonIdStr: String!) {
    removePerson(PersonId: $PersonIdStr)
  }`;