## 工作原理 （简短版）

### 概念
1. 每一门课有一个 quest id，比如 `16`
2. 他们用的是 GraphQL API (不是 REST API)
3. HTTP 请求需要带上 Bearer Token

### 做法
1. 通过 puppeteer，访问那门课的页面，拿到 Bearer Token 和 quest id
2. 发 GraphQL 请求（记得带上 Bearer Token）拿到这门课的整体数据
  包括有多少 day, 多少 week，
3. 遍历每一个 day，去拿那一页的具体数据，里面有视频下载地址(m3u8)
4. 用 youtube-dl 下载 .mp4 URL 视频，用 FFMPEG 下载 .m3u8 URL 的字幕 (srt)
5. 完成

## 原理：
1. 通过 Chrome 扩展，下载得到一个 home.mindvalley.com.cookies.json 文件
2. 让 Puppeteer 用这个 cookie
3. 访问单个课程页，如 https://home.mindvalley.com/quests/en/10x
4. 获得 Bearer token，和 quest_id
5. 用 Bearer token 发请求，获得这门课的信息
7. 处理课程里每一节（更换不同的 page id 就行）比如 https://home.mindvalley.com/quests/en/10x/days/1
8. 一节里面可能有多个视频（比如 https://home.mindvalley.com/quests/en/10x/days/1 有5个视频）
9. 逐个下载视频，如果有字幕也一并下载
