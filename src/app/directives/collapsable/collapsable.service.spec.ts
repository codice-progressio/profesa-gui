import { TestBed } from '@angular/core/testing';

import { CollapsableService } from './collapsable.service';

describe('CollapsableService', () => {
  let service: CollapsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollapsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
