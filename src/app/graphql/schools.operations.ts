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

export const mutation_delete_school = gql` mutation($schoolId: String!) {
    removeSchool(schoolId: $schoolId)
  }`;

export const query_get_schools_by_manager = gql` query ($managerUserIdStr:String!) {
  schoolsByManager(managerUserId: $managerUserIdStr) {
      schoolId
      name
      managerId
      createdAt
      updatedAt
  }
}`;