import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function Artigo({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const filePath = path.join(process.cwd(), 'content', 'artigos', `${slug}.md`);
  
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    notFound();
  }

  return (
    <main className="page-container" style={{ borderLeft: '1px solid var(--bp-border-main)', borderRight: '1px solid var(--bp-border-main)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--bp-border-main)', paddingBottom: '1rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--bp-text-muted)' }}>
        <span>Ref: {slug}</span>
        <span>Data: Publicação Oficial</span>
        <span>Doc: Artigo Técnico</span>
      </div>

      <article style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }} {...props} />,
            h2: ({node, ...props}) => <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem' }} {...props} />,
            h3: ({node, ...props}) => <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
            p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', textAlign: 'justify' }} {...props} />,
            strong: ({node, ...props}) => <strong style={{ color: 'var(--bp-text)', fontWeight: 700 }} {...props} />,
            a: ({node, ...props}) => <a style={{ color: 'var(--bp-accent-green)' }} {...props} />,
            code: ({node, ...props}) => <code style={{ fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.05)', padding: '0.1rem 0.3rem', fontSize: '0.9rem' }} {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--bp-border-main)' }}>
        <a href="/" className="btn btn-secondary">← Voltar ao Início</a>
      </div>
    </main>
  );
}
