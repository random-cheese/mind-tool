SHELL=/bin/bash
DOCKER_IMAGE=registry.cn-hangzhou.aliyuncs.com/agoodob/mind:v2
# 镜像地址（公开）

Config_File_Path="/Users/remote_edit/Downloads/mind-tool/config/course.js"
# 下载哪些课程（配置文件的路径）

Download_Path="/Users/remote_edit/Downloads/"
# 下载到哪里（文件夹路径）

# 第一步：下载镜像
step-1-pull-docker-image:
	docker pull $(DOCKER_IMAGE)

# 第二步：运行镜像
step-2-run-docker-image:
	# docker run -d 命令会返回 container ID
	# 我们把 container ID 存入 CID 变量，然后在 docker exec 命令中使用它
	CID=$$(docker run -d \
  -it \
  --mount type=bind,source=$(Download_Path),target=/usr/src/app/courses \
  -v $(Config_File_Path):/usr/src/app/config/course.js \
  $(DOCKER_IMAGE)); \
	docker exec -it "$$CID" /bin/bash