import { computed, effect, Injectable, signal } from '@angular/core';
import { ResumoFinanceiro, Transacao } from '../models/finance';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private chaveArmazenamento = 'finance-app-data-angular';

  // Sinal gravável para armazenar a lista de transações
  transacoes = signal<Transacao[]>([]);

  // Sinais computados para cálculos financeiros
  totalReceitas = computed(() =>
    this.transacoes()
      .filter((t) => t.tipo === 'receita')
      .reduce((soma, t) => soma + t.valor, 0)
  );

  totalDespesasFixas = computed(() =>
    this.transacoes()
      .filter((t) => t.tipo === 'despesa-fixa')
      .reduce((soma, t) => soma + t.valor, 0)
  );

  totalDespesasVariaveis = computed(() =>
    this.transacoes()
      .filter((t) => t.tipo === 'despesa-variavel')
      .reduce((soma, t) => soma + t.valor, 0)
  );

  // Resumo financeiro computado automaticamente
  resumo = computed<ResumoFinanceiro>(() => ({
    totalReceitas: this.totalReceitas(),
    totalDespesasFixas: this.totalDespesasFixas(),
    totalDespesasVariaveis: this.totalDespesasVariaveis(),
    saldo:
      this.totalReceitas() -
      this.totalDespesasFixas() -
      this.totalDespesasVariaveis(),
  }));

  constructor() {
    // Carrega dados salvos do localStorage na inicialização
    const dadosSalvos = localStorage.getItem(this.chaveArmazenamento);
    if (dadosSalvos) {
      this.transacoes.set(JSON.parse(dadosSalvos));
    }

    // Efeito colateral: salva automaticamente no localStorage quando as transações mudam
    effect(() => {
      localStorage.setItem(
        this.chaveArmazenamento,
        JSON.stringify(this.transacoes())
      );
    });
  }

  /**
   * Adiciona uma nova transação à lista
   * @param transacao Dados da transação (sem ID, que será gerado automaticamente)
   */
  adicionarTransacao(transacao: Omit<Transacao, 'id'>) {
    const novaTransacao: Transacao = {
      ...transacao,
      id: Date.now().toString(), // Gera um ID único baseado no timestamp
    };
    this.transacoes.update((anterior) => [...anterior, novaTransacao]);
  }

  /**
   * Remove uma transação pelo ID
   * @param id ID da transação a ser removida
   */
  excluirTransacao(id: string) {
    this.transacoes.update((anterior) => anterior.filter((t) => t.id !== id));
  }
}
