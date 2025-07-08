import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoResumoFinanceiro } from './cartao-resumo-financeiro';

describe('CartaoResumoFinanceiro', () => {
  let component: CartaoResumoFinanceiro;
  let fixture: ComponentFixture<CartaoResumoFinanceiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoResumoFinanceiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoResumoFinanceiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
