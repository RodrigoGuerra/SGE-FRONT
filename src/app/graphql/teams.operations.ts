import gql from 'graphql-tag';

export const query_get_team_by_name = gql` query ($nameStr:String!) {
    teamByName(name: $emailStr) {
        teamId
        name
        schoolId
        disciplineId
        createdAt
        updatedAt
    }
}`;

export const query_get_all_teams = gql` query {
  listTeams {
      teamId
      name
      schoolId
      disciplineId
      createdAt
      updatedAt
  }
}`;

export const mutation_create_team = gql` mutation ($createTeamInput:CreateTeamInput!) {
    createTeam(
      createTeamInput: $createTeamInput
    ){
        teamId
        name
        schoolId
        disciplineId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_update_team = gql` mutation ($updateTeamInput:UpdateTeamInput!) {
    updateTeam(
      updateTeamInput: $updateTeamInput
    ){
        teamId
        name
        schoolId
        disciplineId
        createdAt
        updatedAt
    }
  }
`;

export const mutation_delete_team = gql` mutation($TeamIdStr: String!) {
    removeTeam(TeamId: $TeamIdStr)
  }`;