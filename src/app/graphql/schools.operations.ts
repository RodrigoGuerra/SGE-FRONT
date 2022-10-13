import gql from 'graphql-tag';

export const query_get_school_by_name = gql` query ($nameStr:String!) {
    schoolByName(name: $nameStr) {
        schoolId
        name
        managerId
        createdAt
        updatedAt
    }
}`;

export const mutation_create_school = gql` mutation ($createSchoolInput:CreateSchoolInput!) {
    createSchool(
      createSchoolInput: $createSchoolInput
    ){
        schoolId
        name
        managerId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_update_school = gql` mutation ($updateSchoolInput:UpdateSchoolInput!) {
    updateSchool(
      updateSchoolInput: $updateSchoolInput
    ){
        schoolId
        name
        managerId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_delete_school = gql` mutation($SchoolIdStr: String!) {
    removeSchool(SchoolId: $SchoolIdStr)
  }`;