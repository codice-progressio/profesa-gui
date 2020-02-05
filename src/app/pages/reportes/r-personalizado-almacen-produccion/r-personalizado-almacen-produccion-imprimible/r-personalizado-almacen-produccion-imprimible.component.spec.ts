import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPersonalizadoAlmacenProduccionImprimibleComponent } from './r-personalizado-almacen-produccion-imprimible.component';

describe('RPersonalizadoAlmacenProduccionImprimibleComponent', () => {
  let component: RPersonalizadoAlmacenProduccionImprimibleComponent;
  let fixture: ComponentFixture<RPersonalizadoAlmacenProduccionImprimibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPersonalizadoAlmacenProduccionImprimibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPersonalizadoAlmacenProduccionImprimibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
