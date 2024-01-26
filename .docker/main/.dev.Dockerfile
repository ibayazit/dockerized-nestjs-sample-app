FROM node:alpine AS development

WORKDIR /usr/src/app
RUN npm i -g pnpm

COPY package*.json ./
COPY . .
RUN pnpm install

EXPOSE 8080
RUN npm run build