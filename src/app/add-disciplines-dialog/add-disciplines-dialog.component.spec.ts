import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisciplinesDialogComponent } from './add-disciplines-dialog.component';

describe('AddDisciplinesDialogComponent', () => {
  let component: AddDisciplinesDialogComponent;
  let fixture: ComponentFixture<AddDisciplinesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDisciplinesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisciplinesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
