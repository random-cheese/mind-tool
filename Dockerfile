FROM buildkite/puppeteer:latest 

# 安装必须的依赖，python 和 ffmpeg
# 至于 python3 和 tree 只是有它会更好，不是必须的
RUN  apt-get update \
	&& apt-get install -y python3 python tree ffmpeg

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g npm 
# 确保 npm 版本最新

RUN npm install

RUN npm install puppeteer
# 再明确安装一次 puppeteer （不确定这一步是否必须的，去掉应该也能用，不过现在能用也就不管了）

COPY . .

CMD [ "node" ]