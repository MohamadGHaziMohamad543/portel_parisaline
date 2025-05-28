import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingStrategyComponent } from './pricing-strategy.component';

describe('PricingStrategyComponent', () => {
  let component: PricingStrategyComponent;
  let fixture: ComponentFixture<PricingStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
