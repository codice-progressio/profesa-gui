import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosListaDePreciosComponent } from './parametros-lista-de-precios.component';

describe('ParametrosListaDePreciosComponent', () => {
  let component: ParametrosListaDePreciosComponent;
  let fixture: ComponentFixture<ParametrosListaDePreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosListaDePreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosListaDePreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
