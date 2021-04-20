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

