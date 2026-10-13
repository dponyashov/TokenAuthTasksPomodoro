# Используем официальный образ Node.js
FROM node:25-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем файлы с зависимостями
COPY ./back-nestjs/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY ./back-nestjs/ ./

# Сбираем проект (TypeScript -> JavaScript)
RUN npm run build

# Указываем порт, который слушает приложение
EXPOSE 5173

# Команда для запуска приложения в продакшн-режиме
CMD ["node", "dist/main"]