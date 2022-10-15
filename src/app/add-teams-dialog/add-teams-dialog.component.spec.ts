import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamsDialogComponent } from './add-teams-dialog.component';

describe('AddTeamsDialogComponent', () => {
  let component: AddTeamsDialogComponent;
  let fixture: ComponentFixture<AddTeamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
