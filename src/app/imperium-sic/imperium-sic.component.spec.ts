import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperiumSicComponent } from './imperium-sic.component';

describe('ImperiumSicComponent', () => {
  let component: ImperiumSicComponent;
  let fixture: ComponentFixture<ImperiumSicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImperiumSicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImperiumSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
