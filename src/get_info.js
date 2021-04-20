// 获取一门课的数据
// token 和 quest_id
// 其实只有 quest_id 是每次需要拿新的，token 不需要，但是顺手就也拿了

const puppeteer = require("puppeteer");
var fs = require("fs");

async function get_info(course_url) {
  // 先从文件里读取 Cookies
  var cookie_file = "./home.mindvalley.com.cookies.json";
  var file_content = fs.readFileSync(cookie_file, "utf8");
  var cookie_json = JSON.parse(file_content);

  // 基础设定
  const browser = await puppeteer.launch({
    // headless: false,
    // executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1680,
    height: 1050,
  });
  await page.setBypassCSP(true);
  await page.setCookie(...cookie_json); // 设定 Cookie
  await page.goto(course_url, {
    waitUntil: "domcontentloaded",
  });
  const data = await page.evaluate(() => {
    return {
      token: window.appSettings.token,
      quest_id: window.quest.id,
    };
  });
  await browser.close();
  return data;
}

exports.get_info = get_info;
