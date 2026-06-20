"""
Normalização e padronização de dados municipais.
"""

import pandas as pd
import unicodedata
import logging

logger = logging.getLogger(__name__)


def normalizar_texto(texto: str) -> str:
    """Normaliza texto Unicode para NFC (forma canônica composta)."""
    if not isinstance(texto, str):
        return texto
    return unicodedata.normalize("NFC", texto.strip())


def padronizar_codigo_ibge(codigo) -> int | None:
    """Garante que código IBGE é inteiro de 7 dígitos."""
    try:
        cod = int(codigo)
        if 1100000 <= cod <= 5399999:
            return cod
        return None
    except (ValueError, TypeError):
        return None


def normalizar_municipios(df: pd.DataFrame) -> pd.DataFrame:
    """
    Normaliza DataFrame de municípios:
    - Unicode NFC nos nomes
    - Código IBGE validado
    - Remove duplicatas
    """
    df = df.copy()
    df["nome"] = df["nome"].apply(normalizar_texto)
    df["uf"] = df["uf"].str.upper().str.strip()
    df["regiao"] = df["regiao"].apply(normalizar_texto)
    df["codigo_ibge"] = df["codigo_ibge"].apply(padronizar_codigo_ibge)
    df = df.dropna(subset=["codigo_ibge"])
    df["codigo_ibge"] = df["codigo_ibge"].astype(int)
    df = df.drop_duplicates(subset=["codigo_ibge"])
    logger.info("Municípios normalizados: %d registros", len(df))
    return df


def normalizar_pib(df: pd.DataFrame) -> pd.DataFrame:
    """
    Normaliza DataFrame de PIB:
    - Código IBGE validado
    - Anos dentro do intervalo esperado
    - Valores numéricos limpos
    """
    df = df.copy()
    df["codigo_ibge"] = df["codigo_ibge"].apply(padronizar_codigo_ibge)
    df = df.dropna(subset=["codigo_ibge"])
    df["codigo_ibge"] = df["codigo_ibge"].astype(int)

    # Filtrar anos válidos
    df = df[(df["ano"] >= 2002) & (df["ano"] <= 2023)]

    # Remover duplicatas (manter primeiro)
    df = df.drop_duplicates(subset=["codigo_ibge", "ano"])

    # Garantir ordem das colunas
    colunas = [
        "codigo_ibge", "ano", "pib_corrente", "pib_constante",
        "pib_per_capita", "vab_agropecuaria", "vab_industria",
        "vab_servicos", "vab_adm_publica",
    ]
    for col in colunas:
        if col not in df.columns:
            df[col] = None

    df = df[colunas]
    logger.info("PIB normalizado: %d registros", len(df))
    return df


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    print("Módulo de normalização carregado com sucesso.")
