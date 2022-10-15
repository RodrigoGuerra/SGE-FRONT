import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamsDialogComponent } from './edit-teams-dialog.component';

describe('EditTeamsDialogComponent', () => {
  let component: EditTeamsDialogComponent;
  let fixture: ComponentFixture<EditTeamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
