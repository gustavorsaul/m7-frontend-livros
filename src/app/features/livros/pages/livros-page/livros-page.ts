import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CriarLivro, DadosNovoLivro } from '../../components/criar-livro/criar-livro';
import { FiltroLivros } from '../../components/filtro-livros/filtro-livros';
import { ListaLivros } from '../../components/lista-livros/lista-livros';
import { Livro, StatusLivro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livros-page',
  standalone: true,
  imports: [CriarLivro, FiltroLivros, ListaLivros],
  templateUrl: './livros-page.html',
  styleUrl: './livros-page.css',
})
export class LivrosPage implements OnInit {
  private readonly livrosService = inject(LivrosService);

  readonly livros = signal<Livro[]>([]);
  readonly pesquisa = signal('');
  readonly filtroStatus = signal<StatusLivro | 'todos'>('todos');
  readonly carregando = signal(false);
  readonly erro = signal<string | null>(null);

  readonly livrosFiltrados = computed(() => {
    const termo = this.pesquisa().trim().toLowerCase();
    const status = this.filtroStatus();

    return this.livros().filter((livro) => {
      const correspondeTexto =
        termo === '' ||
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.categoria.toLowerCase().includes(termo) ||
        livro.descricao.toLowerCase().includes(termo);
      const correspondeStatus = status === 'todos' || livro.status === status;
      return correspondeTexto && correspondeStatus;
    });
  });

  ngOnInit(): void {
    void this.carregarLivros();
  }

  atualizarPesquisa(pesquisa: string): void {
    this.pesquisa.set(pesquisa);
  }

  atualizarStatus(status: StatusLivro | 'todos'): void {
    this.filtroStatus.set(status);
  }

  adicionarLivro(dados: DadosNovoLivro): void {
    const livro: Livro = {
      id: this.proximoId(),
      titulo: dados.titulo,
      autor: dados.autor,
      categoria: dados.categoria,
      ano: dados.ano,
      status: dados.status,
      descricao: dados.descricao,
    };

    void this.livrosService.adicionar(livro);
    this.livros.update((livros) => [...livros, livro]);
  }

  private proximoId(): number {
    return this.livros().reduce((maiorId, livro) => Math.max(maiorId, livro.id), 0) + 1;
  }

  private async carregarLivros(): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const dados = await this.livrosService.listar();
      this.livros.set(dados);
    } catch {
      this.erro.set('Não foi possível carregar os livros.');
    } finally {
      this.carregando.set(false);
    }
  }
}
