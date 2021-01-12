import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuLotesComponent } from './sku-lotes.component';

describe('SkuLotesComponent', () => {
  let component: SkuLotesComponent;
  let fixture: ComponentFixture<SkuLotesComponent>;

  beforeEach(async(() => {
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
