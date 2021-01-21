FROM node:14-alpine

LABEL maintainer="maayconaguiar11@hotmail.com"

RUN addgroup -S service && \
  adduser application -S -G service

COPY . /home/application
RUN cd /home/application && npm install

RUN chmod -R 775 /home/application
RUN chown -R application:service /home/application

USER application
WORKDIR /home/application

EXPOSE 3000

CMD node src/app.js
