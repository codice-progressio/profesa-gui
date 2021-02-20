import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkuSalidaComponent } from './sku-salida.component';

describe('SkuSalidaComponent', () => {
  let component: SkuSalidaComponent;
  let fixture: ComponentFixture<SkuSalidaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
