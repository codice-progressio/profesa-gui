import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosInicialesYFinalesComponent } from './procesos-iniciales-yfinales.component';

describe('ProcesosInicialesYFinalesComponent', () => {
  let component: ProcesosInicialesYFinalesComponent;
  let fixture: ComponentFixture<ProcesosInicialesYFinalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesosInicialesYFinalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosInicialesYFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
