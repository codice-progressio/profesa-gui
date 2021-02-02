import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCrearEditarComponent } from './usuario-crear-editar.component';

describe('UsuarioCrearEditarComponent', () => {
  let component: UsuarioCrearEditarComponent;
  let fixture: ComponentFixture<UsuarioCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
