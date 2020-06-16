import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleMaterialesComponent } from './orden-detalle-materiales.component';

describe('OrdenDetalleMaterialesComponent', () => {
  let component: OrdenDetalleMaterialesComponent;
  let fixture: ComponentFixture<OrdenDetalleMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
