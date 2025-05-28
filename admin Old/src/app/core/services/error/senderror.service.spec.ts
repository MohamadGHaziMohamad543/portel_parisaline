import { TestBed } from '@angular/core/testing';

import { SenderrorService } from './senderror.service';

describe('SenderrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SenderrorService = TestBed.get(SenderrorService);
    expect(service).toBeTruthy();
  });
});
