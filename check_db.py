import sqlite3
conn = sqlite3.connect('contexto/municipia.db')
cursor = conn.cursor()
cursor.execute("SELECT name, sql FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
for name, sql in tables:
    print(f"Table: {name}")
    print(sql)
    print("-" * 50)
    cursor.execute(f"SELECT * FROM {name} LIMIT 3")
    print("Sample:")
    for row in cursor.fetchall():
        print(row)
    print("=" * 50)
