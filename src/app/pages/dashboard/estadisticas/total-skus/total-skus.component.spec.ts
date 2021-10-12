import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSkusComponent } from './total-skus.component';

describe('TotalSkusComponent', () => {
  let component: TotalSkusComponent;
  let fixture: ComponentFixture<TotalSkusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSkusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSkusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
