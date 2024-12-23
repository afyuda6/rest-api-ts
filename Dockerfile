FROM node:22-slim

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /rest-api-ts

COPY . /rest-api-ts

RUN npm install

RUN npm rebuild sqlite3

RUN npx tsc

EXPOSE 8080

CMD ["node", "dist/main.js"]