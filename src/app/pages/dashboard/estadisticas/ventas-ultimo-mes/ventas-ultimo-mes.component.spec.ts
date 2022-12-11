import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasUltimoMesComponent } from './ventas-ultimo-mes.component';

describe('VentasUltimoMesComponent', () => {
  let component: VentasUltimoMesComponent;
  let fixture: ComponentFixture<VentasUltimoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasUltimoMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasUltimoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
