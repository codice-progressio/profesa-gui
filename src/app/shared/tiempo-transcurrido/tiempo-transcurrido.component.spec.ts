import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoTranscurridoComponent } from './tiempo-transcurrido.component';

describe('TiempoTranscurridoComponent', () => {
  let component: TiempoTranscurridoComponent;
  let fixture: ComponentFixture<TiempoTranscurridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiempoTranscurridoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoTranscurridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
