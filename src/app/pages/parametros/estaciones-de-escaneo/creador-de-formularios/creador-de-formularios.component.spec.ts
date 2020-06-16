import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorDeFormulariosComponent } from './creador-de-formularios.component';

describe('CreadorDeFormulariosComponent', () => {
  let component: CreadorDeFormulariosComponent;
  let fixture: ComponentFixture<CreadorDeFormulariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreadorDeFormulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorDeFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
