export default function Home() {
  return (
    <>
      <nav>
        <div className="container nav-content">
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <div className="nav-header">
            <div className="logo text-gradient">SIDM</div>
            <label htmlFor="nav-toggle" className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </label>
          </div>
          <div className="cta-group">
            <a href="/artigo/conic" className="btn btn-secondary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', border: 'none' }}>
              Pesquisa (Artigo)
            </a>
            <a href="/docs" className="btn btn-secondary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', border: 'none' }}>
              Documentação
            </a>
            <a href="https://github.com/fiorionrails/sidm" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="container hero">
          <h1 className="animate-fade-up">Sistema Integrado de <br/><span className="text-gradient">Dados Municipais</span></h1>
          <p className="animate-fade-up delay-1">
            A API GraphQL open-source definitiva para o Brasil. Histórico deflacionado do PIB e população de todos os 5.570 municípios (2002-2023), calculado através da metodologia de Deflator Implícito do IBGE.
          </p>
          
          <div className="cta-group animate-fade-up delay-2">
            <a href="https://sidm-api.cfiorimartins.workers.dev/graphiql" target="_blank" rel="noreferrer" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              GraphQL Playground
            </a>
            <a href="/docs" className="btn btn-secondary">
              Ler Documentação
            </a>
          </div>

          <div className="code-window animate-fade-up delay-3" style={{ width: '100%', maxWidth: '800px' }}>
            <div className="code-header">
              <div className="code-dot dot-r"></div>
              <div className="code-dot dot-y"></div>
              <div className="code-dot dot-g"></div>
            </div>
            <div className="code-content">
<pre><code><span className="code-keyword">query</span> <span className="code-property">CompararMunicipios</span> {'{'}
  <span className="code-property">sp</span>: <span className="code-type">municipio</span>(codigoIbge: <span className="code-string">3550308</span>) {'{'}
    nome
    populacao
    pib(anoInicio: <span className="code-string">2018</span>, anoFim: <span className="code-string">2023</span>) {'{'}
      ano
      pibReal
      pibPerCapitaReal
    {'}'}
  {'}'}
{'}'}</code></pre>
            </div>
          </div>
        </section>

        <section id="documentacao" className="container features">
          <div className="glass-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3>Geografia Completa</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>
              Inclui Região Imediata, Região Intermediária, Mesorregião e Microrregião para os 5.570 municípios.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
            </div>
            <h3>Série Histórica (2002-2023)</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>
              O banco contempla toda a série histórica ininterrupta do PIB disponibilizada oficialmente pelo IBGE.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <h3>Deflator Implícito</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>
              PIB ajustado pela metodologia do Deflator Implícito (Base 2021=100), muito superior à deflação simples por IPCA.
            </p>
          </div>
        </section>

        <section className="container" style={{ paddingBottom: '6rem' }}>
          <div className="glass-card">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Metodologia de Deflação</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Diferente de muitas bases de dados que utilizam o IPCA (Índice de Preços ao Consumidor Amplo) para deflacionar o PIB, o SIDM adota o <strong>Deflator Implícito do PIB</strong> do próprio IBGE (base 2021).
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              O IPCA mede apenas a inflação do consumo das famílias. Já o Deflator Implícito mede a variação de preços de todos os bens e serviços produzidos na economia (incluindo exportações, investimentos e gastos do governo), sendo a medida cientificamente e academicamente correta para o cômputo de Produto Interno Bruto Real.
            </p>
            <div className="code-window" style={{ marginTop: '0' }}>
              <div className="code-content" style={{ padding: '1rem' }}>
                <code>PIB Real (Ano X) = (PIB Nominal Ano X / Deflator Ano X) * 100</code>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Projeto Open Source para a comunidade de Dados do Brasil.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Construído com Next.js, GraphQL e Cloudflare D1.</p>
      </footer>
    </>
  );
}
