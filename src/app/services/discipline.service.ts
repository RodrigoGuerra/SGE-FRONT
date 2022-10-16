import { Injectable } from '@angular/core';
import { Discipline } from '../models/discipline';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_discipline_by_name,
  query_get_all_disciplines,
  mutation_create_discipline,
  mutation_update_discipline,
  mutation_delete_discipline,
} from '../graphql/disciplines.operations';

@Injectable({
  providedIn: 'root',
})
export class DisciplineService {
  private _disciplinesSet: BehaviorSubject<Discipline[]>;

  private dataStore: {
    disciplinesSet: Discipline[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { disciplinesSet: [] };
    this._disciplinesSet = new BehaviorSubject<Discipline[]>([]);
  }

  get disciplinesSet(): Observable<Discipline[]> {
    return this._disciplinesSet.asObservable();
  }

  updateDiscipline(discipline: Discipline): Promise<Discipline> {
    const updateDisciplineInput = {
      disciplineId: discipline.disciplineId,
      name: discipline.name,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_update_discipline,
          variables: { updateDisciplineInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.updateDiscipline as Discipline);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getDisciplineByName(nameStr: string): Promise<Discipline> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_discipline_by_name,
          variables: { nameStr },
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.disciplineByName) {
            reject('Discipline not found');
          }
          resolver(result.data.disciplineByName);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getListDisciplines(): Promise<Discipline> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_all_disciplines,
          variables: {},
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.listDisciplines) {
            reject('Discipline not found');
          }
          //resolver(result.data.listDisciplines);
          this.dataStore.disciplinesSet = result.data.listDisciplines;
          this._disciplinesSet.next(this.dataStore.disciplinesSet);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  createNewDiscipline(discipline: Discipline):Promise<Discipline> {
    const createDisciplineInput = {
      name: discipline.name,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_create_discipline,
          variables: { createDisciplineInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.createDiscipline);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  deleteDiscipline(DisciplineIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_discipline,
        variables: { DisciplineIdStr },
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