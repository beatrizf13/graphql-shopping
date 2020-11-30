FROM node:lts-alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src/

COPY ./ /usr/src

RUN chown -R node:node .

USER node

RUN yarn --silent

RUN yarn typeorm migration:run

RUN yarn server dev

EXPOSE 3333

RUN yarn web start

EXPOSE 3000
