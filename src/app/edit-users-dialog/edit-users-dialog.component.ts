import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { User } from '../models/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-users-dialog.component.html',
  styleUrls: ['./edit-users-dialog.component.scss'],
})
export class EditUsersDialogComponent implements OnInit {
  @ViewChild('userId', { static: true }) userIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  createdAtFormated = '';
  encarregado=''
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUsersDialogComponent>,
    private userService: UserService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA)
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
    this.form = fb.group({
      userId: [userId],
      name: [name],
      email: [email],
      phone: [phone],
      age: [Number(age)],
      roleId: [Number(roleId)],
      createdAt: [createdAt],
    });
    this.createdAtFormated = new Date(parseInt(createdAt, 10)).toLocaleString();
    this.name = name;
  }

  ngOnInit() {
    
    this.userService
    .getListUsers()
    // .then(res=>{this.usersOptions=[...res]}).catch(err=>{
    //   console.log("Error on get users")
    // });
    console.log('EditUserDialogComponent');
  }

  onEdit() {
    this.userService
      .updateUser(this.form.value)
      .then((user) => {
        this.dialogRef.close(user);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}