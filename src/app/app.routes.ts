import { Routes } from '@angular/router';
import { App } from './app';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';
import { PaginaInicial } from './pages/pagina-inicial/pagina-inicial';

export const routes: Routes = [
  { path: '', component: PaginaInicial, title: 'Controle Financeiro' },
  { path: '**', component: NaoEncontrado, title: 'Página não Encontrada' }, // Rota curinga
];
