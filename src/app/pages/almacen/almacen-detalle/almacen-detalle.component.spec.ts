import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenDetalleComponent } from './almacen-detalle.component';

describe('AlmacenDetalleComponent', () => {
  let component: AlmacenDetalleComponent;
  let fixture: ComponentFixture<AlmacenDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
