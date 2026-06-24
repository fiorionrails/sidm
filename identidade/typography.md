# SIDM — Tipografia

Marca técnica → três famílias: **display + corpo + mono**. As três têm DNA
grotesco/de engenharia e conversam entre si.

## As famílias

| Papel | Fonte | Licença | Por quê |
|-------|-------|---------|---------|
| **Display** (títulos) | **Space Grotesk** | OFL (livre, sem limite de pageview) | Geométrica com caráter técnico; distintiva sem ser exótica. Evita o "Inter em display", que é o default de IA. |
| **Corpo** (leitura longa) | **IBM Plex Sans** | OFL | Humanista, altamente legível, feita pela IBM para contexto técnico/institucional — carrega credibilidade de engenharia. |
| **Mono** (código, dados, IDs) | **IBM Plex Mono** | OFL | Irmã do corpo: code blocks e nomes de campo GraphQL ficam coesos com o texto. |

> Pareamento: Space Grotesk (display) + IBM Plex Sans (corpo) funcionam porque
> ambas são grotescas de espírito, mas a Space tem mais personalidade nos títulos
> e a Plex mais conforto na leitura longa. A mono fecha o tripé técnico.

## Import (web)

```css
/* via Google Fonts (ambas OFL) */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
```

Para self-host (recomendado em produção, evita request a terceiros): baixe os
`.woff2` de fontsource (`@fontsource/space-grotesk`, `@fontsource/ibm-plex-sans`,
`@fontsource/ibm-plex-mono`) e sirva localmente.

## Fallback stack
Especificado em `tokens.css`:
- Display: `"Space Grotesk", "Hanken Grotesk", system-ui, sans-serif`
- Corpo: `"IBM Plex Sans", system-ui, -apple-system, sans-serif`
- Mono: `"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace`

## Escala de tipo (base 16px, razão ~1.25)

| Token | Tamanho | Fonte / Peso | Uso |
|-------|---------|--------------|-----|
| `display-xl` | 3.05rem / 49px | Space Grotesk 700 | Hero do site |
| `display-l` | 2.44rem / 39px | Space Grotesk 700 | H1 |
| `display-m` | 1.95rem / 31px | Space Grotesk 600 | H2 |
| `title` | 1.56rem / 25px | Space Grotesk 600 | H3, cards |
| `subtitle` | 1.25rem / 20px | IBM Plex Sans 600 | H4, lead |
| `body` | 1rem / 16px | IBM Plex Sans 400 | Texto base |
| `body-sm` | 0.875rem / 14px | IBM Plex Sans 400 | Legendas, meta |
| `code` | 0.875rem / 14px | IBM Plex Mono 400 | Blocos de código, campos GraphQL, IDs |
| `caption` | 0.78rem / 12.5px | IBM Plex Sans 500 | Rótulos, eyebrows (caixa alta + tracking) |

## Pesos em uso
- Space Grotesk: **500** (rótulos), **600** (títulos médios), **700** (heros/H1).
- IBM Plex Sans: **400** (corpo), **500/600** (ênfase, subtítulos), **700** (raro).
- IBM Plex Mono: **400** (código), **500** (destaque inline em mono).

## Regras
- **Entrelinha:** títulos `1.15` (apertado), corpo `1.6` (respiro p/ leitura longa).
- **Tracking:** display com leve `-0.01em`; rótulos em caixa alta com `+0.04em`.
- **Mono é semântica:** use IBM Plex Mono sempre que o conteúdo for "coisa de
  máquina" (campo de API, código de município, endpoint, ID). Isso ensina o
  leitor a reconhecer dado técnico sem precisar de explicação.
- Nunca usar a mono para parágrafos longos de leitura.
