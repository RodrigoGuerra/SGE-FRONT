import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsUsersListComponent } from './teams-users-list.component';

describe('TeamsUsersListComponent', () => {
  let component: TeamsUsersListComponent;
  let fixture: ComponentFixture<TeamsUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsUsersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
