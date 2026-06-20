"""
Extrator de PIB municipal via API SIDRA/IBGE.

Tabela 5938 – Produto Interno Bruto dos Municípios
Variáveis:
    37 – PIB a preços correntes (R$ 1.000)
    38 – VAB Agropecuária (R$ 1.000)
    39 – VAB Indústria (R$ 1.000)
    40 – VAB Serviços (R$ 1.000)
    41 – VAB Administração pública (R$ 1.000)
    513 – PIB per capita (R$)

Nota: para 2022-2023, apenas PIB e PIB per capita estão disponíveis
(descontinuidade do SCN). Os campos VAB ficam NULL.
"""

import requests
import pandas as pd
import logging
import time

logger = logging.getLogger(__name__)

# API SIDRA base URL
SIDRA_BASE = "https://apisidra.ibge.gov.br/values"

# Variáveis de interesse
VARIAVEIS = "37,513,517,6575,525"

# Períodos: 2002-2023
PERIODOS_ANTIGOS = "2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021"
PERIODOS_NOVOS = "2022,2023"


def _baixar_lote(periodo: int, tentativa: int = 1) -> list[dict]:
    """Baixa dados da tabela 5938 para um ano específico."""
    url = (
        f"{SIDRA_BASE}"
        f"/t/5938"
        f"/n6/all"
        f"/v/{VARIAVEIS}"
        f"/p/{periodo}"
        f"/d/v37%200,v513%200,v517%200,v6575%200,v525%200"
    )
    logger.info("Requisitando SIDRA: ano=%s (tentativa %d)", periodo, tentativa)
    try:
        resp = requests.get(url, timeout=300)
        resp.raise_for_status()
        dados = resp.json()
        if dados and isinstance(dados[0], dict):
            header = dados[0]
            if "V" in header and header["V"] == "Valor":
                return dados[1:]
            return dados
        return dados
    except (requests.RequestException, ValueError) as e:
        if tentativa < 3:
            logger.warning("Erro na requisição, tentando novamente em 10s: %s", e)
            time.sleep(10)
            return _baixar_lote(periodo, tentativa + 1)
        raise


def _parse_registros(registros: list[dict]) -> pd.DataFrame:
    """Converte registros SIDRA em DataFrame pivotado por município/ano."""
    linhas = []
    for r in registros:
        try:
            codigo_ibge = int(r.get("D1C", 0))
            ano = int(r.get("D2C", 0))
            variavel_cod = r.get("D3C", "")
            valor_str = r.get("V", "")

            if codigo_ibge == 0 or ano == 0:
                continue

            # Valor pode ser "-", "...", ou vazio
            if valor_str in ("", "-", "...", "X", "..."):
                valor = None
            else:
                valor = float(valor_str)

            linhas.append({
                "codigo_ibge": codigo_ibge,
                "ano": ano,
                "variavel": variavel_cod,
                "valor": valor,
            })
        except (ValueError, TypeError):
            continue

    if not linhas:
        return pd.DataFrame()

    df = pd.DataFrame(linhas)

    # Mapear código da variável para nome da coluna
    var_map = {
        "37": "pib_corrente",
        "513": "vab_agropecuaria",
        "517": "vab_industria",
        "6575": "vab_servicos",
        "525": "vab_adm_publica",
    }
    df["coluna"] = df["variavel"].map(var_map)
    df = df.dropna(subset=["coluna"])

    # Pivotar: uma linha por (codigo_ibge, ano)
    pivot = df.pivot_table(
        index=["codigo_ibge", "ano"],
        columns="coluna",
        values="valor",
        aggfunc="first",
    ).reset_index()

    # Garantir todas as colunas existem
    for col in var_map.values():
        if col not in pivot.columns:
            pivot[col] = None

    # PIB e VAB vêm em R$ 1.000; converter para R$
    for col in ["pib_corrente", "vab_agropecuaria", "vab_industria",
                "vab_servicos", "vab_adm_publica"]:
        if col in pivot.columns:
            pivot[col] = pivot[col] * 1000

    return pivot


def extrair_pib() -> pd.DataFrame:
    """
    Extrai PIB municipal 2002-2023 da API SIDRA e retorna DataFrame com:
        codigo_ibge, ano, pib_corrente, pib_per_capita,
        vab_agropecuaria, vab_industria, vab_servicos, vab_adm_publica
    """
    logger.info("Iniciando extração do PIB municipal (SIDRA tabela 5938)...")

    registros = []
    
    anos = list(range(2002, 2024))
    for ano in anos:
        r = _baixar_lote(ano)
        logger.info("Ano %d: %d registros brutos", ano, len(r))
        registros.extend(r)
        time.sleep(1) # delay para não sobrecarregar a API

    logger.info("Total de registros brutos: %d", len(registros))

    df = _parse_registros(registros)
    logger.info(
        "PIB extraído: %d registros, anos %s-%s, municípios %d",
        len(df),
        df["ano"].min() if len(df) > 0 else "?",
        df["ano"].max() if len(df) > 0 else "?",
        df["codigo_ibge"].nunique() if len(df) > 0 else 0,
    )
    return df


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    df = extrair_pib()
    print(df.head(20))
    print(f"\nTotal: {len(df)} registros")
    print(f"Anos: {sorted(df['ano'].unique())}")
