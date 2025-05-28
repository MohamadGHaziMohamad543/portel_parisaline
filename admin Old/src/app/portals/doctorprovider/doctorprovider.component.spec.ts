import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorproviderComponent } from './doctorprovider.component';

describe('DoctorproviderComponent', () => {
  let component: DoctorproviderComponent;
  let fixture: ComponentFixture<DoctorproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
