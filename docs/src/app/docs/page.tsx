export default function DocsPage() {
  return (
    <>
      <h1 id="introducao">Referência da API</h1>
      <p>
        O SIDM expõe uma API GraphQL acessível publicamente através da URL <code>https://sidm-api.cfiorimartins.workers.dev/graphql</code>.
        Este documento descreve os principais Tipos e Queries disponíveis para exploração de dados municipais do Brasil.
      </p>

      <h2 id="tipos">Tipos (Types)</h2>
      <p>Abaixo estão as estruturas de dados retornadas pelas Queries.</p>
      
      <h3 id="type-municipio">Municipio</h3>
      <div className="table-responsive">
        <table className="table-docs">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Tipo</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>codigoIbge</code></td>
            <td><span className="type-badge">Int!</span></td>
            <td>Código IBGE oficial de 7 dígitos do município.</td>
          </tr>
          <tr>
            <td><code>nome</code></td>
            <td><span className="type-badge">String!</span></td>
            <td>Nome oficial do município.</td>
          </tr>
          <tr>
            <td><code>siglaUf</code></td>
            <td><span className="type-badge">String!</span></td>
            <td>Sigla da Unidade Federativa (ex: "SP").</td>
          </tr>
          <tr>
            <td><code>pib</code></td>
            <td><span className="type-badge">[PibMunicipal!]!</span></td>
            <td>Série histórica do PIB do município. Suporta argumentos opcionais <code>ano</code>, <code>anoInicio</code>, e <code>anoFim</code> para filtragem temporal.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h3 id="type-pibmunicipal">PibMunicipal</h3>
      <div className="table-responsive">
        <table className="table-docs">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Tipo</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ano</code></td>
            <td><span className="type-badge">Int!</span></td>
            <td>Ano de referência (ex: 2021).</td>
          </tr>
          <tr>
            <td><code>pibCorrente</code></td>
            <td><span className="type-badge">Float</span></td>
            <td>PIB a preços correntes (nominais) em R$ mil.</td>
          </tr>
          <tr>
            <td><code>pibReal</code></td>
            <td><span className="type-badge">Float</span></td>
            <td>PIB deflacionado (constante) em R$ mil (Base 2021 = 100).</td>
          </tr>
          <tr>
            <td><code>pibPerCapitaReal</code></td>
            <td><span className="type-badge">Float</span></td>
            <td>PIB per capita deflacionado em Reais (R$).</td>
          </tr>
        </tbody>
      </table>
      </div>

      <hr style={{ margin: '4rem 0', borderColor: 'var(--border-color)' }} />

      <h2 id="query-municipio">municipio</h2>
      <p>Busca os dados completos de um único município a partir do seu código IBGE.</p>
      <div className="code-window" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <div className="code-content" style={{ padding: '1rem' }}>
          <code><span className="code-keyword">query</span> {'{'} <span className="code-property">municipio</span>(codigoIbge: 3550308) {'{'} nome siglaUf {'}'} {'}'}</code>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table-docs">
        <thead>
          <tr>
            <th>Argumento</th>
            <th>Tipo</th>
            <th>Padrão</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>codigoIbge</code></td>
            <td><span className="type-badge">Int!</span></td>
            <td>-</td>
            <td>Obrigatório. Código de 7 dígitos.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="query-municipios">municipios</h2>
      <p>Retorna uma lista paginada de municípios, permitindo filtragem textual e geográfica.</p>
      <div className="table-responsive">
        <table className="table-docs">
        <thead>
          <tr>
            <th>Argumento</th>
            <th>Tipo</th>
            <th>Padrão</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>nome</code></td>
            <td><span className="type-badge">String</span></td>
            <td>null</td>
            <td>Busca textual parcial no nome do município.</td>
          </tr>
          <tr>
            <td><code>uf</code></td>
            <td><span className="type-badge">String</span></td>
            <td>null</td>
            <td>Filtra por sigla do estado (ex: "RJ").</td>
          </tr>
          <tr>
            <td><code>pagina</code></td>
            <td><span className="type-badge">Int</span></td>
            <td>1</td>
            <td>Número da página para paginação.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="query-rankingpib">rankingPib</h2>
      <p>Gera um ranking ordenado dos municípios mais ricos com base em um ano específico.</p>
      <div className="table-responsive">
        <table className="table-docs">
        <thead>
          <tr>
            <th>Argumento</th>
            <th>Tipo</th>
            <th>Padrão</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ano</code></td>
            <td><span className="type-badge">Int!</span></td>
            <td>-</td>
            <td>Ano base para o ranking (ex: 2021).</td>
          </tr>
          <tr>
            <td><code>uf</code></td>
            <td><span className="type-badge">String</span></td>
            <td>null</td>
            <td>Se informado, o ranking será estadual em vez de nacional.</td>
          </tr>
          <tr>
            <td><code>limite</code></td>
            <td><span className="type-badge">Int</span></td>
            <td>10</td>
            <td>Quantidade de itens retornados no top N.</td>
          </tr>
          <tr>
            <td><code>constante</code></td>
            <td><span className="type-badge">Boolean</span></td>
            <td>false</td>
            <td>Se true, utiliza o <code>pibReal</code>. Se false, usa o <code>pibCorrente</code>.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="query-compararpib">compararPib</h2>
      <p>Compara múltiplos municípios lado a lado em uma única requisição GraphQL para uma mesma janela temporal.</p>
      <div className="table-responsive">
        <table className="table-docs">
        <thead>
          <tr>
            <th>Argumento</th>
            <th>Tipo</th>
            <th>Padrão</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>codigos</code></td>
            <td><span className="type-badge">[Int!]!</span></td>
            <td>-</td>
            <td>Array de códigos IBGE dos municípios a serem comparados.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="query-fontes">fontes / deflatores</h2>
      <p>Queries auxiliares que retornam os metadados do projeto.</p>
      <ul style={{ color: 'var(--text-muted)', marginLeft: '1.5rem', marginBottom: '2rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>fontes:</strong> Lista URLs oficiais, módulo e datas de atualização das bases extraídas do IBGE.</li>
        <li><strong>deflatores:</strong> Retorna a tabela completa de Deflatores Implícitos do PIB utilizados para calcular a coluna <code>pibReal</code>.</li>
      </ul>
      
      <div style={{ height: '100px' }}></div>
    </>
  );
}
