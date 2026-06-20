import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const municipio = sqliteTable('municipio', {
  codigoIbge: integer('codigo_ibge').primaryKey(),
  nome: text('nome').notNull(),
  codigoGrandeRegiao: integer('codigo_grande_regiao').notNull(),
  nomeGrandeRegiao: text('nome_grande_regiao').notNull(),
  codigoUf: integer('codigo_uf').notNull(),
  siglaUf: text('sigla_uf').notNull(),
  nomeUf: text('nome_uf').notNull(),
  regiaoMetropolitana: text('regiao_metropolitana'),
  codigoMesorregiao: integer('codigo_mesorregiao').notNull(),
  nomeMesorregiao: text('nome_mesorregiao').notNull(),
  codigoMicrorregiao: integer('codigo_microrregiao').notNull(),
  nomeMicrorregiao: text('nome_microrregiao').notNull(),
  codigoRegiaoImediata: integer('codigo_regiao_imediata').notNull(),
  nomeRegiaoImediata: text('nome_regiao_imediata').notNull(),
  municipioSedeRegiaoImediata: text('municipio_sede_regiao_imediata').notNull(),
  codigoRegiaoIntermediaria: integer('codigo_regiao_intermediaria').notNull(),
  nomeRegiaoIntermediaria: text('nome_regiao_intermediaria').notNull(),
  municipioSedeRegiaoIntermediaria: text('municipio_sede_regiao_intermediaria').notNull(),
  codigoConcentracaoUrbana: integer('codigo_concentracao_urbana'),
  nomeConcentracaoUrbana: text('nome_concentracao_urbana'),
  tipoConcentracaoUrbana: text('tipo_concentracao_urbana'),
  codigoArranjoPopulacional: integer('codigo_arranjo_populacional'),
  nomeArranjoPopulacional: text('nome_arranjo_populacional'),
  hierarquiaUrbana: text('hierarquia_urbana').notNull(),
  hierarquiaUrbanaResumida: text('hierarquia_urbana_resumida').notNull(),
  codigoRegiaoRural: integer('codigo_regiao_rural').notNull(),
  nomeRegiaoRural: text('nome_regiao_rural').notNull(),
  classificacaoNucleoRural: text('classificacao_nucleo_rural').notNull(),
  amazoniaLegal: text('amazonia_legal').notNull(),
  semiarido: text('semiarido').notNull(),
  cidadeRegiaoSp: text('cidade_regiao_sp').notNull()
});

export const pibMunicipal = sqliteTable('pib_municipal', {
  id: integer('id').primaryKey(),
  codigoIbge: integer('codigo_ibge').notNull().references(() => municipio.codigoIbge),
  ano: integer('ano').notNull(),
  vabAgropecuaria: real('vab_agropecuaria'),
  vabIndustria: real('vab_industria'),
  vabServicos: real('vab_servicos'),
  vabAdministracaoPublica: real('vab_administracao_publica'),
  vabTotal: real('vab_total'),
  impostosLiquidos: real('impostos_liquidos'),
  pib: real('pib').notNull(),
  pibPerCapita: real('pib_per_capita').notNull(),
  atividadeMaiorVab: text('atividade_maior_vab'),
  atividadeSegundoMaiorVab: text('atividade_segundo_maior_vab'),
  atividadeTerceiroMaiorVab: text('atividade_terceiro_maior_vab'),
  pibReal: real('pib_real'),
  pibPerCapitaReal: real('pib_per_capita_real')
});

export const deflator = sqliteTable('deflator', {
  ano: integer('ano').primaryKey(),
  indice: real('indice').notNull(),
  variacaoPct: real('variacao_pct'),
  fonte: text('fonte').notNull(),
  baseAno: integer('base_ano').notNull()
});
