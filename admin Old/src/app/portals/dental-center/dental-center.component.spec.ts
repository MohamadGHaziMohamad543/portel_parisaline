import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalCenterComponent } from './dental-center.component';

describe('DentalCenterComponent', () => {
  let component: DentalCenterComponent;
  let fixture: ComponentFixture<DentalCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentalCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
