## 工作原理
## 单课程链接

https://home.mindvalley.com/quests/en/10x
这个课有 13 个章节（Warm up 一直到 Week 12）
day 1 到 day 83
https://home.mindvalley.com/quests/en/longevity/info

https://home.mindvalley.com/quests/en/money

这些课都是章节+小节，day X 到 day Y 这么来。

authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hvbWUubWluZHZhbGxleS5jb20vbG9naW5Qcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9taW5kdmFsbGV5LmNvbS9sYW5nIjoiemgiLCJodHRwczovL21pbmR2YWxsZXkuY29tL2ZpcnN0X25hbWUiOiJOIiwiaHR0cHM6Ly9taW5kdmFsbGV5LmNvbS9sYXN0X25hbWUiOiJMIiwibmFtZSI6Ik4gTCIsImVtYWlsIjoibGl6aXhpLmFpZXNlY25rdUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taW5kdmFsbGV5LmNvbS8iLCJzdWIiOiJhdXRoMHw2MDdhYzY2MzFiNjFkNDAwNjg5NWIzNzUiLCJhdWQiOiJLUmFGbUNla3RBdFhSNnNkMmd1bVdWRlFhNkFuWG53RiIsImlhdCI6MTYxODg1MjAyMCwiZXhwIjoxNjIwMDYxNjIwfQ.7J7S5RWjhahVciAFVpbxvgfFq8qoI8luq4K1SZkbOdI

有一个巨长的 token，怎么拿？

<script>
  window.appSettings = {
    locale: "zh",
    apiUrl: "https://platform-api.mindvalley.com/graph",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hvbWUubWluZHZhbGxleS5jb20vbG9naW5Qcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9taW5kdmFsbGV5LmNvbS9sYW5nIjoiemgiLCJodHRwczovL21pbmR2YWxsZXkuY29tL2ZpcnN0X25hbWUiOiJOIiwiaHR0cHM6Ly9taW5kdmFsbGV5LmNvbS9sYXN0X25hbWUiOiJMIiwibmFtZSI6Ik4gTCIsImVtYWlsIjoibGl6aXhpLmFpZXNlY25rdUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taW5kdmFsbGV5LmNvbS8iLCJzdWIiOiJhdXRoMHw2MDdhYzY2MzFiNjFkNDAwNjg5NWIzNzUiLCJhdWQiOiJLUmFGbUNla3RBdFhSNnNkMmd1bVdWRlFhNkFuWG53RiIsImlhdCI6MTYxODg1MjAyMCwiZXhwIjoxNjIwMDYxNjIwfQ.7J7S5RWjhahVciAFVpbxvgfFq8qoI8luq4K1SZkbOdI",
    user: {
      uid: "auth0|607ac6631b61d4006895b375",
      email: "lizixi.aiesecnku@gmail.com",
      user_level: 3,
      user_level_name: "All Access",
      first_name: "N",
    }
  }
</script>

直接给出来了

window.appSettings.token 直接拿到

<script>
window.quest = {
  id: 16,
}
</script>

这个也很重要，一节课一个 id

https://home.mindvalley.com/quests/en/10x
这个页面会发一个 GraphQL 请求
data.quest.pages
page 里面就全了，每一节课都有。
locked: false 估计就是解锁没有

groupName: "Week 1"
name: "Squat, Pull, and Push"
id: "7798"
url: "https://home.mindvalley.com/quests/en/10x/days/1"
数据都有了

fetch\*()

## 如何拿到一门课的数据

注意这个依赖于 Bearer token，

```javascript
var quest_id = 16; // 自定义这里

var token = window.appSettings.token;
var data = {
  variables: {
    id: quest_id,
  },
  query: `query QuestQuery($id: Int!) {
  quest(id: $id) {
    id
    url
    name
    owned
    duration
    description
    language
    slug
    authors {
      name
      description
      headline
      avatarAsset {
        url
      }
      portraitAsset {
        url
      }
    }
    enrollmentsCount
    daysCount
    lessonsCount
    type
    coverAsset {
      url
    }
    groups {
      type
      locked
      id
      name
      description
      position
    }
    pages {
      id
      locked
      missed
      completed
      duration
      groupLocked
      groupName
      name
      type
      position
      date
      url
      coverAsset {
        url
      }
    }
    materials {
      id
      type
      coverAsset {
        url
      }
      info {
        title
      }
      primaryAsset {
        id
        name
        contentType
        url
        filesize
      } page {
        id
        name
        url
        locked
        type
        position
         groupName
         groupLocked
         groupDescription
        }
      }
    community {
      service
      url
      passphrase
      backgroundAsset {
        url
      }
    }
    userProgress {
      started
      startedAt
      enrolledAt
      completed
      lessonsCompleted
      daysCompleted
      totalLessonsCompleted
      totalDaysCompleted
      introsCompleted
      release {
        id
        courseStartedAt
        courseEndedAt
        enrollmentStartedAt
        enrollmentsCount
        perpetual
      }
      currentPage {
        id
        name
        type
        url
        position
        coverAsset{
          url
        }
      }
      resumePage{
        id
        name
        type
        url
        position
        locked
        groupName
        groupLocked
        coverAsset {
          url
        }
     }
    }
    trailerCoverAsset {
      url
    }
    trailerAsset {
      markers {
        name
        time
      }
      renditions {
        id
        url
        contentType
      }
      userProgress {
        watched
        watchTime
        watchProgress
      }
    }
    coverAsset {
      url
    }
    upcomingReleases: releases(status: "upcoming") {
      id
      enrollmentStartedAt
      courseStartedAt
      courseEndedAt
      enrollmentsCount
      perpetual
    }
    releases {
      id
      enrollmentStartedAt
      courseStartedAt
      courseEndedAt
      enrollmentsCount
      perpetual
    }
    nextRelease {
      id
      enrollmentStartedAt
      courseStartedAt
      courseEndedAt
      enrollmentsCount
    }
    settings {
      perpetual
      facebookGroupUrl
      facebookGroupImageUrl
      facebookGroupPassPhrase
      enableReleaseChange
      lessonDiscussion
      disableLeaveQuest
      enableReleaseChange
    }
  }
}`,
};
fetch("https://platform-api.mindvalley.com/graph", {
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
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```

