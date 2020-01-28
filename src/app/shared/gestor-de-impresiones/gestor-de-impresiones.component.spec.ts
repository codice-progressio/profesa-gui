import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeImpresionesComponent } from './gestor-de-impresiones.component';

describe('GestorDeImpresionesComponent', () => {
  let component: GestorDeImpresionesComponent;
  let fixture: ComponentFixture<GestorDeImpresionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorDeImpresionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorDeImpresionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
