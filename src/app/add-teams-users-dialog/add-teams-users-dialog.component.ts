import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TeamsUsers } from '../models/teams-users';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamsUsersService } from '../services/teams-users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-teams-users-dialog',
  templateUrl: './add-teams-users-dialog.component.html',
  styleUrls: ['./add-teams-users-dialog.component.scss']
})
export class AddTeamsUsersDialogComponent implements OnInit {

  @ViewChild('teamsUsersId', { static: true }) teamsUsersIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTeamsUsersDialogComponent>,
    private teamsUsersService: TeamsUsersService,
    private sessionService : SessionService
  ) {
    this.form = fb.group({
      teamId: [""],
      userId: [""],
    });
  }

  ngOnInit() {
    console.log('AddTeamsUsersDialogComponent');
  }

  onEdit() {
    this.teamsUsersService
     .createTeamsNewUsers(this.form.value)
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}