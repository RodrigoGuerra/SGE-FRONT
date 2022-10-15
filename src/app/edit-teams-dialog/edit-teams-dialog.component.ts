import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Team } from '../models/team';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../services/team.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-teams-dialog.component.html',
  styleUrls: ['./edit-teams-dialog.component.scss'],
})
export class EditTeamsDialogComponent implements OnInit {
  @ViewChild('teamId', { static: true }) teamIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  createdAtFormated = '';
  encarregado=''
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTeamsDialogComponent>,
    private teamService: TeamService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA)
    {
      teamId,
      name,
      disciplineId,
      schoolId,
      createdAt,
    }: Team
  ) {
    this.form = fb.group({
      teamId: [teamId],
      name: [name],
      disciplineId: [disciplineId],
      schoolId: [schoolId],
      createdAt: [createdAt],
    });
    this.createdAtFormated = new Date(parseInt(createdAt, 10)).toLocaleString();
    this.name = name;
  }

  ngOnInit() {
    
    this.teamService
    .getListTeams()
    // .then(res=>{this.usersOptions=[...res]}).catch(err=>{
    //   console.log("Error on get users")
    // });
    console.log('EditTeamDialogComponent');
  }

  onEdit() {
    this.teamService
      .updateTeam(this.form.value)
      .then((team) => {
        this.dialogRef.close(team);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}