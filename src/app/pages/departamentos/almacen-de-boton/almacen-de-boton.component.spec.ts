import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenDeBotonComponent } from './almacen-de-boton.component';

describe('AlmacenDeBotonComponent', () => {
  let component: AlmacenDeBotonComponent;
  let fixture: ComponentFixture<AlmacenDeBotonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenDeBotonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenDeBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
