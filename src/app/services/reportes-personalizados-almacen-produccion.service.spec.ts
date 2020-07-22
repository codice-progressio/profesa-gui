import { TestBed } from '@angular/core/testing';

import { ReportesPersonalizadosAlmacenProduccionService } from './reportes-personalizados-almacen-produccion.service';

describe('ReportesPersonalizadosAlmacenProduccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportesPersonalizadosAlmacenProduccionService = TestBed.inject(ReportesPersonalizadosAlmacenProduccionService);
    expect(service).toBeTruthy();
  });
});
