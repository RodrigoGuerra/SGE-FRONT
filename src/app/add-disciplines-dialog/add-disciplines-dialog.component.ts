import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Discipline } from '../models/discipline';
import { MatDialogRef } from '@angular/material/dialog';
import { DisciplineService } from '../services/discipline.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-discipline-dialog',
  templateUrl: './add-disciplines-dialog.component.html',
  styleUrls: ['./add-disciplines-dialog.component.scss']
})
export class AddDisciplinesDialogComponent implements OnInit {

  @ViewChild('disciplineId', { static: true }) schoolIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDisciplinesDialogComponent>,
    private disciplineService: DisciplineService,
    private sessionService : SessionService
  ) {
    this.form = fb.group({
      name: [""],
    });
  }

  ngOnInit() {
    console.log('AddDisciplineDialogComponent');
  }

  onEdit() {
    this.disciplineService
     .createNewDiscipline(this.form.value)
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}