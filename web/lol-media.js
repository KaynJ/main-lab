// 中国平台资料，2026-10-19 核对公开稿件元数据。
// kind:'search' 是检索入口；year:null 表示没有指定固定稿件，不暗示发布年份。
// 固定稿件的年份是发布年份，不能用于判断当前版本强度；未验证站内播放权限。
const bilibiliSearch = keyword => `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`;
const video = (creator, title, bvid, year, focus, extra = {}) => ({
  creator, title, url: `https://www.bilibili.com/video/${bvid}/`, year,
  language: '中文内容', platform: '哔哩哔哩', kind: 'video', focus, ...extra
});
const search = (creator, title, keyword, focus) => ({
  creator, title, url: bilibiliSearch(keyword), year: null,
  language: '中文检索', platform: '哔哩哔哩', kind: 'search', focus
});

export const tutorials = {
  Malphite: search('超神解说', '墨菲特对线与团战教学 · B站检索', '英雄联盟端游 lol超神解说lol 熔岩巨兽石头人 教学', '先看抗压补刀、用被动护盾换血，再看大招出手前队友能否跟进。选择端游内容，旧版符文和装备只作历史参考。'),
  Ornn: search('Flandre · 英雄联盟赛事', '奥恩职业教学 · B站检索', 'LPL职业教学 Flandre 全能坦克 奥恩', '看易碎的触发、地形与击飞衔接，区分远距离开团和留技能保护队友。先练稳定打出控制，再追求完整连招。'),
  JarvanIV: search('中文端游教学', '嘉文四世刷野与进场 · B站检索', '英雄联盟端游 皇子 嘉文四世 打野 完整对局 教学', '暂停在每次 EQ 前，判断队友距离、敌方位移和退路。比较先手开团与反手保护的收益，别把每次大招都当作必须进场。'),
  LeeSin: video('LPL战术小黑板', '盲僧入门与技巧教学', 'BV1X64y1873W', '2021', '先学 Q、W 和大招的进退条件，再练摸眼与回旋踢。资料含作者注明已获授权的演示素材；野区路线与装备请对照当前客户端。'),
  Orianna: video('超神解说', '发条魔灵技巧、对线与团战', 'BV1Ht4y1X7ZU', '2020', '同时跟踪英雄和球的位置，观察用球压迫走位、补刀与保护队友。此为旧版教学，技能数值、装备与符文以当前客户端为准。'),
  Jinx: {
    creator: 'GALA · 英雄联盟赛事', title: '职业教学：金克丝技能释放细节',
    url: 'https://www.douyin.com/video/7453363151157873929', year: '2024',
    language: '中文讲解', platform: '抖音', kind: 'video',
    focus: '看两种武器的距离管理和技能释放细节；把观察应用到自己每次换枪的目的上。视频为 2024 年资料，当前数值和出装须另外核对。'
  },
  Ezreal: search('1xn · 英雄联盟赛事', '伊泽瑞尔职业教学 · B站检索', 'LPL职业教学 1xn 伊泽瑞尔 教你不再只做QDC', '看技能之间穿插普攻的时机，以及 E 留作撤退还是主动进攻。重点纠正只在最远处放 Q、忽略安全普攻机会的习惯。'),
  Garen: video('店长盖伦', '盖伦对线莫德凯撒：详细教学', 'BV1h5411H7RL', '2020', '重点看短换血、撤退等被动回复、判断对手技能空档。只参考对线决策，旧出装与伤害阈值不能直接套用当前版本。'),
  Lux: video('娜仙女Lux', '拉克丝对线阿狸：逆风完整对局', 'BV1ng411X7Y3', '2022', '先看技能距离和清线时机，再看逆风时如何保留 Q 防突进。观察安全补伤害的站位，旧版装备与符文不要照搬。'),
  Warwick: search('超神解说', '沃里克机制与打野教学 · B站检索', '英雄联盟端游 lol超神解说lol 狼人 沃里克 打野', '关注 Q 的跟随条件、E 的减伤与恐惧，以及发现残血目标后是否值得离开野区。优先选打野完整对局，避免把上单专用打法照搬到打野。'),
  Annie: video('Care · 英雄联盟赛事', '职业教学：安妮技能调整与连招', 'BV1m2GrzLE3J', '2025', '重点看被动晕眩的准备与技能衔接；在自己的回放中标出每次进场前是否有可靠控制。该稿介绍发布时的改动，仍需核对当前版本。'),
  Lulu: search('中文辅助教学', '璐璐保护与对线 · B站检索', '英雄联盟端游 璐璐 辅助 教学 保护 变羊', '观察 W 给队友还是变羊敌人的取舍、护盾的释放时机和自身站位。选择端游辅助内容，练习先保护最有输出空间的队友。'),
  Nautilus: search('超神解说', '诺提勒斯控制与开团教学 · B站检索', 'lol超神解说lol 深海泰坦 诺提勒斯 12个必学技巧', '看出钩前是否有兵线遮挡、队友能否跟进，以及钩墙撤退的使用。先练普通攻击定身与控制衔接，避免只看高光强开。'),
  Soraka: search('韦杰', '索拉卡保护与站位 · B站检索', '韦杰 索拉卡 小型教学 思路 技巧', '关注自己的血量、安全命中 Q、沉默区域与队友血量之间的取舍。寻找端游辅助对局，先确保自己活着，再追求治疗总量。'),
  Amumu: search('中文打野教学', '阿木木打野与团战 · B站检索', '英雄联盟端游 阿木木 打野 完整对局 教学', '观察刷野和抓人的机会成本、绷带进场前的视野、以及大招能否命中关键目标。优先看完整对局中的空档期如何处理。'),
  MissFortune: video('超神解说', '厄运小姐基础与大招释放教学', 'BV1uy4y1q7gz', '2020', '观察 Q 的弹射角度、与队友控制衔接大招，以及开大时会被谁打断。此为旧版资料，标题中的穿甲出装不作为当前版本固定答案。'),
  Ahri: video('随风阿狸', '阿狸实战操作集锦', 'BV1CvFEz3EBP', '2026', '看魅惑前的走位诱导、大招位移与收尾时机。集锦省略了失败与发育过程，先复现一次安全进退；不采信原标题的版本强度排名。'),
  Ashe: video('东北大鹌鹑工作室', '艾希完整对局 · 2026年8月19日回放第4局', 'BV1xGbd6CEvf', '2026', '选择第 4 个分集看寒冰，重点看普攻后的移动、距离管理和大招选择。完整对局比单看击杀更适合观察持续输出的前提。', { url: 'https://www.bilibili.com/video/BV1xGbd6CEvf/?p=4' }),
  Thresh: video('小海锤石', '锤石操作集锦：钩子、灯笼与控制', 'BV17u411f75B', '2021', '先看灯笼如何帮助队友脱离危险，再看 Q 与 E 的衔接。集锦适合拆解单次操作；找同英雄完整对局补充视野和游走判断。'),
  Fiora: video('哔哩哔哩英雄联盟赛事', '2020总决赛高光：Bin剑姬五杀', 'BV15i4y1L7wV', '2020', '这是赛事官方发布的历史 TOP5 集锦。观察 Bin 剑姬入场前的血量、敌方位置与破绽路线；五杀高光不等于每局都该强行追击。')
};

