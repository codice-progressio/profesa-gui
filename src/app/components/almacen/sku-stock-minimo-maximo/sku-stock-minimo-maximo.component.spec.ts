import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkuStockMinimoMaximoComponent } from './sku-stock-minimo-maximo.component';

describe('SkuStockMinimoMaximoComponent', () => {
  let component: SkuStockMinimoMaximoComponent;
  let fixture: ComponentFixture<SkuStockMinimoMaximoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuStockMinimoMaximoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuStockMinimoMaximoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
