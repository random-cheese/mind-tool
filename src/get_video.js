// 下载视频

const youtubedl = require("youtube-dl-exec"); // https://github.com/microlinkhq/youtube-dl-exec
var fs = require("fs");

async function get_video(url, save_path) {
  if (fs.existsSync(save_path)) {
    console.log(`跳过 ${save_path} (文件已存在)`);
    return true;
  }
  console.log(`开始下载视频 ${save_path}`);
  var output = await youtubedl(url, {
    // dumpJson: true,
    // noWarnings: true,
    // noCallHome: true,
    // noCheckCertificate: true,
    // preferFreeFormats: true,
    // youtubeSkipDashManifest: true,
    noOverwrites: true,
    output: save_path,
  });
  return output;
}
exports.get_video = get_video;
