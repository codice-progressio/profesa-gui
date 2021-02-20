import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PedidosListaComponent } from './pedidos-lista.component';

describe('PedidosListaComponent', () => {
  let component: PedidosListaComponent;
  let fixture: ComponentFixture<PedidosListaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
