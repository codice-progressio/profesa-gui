import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEstructuraOfflineComponent } from './pedidos-estructura-offline.component';

describe('PedidosEstructuraOfflineComponent', () => {
  let component: PedidosEstructuraOfflineComponent;
  let fixture: ComponentFixture<PedidosEstructuraOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosEstructuraOfflineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosEstructuraOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
