import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlmacenCrearModificarComponent } from './almacen-crear-modificar.component';

describe('AlmacenCrearModificarComponent', () => {
  let component: AlmacenCrearModificarComponent;
  let fixture: ComponentFixture<AlmacenCrearModificarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenCrearModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenCrearModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
