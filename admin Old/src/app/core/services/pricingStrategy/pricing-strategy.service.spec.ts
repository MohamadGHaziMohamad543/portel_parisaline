import { TestBed } from '@angular/core/testing';

import { PricingStrategyService } from './pricing-strategy.service';

describe('PricingStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricingStrategyService = TestBed.get(PricingStrategyService);
    expect(service).toBeTruthy();
  });
});
