import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// Componente para ler os artigos do repositório
export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Como o Next.js roda na pasta /docs, os arquivos estão um nível acima
  const articlePath = path.join(process.cwd(), '../contexto', `${slug}.md`);

  let content = '';
  try {
    content = fs.readFileSync(articlePath, 'utf8');
  } catch (err) {
    console.error("Artigo não encontrado:", articlePath);
    notFound();
  }

  return (
    <main className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
      <div style={{ height: '100px' }}></div>
    </main>
  );
}
