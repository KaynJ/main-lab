# 中国平台观摩资料与核对记录

核对日期：2026-10-19。实现：`web/lol-media.js`。

## 使用方式

- `tutorials` 保留 20 个英雄 ID，包含作者、标题、网址、年份、语言、观察重点，并新增 `platform`、`kind`。
- `observersByLane` 按 `top`、`jungle`、`mid`、`bot`、`support` 划分，每路分别提供 `professionals`、`streamers` 两组。条目包含 `name`、`champions`、`focus`、`url`、`platform`、`kind`，固定视频另有 `title`。
- `kind: 'video'` 表示确定的稿件；`kind: 'search'` 表示已预填关键词的 B站检索入口。搜索入口不承诺结果顺序、作者身份、字幕或当前版本适用性。
- 搜索资料的 `year` 是 `null`，界面应显示“检索入口”，不要给它补造发布年份。固定视频年份是投稿年份。
- 人物与英雄的关联来自公开对局、本人投稿或职业教学，不代表其完整英雄池，也不以人格测试声称玩家能达到相同操作水平。

## 固定英雄视频

| 对应英雄 | 发布者／观摩对象 | 固定稿件 | 投稿年份与核对范围 |
| --- | --- | --- | --- |
| 盲僧 | LPL战术小黑板 | [盲僧入门教学](https://www.bilibili.com/video/BV1X64y1873W/) | 2021；页面注明部分演示素材经原作者授权。 |
| 发条 | lol超神解说lol | [发条魔灵技巧、对线、团战](https://www.bilibili.com/video/BV1Ht4y1X7ZU/) | 2020；作者、标题、端游标签与日期已核对。 |
| 金克丝 | 英雄联盟赛事／GALA | [LPL职业教学：技能释放细节](https://www.douyin.com/video/7453363151157873929) | 2024-12-28；抖音英雄联盟赛事账号发布。 |
| 盖伦 | 店长盖伦 | [盖伦对线铁男详细教学](https://www.bilibili.com/video/BV1h5411H7RL/) | 2020；本人账号投稿。 |
| 拉克丝 | 娜仙女Lux | [对线阿狸的逆风对局](https://www.bilibili.com/video/BV1ng411X7Y3/) | 2022；本人账号的对局投稿，非职业比赛。 |
| 安妮 | 英雄联盟赛事／Care | [LPL职业教学：技能调整与连招](https://www.bilibili.com/video/BV1m2GrzLE3J/) | 2025-04-29；官方赛事账号职业教学。 |
| 女枪 | lol超神解说lol | [赏金猎人基础教学](https://www.bilibili.com/video/BV1uy4y1q7gz/) | 2020；原标题含旧版穿甲思路，产品文案不将它作为当前强度结论。 |
| 阿狸 | 随风阿狸 | [阿狸实战集锦](https://www.bilibili.com/video/BV1CvFEz3EBP/) | 2026-02-07；本人投稿。原标题中的“版本第一”未用于推荐依据。 |
| 艾希 | 东北大鹌鹑工作室 | [2026-08-19回放，第4分集](https://www.bilibili.com/video/BV1xGbd6CEvf/?p=4) | 2026-08-20；分集列表明确第4局为寒冰，第3、5、7局为女枪。 |
| 锤石 | 小海锤石 | [锤石操作集锦](https://www.bilibili.com/video/BV17u411f75B/) | 2021-10-20；本人账号发布。观察建议不把集锦称作完整教学。 |
| 剑姬 | 哔哩哔哩英雄联盟赛事／Bin | [2020全球总决赛TOP5](https://www.bilibili.com/video/BV15i4y1L7wV/) | 2020-11-01；赛事官方账号。含Bin总决赛剑姬五杀，视频本身为多镜头TOP5。 |

## 按位置划分的观摩对象

| 位置 | 职业选手 | 主播 | 推荐依据与具体观察 |
| --- | --- | --- | --- |
| 上单 | Bin；Flandre（圣枪哥） | 店长盖伦 | Bin剑姬见官方总决赛视频；Flandre的奥恩、盖伦见官方LPL职业教学目录；店长盖伦见本人盖伦教学。看破绽路线、换血窗口、控制衔接。 |
| 打野 | Tian（小天）；Canyon | 格局 | Tian盲僧见官方LPL职业教学目录；Canyon盲僧对位豹女有[中文教练复盘](https://www.bilibili.com/video/BV1tZ421p7Hn/)；格局盲僧有[公开实战片段](https://www.bilibili.com/video/BV1ta4y1w74w/)。看刷野路线、判断对手动向与进退条件。 |
| 中单 | Faker；Care | 随风阿狸 | Faker的发条[公开排位OB](https://www.bilibili.com/video/BV1MGpuz1EiY/)与B站“T1-Faker”账号检索可见；Care安妮及随风阿狸见上表。看清线后行动、控球距离与魅惑前走位。 |
| 下路 | GALA；Uzi（职业生涯回顾） | 东北大鹌鹑 | GALA金克丝见上表；Uzi的[公开EZ完整对局](https://www.bilibili.com/video/BV1Vv41167gv/)及[公开授权录播分集](https://www.bilibili.com/video/BV173411c7M3/)包含EZ与艾希；大鹌鹑寒冰、女枪见上表。看攻击距离、持续输出与站位。 |
| 辅助 | Keria；Meiko | 青蛙；小海锤石 | Keria锤石有[中文操作盘点](https://www.bilibili.com/video/BV1j9U7Y6EDu/)及[细节片段](https://www.bilibili.com/video/BV1JW1bBbEPf/)；Meiko璐璐见[公开OB分集目录](https://www.bilibili.com/video/BV1y3WCzMEkB/)，其泰坦比赛使用记录亦已交叉核对；青蛙的[锤石打断教学](https://www.bilibili.com/video/BV15s411g75t/)及[虎牙平台介绍](https://blog.huya.com/news/8119)；小海为本人投稿。看保人、打断、控制链与游走。 |

官方教学目录的核对来源为英雄联盟赛事账号的[LPL职业教学合集公开页面](https://www.bilibili.com/video/BV1KUoeYtEBW/)，该页展示“Flandre全能坦克奥恩教学”“Flandre教你盖伦打出对线统治力”“Tian传授盲僧如何身负神龙之力”“1xn伊泽瑞尔，教你不再只做QDC”等条目。本次没有确定这些条目的独立BV号，因此对应按钮使用诚实的B站检索链接，不把合集当前播放的加里奥视频误当作奥恩、盖伦或EZ直链。

青蛙、格局和部分职业选手的B站内容包含第三方剪辑／OB。本项目不将这些账号标注为选手本人，不承诺第三方授权状态；具体原作者以目标平台展示为准。主播的实际开播平台与时段未作为本次推荐前提。

## 检索入口与局限

9 位英雄目前使用预填关键词的B站入口：墨菲特、奥恩、嘉文四世、伊泽瑞尔、沃里克、璐璐、诺提勒斯、索拉卡、阿木木。已核对的具体作者资料包括超神解说的石头人、狼人、泰坦；Flandre奥恩；1xn伊泽瑞尔；韦杰索拉卡。未确定单一合适作者的皇子、璐璐、阿木木标作“中文端游／辅助／打野教学”，不虚构作者背书。

这次验证为公开页面及其搜索索引的标题、作者、日期、简介、分集元数据核对；部分B站页面直接抓取返回412。没有登录账户，没有下载视频，也没有逐段播放确认解说内容、字幕、时长或当前版本装备数值。资料中的“看什么”是本项目为学习设计的观察任务，不是视频作者的逐字结论。旧年份视频已在对应观察说明中提示其适用范围。
