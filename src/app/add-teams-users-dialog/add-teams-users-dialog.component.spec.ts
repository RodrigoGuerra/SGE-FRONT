import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamsUsersDialogComponent } from './add-teams-users-dialog.component';

describe('AddTeamsUsersDialogComponent', () => {
  let component: AddTeamsUsersDialogComponent;
  let fixture: ComponentFixture<AddTeamsUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamsUsersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamsUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
