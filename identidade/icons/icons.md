# SIDM — Iconografia

Set base no estilo da marca. Coeso por construção, não por acaso.

## Regras do sistema
- **Estilo:** contorno (outline), nunca preenchido.
- **Traço:** `1.8` uniforme em todo o set (`stroke-width="1.8"`).
- **Grade:** 24×24, área de desenho 20×20 (2px de respiro nas bordas).
- **Cantos:** `stroke-linecap="round"` + `stroke-linejoin="round"` — ecoa o `rx` do símbolo.
- **Cor:** `currentColor` — herda a cor do texto/contexto. Use `var(--brand-primary)` ou `var(--brand-text)`.
- **Eco de marca:** ícones de rede/dados (`ic-api`, `ic-etl`) repetem o motivo de
  nós-conectados do símbolo. É o que faz o set parecer "do SIDM" e não genérico.

## Set incluído
| Ícone | Significado |
|-------|-------------|
| `ic-municipio` | Município / localidade (pin com núcleo) |
| `ic-dados` | Base de dados / dataset |
| `ic-api` | Endpoint / API (nós conectados) |
| `ic-etl` | Integração ETL (múltiplas fontes → uma) |
| `ic-busca` | Busca / query |
| `ic-atualizar` | Atualização / sincronização de dados |

## Ao criar novos ícones
Mantenha traço 1.8, grade 24, cantos arredondados. Aperte os olhos: se o novo
ícone não parece da mesma família dos seis acima, ajuste peso e raio antes de usar.
