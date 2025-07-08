
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transacao, ResumoFinanceiro } from '../models/finance';

declare const initSqlJs: any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any;
  private dbInitialized = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    try {
      const SQL = await initSqlJs({
        locateFile: (file: string) => `assets/${file}`
      });
      const savedDb = localStorage.getItem('financial_db');
      if (savedDb) {
        const dbArray = JSON.parse(savedDb);
        this.db = new SQL.Database(dbArray);
      } else {
        this.db = new SQL.Database();
        this.createTable();
      }
      this.dbInitialized.next(true);
    } catch (err) {
      console.error('Erro ao inicializar o banco de dados:', err);
    }
  }

  private createTable() {
    const sql = `
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        categoria TEXT NOT NULL,
        data TEXT NOT NULL
      );
    `;
    this.db.run(sql);
    this.saveDatabase();
  }

  private saveDatabase() {
    const dbArray = this.db.export();
    localStorage.setItem('financial_db', JSON.stringify(Array.from(dbArray)));
  }

  whenInitialized() {
    return this.dbInitialized.asObservable();
  }

  getTransactions(): Transacao[] {
    const stmt = this.db.prepare('SELECT * FROM transactions');
    const transactions: Transacao[] = [];
    while (stmt.step()) {
      transactions.push(stmt.getAsObject() as Transacao);
    }
    stmt.free();
    return transactions;
  }

  addTransaction(transaction: Omit<Transacao, 'id'>) {
    const stmt = this.db.prepare('INSERT INTO transactions (tipo, descricao, valor, categoria, data) VALUES (?, ?, ?, ?, ?)');
    stmt.run([transaction.tipo, transaction.descricao, transaction.valor, transaction.categoria, transaction.data]);
    stmt.free();
    this.saveDatabase();
  }

  deleteTransaction(id: string) {
    const stmt = this.db.prepare('DELETE FROM transactions WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    this.saveDatabase();
  }

  getRelatorio(): ResumoFinanceiro {
    const transactions = this.getTransactions();
    const totalReceitas = transactions.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesasFixas = transactions.filter(t => t.tipo === 'despesa-fixa').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesasVariaveis = transactions.filter(t => t.tipo === 'despesa-variavel').reduce((acc, t) => acc + t.valor, 0);
    const saldo = totalReceitas - totalDespesasFixas - totalDespesasVariaveis;
    return { totalReceitas, totalDespesasFixas, totalDespesasVariaveis, saldo };
  }
}
