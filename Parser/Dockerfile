FROM node:20-slim

# Устанавливаем необходимые зависимости для Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./


RUN npm ci


# Копируем исходный код
COPY . .

# Указываем Puppeteer где искать Chrome
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

ENV PARSER_INTERVAL_HOURS=1 \
    RUN_ONCE=false
# Собираем приложение
RUN npm run build

CMD ["npm", "start"]