const observerSearch = (name, champions, keyword, focus, extra = {}) => ({
  name, champions, focus, url: bilibiliSearch(keyword), platform: '哔哩哔哩', kind: 'search', ...extra
});
const observerVideo = (name, champions, url, title, focus, extra = {}) => ({
  name, champions, title, focus, url, platform: '哔哩哔哩', kind: 'video', ...extra
});

// 每路分别呈现职业比赛观察和主播练习观察；champions 是已核实可检索的示例，非完整英雄池。
// 选手的现役状态、所属队伍和平台签约可能变化，因此不据此承诺当前直播安排。
export const observersByLane = {
  top: {
    professionals: [
      observerVideo('Bin', ['Fiora'], 'https://www.bilibili.com/video/BV15i4y1L7wV/', '2020总决赛剑姬五杀 · 官方赛事集锦', '剑姬：看破绽路线、反打条件和追击选择。先判断为什么能入场，再看手速。'),
      observerSearch('Flandre（圣枪哥）', ['Ornn', 'Garen'], '英雄联盟赛事 LPL职业教学 Flandre 奥恩 盖伦', '奥恩与盖伦：看坦克控制衔接、换血和技能细节，适合从稳定对线开始。')
    ],
    streamers: [
      observerVideo('店长盖伦', ['Garen'], 'https://www.bilibili.com/video/BV1h5411H7RL/', '盖伦对线莫德凯撒 · 本人教学', '盖伦：看短换血、技能空档和撤退回复，把一次次安全换血累积成对线优势。')
    ]
  },
  jungle: {
    professionals: [
      observerSearch('Tian（小天）', ['LeeSin'], '英雄联盟赛事 LPL职业教学 Tian 盲僧 身负神龙之力', '盲僧：先看抓人前的线路选择、队友位置和进场后的退路，再学回旋踢。'),
      observerVideo('Canyon', ['LeeSin'], 'https://www.bilibili.com/video/BV1tZ421p7Hn/', '盲僧对位Tarzan豹女 · 中文复盘', '盲僧：看刷野顺序、对手路径判断和入侵时机；此入口是教练复盘，包含对决策的解读。', { publisher: 'lol教练TTS' })
    ],
    streamers: [
      observerSearch('格局', ['LeeSin'], '英雄联盟 格局 盲僧 打野 完整对局', '盲僧：选完整打野对局，看刷野、抓人和资源交换如何接起来；别只练击杀镜头中的连招。')
    ]
  },
  mid: {
    professionals: [
      observerSearch('Faker', ['Orianna', 'Ahri'], 'T1-Faker 发条 阿狸 完整对局', '发条与阿狸：看清线后的行动、技能距离和团战前的站位；可优先筛选本人或赛事官方稿件。'),
      observerVideo('Care', ['Annie'], 'https://www.bilibili.com/video/BV1m2GrzLE3J/', '安妮连招与技能调整 · 官方职业教学', '安妮：看晕眩准备和控制衔接；学会在出手前确认自己的爆发窗口。')
    ],
    streamers: [
      observerVideo('随风阿狸', ['Ahri'], 'https://www.bilibili.com/video/BV1CvFEz3EBP/', '阿狸实战集锦 · 本人发布', '阿狸：拆解一次魅惑命中前的走位诱导，再练大招进退；配合完整对局看发育。')
    ]
  },
  bot: {
    professionals: [
      observerVideo('GALA', ['Jinx'], 'https://www.douyin.com/video/7453363151157873929', '金克丝技能细节 · 官方职业教学', '金克丝：看武器切换与技能衔接，把安全输出距离作为第一观察目标。', { platform: '抖音' }),
      observerSearch('Uzi（职业生涯回顾）', ['Ezreal', 'Ashe'], 'Uzi 伊泽瑞尔 寒冰 第一视角 完整对局', '伊泽瑞尔与艾希：看补刀间的换血、攻击距离和团战持续输出。历史对局的旧出装不照搬。')
    ],
    streamers: [
      observerVideo('东北大鹌鹑', ['Ashe', 'MissFortune'], 'https://www.bilibili.com/video/BV1xGbd6CEvf/?p=4', '寒冰与女枪完整对局 · 工作室回放', '第 4 分集看艾希走砍，第 3、5、7 分集看女枪团战站位和大招角度。')
    ]
  },
  support: {
    professionals: [
      observerSearch('Keria', ['Thresh'], 'Keria 锤石 泰坦 完整对局', '锤石：看灯笼保人、出钩角度和游走时机。完整对局可观察没有击杀时怎样提供价值。'),
      observerSearch('Meiko', ['Nautilus', 'Lulu'], 'Meiko 泰坦 璐璐 辅助 第一视角', '泰坦与璐璐：看硬辅何时先手、软辅保护谁，以及视野与队友行动如何同步。')
    ],
    streamers: [
      observerSearch('青蛙', ['Thresh'], '青蛙 锤石 打断 教学', '锤石：看 E 打断位移、灯笼救人和反手保护；先掌握防守技能再追求进攻命中率。'),
      observerVideo('小海锤石', ['Thresh'], 'https://www.bilibili.com/video/BV17u411f75B/', '锤石操作集锦 · 本人发布', '锤石：把每次控制链拆成钩子、厄运钟摆和队友跟进三步，观察出手前的位置条件。')
    ]
  }
};
