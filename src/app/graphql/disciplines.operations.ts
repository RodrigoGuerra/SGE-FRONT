import gql from 'graphql-tag';

export const query_get_discipline_by_name = gql` query ($nameStr:String!) {
    disciplineByName(name: $emailStr) {
        disciplineId
        name
        createdAt
        updatedAt
    }
}`;

export const mutation_create_discipline = gql` mutation ($createDisciplineInput:CreateDisciplineInput!) {
    createDiscipline(
      createDisciplineInput: $createDisciplineInput
    ){
        disciplineId
        name
        createdAt
        updatedAt
    }
  }
`;

export const mutation_update_discipline = gql` mutation ($updateDisciplineInput:UpdateDisciplineInput!) {
    updateDiscipline(
      updateDisciplineInput: $updateDisciplineInput
    ){
        disciplineId
        name
        createdAt
        updatedAt
    }
  }
`;

export const mutation_delete_discipline = gql` mutation($DisciplineIdStr: String!) {
    removeDiscipline(DisciplineId: $DisciplineIdStr)
  }`;