import { Component, Input, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { Observable } from 'rxjs';
import { School } from '../models/school';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import {AddSchoolDialogComponent} from '../add-school-dialog/add-school-dialog.component'
import { EditSchoolDialogComponent } from '../edit-school-dialog/edit-school-dialog.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.scss'],
})
export class SchoolListComponent implements OnInit {
  @Input() schoolsData?: Observable<School[]>;
  school?: School;
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.schoolsData = this.schoolService.schoolsSet;
    this.schoolService.getSchoolsByManager(this.sessionService.getUserIdSession());
    this.schoolsData.subscribe((data) => {
      console.log(data);
    });
  }

  __cardClick(school: School) {
    console.log(school);
    this.router.navigate(['schools', school.schoolId]);
  }

  openSchoolDialog(
    index: number,
    {
      schoolId,
      name,
      createdAt,
    }: School
  ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      schoolId,
      name,
      createdAt,
    };
    const dialogRef = this.dialog.open(EditSchoolDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((val) => {console.log('Dialog output:', val); this.ngOnInit()});

  }

  openAddSchoolDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {  userRelated:""};
    const dialogRef = this.dialog.open(AddSchoolDialogComponent, dialogConfig);
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
    this.schoolService.deleteSchool(id).then(()=>{ this.ngOnInit()});
  }
  
}