import { Injectable } from '@angular/core';
import { School } from '../models/school';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_school_by_name,
  query_get_schools_by_manager,
  mutation_create_school,
  mutation_update_school,
  mutation_delete_school,
} from '../graphql/schools.operations';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
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

  updateSchool(school: School, userRelatedStr: string): Promise<School> {
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
          variables: { updateSchoolInput, userRelatedStr},
        })
        .subscribe((result: any) => {
          resolver(result.data.updateSchool as School);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getSchoolByName(nameStr: string): Promise<School> {
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

  getSchoolsByManager(managerUserIdStr: String) {
    return (
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_schools_by_manager,
          variables: { managerUserIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          console.log('Result');
          console.log(result.data);
          this.dataStore.schoolsSet = result.data.schoolsByManager;
          this._schoolsSet.next(this.dataStore.schoolsSet);
        }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  createNewSchool(school: School,userRelatedStr: string):Promise<School> {
    const createSchoolInput = {
      name: school.name,
      managerId: userRelatedStr,
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

  deleteSchool(schoolIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_school,
        variables: { schoolIdStr },
      })
        .subscribe((result: any) => {
          resolver(result.data.createSchool);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
    ;
  }
}