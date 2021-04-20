## 运行
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

```
docker build . -t mind8
docker login --username=胡萝卜agoodob registry.cn-hangzhou.aliyuncs.com
docker tag mind8 registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v1
docker push registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v1

docker pull registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v1
```


```
docker run -d \
  -it \
  --name mindvalley_crawler \
  --mount type=bind,source=/Users/remote_edit/Downloads/,target=/usr/src/app/courses \
  registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v1

docker exec -it mindvalley_crawler /bin/sh
```