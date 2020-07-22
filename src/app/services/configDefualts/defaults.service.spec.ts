import { TestBed } from '@angular/core/testing';

import { DefaultsService } from './defaults.service';

describe('DefaultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultsService = TestBed.inject(DefaultsService);
    expect(service).toBeTruthy();
  });
});
