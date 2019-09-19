FROM node:10-alpine

WORKDIR /api

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm i -g prisma
WORKDIR /api/src/prisma
RUN prisma deploy
WORKDIR /api
EXPOSE 3000
CMD ["npm","run", "start"]
