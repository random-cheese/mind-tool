// 下载字幕（原理是用 ffmpeg 处理 .m3u8 URL，最终下载得到 .srt 文件）

const fetch = require("node-fetch");
const M3U8FileParser = require("m3u8-file-parser");
var ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");

// master_m3u8_url 是一个 http://x.m3u8 地址
// save_path 是文件保存路径
// 返回 Boolean, false 代表没字幕可以下载，true 代表有字幕并且下载成功
async function get_subtitle(master_m3u8_url, save_path) {
  if (fs.existsSync(save_path)) {
    console.log(`跳过 ${save_path} (文件已存在)`);
    return false;
  }

  // 第一步：拿到内容并且解析
  var m3u8_content = await fetch(master_m3u8_url).then((r) => r.text());
  const reader = new M3U8FileParser();
  reader.read(m3u8_content);
  var m3u8_json = reader.getResult();

  // 根据解析后的结果，看看能不能去拿字幕
  var subtitles = m3u8_json?.media?.SUBTITLES?.subtitles;
  if (subtitles) {
    var array = Object.values(subtitles);
    for (let i = 0; i < array.length; i++) {
      const subtitle_item = array[i];
      const subtitle_url = subtitle_item.uri;
      console.log(`开始下载字幕 ${save_path}`);
      await ffmpeg(subtitle_url)
        .output(save_path)
        .on("end", function () {
          console.log(`字幕下载完成 ${save_path}`);
        })
        .run();
      return true;
    }
  }
  return false;
}

exports.get_subtitle = get_subtitle;
