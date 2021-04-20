// 获得一整门课的信息
const fetch = require("node-fetch");

// token 用于 http 请求头
// quest_id 用于参数
async function get_quest_data(token, quest_id) {
  // console.log(`get_quest_data 拿到的参数是: `);
  // console.log(token, quest_id);
  if (token == undefined) {
    throw "参数 token 不能为空";
  }
  var payload = {
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

exports.get_quest_data = get_quest_data;
