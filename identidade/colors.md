# SIDM — Sistema de cor

Paleta **Brasil em tom sóbrio**: verde-mata, ouro contido e azul-noite. Evoca o
país sem a bandeira literal (verde-neon + amarelo-gema = ar de governo/cafona).
Arquétipo Sábio: clareza, não excesso. **Todo contraste abaixo foi calculado pela
fórmula de luminância WCAG 2.x — não estimado a olho.** Mínimos: 4.5:1 texto
normal, 3:1 texto grande / componentes de UI.

## Marca

| Token | Hex | HSL | Uso | Contraste medido |
|-------|-----|-----|-----|------------------|
| `--brand-primary` | `#0B5E37` | 152° 79% 21% | Verde-mata assinatura. Fill, símbolo, links. | 7.86:1 vs branco — **AAA** |
| `--brand-primary-strong` | `#084A2C` | 152° 80% 16% | Verde como **texto** sobre claro. | 10.4:1 — **AAA** |
| `--brand-primary-contrast` | `#FFFFFF` | — | Texto sobre fill verde. | 7.86:1 — **AAA** |
| `--brand-accent` | `#8A6400` | 43° 100% 27% | Ouro contido — detalhe, texto de destaque. | 5.38:1 — **AA** |
| `--brand-accent-bright` | `#F2B807` | 45° 95% 49% | Ouro vivo — hub do símbolo, brilho sobre escuro. | 9.90:1 vs azul-noite — **AAA** |

> **Verde + ouro = leitura brasileira imediata**, mas a profundidade do verde dá
> seriedade e o ouro entra com parcimônia (nunca o amarelo-gema puro). O **azul**
> da bandeira aparece como surface do tema escuro.

## Neutros (≈80% da área — levíssima temperatura verde/fria amarra o sistema)

| Token | Hex | Uso | Contraste |
|-------|-----|-----|-----------|
| `--brand-surface` | `#FFFFFF` | Fundo base claro. | — |
| `--brand-surface-muted` | `#F1F5F3` | Cartões, blocos de código, seções. | — |
| `--brand-surface-sunken` | `#E7EDEA` | Áreas rebaixadas, hovers. | — |
| `--brand-border` | `#DCE5E0` | Bordas, divisórias. | — |
| `--brand-text` | `#10241A` | Texto principal (tinta verde-escura). | 16.3:1 — **AAA** |
| `--brand-text-muted` | `#4E5E57` | Texto secundário, legendas. | 6.86:1 — **AA** |

## Semânticas — todas distintas da marca

> Com a marca em **verde** e o acento em **ouro**, as semânticas tiveram que
> migrar para não colidir: success virou verde-**teal** (componente azul o separa
> do verde-puro), e warning virou **laranja-queimado** (separa do ouro).
> Daltonismo (~8% dos homens): **nenhum sinal depende só de cor** — sempre ícone/texto.

| Token | Hex (claro) | Hex (escuro) | Contraste claro |
|-------|-------------|--------------|-----------------|
| `--brand-success` | `#0E7C57` | `#46C97E` | 5.20:1 — AA |
| `--brand-warning` | `#A8521E` | `#E59B4A` | 5.40:1 — AA |
| `--brand-error` | `#BE2F26` | `#E8736B` | 5.79:1 — AA |
| `--brand-info` | = primary | = primary | 7.86:1 — AAA |

## Tema escuro — azul-noite (o azul da bandeira)

| Token | Hex | Contraste vs surface |
|-------|-----|----------------------|
| `--brand-surface` | `#0A1633` | — |
| `--brand-surface-muted` | `#111E40` | — |
| `--brand-text` | `#E8EFEA` | 15.3:1 — AAA |
| `--brand-text-muted` | `#9BB0AE` | 7.84:1 — AAA |
| `--brand-primary` (verde claro) | `#46C97E` | 8.44:1 — AAA |
| `--brand-accent` (ouro) | `#F2B807` | 9.90:1 — AAA |

## Pares proibidos
- **Ouro-acento `#8A6400` como texto pequeno sobre fundos médios** — só passa AA sobre branco; teste antes em outros fundos.
- **Verde-marca ao lado de success-fill sem ícone** — matizes próximos; o ícone de check é o que desambigua.
- **Ouro-acento ao lado de warning** — mantenha distância visual; warning é laranja, não amarelo.
- Não usar **error sobre warning** nem **ouro vivo como texto** (é cor de preenchimento/gráfico).

## Checklist de cor — status
- [x] Todo par texto/fundo passa 4.5:1 (ou 3:1 se grande)
- [x] Verde-marca testado contra branco **e** contra azul-noite
- [x] Semânticas separadas da marca por matiz/luminância (verde-teal, laranja)
- [x] Nenhum sinal de UI depende só de cor
- [x] Valores medidos documentados (esta tabela)
- [x] Tema escuro mantém os mesmos mínimos
