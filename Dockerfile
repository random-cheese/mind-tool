# FROM node:14
FROM buildkite/puppeteer:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node" ]
# CMD [ "bin/bash" ]