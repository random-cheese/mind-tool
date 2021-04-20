# Mindvalley 爬虫
写于 2021-4-20

## 如何运行？
0. macOS 安装 Docker 的 mac 版本，并且运行起来，顶部任务栏可以看到 docker 的图标就算成功。

1. 获取镜像
```
docker pull registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2
```

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
注意这里 `-v` 覆盖了 `config/course.js`
注意这里 `--mount` 做了目录映射（设定了下载的文件放在哪个文件夹）

3. 连接镜像（跑 bash）
```
docker exec -it 4fb972f88c43b052c6705118d07495bf120bf24aca76d7f653db572444ad7a98 /bin/bash
```

4. 运行
```
node index.js
```