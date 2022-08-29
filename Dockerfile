FROM node:14.16.0-alpine3.10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

COPY .env ./

USER node

ADD dist ./dist

RUN npm install --only=prod

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]