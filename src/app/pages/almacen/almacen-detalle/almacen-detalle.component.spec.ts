import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlmacenDetalleComponent } from './almacen-detalle.component';

describe('AlmacenDetalleComponent', () => {
  let component: AlmacenDetalleComponent;
  let fixture: ComponentFixture<AlmacenDetalleComponent>;

  beforeEach(waitForAsync(() => {
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
