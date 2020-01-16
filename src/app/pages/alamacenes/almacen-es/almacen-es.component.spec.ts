import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenESComponent } from './almacen-es.component';

describe('AlmacenESComponent', () => {
  let component: AlmacenESComponent;
  let fixture: ComponentFixture<AlmacenESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
