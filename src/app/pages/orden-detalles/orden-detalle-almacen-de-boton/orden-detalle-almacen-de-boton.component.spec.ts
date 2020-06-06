import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleAlmacenDeBotonComponent } from './orden-detalle-almacen-de-boton.component';

describe('OrdenDetalleAlmacenDeBotonComponent', () => {
  let component: OrdenDetalleAlmacenDeBotonComponent;
  let fixture: ComponentFixture<OrdenDetalleAlmacenDeBotonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleAlmacenDeBotonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleAlmacenDeBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
