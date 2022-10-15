import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { User } from '../models/user';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-users-dialog.component.html',
  styleUrls: ['./add-users-dialog.component.scss']
})
export class AddUsersDialogComponent implements OnInit {

  @ViewChild('userId', { static: true }) userIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUsersDialogComponent>,
    private userService: UserService,
    private sessionService : SessionService
  ) {
    this.form = fb.group({
      name: [""],
      email: [""],
      phone: [""],
      age: 0,
      roleId: [""],
    });
  }

  ngOnInit() {
    console.log('AddUserDialogComponent');
  }

  onEdit() {
    const {name,email,phone,age,roleId} = this.form.value
    const user: User ={
      email:email,
      name:name,
      phone:phone,
      age:Number(age),
      userId:"",
      createdAt: (new Date()).toLocaleString(),
      roleId:Number(roleId)
    }
    this.userService
     .createNewUser(user)
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}