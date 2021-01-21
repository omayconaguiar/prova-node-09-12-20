FROM node:10-alpine

LABEL maintainer="maayconaguiar11@hotmail.com"

WORKDIR /usr/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
