import { TestBed } from '@angular/core/testing';

import { PaymentAddressService } from './payment-address.service';

describe('PaymentAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentAddressService = TestBed.get(PaymentAddressService);
    expect(service).toBeTruthy();
  });
});
