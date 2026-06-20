/**
 * SIDM — Entry Point (Cloudflare Workers)
 *
 * Hono + graphql-yoga servindo a API GraphQL em /graphql
 * com playground GraphiQL em /graphiql.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createD1Executor } from './db/queries';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// ─── CORS ────────────────────────────────────────────────────────────

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// ─── Health check ────────────────────────────────────────────────────

app.get('/', (c) => {
  return c.json({
    nome: 'SIDM — Sistema Integrado de Dados Municipais',
    versao: '0.1.0',
    graphql: '/graphql',
    playground: '/graphiql',
    repositorio: 'https://github.com/fiorionrails/sidm',
  });
});

// ─── GraphQL ─────────────────────────────────────────────────────────

const schema = createSchema({ typeDefs, resolvers });

app.on(['GET', 'POST'], '/graphql', async (c) => {
  const db = createD1Executor(c.env.DB);

  const yoga = createYoga({
    schema,
    context: () => ({ db }),
    graphqlEndpoint: '/graphql',
    landingPage: false,
  });

  return yoga.handle(c.req.raw, c.env);
});

// ─── GraphiQL Playground ─────────────────────────────────────────────

app.get('/graphiql', (c) => {
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>SIDM — GraphiQL</title>
  <meta name="description" content="Playground interativo da API GraphQL do SIDM" />
  <style>
    body { height: 100vh; margin: 0; overflow: hidden; }
    #graphiql { height: 100vh; }
  </style>
  <link rel="stylesheet" href="https://unpkg.com/graphiql@3/graphiql.min.css" />
</head>
<body>
  <div id="graphiql">Carregando...</div>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/graphiql@3/graphiql.min.js"></script>
  <script>
    const fetcher = GraphiQL.createFetcher({ url: '/graphql' });
    const defaultQuery = \`# SIDM — Sistema Integrado de Dados Municipais
# Experimente uma query:

query ExemploPIB {
  municipio(codigoIbge: 3534708) {
    nome
    nomeRegiaoImediata
    pib(anoInicio: 2018, anoFim: 2023) {
      ano
      pibReal
      pibPerCapitaReal
    }
  }
}
\`;
    ReactDOM.createRoot(document.getElementById('graphiql')).render(
      React.createElement(GraphiQL, { fetcher, defaultQuery })
    );
  </script>
</body>
</html>`;
  return c.html(html);
});

export default app;
