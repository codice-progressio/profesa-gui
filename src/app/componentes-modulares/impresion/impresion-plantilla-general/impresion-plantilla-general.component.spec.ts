import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionPlantillaGeneralComponent } from './impresion-plantilla-general.component';

describe('ImpresionPlantillaGeneralComponent', () => {
  let component: ImpresionPlantillaGeneralComponent;
  let fixture: ComponentFixture<ImpresionPlantillaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpresionPlantillaGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpresionPlantillaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
