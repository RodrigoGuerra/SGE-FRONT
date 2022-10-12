import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_user_by_email,
  mutation_create_user,
  mutation_update_user,
  mutation_delete_user,
} from '../graphql/users.operations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usersSet: BehaviorSubject<User[]>;

  private dataStore: {
    usersSet: User[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { usersSet: [] };
    this._usersSet = new BehaviorSubject<User[]>([]);
  }

  get usersSet(): Observable<User[]> {
    return this._usersSet.asObservable();
  }

  updateUser(user: User): Promise<User> {
    const updateUserInput = {
      userId: user.userId,
      email: user.email,
      name: user.name,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_update_user,
          variables: { updateUserInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.updateUser as User);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getUserByEmail(emailStr: string): Promise<User> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_user_by_email,
          variables: { emailStr },
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.userByEmail) {
            reject('User not found');
          }
          resolver(result.data.userByEmail);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  createNewUser(user: User):Promise<User> {
    const createUserInput = {
      email: user.email,
      name: user.name,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_create_user,
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

  deleteUser(UserIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_user,
        variables: { UserIdStr },
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