"""
Extrator de dados base dos municípios brasileiros via API do IBGE.
Fonte: https://servicodados.ibge.gov.br/api/v1/localidades/municipios
"""

import requests
import pandas as pd
import logging

logger = logging.getLogger(__name__)

URL_MUNICIPIOS = (
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
    "?view=nivelado"
)

# Mapeamento código de UF → sigla (IBGE)
UF_CODIGO_SIGLA = {
    11: "RO", 12: "AC", 13: "AM", 14: "RR", 15: "PA", 16: "AP", 17: "TO",
    21: "MA", 22: "PI", 23: "CE", 24: "RN", 25: "PB", 26: "PE", 27: "AL",
    28: "SE", 29: "BA",
    31: "MG", 32: "ES", 33: "RJ", 35: "SP",
    41: "PR", 42: "SC", 43: "RS",
    50: "MS", 51: "MT", 52: "GO", 53: "DF",
}

REGIAO_CODIGO_NOME = {
    1: "Norte", 2: "Nordeste", 3: "Sudeste", 4: "Sul", 5: "Centro-Oeste",
}


def extrair_municipios() -> pd.DataFrame:
    """
    Busca todos os municípios brasileiros na API do IBGE e retorna
    um DataFrame normalizado com:
        codigo_ibge, nome, uf, regiao
    """
    logger.info("Baixando lista de municípios da API do IBGE...")
    resp = requests.get(URL_MUNICIPIOS, timeout=120)
    resp.raise_for_status()
    dados = resp.json()
    logger.info("Recebidos %d registros da API.", len(dados))

    registros = []
    for m in dados:
        codigo_ibge = int(m["municipio-id"])
        nome = m["municipio-nome"]
        uf_id = int(m["UF-id"])
        uf_sigla = m.get("UF-sigla", UF_CODIGO_SIGLA.get(uf_id, "??"))
        regiao_id = int(m["regiao-id"])
        regiao_nome = m.get(
            "regiao-nome", REGIAO_CODIGO_NOME.get(regiao_id, "Desconhecida")
        )
        registros.append({
            "codigo_ibge": codigo_ibge,
            "nome": nome,
            "uf": uf_sigla,
            "regiao": regiao_nome,
        })

    df = pd.DataFrame(registros)
    logger.info(
        "Municípios extraídos: %d (UFs: %d)",
        len(df),
        df["uf"].nunique(),
    )
    return df


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    df = extrair_municipios()
    print(df.head(10))
    print(f"\nTotal: {len(df)} municípios")
