import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejorClienteComponent } from './mejor-cliente.component';

describe('MejorClienteComponent', () => {
  let component: MejorClienteComponent;
  let fixture: ComponentFixture<MejorClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MejorClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
