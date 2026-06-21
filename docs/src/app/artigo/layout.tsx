export default function ArtigoLayout({
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
            <a href="/docs" className="btn btn-secondary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', border: 'none' }}>
              Documentação API
            </a>
          </div>
        </div>
      </nav>
      <div className="article-container">
        {children}
      </div>
    </>
  );
}
