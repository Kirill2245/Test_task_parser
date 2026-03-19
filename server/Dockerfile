FROM node:20-alpine AS development

WORKDIR /app

# Устанавливаем openssl и другие зависимости
RUN apk add --no-cache openssl

# Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости
RUN npm ci

# Генерируем Prisma Client с явным указанием binaryTargets
ENV PRISMA_BINARY_TARGETS=linux-musl-openssl-3.0.x,windows,native
RUN npx prisma generate

# Копируем исходники
COPY . .

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["npm", "run", "start:dev"]