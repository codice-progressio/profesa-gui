import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuImagenesComponent } from './sku-imagenes.component';

describe('SkuImagenesComponent', () => {
  let component: SkuImagenesComponent;
  let fixture: ComponentFixture<SkuImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
