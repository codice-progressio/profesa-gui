import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuEtiquetasComponent } from './sku-etiquetas.component';

describe('SkuEtiquetasComponent', () => {
  let component: SkuEtiquetasComponent;
  let fixture: ComponentFixture<SkuEtiquetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuEtiquetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
