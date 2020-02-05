import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPersonalizadoAlmacenProduccionComponent } from './r-personalizado-almacen-produccion.component';

describe('RPersonalizadoAlmacenProduccionComponent', () => {
  let component: RPersonalizadoAlmacenProduccionComponent;
  let fixture: ComponentFixture<RPersonalizadoAlmacenProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPersonalizadoAlmacenProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPersonalizadoAlmacenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
