/**
 * SIDM — Schema GraphQL
 * Sistema Integrado de Dados Municipais
 *
 * Schema-first SDL expondo dados públicos municipais brasileiros.
 */

export const typeDefs = /* GraphQL */ `
  """
  Município brasileiro identificado pelo código IBGE de 7 dígitos.
  """
  type Municipio {
    codigoIbge: Int!
    nome: String!
    codigoUf: Int!
    siglaUf: String!
    nomeUf: String!
    regiaoMetropolitana: String
    nomeMesorregiao: String!
    nomeMicrorregiao: String!
    nomeRegiaoImediata: String!
    municipioSedeRegiaoImediata: String!
    nomeRegiaoIntermediaria: String!
    municipioSedeRegiaoIntermediaria: String!
    nomeConcentracaoUrbana: String
    tipoConcentracaoUrbana: String
    nomeArranjoPopulacional: String
    hierarquiaUrbana: String!
    hierarquiaUrbanaResumida: String!
    nomeRegiaoRural: String!
    classificacaoNucleoRural: String!
    amazoniaLegal: String!
    semiarido: String!
    cidadeRegiaoSp: String!
    "Série histórica do PIB municipal (filtro opcional por ano ou intervalo)"
    pib(ano: Int, anoInicio: Int, anoFim: Int): [PibMunicipal!]!
  }

  """
  PIB Municipal — fonte IBGE (2002–2023).
  Valores monetários em R$ mil. O PIB Real é deflacionado pelo Deflator Implícito do PIB (base 2021).
  """
  type PibMunicipal {
    ano: Int!
    "PIB a preços correntes (R$ mil)"
    pibCorrente: Float
    "PIB deflacionado pelo Deflator Implícito do PIB, base 2021 (R$ mil)"
    pibReal: Float
    "PIB per capita a preços correntes (R$)"
    pibPerCapita: Float
    "PIB per capita deflacionado pelo Deflator Implícito do PIB, base 2021 (R$)"
    pibPerCapitaReal: Float
    "VAB Agropecuária (R$ mil) — NULL para 2022-2023 por descontinuidade do SCN"
    vabAgropecuaria: Float
    "VAB Indústria (R$ mil) — NULL para 2022-2023"
    vabIndustria: Float
    "VAB Serviços (R$ mil) — NULL para 2022-2023"
    vabServicos: Float
    "VAB Administração Pública (R$ mil) — NULL para 2022-2023"
    vabAdmPublica: Float
  }

  "Item de um ranking de municípios"
  type RankingItem {
    posicao: Int!
    municipio: Municipio!
    valor: Float!
  }

  "Fonte de dados utilizada pelo SIDM"
  type FonteDados {
    modulo: String!
    fonte: String!
    url: String!
    periodoInicio: Int!
    periodoFim: Int!
    ultimaAtualizacao: String!
    notas: String
  }

  "Deflator do PIB utilizado para converter valores correntes em reais"
  type DeflatorPib {
    ano: Int!
    "Índice do deflator (base 2021=100)"
    indice: Float!
    "Variação percentual anual"
    variacaoPct: Float
    fonte: String!
    baseAno: Int!
  }

  "Informações de paginação"
  type PaginaInfo {
    total: Int!
    pagina: Int!
    porPagina: Int!
    totalPaginas: Int!
  }

  "Resultado paginado de municípios"
  type MunicipiosResult {
    dados: [Municipio!]!
    paginacao: PaginaInfo!
  }

  type Query {
    "Busca um município pelo código IBGE de 7 dígitos"
    municipio(codigoIbge: Int!): Municipio

    "Lista municípios com filtros e paginação"
    municipios(
      uf: String
      nome: String
      regiao: String
      pagina: Int = 1
      porPagina: Int = 20
    ): MunicipiosResult!

    "Ranking de municípios por PIB em um ano específico"
    rankingPib(
      ano: Int!
      uf: String
      limite: Int = 10
      "Se true, usa PIB deflacionado (constante). Se false, usa corrente."
      constante: Boolean = false
    ): [RankingItem!]!

    "Compara PIB de múltiplos municípios lado a lado"
    compararPib(
      codigos: [Int!]!
      anoInicio: Int
      anoFim: Int
    ): [Municipio!]!

    "Lista fontes de dados e datas de atualização"
    fontes: [FonteDados!]!

    "Tabela de deflatores do PIB utilizados nas séries deflacionadas"
    deflatores: [DeflatorPib!]!
  }
`;
