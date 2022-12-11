import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaRecargarComponent } from './estadistica-recargar.component';

describe('EstadisticaRecargarComponent', () => {
  let component: EstadisticaRecargarComponent;
  let fixture: ComponentFixture<EstadisticaRecargarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaRecargarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaRecargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
