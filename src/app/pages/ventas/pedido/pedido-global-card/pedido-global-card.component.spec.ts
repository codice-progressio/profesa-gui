import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoGlobalCardComponent } from './pedido-global-card.component';

describe('PedidoGlobalCardComponent', () => {
  let component: PedidoGlobalCardComponent;
  let fixture: ComponentFixture<PedidoGlobalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoGlobalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoGlobalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
