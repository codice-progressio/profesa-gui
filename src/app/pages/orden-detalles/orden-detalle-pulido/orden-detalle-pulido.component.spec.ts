import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetallePulidoComponent } from './orden-detalle-pulido.component';

describe('OrdenDetallePulidoComponent', () => {
  let component: OrdenDetallePulidoComponent;
  let fixture: ComponentFixture<OrdenDetallePulidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetallePulidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetallePulidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
