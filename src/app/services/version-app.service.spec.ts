import { TestBed } from '@angular/core/testing';

import { VersionAppService } from './version-app.service';

describe('VersionAppService', () => {
  let service: VersionAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
