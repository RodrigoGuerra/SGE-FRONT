import { Injectable } from '@angular/core';
import { School } from '../models/school';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_school_by_name,
  mutation_create_school,
  mutation_update_school,
  mutation_delete_school,
} from '../graphql/schools.operations';

@Injectable({
  providedIn: 'root',
})
export class schoolService {
  private _schoolsSet: BehaviorSubject<School[]>;

  private dataStore: {
    schoolsSet: School[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { schoolsSet: [] };
    this._schoolsSet = new BehaviorSubject<School[]>([]);
  }

  get schoolsSet(): Observable<School[]> {
    return this._schoolsSet.asObservable();
  }

  updateSchool(school: School): Promise<School> {
    const updateSchoolInput = {
      schoolId: school.schoolId,
      name: school.name,
      managerId: school.managerId,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_update_school,
          variables: { updateSchoolInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.updateSchool as School);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getSchoolBySchool(nameStr: string): Promise<School> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_school_by_name,
          variables: { nameStr },
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.schoolByName) {
            reject('School not found');
          }
          resolver(result.data.schoolByName);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  createNewSchool(school: School):Promise<School> {
    const createSchoolInput = {
      name: school.name,
      managerId: school.managerId,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_create_school,
          variables: { createSchoolInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.createSchool);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  deleteSchool(SchoolIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_school,
        variables: { SchoolIdStr },
      })
        .subscribe((result: any) => {
          resolver(result.data.removeSchool);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
    ;
  }
}