import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPorDepartamentoEnProcesosComponent } from './ordenes-por-departamento-en-procesos.component';

describe('OrdenesPorDepartamentoEnProcesosComponent', () => {
  let component: OrdenesPorDepartamentoEnProcesosComponent;
  let fixture: ComponentFixture<OrdenesPorDepartamentoEnProcesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPorDepartamentoEnProcesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPorDepartamentoEnProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
