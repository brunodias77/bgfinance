import { computed, effect, Injectable, signal } from '@angular/core';
import { ResumoFinanceiro, Transacao } from '../models/finance';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  transacoes = signal<Transacao[]>([]);

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

  resumo = computed<ResumoFinanceiro>(() => ({
    totalReceitas: this.totalReceitas(),
    totalDespesasFixas: this.totalDespesasFixas(),
    totalDespesasVariaveis: this.totalDespesasVariaveis(),
    saldo:
      this.totalReceitas() -
      this.totalDespesasFixas() -
      this.totalDespesasVariaveis(),
  }));

  constructor(private databaseService: DatabaseService) {
    this.databaseService.whenInitialized().subscribe(initialized => {
      if (initialized) {
        this.carregarTransacoes();
      }
    });
  }

  private carregarTransacoes() {
    const transacoes = this.databaseService.getTransactions();
    this.transacoes.set(transacoes);
  }

  adicionarTransacao(transacao: Omit<Transacao, 'id'>) {
    this.databaseService.addTransaction(transacao);
    this.carregarTransacoes();
  }

  excluirTransacao(id: string) {
    this.databaseService.deleteTransaction(id);
    this.carregarTransacoes();
  }
}
