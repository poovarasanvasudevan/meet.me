FROM node:12.2.0-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app/
RUN npm install
ENV APP_PORT=3002
CMD [ "npm", "start" ]