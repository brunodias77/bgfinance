import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeTransacoes } from './lista-de-transacoes';

describe('ListaDeTransacoes', () => {
  let component: ListaDeTransacoes;
  let fixture: ComponentFixture<ListaDeTransacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeTransacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeTransacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
