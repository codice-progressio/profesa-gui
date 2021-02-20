import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlmacenImagenesComponent } from './almacen-imagenes.component';

describe('AlmacenImagenesComponent', () => {
  let component: AlmacenImagenesComponent;
  let fixture: ComponentFixture<AlmacenImagenesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
