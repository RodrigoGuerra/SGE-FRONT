import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisciplinesDialogComponent } from './edit-disciplines-dialog.component';

describe('EditDisciplinesDialogComponent', () => {
  let component: EditDisciplinesDialogComponent;
  let fixture: ComponentFixture<EditDisciplinesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisciplinesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDisciplinesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
