# FROM node:14
FROM buildkite/puppeteer:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm
RUN npm install
RUN npm install puppeteer
COPY . .
CMD [ "node" ]
# CMD [ "bin/bash" ]