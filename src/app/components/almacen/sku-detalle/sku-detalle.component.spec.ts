import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkuDetalleComponent } from './sku-detalle.component';

describe('SkuDetalleComponent', () => {
  let component: SkuDetalleComponent;
  let fixture: ComponentFixture<SkuDetalleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
