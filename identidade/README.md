# Identidade Visual — SIDM

Sistema Integrado de Dados Municipais. Pasta de identidade pronta para plugar
num projeto web (Next.js / React / HTML).

```
identidade/
├── README.md                  ← você está aqui
├── brand-spec.md              ← briefing, arquétipo, sistema de logo, do/don't
├── colors.md                  ← cada cor: hex/RGB/HSL + contraste WCAG medido
├── typography.md              ← escala, pareamento, fallback, imports
├── tokens.css                 ← pluga no projeto; tema claro/escuro + reduced-motion
├── logo/
│   ├── sidm-logo-horizontal.svg          (marca principal)
│   ├── sidm-logo-horizontal-ondark.svg
│   ├── sidm-wordmark.svg
│   ├── sidm-symbol.svg                    (app icon, com container)
│   ├── sidm-symbol-ondark.svg
│   ├── sidm-symbol-mono.svg               (cor única)
│   ├── favicon.ico                        (16/32/48)
│   └── png/                               (exports 16→512 + lockups)
└── icons/
    ├── icons.md
    └── ic-*.svg                           (6 ícones outline)
```

## Começo rápido
1. Importe `tokens.css` no root do app.
2. Importe as fontes (ver `typography.md`).
3. Use `var(--brand-*)` nos componentes — nunca hex solto.
4. Favicon: aponte para `logo/favicon.ico`; app icon: `logo/png/sidm-symbol-180.png`.

Wordmarks já vêm em outline vetorial (não dependem da fonte instalada).
