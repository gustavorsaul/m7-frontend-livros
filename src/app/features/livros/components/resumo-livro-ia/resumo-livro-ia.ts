import { Component, inject, input, signal } from '@angular/core';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-resumo-livro-ia',
  imports: [],
  templateUrl: './resumo-livro-ia.html',
  styleUrl: './resumo-livro-ia.css',
})
export class ResumoLivroIa {
  private readonly livrosService = inject(LivrosService);

  readonly livroId = input.required<number>();
  readonly carregando = signal(false);
  readonly resumo = signal<string | null>(null);
  readonly erro = signal<string | null>(null);

  async gerarResumo(): Promise<void> {
    if (this.carregando()) {
      return;
    }

    this.carregando.set(true);
    this.resumo.set(null);
    this.erro.set(null);

    try {
      const resumo = await this.livrosService.gerarResumo(this.livroId());
      this.resumo.set(resumo);
    } catch {
      this.erro.set('Não foi possível gerar o resumo. Tente novamente.');
    } finally {
      this.carregando.set(false);
    }
  }
}
