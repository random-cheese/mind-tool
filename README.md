# Mindvalley 爬虫
用途：把一整门课下载下来（.mp4 视频文件和 .srt 字幕文件）  
文件夹结构和网站一致，比如 `10X（课程名)` > `Week 1` > `Day 1`   

## 准备工作
1. 安装 Docker 的 macOS 版并运行，顶部任务栏可以看到 docker 图标就算成功
2. 如果运行失败就更新 `home.mindvalley.com.cookies.json` 这个 Cookie 文件

## 如何运行？（用 Makefile）
1. 获取镜像
```
make step-1-pull-docker-image
```

2. 运行镜像
```
make step-2-run-docker-image
```

3. （如何配置）Makefile 文件中顶部可以配置下载什么课程，以及下载到哪里。

4. 运行如下命令，开始下载
```
node index.js
```