export default function Docs() {
  return (
    <main className="page-container" style={{ maxWidth: '1000px', borderBottom: '1px solid var(--bp-border-main)' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Manual de Operação</h1>
      <p style={{ color: 'var(--bp-text-muted)', fontSize: '1.25rem', maxWidth: '800px', marginBottom: '4rem' }}>
        Especificações técnicas para a extração de dados da malha municipal via API GraphQL do SIDM.
      </p>

      {/* 1.0 Endpoint */}
      <div className="docs-grid" style={{ borderTop: '1px solid var(--bp-border-main)', paddingTop: '2rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>1.0 Ponto de Acesso</h2>
          <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>O endpoint único de GraphQL disponível publicamente.</p>
        </div>
        <div className="code-block" style={{ padding: '2rem', border: '1px solid var(--bp-border-main)' }}>
          <div className="code-header">/// ENDPOINT HTTPS</div>
          <pre><code>https://sidm-api.cfiorimartins.workers.dev/graphql</code></pre>
        </div>
      </div>

      {/* 2.0 Queries Principais */}
      <div className="docs-grid" style={{ borderTop: '1px solid var(--bp-border-main)', paddingTop: '2rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>2.0 Queries Principais</h2>
          <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Métodos de acesso direto aos dados.</p>
        </div>
        
        <div>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><code>municipio(codigoIbge: Int!)</code></h3>
            <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>Busca os dados completos de um único município a partir do seu código IBGE (7 dígitos).</p>
            <div className="code-block" style={{ padding: '1rem 2rem', border: '1px solid var(--bp-border-main)' }}>
              <pre><code>{`query { 
  municipio(codigoIbge: 3550308) { 
    nome 
    siglaUf 
  } 
}`}</code></pre>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><code>municipios(nome: String, uf: String, pagina: Int)</code></h3>
            <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>Retorna uma lista paginada de municípios, permitindo filtragem textual e geográfica.</p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><code>rankingPib(ano: Int!, uf: String, limite: Int, constante: Boolean)</code></h3>
            <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>Gera um ranking ordenado dos municípios mais ricos com base em um ano específico. Se <code>constante</code> for true, utiliza o PIB deflacionado.</p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><code>compararPib(codigos: [Int!]!)</code></h3>
            <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>Compara múltiplos municípios lado a lado em uma única requisição GraphQL para uma mesma janela temporal.</p>
          </div>
        </div>
      </div>

      {/* 3.0 Tipos */}
      <div className="docs-grid" style={{ borderTop: '1px solid var(--bp-border-main)', paddingTop: '2rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>3.0 Estrutura de Tipos</h2>
          <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>A raiz de toda consulta espacial e demográfica é o objeto <strong>Municipio</strong>.</p>
        </div>
        
        <div>
          <div className="code-block" style={{ padding: '2rem', border: '1px solid var(--bp-border-main)', marginBottom: '2rem' }}>
            <div className="code-header">/// TYPE: Municipio</div>
            <pre><code>{`type Municipio {
  codigoIbge: Int!
  nome: String!
  siglaUf: String!
  populacao: Int
  pib(ano: Int, anoInicio: Int, anoFim: Int): [PibMunicipal!]!
  regiao: RegiaoInfo!
}`}</code></pre>
          </div>

          <div className="code-block" style={{ padding: '2rem', border: '1px solid var(--bp-border-main)' }}>
            <div className="code-header">/// TYPE: PibMunicipal</div>
            <pre><code>{`type PibMunicipal {
  ano: Int!
  pibCorrente: Float        # PIB a preços correntes (nominais)
  pibReal: Float            # PIB deflacionado (Base 2021 = 100)
  pibPerCapitaReal: Float   # PIB per capita deflacionado
}`}</code></pre>
          </div>
        </div>
      </div>

      {/* 4.0 Metadados */}
      <div className="docs-grid" style={{ borderTop: '1px solid var(--bp-border-main)', paddingTop: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>4.0 Metadados</h2>
          <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Informações auxiliares e fatores de cálculo.</p>
        </div>
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><code>fontes</code></h3>
            <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem' }}>Lista URLs oficiais, módulo e datas de atualização das bases extraídas do IBGE.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><code>deflatores</code></h3>
            <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem' }}>Retorna a tabela completa de Deflatores Implícitos do PIB utilizados para calcular a coluna <code>pibReal</code>.</p>
          </div>
        </div>
      </div>

    </main>
  );
}
