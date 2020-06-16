import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionTransformacionImprimirComponent } from './programacion-transformacion-imprimir.component';

describe('ProgramacionTransformacionImprimirComponent', () => {
  let component: ProgramacionTransformacionImprimirComponent;
  let fixture: ComponentFixture<ProgramacionTransformacionImprimirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionTransformacionImprimirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionTransformacionImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
