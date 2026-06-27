import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patch Notes | SIDM",
  description: "Notas de atualização da API SIDM.",
};

export default function PatchNotes() {
  return (
    <main className="page-container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header className="page-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'var(--font-space-grotesk)' }}>Patch Notes</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--bp-text-muted)' }}>
          Acompanhe as atualizações da infraestrutura de dados SIDM.
        </p>
      </header>

      <section className="patch-note" style={{ borderLeft: '4px solid var(--bp-accent)', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', display: 'inline-block', marginRight: '1rem', fontFamily: 'var(--font-space-grotesk)' }}>v0.1.0</h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--bp-text-muted)', fontFamily: 'var(--font-ibm-plex-mono)', textTransform: 'uppercase' }}>Experimental</span>
        </div>
        
        <div className="alert-experimental" style={{ backgroundColor: 'rgba(255, 170, 0, 0.1)', border: '1px solid rgba(255, 170, 0, 0.3)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ffaa00', display: 'block', marginBottom: '0.5rem' }}>Aviso: Versão Experimental</strong>
          <p style={{ color: 'var(--bp-text-muted)', fontSize: '0.95rem' }}>
            Esta é uma versão experimental. Os dados disponíveis atualmente estão em fase de revisão. Além disso, a estrutura e o schema da própria API GraphQL estão sujeitos a mudanças de arquitetura. O uso em produção ainda não é recomendado.
          </p>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', fontFamily: 'var(--font-space-grotesk)' }}>O que temos atualmente:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--bp-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Topologia completa de 5.570 municípios brasileiros.</li>
          <li>Histórico de PIB municipal (2002-2023), deflacionado pelo IBGE.</li>
          <li>Endpoint GraphQL para consultas avançadas e relacionais.</li>
          <li>Documentação inicial e manual de uso básico.</li>
        </ul>
      </section>
    </main>
  );
}
