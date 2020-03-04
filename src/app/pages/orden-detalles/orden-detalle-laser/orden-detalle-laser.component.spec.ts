import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleLaserComponent } from './orden-detalle-laser.component';

describe('OrdenDetalleLaserComponent', () => {
  let component: OrdenDetalleLaserComponent;
  let fixture: ComponentFixture<OrdenDetalleLaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleLaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleLaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
