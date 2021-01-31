import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorCrearEditarComponent } from './proveedor-crear-editar.component';

describe('ProveedorCrearEditarComponent', () => {
  let component: ProveedorCrearEditarComponent;
  let fixture: ComponentFixture<ProveedorCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
