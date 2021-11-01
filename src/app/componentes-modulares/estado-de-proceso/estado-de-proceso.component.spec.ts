import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDeProcesoComponent } from './estado-de-proceso.component';

describe('EstadoDeProcesoComponent', () => {
  let component: EstadoDeProcesoComponent;
  let fixture: ComponentFixture<EstadoDeProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoDeProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoDeProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
