import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Transacao } from '../../models/finance';

@Component({
  selector: 'app-formulario-de-transacoes',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario-de-transacoes.html',
  styleUrl: './formulario-de-transacoes.css',
})
export class FormularioDeTransacoes implements OnInit {
  @Output() fechar = new EventEmitter<void>();
  @Output() submeter = new EventEmitter<Omit<Transacao, 'id'>>();

  formTransacao!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formTransacao = this.fb.group({
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      data: [new Date().toISOString().split('T')[0], Validators.required],
      tipo: ['receita', Validators.required],
    });
  }

  onSubmeter(): void {
    if (this.formTransacao.invalid) return;
    this.submeter.emit(this.formTransacao.value);
  }

  onFechar(): void {
    this.fechar.emit();
  }

  obterEstiloTipo(tipo: string): string {
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
}
