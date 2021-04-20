// 获得一页的数据（一个课程(10X) -> 一个章节(Week 1) -> 一页(day 1))

const fetch = require('node-fetch');

async function get_page_data(token, page_id) {
  if (token == undefined) {
    throw "参数 token 不能为空";
  }
  var payload = {
    variables: {
      id: page_id,
    },
    query: `query PageQuery($id: Int!) { 
		page(id: $id) { 
			id
			tribesoEmbedUrl 
			nextPage { 
				url 
				type 
				locked 
				position 
			} 
			name 
			position 
			completed 
			type 
			coverAsset { 
				url 
			} 
			groupName 
			sections { 
				id 
				type 
				position 
				duration 
				info { 
					body 
					caption 
					title 
					downloadable 
					mode 
				} 
				coverAsset { 
					url 
				} 
				primaryAsset { 
					markers { 
						name 
						time 
					} 
					id 
					filesize 
					duration 
					url 
					renditions(
						labels: ["hls", "mp4", "webm", "mp3", "ogg"], 
						status: "completed") {
						id 
						duration 
						url 
						contentType 
						} 
				} 
			} 
		} 
	}`,
  };
  var response = await fetch("https://platform-api.mindvalley.com/graph", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      authorization: `Bearer ${token}`,
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua":
        '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-mv-auth0": "legacy",
    },
    referrer: "https://home.mindvalley.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}
exports.get_page_data = get_page_data;
