/**
 * SIDM — GraphQL Resolvers
 *
 * Conectam o schema GraphQL às queries SQL.
 * Cada resolver recebe o DbExecutor via context.
 */

import type { DbExecutor, MunicipioRow, PibRow, DeflatorRow } from '../db/queries';
import {
  getMunicipio,
  getMunicipios,
  getPibByMunicipio,
  getRankingPib,
  getCompararPib,
  getDeflatores,
} from '../db/queries';

// ─── Helpers para mapear rows SQL → tipos GraphQL ────────────────────

function mapMunicipio(row: MunicipioRow) {
  return {
    codigoIbge: row.codigo_ibge,
    nome: row.nome,
    codigoUf: row.codigo_uf,
    siglaUf: row.sigla_uf,
    nomeUf: row.nome_uf,
    regiaoMetropolitana: row.regiao_metropolitana,
    nomeMesorregiao: row.nome_mesorregiao,
    nomeMicrorregiao: row.nome_microrregiao,
    nomeRegiaoImediata: row.nome_regiao_imediata,
    municipioSedeRegiaoImediata: row.municipio_sede_regiao_imediata,
    nomeRegiaoIntermediaria: row.nome_regiao_intermediaria,
    municipioSedeRegiaoIntermediaria: row.municipio_sede_regiao_intermediaria,
    nomeConcentracaoUrbana: row.nome_concentracao_urbana,
    tipoConcentracaoUrbana: row.tipo_concentracao_urbana,
    nomeArranjoPopulacional: row.nome_arranjo_populacional,
    hierarquiaUrbana: row.hierarquia_urbana,
    hierarquiaUrbanaResumida: row.hierarquia_urbana_resumida,
    nomeRegiaoRural: row.nome_regiao_rural,
    classificacaoNucleoRural: row.classificacao_nucleo_rural,
    amazoniaLegal: row.amazonia_legal,
    semiarido: row.semiarido,
    cidadeRegiaoSp: row.cidade_regiao_sp
  };
}

function mapPib(row: PibRow) {
  return {
    ano: row.ano,
    pibCorrente: row.pib,
    pibReal: row.pib_real,
    pibPerCapita: row.pib_per_capita,
    pibPerCapitaReal: row.pib_per_capita_real,
    vabAgropecuaria: row.vab_agropecuaria,
    vabIndustria: row.vab_industria,
    vabServicos: row.vab_servicos,
    vabAdmPublica: row.vab_administracao_publica,
  };
}

function mapDeflator(row: DeflatorRow) {
  return {
    ano: row.ano,
    indice: row.indice,
    variacaoPct: row.variacao_pct,
    fonte: row.fonte,
    baseAno: row.base_ano
  }
}

// ─── Context type ────────────────────────────────────────────────────

export interface GraphQLContext {
  db: DbExecutor;
}

// ─── Resolvers ───────────────────────────────────────────────────────

export const resolvers = {
  Query: {
    municipio: async (
      _parent: unknown,
      args: { codigoIbge: number },
      context: GraphQLContext
    ) => {
      const row = await getMunicipio(context.db, args.codigoIbge);
      return row ? mapMunicipio(row) : null;
    },

    municipios: async (
      _parent: unknown,
      args: {
        uf?: string;
        nome?: string;
        regiao?: string;
        pagina?: number;
        porPagina?: number;
      },
      context: GraphQLContext
    ) => {
      const pagina = args.pagina ?? 1;
      const porPagina = Math.min(args.porPagina ?? 20, 100); // max 100

      const result = await getMunicipios(context.db, {
        uf: args.uf,
        nome: args.nome,
        regiao: args.regiao,
        pagina,
        porPagina,
      });

      return {
        dados: result.dados.map(mapMunicipio),
        paginacao: {
          total: result.total,
          pagina: result.pagina,
          porPagina: result.porPagina,
          totalPaginas: Math.ceil(result.total / result.porPagina),
        },
      };
    },

    rankingPib: async (
      _parent: unknown,
      args: { ano: number; uf?: string; limite?: number; constante?: boolean },
      context: GraphQLContext
    ) => {
      const rows = await getRankingPib(context.db, args.ano, {
        uf: args.uf,
        limite: args.limite ?? 10,
        constante: args.constante ?? false,
      });

      const valorCol = (args.constante ?? false) ? 'pib_real' : 'pib';

      return rows.map((row, index) => ({
        posicao: index + 1,
        municipio: mapMunicipio(row),
        valor: (row as unknown as Record<string, unknown>)[valorCol] as number,
      }));
    },

    compararPib: async (
      _parent: unknown,
      args: { codigos: number[]; anoInicio?: number; anoFim?: number },
      context: GraphQLContext
    ) => {
      const rows = await getCompararPib(context.db, args.codigos);
      return rows.map(mapMunicipio);
    },

    fontes: () => [
      {
        modulo: 'PIB Municipal',
        fonte: 'IBGE — Produto Interno Bruto dos Municípios',
        url: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html',
        periodoInicio: 2002,
        periodoFim: 2023,
        ultimaAtualizacao: '2025-12-01',
        notas: 'VAB setorial indisponível para 2022-2023 por reformulação do SCN.',
      },
    ],

    deflatores: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      const rows = await getDeflatores(context.db);
      return rows.map(mapDeflator);
    },
  },

  // ─── Field resolvers (nested) ────────────────────────────────────

  Municipio: {
    pib: async (
      parent: { codigoIbge: number },
      args: { ano?: number; anoInicio?: number; anoFim?: number },
      context: GraphQLContext
    ) => {
      const rows = await getPibByMunicipio(context.db, parent.codigoIbge, {
        ano: args.ano,
        anoInicio: args.anoInicio,
        anoFim: args.anoFim,
      });
      return rows.map(mapPib);
    },
  },
};
