import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComprasComponent } from './compras.component';

describe('ComprasComponent', () => {
  let component: ComprasComponent;
  let fixture: ComponentFixture<ComprasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
