import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Livro } from '../models/livro';
import { LivrosService } from './livros.service';

describe('LivrosService', () => {
  const apiUrl = 'http://localhost:3000/api/livros';
  const resumoIaUrl = 'http://localhost:3000/api/resumo-ia/livro';
  const livro: Livro = {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    categoria: 'Romance',
    ano: 1899,
    status: 'disponivel',
    descricao: 'Clássico da literatura brasileira.',
  };

  let service: LivrosService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(LivrosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('deve listar os livros', async () => {
    const resultadoPromise = service.listar();
    const requisicao = httpController.expectOne(apiUrl);

    expect(requisicao.request.method).toBe('GET');
    requisicao.flush([livro]);

    await expect(resultadoPromise).resolves.toEqual([livro]);
  });

  it('deve buscar um livro por id', async () => {
    const resultadoPromise = service.buscarPorId(livro.id);
    const requisicao = httpController.expectOne(`${apiUrl}/${livro.id}`);

    expect(requisicao.request.method).toBe('GET');
    requisicao.flush(livro);

    await expect(resultadoPromise).resolves.toEqual(livro);
  });

  it('deve retornar undefined quando o livro não for encontrado', async () => {
    const resultadoPromise = service.buscarPorId(999);
    const requisicao = httpController.expectOne(`${apiUrl}/999`);

    requisicao.flush('Livro não encontrado', {
      status: 404,
      statusText: 'Not Found',
    });

    await expect(resultadoPromise).resolves.toBeUndefined();
  });

  it('deve adicionar um livro', async () => {
    const resultadoPromise = service.adicionar(livro);
    const requisicao = httpController.expectOne(apiUrl);

    expect(requisicao.request.method).toBe('POST');
    expect(requisicao.request.body).toEqual(livro);
    requisicao.flush(livro);

    await expect(resultadoPromise).resolves.toEqual(livro);
  });

  it('deve gerar o resumo de um livro', async () => {
    const resumo = 'Resumo do livro sem spoilers.';
    const resultadoPromise = service.gerarResumo(livro.id);
    const requisicao = httpController.expectOne(`${resumoIaUrl}/${livro.id}`);

    expect(requisicao.request.method).toBe('GET');
    requisicao.flush({ resumo });

    await expect(resultadoPromise).resolves.toBe(resumo);
  });
});
