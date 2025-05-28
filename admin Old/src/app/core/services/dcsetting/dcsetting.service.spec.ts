import { TestBed } from '@angular/core/testing';

import { DcsettingService } from './dcsetting.service';

describe('DcsettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DcsettingService = TestBed.get(DcsettingService);
    expect(service).toBeTruthy();
  });
});
