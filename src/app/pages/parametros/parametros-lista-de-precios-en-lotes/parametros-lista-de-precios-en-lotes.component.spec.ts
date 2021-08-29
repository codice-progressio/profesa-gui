import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosListaDePreciosEnLotesComponent } from './parametros-lista-de-precios-en-lotes.component';

describe('ParametrosListaDePreciosEnLotesComponent', () => {
  let component: ParametrosListaDePreciosEnLotesComponent;
  let fixture: ComponentFixture<ParametrosListaDePreciosEnLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosListaDePreciosEnLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosListaDePreciosEnLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
