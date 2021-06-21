import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRemisionesComponent } from './control-remisiones.component';

describe('ControlRemisionesComponent', () => {
  let component: ControlRemisionesComponent;
  let fixture: ComponentFixture<ControlRemisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlRemisionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRemisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
