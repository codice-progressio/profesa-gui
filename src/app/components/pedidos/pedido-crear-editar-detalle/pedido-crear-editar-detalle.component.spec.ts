import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCrearEditarDetalleComponent } from './pedido-crear-editar-detalle.component';

describe('PedidoCrearEditarDetalleComponent', () => {
  let component: PedidoCrearEditarDetalleComponent;
  let fixture: ComponentFixture<PedidoCrearEditarDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCrearEditarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCrearEditarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
