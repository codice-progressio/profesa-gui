import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetallePastillaComponent } from './orden-detalle-pastilla.component';

describe('OrdenDetallePastillaComponent', () => {
  let component: OrdenDetallePastillaComponent;
  let fixture: ComponentFixture<OrdenDetallePastillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetallePastillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetallePastillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
