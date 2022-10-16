import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsUsersComponent } from './teams-users.component';

describe('TeamsUsersComponent', () => {
  let component: TeamsUsersComponent;
  let fixture: ComponentFixture<TeamsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
