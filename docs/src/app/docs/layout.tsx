export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <div className="container nav-content">
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <div className="nav-header">
            <a href="/" className="logo text-gradient">SIDM</a>
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
            <a href="https://github.com/fiorionrails/sidm" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', border: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://sidm-api.cfiorimartins.workers.dev/graphiql" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>
              GraphQL Playground
            </a>
          </div>
        </div>
      </nav>
      <div className="docs-container">
        <aside className="sidebar">
          <div className="sidebar-title">Geral</div>
          <ul>
            <li><a href="#introducao">Introdução</a></li>
            <li><a href="#tipos">Tipos (Types)</a></li>
          </ul>
          
          <div className="sidebar-title">Queries de Busca</div>
          <ul>
            <li><a href="#query-municipio">municipio</a></li>
            <li><a href="#query-municipios">municipios</a></li>
          </ul>

          <div className="sidebar-title">Queries Analíticas</div>
          <ul>
            <li><a href="#query-rankingpib">rankingPib</a></li>
            <li><a href="#query-compararpib">compararPib</a></li>
          </ul>

          <div className="sidebar-title">Metadados</div>
          <ul>
            <li><a href="#query-fontes">fontes</a></li>
            <li><a href="#query-deflatores">deflatores</a></li>
          </ul>
        </aside>
        
        <main className="docs-content">
          {children}
        </main>
      </div>
    </>
  );
}
