import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionesDeEscaneoComponent } from './estaciones-de-escaneo.component';

describe('EstacionesDeEscaneoComponent', () => {
  let component: EstacionesDeEscaneoComponent;
  let fixture: ComponentFixture<EstacionesDeEscaneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionesDeEscaneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionesDeEscaneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
