import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosSkuEnLotesComponent } from './parametros-sku-en-lotes.component';

describe('ParametrosSkuEnLotesComponent', () => {
  let component: ParametrosSkuEnLotesComponent;
  let fixture: ComponentFixture<ParametrosSkuEnLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosSkuEnLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosSkuEnLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
