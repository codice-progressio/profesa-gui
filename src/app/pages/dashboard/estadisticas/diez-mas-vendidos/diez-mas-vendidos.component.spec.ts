import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiezMasVendidosComponent } from './diez-mas-vendidos.component';

describe('DiezMasVendidosComponent', () => {
  let component: DiezMasVendidosComponent;
  let fixture: ComponentFixture<DiezMasVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiezMasVendidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiezMasVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
