/**
 * Interface que representa uma transação financeira.
 * Utilizada para modelar entradas (receitas) e saídas (despesas) do sistema.
 */
export interface Transacao {
  /**
   * Identificador único da transação (exemplo: UUID)
   */
  id: string;

  /**
   * Descrição detalhada da transação (ex: "Salário", "Aluguel", "Supermercado")
   */
  descricao: string;

  /**
   * Valor monetário da transação (deve ser um número positivo)
   */
  valor: number;

  /**
   * Categoria da transação para agrupamento (ex: "Moradia", "Alimentação", "Transporte")
   */
  categoria: string;

  /**
   * Data da transação no formato ISO 8601 (ex: "2023-04-15")
   */
  data: string;

  /**
   * Tipo da transação:
   * - 'receita': Entrada de recursos (ex: salário)
   * - 'despesa-fixa': Saída obrigatória com valor constante (ex: aluguel)
   * - 'despesa-variavel': Saída não obrigatória ou variável (ex: lazer)
   */
  tipo: 'receita' | 'despesa-fixa' | 'despesa-variavel';
}

/**
 * Interface que representa o resumo financeiro consolidado.
 * Calculado com base em um conjunto de transações.
 */
export interface ResumoFinanceiro {
  /**
   * Soma total de todas as transações do tipo 'receita'
   */
  totalReceitas: number;

  /**
   * Soma total de todas as transações do tipo 'despesa-fixa'
   */
  totalDespesasFixas: number;

  /**
   * Soma total de todas as transações do tipo 'despesa-variavel'
   */
  totalDespesasVariaveis: number;

  /**
   * Saldo atual calculado como:
   * (totalReceitas) - (totalDespesasFixas + totalDespesasVariaveis)
   */
  saldo: number;
}
