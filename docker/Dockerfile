FROM node:12.2.0 AS build
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
COPY ./dist /app/dist
COPY ./serve.js /app

CMD ["npm", "start"]