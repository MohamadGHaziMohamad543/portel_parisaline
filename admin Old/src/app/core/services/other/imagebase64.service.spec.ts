import { TestBed } from '@angular/core/testing';

import { Imagebase64Service } from './imagebase64.service';

describe('Imagebase64Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Imagebase64Service = TestBed.get(Imagebase64Service);
    expect(service).toBeTruthy();
  });
});
