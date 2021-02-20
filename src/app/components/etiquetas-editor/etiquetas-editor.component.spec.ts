import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EtiquetasEditorComponent } from './etiquetas-editor.component';

describe('EtiquetasEditorComponent', () => {
  let component: EtiquetasEditorComponent;
  let fixture: ComponentFixture<EtiquetasEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetasEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetasEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
