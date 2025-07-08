import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ResumoFinanceiro } from '../../models/finance';

@Component({
  selector: 'app-cartao-resumo-financeiro',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './cartao-resumo-financeiro.html',
  styleUrl: './cartao-resumo-financeiro.css',
})
export class CartaoResumoFinanceiro {
  @Input({ required: true }) resumo!: ResumoFinanceiro;
}
