import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe, NgClass } from '@angular/common';
import { Transacao } from '../../models/finance';

@Component({
  selector: 'app-lista-de-transacoes',
  imports: [DatePipe, CurrencyPipe, NgClass],
  templateUrl: './lista-de-transacoes.html',
  styleUrl: './lista-de-transacoes.css',
})
export class ListaDeTransacoes {
  // Entrada obrigatória com a lista de transações
  @Input({ required: true }) transacoes: Transacao[] = [];

  // Título opcional do componente
  @Input() titulo: string = 'Transações';

  // Mensagem exibida quando não há transações
  @Input() mensagemVazia: string = 'Nenhuma transação encontrada.';

  // Evento emitido ao excluir uma transação
  @Output() excluir = new EventEmitter<string>();

  onExcluir(id: string): void {
    this.excluir.emit(id);
  }

  obterEstiloTipo(tipo: Transacao['tipo']): string {
    switch (tipo) {
      case 'receita':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'despesa-fixa':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'despesa-variavel':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  obterRotuloTipo(tipo: Transacao['tipo']): string {
    switch (tipo) {
      case 'receita':
        return 'Receita';
      case 'despesa-fixa':
        return 'Despesa Fixa';
      case 'despesa-variavel':
        return 'Despesa Variável';
      default:
        return tipo;
    }
  }
}
