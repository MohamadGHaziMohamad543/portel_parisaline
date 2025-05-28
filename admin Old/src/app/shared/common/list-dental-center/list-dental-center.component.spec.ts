import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDentalCenterComponent } from './list-dental-center.component';

describe('ListDentalCenterComponent', () => {
  let component: ListDentalCenterComponent;
  let fixture: ComponentFixture<ListDentalCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDentalCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDentalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
