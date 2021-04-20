## 问答
1. 怎么设置下载哪些课程？
  The work around is to use Docker volumes to inject files from your host machine to the container when running it.
  docker run 的时候用 -v 覆盖掉 config/course.js

2. 如何指定下载路径？
  docker run 的时候指定 -mount 做目录映射。

## 本地运行
```bash
docker build . -t mind8
```

```
docker run -d \
  -it \
  --name mindV3 \
  --mount type=bind,source=/Users/remote_edit/Downloads/,target=/usr/src/app/courses \
  mind8
```

## 内森硬盘地址运行
```
docker run -d \
  -it \
  --name mindvalley_crawler \
  --mount type=bind,source="/Volumes/NatLi/Mindvalley Course",target=/usr/src/app/courses \
  registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v1
```

## 更新镜像
1. 构建
```
docker build . -t mind8
```

2. docker 登录
```
docker login --username=胡萝卜agoodob registry.cn-hangzhou.aliyuncs.com
```
(此处会提示输入密码, 密码是阿里云上设置的镜像仓库密码)
https://cr.console.aliyun.com/cn-hangzhou/instance/repositories

3. 打 tag
```
docker tag mind8 registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2
```

4. 推送
```
docker push registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2
```

## 如何运行？（纯用 Docker）
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