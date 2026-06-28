/**
 * Script de desenvolvimento local (node) com better-sqlite3.
 *
 * Como o D1 roda na Cloudflare, usamos este arquivo com tsx 
 * para rodar a API localmente conectada ao arquivo municipios.db gerado pelo ETL.
 */

import { serve } from '@hono/node-server';
import Database from 'better-sqlite3';
import { resolve } from 'path';
import { createYoga, createSchema } from 'graphql-yoga';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Tipos do schema, resolvers
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { DbExecutor } from './db/queries';

// Conexão com SQLite local
const dbPath = resolve(__dirname, '../../data/municipios.db');
const sqlite = new Database(dbPath, { readonly: true });

// Criar o DbExecutor usando better-sqlite3
const localDbExecutor: DbExecutor = {
  async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    const stmt = sqlite.prepare(sql);
    return stmt.all(params) as T[];
  },
  async queryOne<T>(sql: string, params: unknown[] = []): Promise<T | null> {
    const stmt = sqlite.prepare(sql);
    return (stmt.get(params) as T) || null;
  },
};

const app = new Hono();

app.use('*', cors({ origin: '*' }));

app.get('/', (c) => {
  return c.json({
    nome: 'SIDM — Sistema Integrado de Dados Municipais (Modo Local)',
    graphql: '/graphql',
    playground: '/graphiql',
  });
});

const schema = createSchema({ typeDefs, resolvers });

app.on(['GET', 'POST'], '/graphql', async (c) => {
  const yoga = createYoga({
    schema,
    context: () => ({ db: localDbExecutor }),
    graphqlEndpoint: '/graphql',
    landingPage: false,
  });
  return (yoga as any).handle(c.req.raw, c.env);
});

// GraphiQL route handler (same as in index.ts)
app.get('/graphiql', (c) => {
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>SIDM — GraphiQL (Local)</title>
  <style>body { height: 100vh; margin: 0; overflow: hidden; } #graphiql { height: 100vh; }</style>
  <link rel="stylesheet" href="https://unpkg.com/graphiql@3/graphiql.min.css" />
</head>
<body>
  <div id="graphiql">Carregando...</div>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/graphiql@3/graphiql.min.js"></script>
  <script>
    const fetcher = GraphiQL.createFetcher({ url: '/graphql' });
    const defaultQuery = \`query ExemploPIB {
  municipio(codigoIbge: 3534708) {
    nome
    uf
    populacao
    pib(anoInicio: 2018, anoFim: 2023) {
      ano
      pibReal
      pibPerCapita
    }
  }
}\`;
    ReactDOM.createRoot(document.getElementById('graphiql')).render(
      React.createElement(GraphiQL, { fetcher, defaultQuery })
    );
  </script>
</body>
</html>`;
  return c.html(html);
});

const port = 8787;
console.log(`🚀 SIDM Local server running at http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port
});
