# FROM node:14
FROM buildkite/puppeteer:latest 
# https://hub.docker.com/r/buildkite/puppeteer

RUN  apt-get update \
	&& apt-get install -y python3 python tree

# USER xx
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm
RUN npm install
RUN npm install puppeteer
COPY . .

CMD [ "node" ]
# CMD [ "bin/bash" ]