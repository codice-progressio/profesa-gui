import { TestBed } from '@angular/core/testing';

import { FormularioDinamicoService } from './question-control.service';

describe('FormularioDinamicoService', () => {
  let service: FormularioDinamicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioDinamicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
