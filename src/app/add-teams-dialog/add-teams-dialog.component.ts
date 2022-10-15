import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Team } from '../models/team';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamService } from '../services/team.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-teams-dialog.component.html',
  styleUrls: ['./add-teams-dialog.component.scss']
})
export class AddTeamsDialogComponent implements OnInit {

  @ViewChild('teamId', { static: true }) teamIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTeamsDialogComponent>,
    private teamService: TeamService,
    private sessionService : SessionService
  ) {
    this.form = fb.group({
      name: [""],
      schoolId: [""],
      disciplineId: [""],
    });
  }

  ngOnInit() {
    console.log('AddDisciplineDialogComponent');
  }

  onEdit() {
    this.teamService
     .createNewTeam(this.form.value)
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}