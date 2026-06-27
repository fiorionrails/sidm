"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <main>
      <motion.section 
        className="hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="hero-content">
          <motion.h1 className="hero-title" variants={fadeUp}>
            Planta Baixa dos<br/>
            Dados Municipais
          </motion.h1>
          <motion.p className="hero-desc" variants={fadeUp}>
            A API GraphQL com a topologia completa de 5.570 municípios e histórico de PIB deflacionado pelo IBGE (2002-2023).
          </motion.p>
          <motion.div className="btn-group" variants={fadeUp}>
            <a href="https://sidm-api.fiorionrails.workers.dev/graphiql" target="_blank" rel="noreferrer" className="btn btn-primary">
              Acessar GraphQL
            </a>
            <a href="/docs" className="btn btn-secondary">
              Ler Manual
            </a>
          </motion.div>
        </div>

        <motion.div className="code-block" variants={fadeUp}>
          <div className="code-header">/// Arquivo: query.graphql</div>
          <pre><code>{`query BlueprintSP {
  municipio(codigoIbge: 3550308) {
    nome
    populacao
    pib(anoInicio: 2020) {
      ano
      pibReal
      pibPerCapitaReal
    }
  }
}`}</code></pre>
        </motion.div>
      </motion.section>

      <motion.section 
        className="bento-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="bento-cell span-2" variants={fadeUp} style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h3>Geometria Geográfica</h3>
            <p>Estrutura hierárquica conectada. Do município à Grande Região, incluindo Imediatas e Intermediárias.</p>
          </div>
          <Image 
            src="/blueprint-map.png" 
            alt="Blueprint do Mapa do Brasil" 
            fill 
            style={{ objectFit: 'cover', opacity: 0.1, mixBlendMode: 'multiply', objectPosition: 'right' }} 
          />
        </motion.div>
        <motion.div className="bento-cell left" variants={fadeUp}>
          <h3>Série Histórica (21 Anos)</h3>
          <p>O PIB de todos os municípios brasileiros catalogado de forma contínua entre 2002 e 2023.</p>
        </motion.div>
        <motion.div className="bento-cell" variants={fadeUp}>
          <h3>Deflator Implícito</h3>
          <p>Correção científica da moeda para Base 2021=100. Superior ao IPCA para análise de PIB real.</p>
        </motion.div>
      </motion.section>

      <motion.section 
        className="methodology"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp}>Metodologia de Deflação</motion.h2>
        <motion.p variants={fadeUp}>
          A maioria dos projetos utiliza o IPCA para ajustar dados financeiros. Porém, o IPCA mede inflação do consumo das famílias.
        </motion.p>
        <motion.p variants={fadeUp}>
          O SIDM aplica o <strong>Deflator Implícito do PIB</strong> do IBGE, abrangendo toda a cadeia produtiva, exportações e investimentos.
        </motion.p>
        <motion.div variants={fadeUp} style={{ marginTop: '2rem' }}>
          <code>f(PIB_Real) = (PIB_Nominal_X / Deflator_X) * 100</code>
        </motion.div>
      </motion.section>
    </main>
  );
}
