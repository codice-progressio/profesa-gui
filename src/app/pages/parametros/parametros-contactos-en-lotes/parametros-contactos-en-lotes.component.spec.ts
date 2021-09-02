import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosContactosEnLotesComponent } from './parametros-contactos-en-lotes.component';

describe('ParametrosContactosEnLotesComponent', () => {
  let component: ParametrosContactosEnLotesComponent;
  let fixture: ComponentFixture<ParametrosContactosEnLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosContactosEnLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosContactosEnLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
