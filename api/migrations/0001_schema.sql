-- SIDM — Schema do banco de dados
-- Migração inicial: tabelas de municípios, PIB municipal e deflator IPCA

-- Tabela base de municípios (IBGE)
CREATE TABLE IF NOT EXISTS municipios (
    codigo_ibge  INTEGER PRIMARY KEY,  -- código IBGE de 7 dígitos
    nome         TEXT NOT NULL,
    uf           TEXT NOT NULL,         -- sigla UF (ex: SP, PR, MG)
    regiao       TEXT NOT NULL,         -- Norte, Nordeste, Sudeste, Sul, Centro-Oeste
    populacao    INTEGER,               -- estimativa mais recente
    latitude     REAL,
    longitude    REAL
);

-- PIB Municipal (IBGE, 2002-2023)
CREATE TABLE IF NOT EXISTS pib_municipal (
    codigo_ibge       INTEGER NOT NULL,
    ano               INTEGER NOT NULL,
    pib_corrente      REAL,    -- R$ mil, preços correntes
    pib_constante     REAL,    -- R$ mil, deflacionado IPCA (base 2023)
    pib_per_capita    REAL,    -- R$, preços correntes
    vab_agropecuaria  REAL,    -- R$ mil (NULL para 2022-2023 - descontinuidade SCN)
    vab_industria     REAL,    -- R$ mil (NULL para 2022-2023)
    vab_servicos      REAL,    -- R$ mil (NULL para 2022-2023)
    vab_adm_publica   REAL,    -- R$ mil (NULL para 2022-2023)
    PRIMARY KEY (codigo_ibge, ano),
    FOREIGN KEY (codigo_ibge) REFERENCES municipios(codigo_ibge)
);

-- Índice deflator IPCA (acumulado, base 2023 = 1.0)
CREATE TABLE IF NOT EXISTS deflator_ipca (
    ano    INTEGER PRIMARY KEY,
    fator  REAL NOT NULL  -- valor_corrente × fator = valor_constante_2023
);

-- Índices para performance das queries GraphQL
CREATE INDEX IF NOT EXISTS idx_pib_ano ON pib_municipal(ano);
CREATE INDEX IF NOT EXISTS idx_municipios_uf ON municipios(uf);
CREATE INDEX IF NOT EXISTS idx_municipios_nome ON municipios(nome COLLATE NOCASE);
