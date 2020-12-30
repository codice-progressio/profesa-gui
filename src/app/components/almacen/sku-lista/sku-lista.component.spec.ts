import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuListaComponent } from './sku-lista.component';

describe('SkuListaComponent', () => {
  let component: SkuListaComponent;
  let fixture: ComponentFixture<SkuListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
