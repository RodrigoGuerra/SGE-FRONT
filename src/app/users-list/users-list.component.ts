import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import { AddUsersDialogComponent } from '../add-users-dialog/add-users-dialog.component'
import { EditUsersDialogComponent } from '../edit-users-dialog/edit-users-dialog.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input() usersData?: Observable<User[]>;
  user?: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.usersData = this.userService.usersSet;
    this.userService.getListUsers();
    this.usersData.subscribe((data) => {
      console.log(data);
    });
  }

  __cardClick(user: User) {
    console.log(user);
    this.router.navigate(['users', user.userId]);
  }

  openUserDialog(
    index: number,
    {
      userId,
      name,
      email,
      phone,
      age,
      roleId,
      createdAt,
    }: User
  ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      userId,
      name,
      email,
      phone,
      age,
      roleId,
      createdAt,
    };
    const dialogRef = this.dialog.open(EditUsersDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((val) => {console.log('Dialog output:', val); this.ngOnInit()});

  }

  openAddUserDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {  userRelated:""};
    const dialogRef = this.dialog.open(AddUsersDialogComponent, dialogConfig);
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
    this.userService.deleteUser(id).then(()=>{ this.ngOnInit()});
  }
  
}