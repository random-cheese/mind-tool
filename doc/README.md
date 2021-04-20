## 这是什么？
下载 Mindvalley 课程视频的爬虫。会下载视频和字幕（如果有字幕的话）

## 前提条件
一个 Mindvalley 的网站账号

## 如何使用

### 第一步：使用 [クッキーJSONファイル出力 for Puppeteer](https://chrome.google.com/webstore/detail/nmckokihipjgplolmcmjakknndddifde) 
下载得到一个 `home.mindvalley.com.cookies.json` 文件, 放置到本项目根目录下

### 第二步：安装必须的依赖
```bash
yarn install
```

### 第三步：配置要下载什么课程
编辑 `config/course.js` 文件

### 第四步：运行主文件
```bash
node index.js
```

## 文件夹结构
* config/ 配置
* src/ 源代码目录
