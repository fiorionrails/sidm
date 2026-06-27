"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="nav-header">
        <Link href="/" className="nav-brand">
          SIDM
        </Link>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "Fechar" : "Menu"}
        </button>
      </div>
      <div className={`nav-links-wrapper ${isOpen ? "open" : ""}`}>
        <div className="nav-links">
          <Link href="/docs" onClick={() => setIsOpen(false)}>Manual</Link>
          <Link href="/artigo" onClick={() => setIsOpen(false)}>Artigos</Link>
          <Link href="/patch-notes" onClick={() => setIsOpen(false)}>Patch Notes</Link>
          <a href="https://sidm-api.fiorionrails.workers.dev/graphiql" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
            GraphQL API
          </a>
        </div>
      </div>
    </nav>
  );
}
