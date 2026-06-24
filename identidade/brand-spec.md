# SIDM — Identidade Visual

**Sistema Integrado de Dados Municipais**
Camada de infraestrutura que faz ETL de fontes oficiais (IBGE e afins) e serve
dados municipais brasileiros via API GraphQL, limpa e versionada, para
desenvolvedores e pesquisadores.

---

## Briefing (a fundação)

| Item | Definição |
|------|-----------|
| **Posicionamento** | A fonte confiável de dado municipal: dispersos lá fora, integrados e prontos para consumir aqui. |
| **Arquétipo dominante** | **O Sábio** — verdade, precisão, fonte confiável. Secundário leve: o Arquiteto (constrói infraestrutura). |
| **Público** | Devs, pesquisadores, analistas de dados, civic tech, jornalismo de dados. Gente técnica que valoriza confiabilidade e documentação. |
| **Categoria** | Developer infrastructure / data API. |
| **Cor** | Brasil em tom sóbrio: verde-mata + ouro contido + azul-noite. Evoca o país sem a bandeira literal. |
| **Evitar parecer** | Dois clichês opostos: (1) o *azul-governo burocrático* dos portais públicos; (2) o *dark + roxo-gradiente + mono* genérico de dev-tool (Stripe/Supabase/Linear). SIDM fica no meio: credibilidade institucional com acabamento de ferramenta moderna. |
| **Onde vive** | Docs, playground GraphQL, README no GitHub, site, favicon. Muito code block — dark mode é prioridade, não detalhe. |

> O arquétipo é **único** de propósito. Misturar "sério + brincalhão + barato"
> é o erro nº1 que gera visual genérico. Tudo abaixo deriva do Sábio.

---

## O conceito do símbolo

O nome carrega a ideia: **dados municipais integrados**. O símbolo materializa isso
como **território**: um mapa dividido em regiões (os municípios, em dois tons de
verde) que se encaixam num todo coeso. Uma região está **integrada e destacada em
ouro**, com o ponto de dado dentro — é o município já dentro do sistema.

Diferente de um grafo de rede genérico (que poderia ser logo de qualquer coisa),
a malha territorial é específica do domínio: lê-se como mapa de municípios. Verde +
ouro reforça a leitura brasileira. Testado a 16px (favicon) e em cor única.

## Sistema de logo

Quase nunca é um logo só. As peças, e quando usar cada uma:

| Arquivo | Uso |
|---------|-----|
| `logo/sidm-logo-horizontal.svg` | **Marca principal.** Onde há espaço horizontal: header, docs, README. |
| `logo/sidm-logo-horizontal-ondark.svg` | Mesma, para fundo escuro. |
| `logo/sidm-wordmark.svg` | Só o texto. Contextos apertados onde o símbolo não cabe. |
| `logo/sidm-symbol.svg` | **Só o símbolo, com container.** App icon, avatar, OG image. |
| `logo/sidm-symbol-ondark.svg` | Símbolo sem container, para aplicar sobre fundo escuro. |
| `logo/sidm-symbol-mono.svg` | **Cor única** (`currentColor`). Favicon mono, bordado, serigrafia, carimbo. O hub vira anel para se distinguir sem cor. |
| `logo/favicon.ico` | Favicon multi-resolução (16/32/48). |
| `logo/png/` | Exports PNG (16→512) e lockups em alta-res. |

### Princípios inegociáveis (todos testados)
- **Legível a 16px** — o símbolo mantém o "Y" e o hub no favicon.
- **Funciona em cor única** — versão mono entregue.
- **Silhueta distintiva** — apertando os olhos, ainda é reconhecível e não vira "logo qualquer da categoria".

### Do / Don't
- **Faça:** respeite a área de proteção (≈ metade da altura do símbolo em volta da marca). Use a versão `ondark` em fundos escuros, nunca o lockup claro sobre escuro.
- **Não faça:** recolorir o símbolo fora da paleta; esticar/distorcer; aplicar sombra ou gradiente; reescrever "SIDM" em outra fonte que não Space Grotesk; girar o símbolo.

---

## Os 5 elementos — resumo

1. **Logo** — sistema acima.
2. **Cor** — ver `colors.md` (cada par texto/fundo medido em WCAG).
3. **Tipografia** — ver `typography.md` (Space Grotesk + IBM Plex).
4. **Iconografia** — `icons/`: outline, traço 1.8, grid 24, cantos arredondados. O ícone de API/ETL ecoa o motivo de nós do símbolo.
5. **Movimento** — sutil e rápido (120–240ms). Momento-assinatura: na carga, os três nós convergem para o hub (o "build" da integração). Sempre com fallback `prefers-reduced-motion`.

---

## Direção de imagem
Marca de infraestrutura quase não usa foto. Prefira **visualização de dado** como
imagem de marca: mapas coropléticos sóbrios (na escala verde→ouro), grids de
tabela, diagramas de schema/grafo GraphQL. Rejeite clichê corporativo de banco de
imagem (pessoas apontando para gráfico, aperto de mãos). Se precisar de foto, que
seja território/cidade tratado na paleta, nunca stock genérico.

---

## Aplicação técnica
Plugue `tokens.css` no projeto e referencie `var(--brand-*)` em todo lugar —
nunca hex solto no componente. O arquivo já traz tema claro/escuro e
`prefers-reduced-motion`. Sign-off da identidade antes do rollout: mudar marca
depois do lançamento custa 10x.

---

*Esta identidade foi produzida com a skill `identidade-visual` (destilação MIT de
`rampstackco/claude-skills` e `designrique/ai-graphic-design-skill`).*
