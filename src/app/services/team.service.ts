import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_team_by_name,
  mutation_create_team,
  mutation_update_team,
  mutation_delete_team,
} from '../graphql/teams.operations';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private _teamsSet: BehaviorSubject<Team[]>;

  private dataStore: {
    teamsSet: Team[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { teamsSet: [] };
    this._teamsSet = new BehaviorSubject<Team[]>([]);
  }

  get teamsSet(): Observable<Team[]> {
    return this._teamsSet.asObservable();
  }

  updateTeam(team: Team): Promise<Team> {
    const updateTeamInput = {
      teamId: team.teamId,
      name: team.name,
      schoolId: team.schoolId,
      disciplineId: team.disciplineId,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_update_team,
          variables: { updateTeamInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.updateTeam as Team);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getTeamByName(nameStr: string): Promise<Team> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_team_by_name,
          variables: { nameStr },
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.teamByName) {
            reject('Team not found');
          }
          resolver(result.data.teamByName);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  createNewTeam(team: Team):Promise<Team> {
    const createTeamInput = {
      name: team.name,
      schoolId: team.schoolId,
      disciplineId: team.disciplineId,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_create_team,
          variables: { createTeamInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.createTeam);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  deleteTeam(TeamIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_team,
        variables: { TeamIdStr },
      })
        .subscribe((result: any) => {
          resolver(result.data.removeDiscipline);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
    ;
  }
}