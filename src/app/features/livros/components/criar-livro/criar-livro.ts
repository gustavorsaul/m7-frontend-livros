import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusLivro } from '../../models/livro';

export interface DadosNovoLivro {
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: StatusLivro;
  descricao: string;
}

@Component({
  selector: 'app-criar-livro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criar-livro.html',
  styleUrl: './criar-livro.css',
})
export class CriarLivro {
  readonly aberto = signal(false);
  readonly livroCriado = output<DadosNovoLivro>();

  readonly dados = {
    titulo: '',
    autor: '',
    categoria: '',
    ano: new Date().getFullYear(),
    status: 'disponivel' as StatusLivro,
    descricao: '',
  };

  alternar(): void {
    this.aberto.update((aberto) => !aberto);
  }

  criar(): void {
    this.livroCriado.emit({
      titulo: this.dados.titulo.trim(),
      autor: this.dados.autor.trim(),
      categoria: this.dados.categoria.trim(),
      ano: this.dados.ano,
      status: this.dados.status,
      descricao: this.dados.descricao.trim(),
    });
    this.limpar();
    this.aberto.set(false);
  }

  private limpar(): void {
    this.dados.titulo = '';
    this.dados.autor = '';
    this.dados.categoria = '';
    this.dados.ano = new Date().getFullYear();
    this.dados.status = 'disponivel';
    this.dados.descricao = '';
  }
}
