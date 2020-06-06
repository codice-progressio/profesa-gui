import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosEspecialesComponent } from './procesos-especiales.component';

describe('ProcesosEspecialesComponent', () => {
  let component: ProcesosEspecialesComponent;
  let fixture: ComponentFixture<ProcesosEspecialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesosEspecialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
