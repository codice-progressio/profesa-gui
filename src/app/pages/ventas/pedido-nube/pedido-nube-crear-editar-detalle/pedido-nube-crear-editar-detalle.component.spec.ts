import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoNubeCrearEditarDetalleComponent } from './pedido-nube-crear-editar-detalle.component';

describe('PedidoNubeCrearEditarDetalleComponent', () => {
  let component: PedidoNubeCrearEditarDetalleComponent;
  let fixture: ComponentFixture<PedidoNubeCrearEditarDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoNubeCrearEditarDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoNubeCrearEditarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
