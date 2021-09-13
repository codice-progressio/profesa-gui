import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosPedidosOfflineComponent } from './parametros-pedidos-offline.component';

describe('ParametrosPedidosOfflineComponent', () => {
  let component: ParametrosPedidosOfflineComponent;
  let fixture: ComponentFixture<ParametrosPedidosOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosPedidosOfflineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosPedidosOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
