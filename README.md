# SIDM — Sistema Integrado de Dados Municipais

> API GraphQL que centraliza dados públicos dos municípios brasileiros a partir de fontes oficiais (IBGE, SICONFI, DATASUS).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## O que é

O SIDM é uma infraestrutura open source que coleta, normaliza e expõe dados públicos municipais em um endpoint GraphQL único. Os dados vêm de fontes oficiais e passam por um pipeline de ETL automatizado que trata inconsistências, deflaciona séries monetárias e padroniza formatos.

**Módulos disponíveis:**

| Módulo | Fonte | Período | Status |
|---|---|---|---|
| PIB Municipal | IBGE | 2002–2023 | ✅ Disponível |
| População | IBGE | — | 🔜 Em breve |
| Comércio Exterior | Comex Stat | — | 📋 Planejado |

## Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/fiorionrails/sidm.git
cd sidm/api

# 2. Instale as dependências
npm install

# 3. Rode a API
npm run dev

# GraphQL Playground → http://localhost:8787/graphiql
```

## Exemplo de Query

```graphql
query {
  municipio(codigoIbge: 3534708) {
    nome
    uf
    populacao
    pib(anoInicio: 2018, anoFim: 2023) {
      ano
      pibConstante
      pibPerCapita
    }
  }
}
```

## Arquitetura

```
Fontes Oficiais → ETL (Python) → SQLite → API GraphQL (Hono + graphql-yoga)
```

- **ETL:** Python (pandas) — extrai, transforma, deflaciona e carrega no SQLite
- **API:** TypeScript com Hono + graphql-yoga — roda em Cloudflare Workers (edge)
- **Banco:** SQLite (Cloudflare D1 em produção, arquivo local em dev)

## Estrutura do Projeto

```
sidm/
├── api/          # API GraphQL (TypeScript/Hono)
├── etl/          # Pipeline de dados (Python)
├── data/         # SQLite gerado pelo ETL
└── contexto/     # Documentação acadêmica
```

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para instruções detalhadas.

Cada novo módulo de dados = uma PR com:
1. Script ETL em `etl/fontes/`
2. Novos types/resolvers em `api/src/`
3. Testes

## Contexto Acadêmico

Este projeto faz parte de pesquisa apresentada no CONIC — Congresso Nacional de Iniciação Científica. O SIDM é a camada de infraestrutura do ecossistema que inclui o **OBDOu** (Observatório de Dados de Ourinhos), agente de inteligência artificial que consome esta API para responder perguntas sobre dados municipais.

## Licença

[MIT](LICENSE) — código aberto, dados públicos (Lei de Acesso à Informação).
