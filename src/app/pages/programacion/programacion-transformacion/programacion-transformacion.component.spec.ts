import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionTransformacionComponent } from './programacion-transformacion.component';

describe('ProgramacionTransformacionComponent', () => {
  let component: ProgramacionTransformacionComponent;
  let fixture: ComponentFixture<ProgramacionTransformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionTransformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionTransformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
