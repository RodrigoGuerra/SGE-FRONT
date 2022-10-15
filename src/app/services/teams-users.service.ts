import { Injectable } from '@angular/core';
import { TeamsUsers } from '../models/teams-users';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_all_teams_users,
  mutation_create_teams_users,
  mutation_delete_teams_users,
} from '../graphql/teams-users.operations';

@Injectable({
  providedIn: 'root',
})
export class TeamsUsersService {
  private _teamsUsersSet: BehaviorSubject<TeamsUsers[]>;

  private dataStore: {
    teamsUsersSet: TeamsUsers[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { teamsUsersSet: [] };
    this._teamsUsersSet = new BehaviorSubject<TeamsUsers[]>([]);
  }

  get teamsUsersSet(): Observable<TeamsUsers[]> {
    return this._teamsUsersSet.asObservable();
  }

  getListTeamsUsers(): Promise<TeamsUsers> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_all_teams_users,
          variables: {},
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.listTeamsUsers) {
            reject('Team not found');
          }
          resolver(result.data.listTeamsUsers);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }
  
  createNewUser(user: TeamsUsers):Promise<TeamsUsers> {
    const createUserInput = {
      teamId: user.teamId,
      userId: user.userId,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_create_teams_users,
          variables: { createUserInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.createUser);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  deleteUser(TeamsUsersIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_teams_users,
        variables: { TeamsUsersIdStr },
      })
        .subscribe((result: any) => {
          resolver(result.data.removeUser);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
    ;
  }
}