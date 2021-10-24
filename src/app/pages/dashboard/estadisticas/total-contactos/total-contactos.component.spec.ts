import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalContactosComponent } from './total-contactos.component';

describe('TotalContactosComponent', () => {
  let component: TotalContactosComponent;
  let fixture: ComponentFixture<TotalContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalContactosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
