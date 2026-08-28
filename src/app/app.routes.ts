import { Routes } from '@angular/router';
import { LivroDetalhePage } from './features/livros/pages/livro-detalhe-page/livro-detalhe-page';
import { LivrosPage } from './features/livros/pages/livros-page/livros-page';

export const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosPage },
  { path: 'livros/:id', component: LivroDetalhePage },
];
