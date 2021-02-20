import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkuEntradaComponent } from './sku-entrada.component';

describe('SkuEntradaComponent', () => {
  let component: SkuEntradaComponent;
  let fixture: ComponentFixture<SkuEntradaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
