import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePreciosCrearModificarDetalleComponent } from './lista-de-precios-crear-modificar-detalle.component';

describe('ListaDePreciosCrearModificarDetalleComponent', () => {
  let component: ListaDePreciosCrearModificarDetalleComponent;
  let fixture: ComponentFixture<ListaDePreciosCrearModificarDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDePreciosCrearModificarDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePreciosCrearModificarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
