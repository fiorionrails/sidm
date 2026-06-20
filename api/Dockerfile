FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for better-sqlite3
RUN apk add --no-cache python3 make g++ 

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Ensure data directory exists
RUN mkdir -p /app/data

EXPOSE 8787

CMD ["npm", "run", "dev:local"]
