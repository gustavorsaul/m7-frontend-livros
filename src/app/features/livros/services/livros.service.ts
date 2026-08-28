import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://m7-backend-livros.onrender.com/api/livros';
  private readonly resumoIaUrl = 'https://m7-backend-livros.onrender.com/api/resumo-ia/livro';

  listar(): Promise<Livro[]> {
    return firstValueFrom(this.http.get<Livro[]>(this.apiUrl));
  }

  buscarPorId(id: number): Promise<Livro | undefined> {
    return firstValueFrom(this.http.get<Livro>(`${this.apiUrl}/${id}`)).catch((erro) => {
      if (erro instanceof HttpErrorResponse && erro.status === 404) {
        return undefined;
      }

      throw erro;
    });
  }

  adicionar(livro: Livro): Promise<Livro> {
    return firstValueFrom(this.http.post<Livro>(this.apiUrl, livro));
  }

  gerarResumo(id: number): Promise<string> {
    return firstValueFrom(this.http.get<{ resumo: string }>(`${this.resumoIaUrl}/${id}`)).then(
      (resposta) => resposta.resumo,
    );
  }
}
