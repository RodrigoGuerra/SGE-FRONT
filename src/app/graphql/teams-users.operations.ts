import gql from 'graphql-tag';

export const query_get_all_teams_users = gql` query {
  listTeamsUsers {
      teamsUsersId
      teamId
      userId
      createdAt
      updatedAt
  }
}`;

export const mutation_create_teams_users = gql` mutation ($createTeamsUsersInput:CreateTeamsUsersInput!) {
    createTeamsUsers(
      createTeamsUsersInput: $createTeamsUsersInput
    ){
      teamsUsersId
      teamId
      userId
      createdAt
      updatedAt
    }
  }
`;

export const mutation_delete_teams_users = gql` mutation($TeamsUsersIdStr: String!) {
    removeTeam(TeamId: $TeamIdStr)
  }`;