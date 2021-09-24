FROM node:12 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm i --silent

COPY . /app

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /app/dist /var/www

COPY ./web/nginx.conf /etc/nginx/nginx.conf
