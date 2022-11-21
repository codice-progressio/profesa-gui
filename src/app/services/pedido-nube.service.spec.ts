import { TestBed } from '@angular/core/testing';

import { PedidoNubeService } from './pedido-nube.service';

describe('PedidoNubeService', () => {
  let service: PedidoNubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoNubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
