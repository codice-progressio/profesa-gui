import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactoCrearEditarComponent } from './contacto-crear-editar.component';

describe('ProveedorCrearEditarComponent', () => {
  let component: ContactoCrearEditarComponent;
  let fixture: ComponentFixture<ContactoCrearEditarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
