import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarUsuarioComponent } from './confirmar-usuario.component';

describe('ConfirmarUsuarioComponent', () => {
  let component: ConfirmarUsuarioComponent;
  let fixture: ComponentFixture<ConfirmarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
