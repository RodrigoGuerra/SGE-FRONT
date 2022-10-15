import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { School } from '../models/school';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchoolService } from '../services/school.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-school-dialog',
  templateUrl: './edit-school-dialog.component.html',
  styleUrls: ['./edit-school-dialog.component.scss'],
})
export class EditSchoolDialogComponent implements OnInit {
  @ViewChild('schoolId', { static: true }) schoolIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  createdAtFormated = '';
  encarregado=''
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditSchoolDialogComponent>,
    private schoolService: SchoolService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA)
    {
      schoolId,
      name,
      createdAt,
    }: School
  ) {
    this.form = fb.group({
      schoolId: [schoolId],
      name: [name],
      createdAt: [createdAt],
    });
    this.createdAtFormated = new Date(parseInt(createdAt, 10)).toLocaleString();
    this.name = name;
  }

  ngOnInit() {
    
    this.schoolService
    .getSchoolsByManager(this.sessionService.getUserIdSession())
    // .then(res=>{this.usersOptions=[...res]}).catch(err=>{
    //   console.log("Error on get users")
    // });
    console.log('EditSchoolDialogComponent');
  }

  onEdit() {
    this.schoolService
      .updateSchool(this.form.value,this.encarregado)
      .then((school) => {
        this.dialogRef.close(school);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}