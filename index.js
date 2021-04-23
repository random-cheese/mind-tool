var fs = require("fs");
var sanitize = require("sanitize-filename");
const { get_quest_data } = require("./src/get_quest_data");
const { get_page_data } = require("./src/get_page_data");
const { get_subtitle } = require("./src/get_subtitle");
const { get_video } = require("./src/get_video");
const { get_info } = require("./src/get_info.js");

// 保存文件夹（可配置）
const OUTPUT_FOLDER = "./courses"; // 结尾不需要加一个 /

// 要下载的课程列表（可配置）
var course_json = require("./config/course.js").default;

// 全局变量，保存 token
var http_auth_bearer_token = null;

// 输出：课程名
// 输出：这门课的保存文件夹
function get_course_folder(course_name) {
  return `${OUTPUT_FOLDER}/${course_name}`;
}

// 输入：课程名字
// 输出：JSON 文件路径
function course_json_path(course_name) {
  return `${get_course_folder(course_name)}/${course_name}.json`;
}

// 处理一个 section 的数据
// （可能有多个视频，比如5个）
async function process_video_section(video_section, folder, index, page_name) {
  // console.log(video_section);
  // var example = {
  //   coverAsset: {
  //     url: 'https://assets.mindvalley.com/api/v1/assets/aabbbf6c-9ee1-4bd8-ba93-cd85ddb4b4ae.jpg'
  //   },
  //   duration: 575.64,
  //   id: '30792',
  //   info: {
  //     body: null,
  //     caption: null,
  //     downloadable: null,
  //     mode: 'normal',
  //     title: 'The Trial Process Demonstration'
  //   },
  //   position: 10,
  //   primaryAsset: {
  //     duration: 575.64,
  //     filesize: 736122714,
  //     id: '47124',
  //     markers: [ [Object], [Object], [Object], [Object], [Object] ],
  //     renditions: [ [Object], [Object] ],
  //     url: 'https://assets.mindvalley.com/api/v1/assets/a6746df5-765d-4f6b-b60e-8a74e6d06f74.mp4'
  //   },
  //   type: 'video'
  // }

  // return;
  var m3u8 = video_section.primaryAsset.renditions.find(
    (rend) => rend.id == "hls"
  );
  // var mp4 = video_section.primaryAsset.renditions.find(
  //   (rend) => rend.id == "mp4"
  // );
  var url = video_section.primaryAsset.url;
  var title = video_section.info.title;

  // 个别情况下 title 可能是 null (原因不明)
  // 这时候拿 page_name 顶替
  if (title == null) {
    title = page_name;
  }

  // 构造文件名
  var index_for_human = index + 1;

  try {
    var output_video_filename = `${index_for_human}. ${sanitize(title)}.mp4`;
    var output_subtitle_filename = `${index_for_human}. ${sanitize(title)}.srt`;
  } catch (error) {
    console.log("处理 section 时出现错误");
    console.log(title);
    console.log(video_section);
    console.log(error);
  }

  // 下载视频
  const video_filepath = `${folder}/${output_video_filename}`;
  try {
    await get_video(url, video_filepath);
  } catch (error) {
    console.log(error);
    console.log(`出错: 下载视频 ${video_filepath} 失败`);
  }

  // 下载字幕
  var subtitle_filepath = `${folder}/${output_subtitle_filename}`;
  try {
    await get_subtitle(m3u8.url, subtitle_filepath);
  } catch (error) {
    console.log(error);
    console.log(`出错: 下载字幕 ${subtitle_filepath} 失败`);
  }
}

// 处理一页（一个 page）
// 比如 day 1
async function process_page(page_data, folder) {
  var sections = page_data.data.page.sections; // sections: [Array],
  const page_name = page_data.data.page.name; // name: 'Squat, Pull, and Push',
  const position = page_data.data.page.position; // position: 1,
  // console.log(page_data);
  // console.log(sections);
  // 已知类型有
  // "type": "video"
  // "type": "text"
  // type: 'file'
  // type: 'audio'

  // 找出所有 type == video 的 section
  const video_sections = sections.filter((section) => section.type == "video");
  for (let i = 0; i < video_sections.length; i++) {
    await process_video_section(video_sections[i], folder, i, page_name);
  }
}

// 处理一门课
// 输出: JSON（来自本地文件）
// 输出：无
// 做了什么：遍历 Page (一个 page 就是一节) 并处理
async function process_course(course_name) {
  var json_path = course_json_path(course_name);
  var contents = fs.readFileSync(json_path, "utf8");
  var json = JSON.parse(contents);
  //
  // Page 处理
  //
  var pages = json.data.quest.pages;
  const filtered_pages = pages.filter((page) => page.type === "day" || page.type === "intro");
  for (let i = 0; i < filtered_pages.length; i++) {
    const page = filtered_pages[i];
    // console.log(page.type);
    // 已知类型
    // type: day
    // type: intro
    // type: info

    // console.log(page);
    // var page_example = {
    //   completed: false,
    //   coverAsset: {
    //     url: 'https://assets.mindvalley.com/api/v1/assets/ce7806bb-e450-42c0-8497-bb09e0fda975.jpg'
    //   },
    //   date: null,
    //   duration: 1140,
    //   groupLocked: false,
    //   groupName: 'Week 1',
    //   id: '7798',
    //   locked: false,
    //   missed: false,
    //   name: 'Squat, Pull, and Push',
    //   position: 1,
    //   type: 'day',
    //   url: 'https://home.mindvalley.com/quests/en/10x/days/1'
    // }

    console.log(
      `开始处理 ${page.groupName} ${page.type} ${page.position} 的 ${page.name}`
    );
    // 开始处理 Week 1 day 6 的 The Work Capacity Test

    var page_id = page.id;
    // console.log(page.groupName); // Week 1

    try {
      var page_folder = `${get_course_folder(course_name)}/${sanitize(
        page.groupName
      )}/${page.type} ${page.position}`; // day 1 / intro 1
    } catch (error) {
      console.log("出现错误");
      console.log(error);
      console.log(page);
      console.log(page.groupName);
    }

    var page_data = await get_page_data(http_auth_bearer_token, page_id);
    await process_page(page_data, page_folder);
  }
}

//
// 正式开始
//
(async () => {
  for (e of course_json) {
    // 建文件夹
    var dir = `${OUTPUT_FOLDER}/${e.course_name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (err) => {});
    }
    
    // 访问课程页，拿到必须的数据
    var data = await get_info(e.url);

    // token 存到全局变量
    http_auth_bearer_token = data.token;

    // 用 token 和 quest_id 拿这门课更细致的数据
    var result = await get_quest_data(data.token, data.quest_id);

    // 把结果保存到 JSON 文件里
    var file_path = course_json_path(e.course_name);
    if (!fs.existsSync(file_path)) {
      fs.writeFileSync(file_path, JSON.stringify(result));
    }

    // 开始处理这门课（进行下载任务）
    await process_course(e.course_name);
  }
})();
