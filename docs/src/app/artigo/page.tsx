import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function ArtigosIndex() {
  // Lê os arquivos da pasta content/artigos
  const artigosDir = path.join(process.cwd(), 'content', 'artigos');
  let arquivos: string[] = [];
  
  try {
    arquivos = fs.readdirSync(artigosDir).filter(file => file.endsWith('.md'));
  } catch (e) {
    // Caso o diretório ainda não exista
    arquivos = [];
  }

  // Se não houver arquivos, mostramos apenas o conic como default
  const slugs = arquivos.length > 0 ? arquivos.map(file => file.replace('.md', '')) : ['conic'];

  return (
    <main className="page-container" style={{ maxWidth: '1000px', borderLeft: '1px solid var(--bp-border-main)', borderRight: '1px solid var(--bp-border-main)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Artigos Técnicos</h1>
      <p style={{ color: 'var(--bp-text-muted)', fontSize: '1.25rem', marginBottom: '4rem' }}>
        Estudos, documentações e pesquisas fundamentadas na infraestrutura SIDM.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {slugs.map((slug) => (
          <Link href={`/artigo/${slug}`} key={slug} style={{ textDecoration: 'none' }}>
            <div className="article-card" style={{ 
              padding: '2rem', 
              border: '1px solid var(--bp-border-main)', 
              background: 'var(--bp-surface)',
              transition: 'background 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--bp-text-muted)', marginBottom: '1rem' }}>
                Ref: {slug}
              </div>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--bp-text)', marginBottom: '1rem', textTransform: 'none' }}>
                {slug === 'conic' ? 'Análise Deflacionária do PIB Municipal (CONIC)' : slug}
              </h2>
              <p style={{ color: 'var(--bp-text-muted)', margin: 0 }}>
                Ler o documento oficial completo na nossa plataforma cartográfica →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
