"""
Deflacionamento de valores monetários usando IPCA acumulado.

Os fatores são calculados a partir das taxas anuais oficiais do IPCA
(IBGE/SNIPC), trazendo todos os valores para preços constantes de 2023.

Fator de deflação: para trazer um valor do ano X para preços de 2023,
multiplica-se pelo fator[2023] / fator[X], onde fator é o índice
acumulado desde um ano-base arbitrário.

Na prática, armazenamos diretamente o fator multiplicador:
    valor_constante = valor_corrente * fator_deflator[ano]
onde fator_deflator[2023] = 1.0
"""

import pandas as pd
import logging

logger = logging.getLogger(__name__)

# Taxas anuais do IPCA (% ao ano) – fonte: IBGE/SNIPC via BCB
# https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos/9256-indice-nacional-de-precos-ao-consumidor-amplo.html
IPCA_TAXAS_ANUAIS = {
    2002: 12.53,
    2003: 9.30,
    2004: 7.60,
    2005: 5.69,
    2006: 3.14,
    2007: 4.46,
    2008: 5.90,
    2009: 4.31,
    2010: 5.91,
    2011: 6.50,
    2012: 5.84,
    2013: 5.91,
    2014: 6.41,
    2015: 10.67,
    2016: 6.29,
    2017: 2.95,
    2018: 3.75,
    2019: 4.31,
    2020: 4.52,
    2021: 10.06,
    2022: 5.79,
    2023: 4.62,
}


def calcular_fatores_deflator(ano_base: int = 2023) -> dict[int, float]:
    """
    Calcula fatores multiplicadores para deflacionar valores correntes
    para preços constantes do ano_base.

    Retorna dict {ano: fator} onde:
        valor_constante = valor_corrente * fator
        fator[ano_base] = 1.0
    """
    anos = sorted(IPCA_TAXAS_ANUAIS.keys())

    # Calcular índice acumulado (base = primeiro ano da série)
    indice = {}
    indice[anos[0]] = 1.0
    for i in range(1, len(anos)):
        taxa = IPCA_TAXAS_ANUAIS[anos[i]] / 100.0
        indice[anos[i]] = indice[anos[i - 1]] * (1 + taxa)

    # Fator deflator: quanto multiplicar para trazer ao ano_base
    indice_base = indice[ano_base]
    fatores = {ano: indice_base / indice[ano] for ano in anos}

    logger.info(
        "Fatores IPCA calculados (base %d=1.0): %d anos",
        ano_base,
        len(fatores),
    )
    return fatores


def obter_tabela_deflator() -> pd.DataFrame:
    """
    Retorna DataFrame com colunas [ano, fator] para carga no banco.
    """
    fatores = calcular_fatores_deflator()
    df = pd.DataFrame(
        [{"ano": ano, "fator": round(fator, 8)} for ano, fator in sorted(fatores.items())]
    )
    return df


def deflacionar_pib(df_pib: pd.DataFrame) -> pd.DataFrame:
    """
    Adiciona coluna 'pib_constante' ao DataFrame de PIB, calculada como:
        pib_constante = pib_corrente * fator_deflator[ano]

    O DataFrame deve ter colunas: ano, pib_corrente
    """
    fatores = calcular_fatores_deflator()
    df = df_pib.copy()

    df["pib_constante"] = df.apply(
        lambda row: (
            row["pib_corrente"] * fatores.get(row["ano"], 1.0)
            if pd.notna(row["pib_corrente"])
            else None
        ),
        axis=1,
    )

    logger.info("PIB deflacionado: %d registros com pib_constante", df["pib_constante"].notna().sum())
    return df


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    fatores = calcular_fatores_deflator()
    print("Fatores de deflação IPCA (base 2023=1.0):")
    for ano, fator in sorted(fatores.items()):
        print(f"  {ano}: {fator:.6f}")
