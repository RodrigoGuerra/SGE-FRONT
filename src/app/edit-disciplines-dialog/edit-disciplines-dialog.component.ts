import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Discipline } from '../models/discipline';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisciplineService } from '../services/discipline.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-discipline-dialog',
  templateUrl: './edit-disciplines-dialog.component.html',
  styleUrls: ['./edit-disciplines-dialog.component.scss'],
})
export class EditDisciplinesDialogComponent implements OnInit {
  @ViewChild('disciplineId', { static: true }) disciplineIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  createdAtFormated = '';
  encarregado=''
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDisciplinesDialogComponent>,
    private disciplineService: DisciplineService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA)
    {
      disciplineId,
      name,
      createdAt,
    }: Discipline
  ) {
    this.form = fb.group({
      disciplineId: [disciplineId],
      name: [name],
      createdAt: [createdAt],
    });
    this.createdAtFormated = new Date(parseInt(createdAt, 10)).toLocaleString();
    this.name = name;
  }

  ngOnInit() {
    
    this.disciplineService
    .getDisciplineByName(this.sessionService.getUserIdSession())
    // .then(res=>{this.usersOptions=[...res]}).catch(err=>{
    //   console.log("Error on get users")
    // });
    console.log('EditDisciplineDialogComponent');
  }

  onEdit() {
    this.disciplineService
      .updateDiscipline(this.form.value)
      .then((school) => {
        this.dialogRef.close(school);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}