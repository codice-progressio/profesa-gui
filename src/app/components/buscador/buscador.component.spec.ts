import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscadorComponent } from './buscador.component';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
