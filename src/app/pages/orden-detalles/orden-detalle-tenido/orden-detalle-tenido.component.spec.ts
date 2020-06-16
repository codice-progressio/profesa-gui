import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleTenidoComponent } from './orden-detalle-tenido.component';

describe('OrdenDetalleTenidoComponent', () => {
  let component: OrdenDetalleTenidoComponent;
  let fixture: ComponentFixture<OrdenDetalleTenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleTenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleTenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