## 如果弄得好，甚至不需要 puppeteer，直接发请求就行

步骤 1：您的课程 "XX" 并未全部解锁，当前最新解锁进度为 "Week 2" 的 "The Big 6 Routine"

## 第一步：

获取一门课的 quest_id，
方法： window.quest
或者 window.quest.id

## 第二步：

发请求到 https://platform-api.mindvalley.com/graph
拿这门课的整体数据，包括解锁到哪一节了。
遍历解锁的每一节。

## 第三步：

https://platform-api.mindvalley.com/graph
依然是发请求到这里，只不过这一次是拿单节课的数据。
window.page = {
id: 7798,
position: 1,
type: "day",
groupName: "Week 1"
}
这么来的。

```javascript
var token = window.appSettings.token;
var page_id = 8153;
var data = {
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
fetch("https://platform-api.mindvalley.com/graph", {
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
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```
返回的数据里反正 sections 里找 primaryAsset 不为 null 的就对了。
sections 里是视频+文字+视频，这样来回切换。和页面上显示的完全一致。
这里面有 m3u8 地址，地址里面可能有字幕地址。

## 第四步：
构造文件地址，
课程名/章节名/单节名/视频1
课程名/章节名/单节名/视频2
课程名/章节名/单节名/视频3

比如：
10X/Week 1/Day 1/Squat, Pull, and Push.mp4


## 完全没问题，如果用另一个浏览器弄。
试验了 firefox 和 safari，safari 没有登录过。

```javascript
var page_id = 8153;
var data = {
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
fetch("https://platform-api.mindvalley.com/graph", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hvbWUubWluZHZhbGxleS5jb20vbG9naW5Qcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9taW5kdmFsbGV5LmNvbS9sYW5nIjoiemgiLCJodHRwczovL21pbmR2YWxsZXkuY29tL2ZpcnN0X25hbWUiOiJOIiwiaHR0cHM6Ly9taW5kdmFsbGV5LmNvbS9sYXN0X25hbWUiOiJMIiwibmFtZSI6Ik4gTCIsImVtYWlsIjoibGl6aXhpLmFpZXNlY25rdUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taW5kdmFsbGV5LmNvbS8iLCJzdWIiOiJhdXRoMHw2MDdhYzY2MzFiNjFkNDAwNjg5NWIzNzUiLCJhdWQiOiJLUmFGbUNla3RBdFhSNnNkMmd1bVdWRlFhNkFuWG53RiIsImlhdCI6MTYxODg1MjAyMCwiZXhwIjoxNjIwMDYxNjIwfQ.7J7S5RWjhahVciAFVpbxvgfFq8qoI8luq4K1SZkbOdI`,
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
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```

    // https://assets.mindvalley.com/api/v1/assets/42315c87-7e89-4db0-8075-5c9d14835e29.m3u8
    // ffmpeg -i "https://assets.mindvalley.com/api/v1/assets/42315c87-7e89-4db0-8075-5c9d14835e29.m3u8" -c copy -bsf:a aac_adtstoasc "output.mp4"
    // 为什么会 open 所有格式？h265 和 h264，以及所有分辨率

    // ffmpeg -i "https://assets.mindvalley.com/api/v1/assets/42315c87-7e89-4db0-8075-5c9d14835e29.m3u8"
    // 这个也不行

    // youtube-dl "https://assets.mindvalley.com/api/v1/assets/42315c87-7e89-4db0-8075-5c9d14835e29.m3u8"
    // 可以下载，只是逐个打开比较麻烦。
    // 下载速度在 3-4MB，文件是 1080p

    // 如果直接整 mp4 的下载链接会不会快一点？
    // youtube-dl https://assets.mindvalley.com/api/v1/assets/00456225-59b9-4b2f-8f47-987629b145a4.mp4
    // 快多了，10M+速度，不过文件是 720p

    // ffmpeg 下载 m3u8 字幕行不行？

    // youtube-dl --list-subs "https://assets.mindvalley.com/api/v1/assets/930d4d30-32ea-4cf2-845d-2b0d9f477657.m3u8"
    // youtube-dl 下载不到字幕，明明是有字幕的。

    // ffmpeg -i "https://assets.mindvalley.com/api/v1/assets/930d4d30-32ea-4cf2-845d-2b0d9f477657.m3u8" subtitles.vtt
    // 必须是那个字幕的 m3u8 可以，主的里面不行，它多包裹了一层。