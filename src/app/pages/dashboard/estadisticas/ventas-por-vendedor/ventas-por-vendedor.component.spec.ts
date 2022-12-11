import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPorVendedorComponent } from './ventas-por-vendedor.component';

describe('VentasPorVendedorComponent', () => {
  let component: VentasPorVendedorComponent;
  let fixture: ComponentFixture<VentasPorVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasPorVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasPorVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
