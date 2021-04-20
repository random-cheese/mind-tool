# Mindvalley 爬虫
写于 2021-4-20

## 说明
* 为了避免安装一堆依赖 (npm,yarn,brew,git,node.js,youtube-dl,ffmpeg,python等)   
用了 Docker，所以以下是告诉你怎么跑 Docker 

## 如何运行？（用 Makefile）
1. 获取镜像
```
make step-1-pull-docker-image
```

2. 运行镜像
```
make step-2-run-docker-image
```

3. Makefile 文件中顶部可以配置下载什么课程，以及下载到哪里。

## 如何运行？（纯用 Docker）
0. macOS 安装 Docker 的 mac 版本，并且运行起来，顶部任务栏可以看到 docker 的图标就算成功。

1. 获取镜像
```
docker pull registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2
```
（为了方便，镜像存到了阿里云上，因为 Docker Hub 非常慢，所以不存在 Docker Hub 上面）

2. 运行镜像
```
docker run -d \
  -it \
  --mount type=bind,source=/Users/remote_edit/Downloads/,target=/usr/src/app/courses \
  -v "/Users/remote_edit/Downloads/mind-tool/config/course.js":/usr/src/app/config/course.js \
  registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2

docker run -d \
  -it \
  --mount type=bind,source="/Volumes/NatLi/Mindvalley Course",target=/usr/src/app/courses \
  -v "/Volumes/NatLi/Mindvalley Course/mind-tool/config/course.js":/usr/src/app/config/course.js \
  registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2
```
* 注意 `-v` 覆盖了 `config/course.js`，用于设定下载哪些课程，自己修改这个文件即可
* 注意 `--mount` 做了目录映射，设定了下载的文件放在哪个文件夹，自己修改这个参数即可

3. 连接镜像（跑 bash）   
```
docker exec -it [上一步的输出放这里] /bin/bash
```

第二步运行完之后会输出一串东西，把那个带入到第三步里，比如这样：   

```
docker exec -it 4fb972f88c43b052c6705118d07495bf120bf24aca76d7f653db572444ad7a98 /bin/bash
```

4. 运行如下命令，开始下载
```
node index.js
```