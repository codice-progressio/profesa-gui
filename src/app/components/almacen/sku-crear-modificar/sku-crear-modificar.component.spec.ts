import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkuCrearModificarComponent } from './sku-crear-modificar.component';

describe('SkuCrearModificarComponent', () => {
  let component: SkuCrearModificarComponent;
  let fixture: ComponentFixture<SkuCrearModificarComponent>;

  beforeEach(waitForAsync(() => {
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
