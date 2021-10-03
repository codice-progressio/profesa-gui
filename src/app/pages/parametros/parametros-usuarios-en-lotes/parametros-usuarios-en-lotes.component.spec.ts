import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosUsuariosEnLotesComponent } from './parametros-usuarios-en-lotes.component';

describe('ParametrosUsuariosEnLotesComponent', () => {
  let component: ParametrosUsuariosEnLotesComponent;
  let fixture: ComponentFixture<ParametrosUsuariosEnLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosUsuariosEnLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosUsuariosEnLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
