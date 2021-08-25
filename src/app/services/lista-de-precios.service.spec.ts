import { TestBed } from '@angular/core/testing';

import { ListaDePreciosService } from './lista-de-precios.service';

describe('ListaDePreciosService', () => {
  let service: ListaDePreciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDePreciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
