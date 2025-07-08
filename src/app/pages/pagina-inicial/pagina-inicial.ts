import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes da aplicação
import { Header } from '../../components/header/header';
import { CartaoResumoFinanceiro } from '../../components/cartao-resumo-financeiro/cartao-resumo-financeiro';
import { ListaDeTransacoes } from '../../components/lista-de-transacoes/lista-de-transacoes';
import { FormularioDeTransacoes } from '../../components/formulario-de-transacoes/formulario-de-transacoes';

// Serviço e modelo
import { FinanceService } from '../../services/finance-service';
import { Transacao } from '../../models/finance';

// Tipos de abas
type AbaAtiva =
  | 'visaoGeral'
  | 'receitas'
  | 'gastosFixos'
  | 'gastosVariaveis'
  | 'graficos';
@Component({
  selector: 'app-pagina-inicial',
  imports: [
    CommonModule,
    Header,
    CartaoResumoFinanceiro,
    ListaDeTransacoes,
    FormularioDeTransacoes,
  ],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css',
})
export class PaginaInicial {
  servicoFinanceiro = inject(FinanceService);

  mostrarFormulario = signal(false);
  abaAtiva = signal<AbaAtiva>('visaoGeral');

  onExcluirTransacao(id: string): void {
    this.servicoFinanceiro.excluirTransacao(id);
  }

  onSubmeterFormulario(transacao: Omit<Transacao, 'id'>): void {
    this.servicoFinanceiro.adicionarTransacao(transacao);
    this.mostrarFormulario.set(false);
  }
}
