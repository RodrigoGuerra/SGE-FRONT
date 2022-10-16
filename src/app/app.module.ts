import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { GraphQLModule } from './graphql/graphql.module';
import {RegistrationScreenComponent} from './registration-screen/registration-screen.component';
import { SchoolsComponent } from './schools/schools.component';
import { TeamComponent } from './team/team.component';
import { SchoolListComponent } from './schools-list/schools-list.component';
import { AddSchoolDialogComponent } from './add-school-dialog/add-school-dialog.component';
import { EditSchoolDialogComponent } from './edit-school-dialog/edit-school-dialog.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { AddDisciplinesDialogComponent } from './add-disciplines-dialog/add-disciplines-dialog.component';
import { EditDisciplinesDialogComponent } from './edit-disciplines-dialog/edit-disciplines-dialog.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { AddTeamsDialogComponent } from './add-teams-dialog/add-teams-dialog.component';
import { EditTeamsDialogComponent } from './edit-teams-dialog/edit-teams-dialog.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUsersDialogComponent } from './add-users-dialog/add-users-dialog.component';
import { EditUsersDialogComponent } from './edit-users-dialog/edit-users-dialog.component';
import { UsersComponent } from './user/user.component';
import { TeamsUsersListComponent } from './teams-users-list/teams-users-list.component';
import { AddTeamsUsersDialogComponent } from './add-teams-users-dialog/add-teams-users-dialog.component';
import { TeamsUsersComponent } from './teams-users/teams-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    MainComponent,
    RegistrationScreenComponent,
    SchoolsComponent,
    TeamComponent,
    SchoolListComponent,
    AddSchoolDialogComponent,
    EditSchoolDialogComponent,
    DisciplinesComponent,
    DisciplinesListComponent,
    AddDisciplinesDialogComponent,
    EditDisciplinesDialogComponent,
    TeamsListComponent,
    AddTeamsDialogComponent,
    EditTeamsDialogComponent,
    UsersListComponent,
    AddUsersDialogComponent,
    EditUsersDialogComponent,
    UsersComponent,
    TeamsUsersListComponent,
    AddTeamsUsersDialogComponent,
    TeamsUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.google_client_id),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}