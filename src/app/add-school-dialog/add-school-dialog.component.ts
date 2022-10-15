import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { School } from '../models/school';
import { MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../services/school.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-school-dialog',
  templateUrl: './add-school-dialog.component.html',
  styleUrls: ['./add-school-dialog.component.scss']
})
export class AddSchoolDialogComponent implements OnInit {

  @ViewChild('schoolId', { static: true }) schoolIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSchoolDialogComponent>,
    private schoolService: SchoolService,
    private sessionService : SessionService
  ) {
    this.form = fb.group({
      name: [""],
    });
  }

  ngOnInit() {
    console.log('AddSchoolDialogComponent');
  }

  onEdit() {
    this.schoolService
     .createNewSchool(this.form.value,this.sessionService.getUserIdSession())
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}