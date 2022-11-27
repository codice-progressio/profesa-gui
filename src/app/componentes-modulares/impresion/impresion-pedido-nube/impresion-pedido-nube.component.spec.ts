import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionPedidoNubeComponent } from './impresion-pedido-nube.component';

describe('ImpresionPedidoNubeComponent', () => {
  let component: ImpresionPedidoNubeComponent;
  let fixture: ComponentFixture<ImpresionPedidoNubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpresionPedidoNubeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpresionPedidoNubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
