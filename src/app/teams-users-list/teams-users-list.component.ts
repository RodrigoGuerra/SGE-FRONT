import { Component, Input, OnInit } from '@angular/core';
import { TeamsUsersService } from '../services/teams-users.service';
import { Observable } from 'rxjs';
import { TeamsUsers } from '../models/teams-users';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import { AddTeamsUsersDialogComponent } from '../add-teams-users-dialog/add-teams-users-dialog.component'
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-teams-users-list',
  templateUrl: './teams-users-list.component.html',
  styleUrls: ['./teams-users-list.component.scss'],
})
export class TeamsUsersListComponent implements OnInit {
  @Input() teamsUsersData?: Observable<TeamsUsers[]>;
  teamsUser?: TeamsUsers;
  constructor(
    private teamsUsersService: TeamsUsersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.teamsUsersData = this.teamsUsersService.teamsUsersSet;
    this.teamsUsersService.getListTeamsUsers();
    this.teamsUsersData.subscribe((data) => {
      console.log(data);
    });
  }

  __cardClick(teamsUsers: TeamsUsers) {
    console.log(teamsUsers);
    this.router.navigate(['teamsUsers', teamsUsers.teamsUsersId]);
  }

  openAddTeamsUsersDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {  userRelated:""};
    const dialogRef = this.dialog.open(AddTeamsUsersDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((val) => {console.log('Dialog output:', val); this.ngOnInit()});
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteItem(id: string) {
    this.teamsUsersService.deleteUser(id).then(()=>{ this.ngOnInit()});
  }
  
}