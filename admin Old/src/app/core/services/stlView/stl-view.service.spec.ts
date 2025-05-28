import { TestBed } from '@angular/core/testing';

import { StlViewService } from './stl-view.service';

describe('StlViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StlViewService = TestBed.get(StlViewService);
    expect(service).toBeTruthy();
  });
});
