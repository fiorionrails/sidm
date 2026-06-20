FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Comando padrão ao rodar este container pelo docker-compose
CMD ["python", "pipeline.py"]
