## TODO
1. 怎么设置下载哪些课程？
  The work around is to use Docker volumes to inject files from your host machine to the container when running it.
2. 如何指定下载路径？

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

## 使用镜像
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
注意这里传递了一个 config/course.js 文件进去

3. 链接镜像
```
docker exec -it 4fb972f88c43b052c6705118d07495bf120bf24aca76d7f653db572444ad7a98 /bin/bash
```

4. 运行
```
node index.js
```