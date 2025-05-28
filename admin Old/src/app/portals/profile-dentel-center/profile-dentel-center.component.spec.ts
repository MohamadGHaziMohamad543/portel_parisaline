import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDentelCenterComponent } from './profile-dentel-center.component';

describe('ProfileDentelCenterComponent', () => {
  let component: ProfileDentelCenterComponent;
  let fixture: ComponentFixture<ProfileDentelCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDentelCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDentelCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
