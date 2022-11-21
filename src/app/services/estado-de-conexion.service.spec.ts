import { TestBed } from '@angular/core/testing';

import { EstadoDeConexionService } from './estado-de-conexion.service';

describe('EstadoDeConexionService', () => {
  let service: EstadoDeConexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoDeConexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
