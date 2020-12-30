import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuCrearModificarComponent } from './sku-crear-modificar.component';

describe('SkuCrearModificarComponent', () => {
  let component: SkuCrearModificarComponent;
  let fixture: ComponentFixture<SkuCrearModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuCrearModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuCrearModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
