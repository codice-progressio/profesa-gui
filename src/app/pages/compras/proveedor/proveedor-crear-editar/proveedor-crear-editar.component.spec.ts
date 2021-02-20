import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProveedorCrearEditarComponent } from './proveedor-crear-editar.component';

describe('ProveedorCrearEditarComponent', () => {
  let component: ProveedorCrearEditarComponent;
  let fixture: ComponentFixture<ProveedorCrearEditarComponent>;

  beforeEach(waitForAsync(() => {
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
