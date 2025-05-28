import { TestBed } from '@angular/core/testing';

import { DentalCenterService } from './dental-center.service';

describe('DentalCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DentalCenterService = TestBed.get(DentalCenterService);
    expect(service).toBeTruthy();
  });
});
