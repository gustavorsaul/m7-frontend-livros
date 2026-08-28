# M7 - Desenvolvimento Frontend

## Aula 8 — Frontend de Livros


## Sobre

Aplicação Angular para cadastrar, pesquisar e consultar livros. O frontend consome a API local e permite gerar detalhes sem spoilers usando Gemini.

## Tecnologias

- Angular 22 e TypeScript
- Angular Router e HttpClient
- Signals, `computed()`, `input()` e `output()`
- Reactive templates com `@if` e `@for`
- Vitest e Angular HTTP Testing

## Funcionalidades

- listagem e cadastro de livros;
- pesquisa por título, autor, categoria ou descrição;
- filtro por disponibilidade;
- página de detalhes por ID;
- resumo com IA, incluindo carregamento e tratamento de erro;
- layout responsivo com tema visual inspirado em bibliotecas.

## Configuração

Instale as dependências:

```bash
cd frontend-livros
npm install
```

Inicie antes o backend em `http://localhost:3000`.

## Execução

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

## Rotas

| Rota          | Página                        |
| ------------- | ----------------------------- |
| `/livros`     | Listagem, pesquisa e cadastro |
| `/livros/:id` | Detalhes e resumo com IA      |

A rota inicial `/` redireciona para `/livros`.

## Componentes principais

| Componente      | Função                       |
| --------------- | ---------------------------- |
| `CriarLivro`    | Formulário de cadastro       |
| `FiltroLivros`  | Pesquisa e filtro de status  |
| `ListaLivros`   | Estados e coleção de livros  |
| `LivroCard`     | Apresentação resumida        |
| `ResumoLivroIa` | Geração e exibição do resumo |

## Integração com a API

O `LivrosService` utiliza os seguintes endpoints:

| Método | Endpoint                   | Função                    |
| ------ | -------------------------- | ------------------------- |
| `GET`  | `/api/livros`              | Listar livros             |
| `GET`  | `/api/livros/:id`          | Consultar um livro        |
| `POST` | `/api/livros`              | Cadastrar um livro        |
| `GET`  | `/api/resumo-ia/livro/:id` | Gerar detalhes com Gemini |

## Organização

```text
src/app/features/livros/
├── components/  # criação, filtro, lista, card e IA
├── models/      # Livro e StatusLivro
├── pages/       # listagem e detalhes
└── services/    # comunicação HTTP e testes
```

## Validação

```bash
npm test -- --watch=false
npm run build
```
