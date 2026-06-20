# SIDM — Sistema Integrado de Dados Municipais

> API GraphQL que centraliza dados públicos dos municípios brasileiros a partir de fontes oficiais (IBGE), focada em performance e consumo simplificado.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## O que é

O SIDM é uma infraestrutura open source que expõe dados públicos municipais em um endpoint GraphQL único. Em vez de complexos processos de ETL on-the-fly, a API é alimentada por um banco de dados SQLite oficial e pré-compilado (`municipia.db`), garantindo velocidade e confiabilidade (sem limites de requisição de terceiros).

**Módulos disponíveis:**

| Módulo | Fonte | Período | Status |
|---|---|---|---|
| PIB Municipal e Deflator | IBGE | 2002–2023 | ✅ Disponível |
| População | IBGE | — | ⏳ Em breve |
| Comércio Exterior | Comex Stat | — | 📅 Planejado |

## Metodologia de Deflacionamento
O PIB constante (Real) dos municípios é calculado utilizando o **Deflator Implícito do PIB** (Contas Nacionais Anuais do IBGE, base 2021=100). Como não existe índice de volume oficial municipal, esta metodologia adapta os valores nominais isolando a variação de preços em escala nacional.

## Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/fiorionrails/sidm.git
cd sidm

# 2. Instale as dependências da API
cd api
npm install

# 3. Rode a API localmente
npm run dev:local

# GraphQL Playground ficará disponível em http://localhost:8787/graphiql
```

## Exemplo de Query

```graphql
query {
  municipio(codigoIbge: 3534708) {
    nome
    nomeRegiaoImediata
    pib(anoInicio: 2018, anoFim: 2023) {
      ano
      pibCorrente
      pibReal
      pibPerCapitaReal
    }
  }
}
```

## Arquitetura

```
SQLite (municipia.db) → API GraphQL (Hono + graphql-yoga)
```

- **API:** TypeScript com Hono + graphql-yoga. Suporta deploy imediato em Cloudflare Workers (edge).
- **Banco de Dados:** SQLite estático embutido na aplicação (`data/municipios.db`) com queries robustas utilizando o Drizzle ORM / Better-SQLite3.

## Estrutura do Projeto

```
sidm/
├── api/          # API GraphQL (TypeScript/Hono)
│   ├── src/      # Resolvers e Schema GraphQL
│   └── package.json
├── data/         # Banco de dados SQLite estático
└── contexto/     # Documentação acadêmica e material complementar
```

## Contexto Acadêmico

Este projeto faz parte de pesquisa em andamento. O SIDM é a camada de infraestrutura do ecossistema que inclui o **OBDOu** (Observatório de Dados de Ourinhos), um agente de inteligência artificial construído para consumir esta API e responder perguntas com dados factuais em linguagem natural, mitigando riscos de desinformação pública.

## Licença

[MIT](LICENSE) — código aberto, dados públicos (Lei de Acesso à Informação).
