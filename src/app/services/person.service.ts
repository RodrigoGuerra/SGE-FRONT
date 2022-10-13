import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  query_get_person_by_email,
  mutation_create_person,
  mutation_update_person,
  mutation_delete_person,
} from '../graphql/persons.operations';

@Injectable({
  providedIn: 'root',
})
export class personService {
  private _personsSet: BehaviorSubject<Person[]>;

  private dataStore: {
    personsSet: Person[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { personsSet: [] };
    this._personsSet = new BehaviorSubject<Person[]>([]);
  }

  get personsSet(): Observable<Person[]> {
    return this._personsSet.asObservable();
  }

  updatePerson(person: Person): Promise<Person> {
    const updatePersonInput = {
      personId: person.personId,
      email: person.email,
      phone: person.phone,
      name: person.name,
      age: person.age,
      status: person.status,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_update_person,
          variables: { updatePersonInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.updatePerson as Person);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getPersonByEmail(emailStr: string): Promise<Person> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_person_by_email,
          variables: { emailStr },
        })
        .valueChanges.subscribe((result: any) => {
          if (!result.data.personByEmail) {
            reject('Person not found');
          }
          resolver(result.data.personByEmail);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  createNewPerson(person: Person):Promise<Person> {
    const createPersonInput = {
        email: person.email,
        phone: person.phone,
        name: person.name,
        age: person.age,
        status: person.status,
    };
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation: mutation_create_person,
          variables: { createPersonInput },
        })
        .subscribe((result: any) => {
          resolver(result.data.createPerson);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  deletePerson(PersonIdStr: string):Promise<any> {
    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_person,
        variables: { PersonIdStr },
      })
        .subscribe((result: any) => {
          resolver(result.data.removePerson);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
    ;
  }
}