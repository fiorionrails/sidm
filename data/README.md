# SIDM — Dados

Este diretório contém o banco SQLite (`municipios.db`) gerado pelo pipeline ETL.

O arquivo `.db` **não é versionado** no Git (está no `.gitignore`). Para gerar:

```bash
cd ../etl
pip install -r requirements.txt
python pipeline.py
```

## Schema

Veja `migrations/0001_schema.sql` para a definição completa das tabelas.
