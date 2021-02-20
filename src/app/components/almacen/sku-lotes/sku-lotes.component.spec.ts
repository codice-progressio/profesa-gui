import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkuLotesComponent } from './sku-lotes.component';

describe('SkuLotesComponent', () => {
  let component: SkuLotesComponent;
  let fixture: ComponentFixture<SkuLotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
