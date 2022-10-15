import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { MainComponent } from './main/main.component';
import { SchoolsComponent } from './schools/schools.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { RegistrationScreenComponent } from './registration-screen/registration-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/main/schools', pathMatch: 'full' },
  { path: 'registration', component: RegistrationScreenComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'schools',
        component: SchoolsComponent,
      },
      { 
        path: 'disciplines',
       component: DisciplinesComponent
      },
      // {
      //   path: 'employees',
      //   component: EmployeeListComponent
      // },
      {
        path: '',
        redirectTo: 'schools',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  { path: '**', redirectTo: '/main/schools' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }