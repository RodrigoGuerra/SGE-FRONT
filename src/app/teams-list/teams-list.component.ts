import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import { AddTeamsDialogComponent } from '../add-teams-dialog/add-teams-dialog.component'
import { EditTeamsDialogComponent } from '../edit-teams-dialog/edit-teams-dialog.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit {
  @Input() teamsData?: Observable<Team[]>;
  team?: Team;
  constructor(
    private teamservice: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.teamsData = this.teamservice.teamsSet;
    this.teamservice.getListTeams();
    this.teamsData.subscribe((data) => {
      console.log(data);
    });
  }

  __cardClick(team: Team) {
    console.log(team);
    this.router.navigate(['teams', team.teamId]);
  }

  openTeamDialog(
    index: number,
    {
      teamId,
      name,
      disciplineId,
      schoolId,
      createdAt,
    }: Team
  ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      teamId,
      name,
      disciplineId,
      schoolId,
      createdAt,
    };
    const dialogRef = this.dialog.open(EditTeamsDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((val) => {console.log('Dialog output:', val); this.ngOnInit()});

  }

  openAddTeamDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {  userRelated:""};
    const dialogRef = this.dialog.open(AddTeamsDialogComponent, dialogConfig);
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
    this.teamservice.deleteTeam(id).then(()=>{ this.ngOnInit()});
  }
  
}