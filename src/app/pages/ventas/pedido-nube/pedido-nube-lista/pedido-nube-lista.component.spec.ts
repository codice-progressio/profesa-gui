import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoNubeListaComponent } from './pedido-nube-lista.component';

describe('PedidoNubeListaComponent', () => {
  let component: PedidoNubeListaComponent;
  let fixture: ComponentFixture<PedidoNubeListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoNubeListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoNubeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
