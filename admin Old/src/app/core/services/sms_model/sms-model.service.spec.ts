import { TestBed } from '@angular/core/testing';

import { SmsModelService } from './sms-model.service';

describe('SmsModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmsModelService = TestBed.get(SmsModelService);
    expect(service).toBeTruthy();
  });
});
