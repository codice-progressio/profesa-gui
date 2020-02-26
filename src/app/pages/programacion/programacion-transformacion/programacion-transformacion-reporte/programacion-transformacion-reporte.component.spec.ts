import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionTransformacionReporteComponent } from './programacion-transformacion-reporte.component';

describe('ProgramacionTransformacionReporteComponent', () => {
  let component: ProgramacionTransformacionReporteComponent;
  let fixture: ComponentFixture<ProgramacionTransformacionReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionTransformacionReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionTransformacionReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
