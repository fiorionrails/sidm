/**
 * SIDM — Queries SQL para Cloudflare D1
 *
 * Camada de acesso ao banco SQLite. Todas as queries são parametrizadas.
 * Trocar o banco no futuro exige mudar apenas este arquivo.
 */

/** Interface genérica para o executor SQL (D1 ou better-sqlite3) */
export interface DbExecutor {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
  queryOne<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T | null>;
}

/** Adapter para Cloudflare D1 */
export function createD1Executor(db: D1Database): DbExecutor {
  return {
    async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      const stmt = db.prepare(sql).bind(...params);
      const result = await stmt.all<T>();
      return result.results ?? [];
    },
    async queryOne<T>(sql: string, params: unknown[] = []): Promise<T | null> {
      const stmt = db.prepare(sql).bind(...params);
      const result = await stmt.first<T>();
      return result ?? null;
    },
  };
}

// ─── Tipos das rows SQL ──────────────────────────────────────────────

export interface MunicipioRow {
  codigo_ibge: number;
  nome: string;
  uf: string;
  regiao: string;
  populacao: number | null;
  latitude: number | null;
  longitude: number | null;
}

export interface PibRow {
  codigo_ibge: number;
  ano: number;
  pib_corrente: number | null;
  pib_constante: number | null;
  pib_per_capita: number | null;
  vab_agropecuaria: number | null;
  vab_industria: number | null;
  vab_servicos: number | null;
  vab_adm_publica: number | null;
}

export interface DeflatorRow {
  ano: number;
  fator: number;
}

export interface CountRow {
  total: number;
}

// ─── Queries ─────────────────────────────────────────────────────────

export async function getMunicipio(db: DbExecutor, codigoIbge: number) {
  return db.queryOne<MunicipioRow>(
    `SELECT * FROM municipios WHERE codigo_ibge = ?`,
    [codigoIbge]
  );
}

export async function getMunicipios(
  db: DbExecutor,
  filters: { uf?: string; nome?: string; regiao?: string; pagina: number; porPagina: number }
) {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filters.uf) {
    conditions.push(`uf = ?`);
    params.push(filters.uf.toUpperCase());
  }
  if (filters.nome) {
    conditions.push(`nome LIKE ?`);
    params.push(`%${filters.nome}%`);
  }
  if (filters.regiao) {
    conditions.push(`regiao = ?`);
    params.push(filters.regiao);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Count total
  const countResult = await db.queryOne<CountRow>(
    `SELECT COUNT(*) as total FROM municipios ${where}`,
    params
  );
  const total = countResult?.total ?? 0;

  // Paginated query
  const offset = (filters.pagina - 1) * filters.porPagina;
  const dados = await db.query<MunicipioRow>(
    `SELECT * FROM municipios ${where} ORDER BY nome LIMIT ? OFFSET ?`,
    [...params, filters.porPagina, offset]
  );

  return {
    dados,
    total,
    pagina: filters.pagina,
    porPagina: filters.porPagina,
  };
}

export async function getPibByMunicipio(
  db: DbExecutor,
  codigoIbge: number,
  filters?: { ano?: number; anoInicio?: number; anoFim?: number }
) {
  const conditions: string[] = [`codigo_ibge = ?`];
  const params: unknown[] = [codigoIbge];

  if (filters?.ano) {
    conditions.push(`ano = ?`);
    params.push(filters.ano);
  } else {
    if (filters?.anoInicio) {
      conditions.push(`ano >= ?`);
      params.push(filters.anoInicio);
    }
    if (filters?.anoFim) {
      conditions.push(`ano <= ?`);
      params.push(filters.anoFim);
    }
  }

  return db.query<PibRow>(
    `SELECT * FROM pib_municipal WHERE ${conditions.join(' AND ')} ORDER BY ano`,
    params
  );
}

export async function getRankingPib(
  db: DbExecutor,
  ano: number,
  opts: { uf?: string; limite: number; constante: boolean }
) {
  const valorCol = opts.constante ? 'pib_constante' : 'pib_corrente';
  const conditions: string[] = [`p.ano = ?`];
  const params: unknown[] = [ano];

  if (opts.uf) {
    conditions.push(`m.uf = ?`);
    params.push(opts.uf.toUpperCase());
  }

  conditions.push(`p.${valorCol} IS NOT NULL`);

  return db.query<PibRow & MunicipioRow>(
    `SELECT p.*, m.*
     FROM pib_municipal p
     JOIN municipios m ON p.codigo_ibge = m.codigo_ibge
     WHERE ${conditions.join(' AND ')}
     ORDER BY p.${valorCol} DESC
     LIMIT ?`,
    [...params, opts.limite]
  );
}

export async function getCompararPib(
  db: DbExecutor,
  codigos: number[],
  filters?: { anoInicio?: number; anoFim?: number }
) {
  const placeholders = codigos.map(() => '?').join(',');
  return db.query<MunicipioRow>(
    `SELECT * FROM municipios WHERE codigo_ibge IN (${placeholders})`,
    codigos
  );
}

export async function getDeflatores(db: DbExecutor) {
  return db.query<DeflatorRow>(
    `SELECT * FROM deflator_ipca ORDER BY ano`
  );
}
