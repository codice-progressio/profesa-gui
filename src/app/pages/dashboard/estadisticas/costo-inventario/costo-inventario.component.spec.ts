import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoInventarioComponent } from './costo-inventario.component';

describe('CostoInventarioComponent', () => {
  let component: CostoInventarioComponent;
  let fixture: ComponentFixture<CostoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostoInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
