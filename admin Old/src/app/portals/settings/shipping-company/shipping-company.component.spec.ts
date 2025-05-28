import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCompanyComponent } from './shipping-company.component';

describe('ShippingCompanyComponent', () => {
  let component: ShippingCompanyComponent;
  let fixture: ComponentFixture<ShippingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
