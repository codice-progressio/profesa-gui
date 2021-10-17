import { TestBed } from '@angular/core/testing';

import { IndicesIndexedDbService } from './indices-indexed-db.service';

describe('IndicesIndexedDbService', () => {
  let service: IndicesIndexedDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicesIndexedDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
