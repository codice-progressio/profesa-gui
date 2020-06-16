import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleBuratoComponent } from './orden-detalle-burato.component';

describe('OrdenDetalleBuratoComponent', () => {
  let component: OrdenDetalleBuratoComponent;
  let fixture: ComponentFixture<OrdenDetalleBuratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleBuratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleBuratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
