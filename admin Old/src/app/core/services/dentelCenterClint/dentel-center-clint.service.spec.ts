import { TestBed } from '@angular/core/testing';

import { DentelCenterClintService } from './dentel-center-clint.service';

describe('DentelCenterClintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DentelCenterClintService = TestBed.get(DentelCenterClintService);
    expect(service).toBeTruthy();
  });
});
