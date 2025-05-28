import { TestBed } from '@angular/core/testing';

import { LaboratorysService } from './laboratorys.service';

describe('LaboratorysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaboratorysService = TestBed.get(LaboratorysService);
    expect(service).toBeTruthy();
  });
});
