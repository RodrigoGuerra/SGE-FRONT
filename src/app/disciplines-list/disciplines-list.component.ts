import { Component, Input, OnInit } from '@angular/core';
import { DisciplineService } from '../services/discipline.service';
import { Observable } from 'rxjs';
import { Discipline } from '../models/discipline';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import { AddDisciplinesDialogComponent } from '../add-disciplines-dialog/add-disciplines-dialog.component'
import { EditDisciplinesDialogComponent } from '../edit-disciplines-dialog/edit-disciplines-dialog.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.scss'],
})
export class DisciplinesListComponent implements OnInit {
  @Input() disciplinesData?: Observable<Discipline[]>;
  discipline?: Discipline;
  constructor(
    private disciplineService: DisciplineService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.disciplinesData = this.disciplineService.disciplinesSet;
    this.disciplineService.getAllDisciplines();
    this.disciplinesData.subscribe((data) => {
      console.log(data);
    });
  }

  __cardClick(discipline: Discipline) {
    console.log(discipline);
    this.router.navigate(['schools', discipline.disciplineId]);
  }

  openDisciplineDialog(
    index: number,
    {
      disciplineId,
      name,
      createdAt,
    }: Discipline
  ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      disciplineId,
      name,
      createdAt,
    };
    const dialogRef = this.dialog.open(EditDisciplinesDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((val) => {console.log('Dialog output:', val); this.ngOnInit()});

  }

  openAddDisciplineDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {  userRelated:""};
    const dialogRef = this.dialog.open(AddDisciplinesDialogComponent, dialogConfig);
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
    this.disciplineService.deleteDiscipline(id).then(()=>{ this.ngOnInit()});
  }
  
}