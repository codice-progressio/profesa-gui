import { TestBed } from '@angular/core/testing';

import { RutaDeEntregaService } from './ruta-de-entrega.service';

describe('RutasDeEntregaService', () => {
  let service: RutaDeEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaDeEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
