import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesDoctorComponent } from './cases-doctor.component';

describe('CasesDoctorComponent', () => {
  let component: CasesDoctorComponent;
  let fixture: ComponentFixture<CasesDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
