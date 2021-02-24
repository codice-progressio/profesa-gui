import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCrearEditarDetalleComponent } from './ruta-crear-editar-detalle.component';

describe('RutaCrearEditarDetalleComponent', () => {
  let component: RutaCrearEditarDetalleComponent;
  let fixture: ComponentFixture<RutaCrearEditarDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCrearEditarDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCrearEditarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
