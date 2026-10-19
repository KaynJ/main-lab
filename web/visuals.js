// Official game artwork, stored locally for reliable previews. See docs/visual-sources.md.
export const gameVisuals = {
  lol: {
    name: '召唤师峡谷', url: './assets/background-lol.jpg',
    alt: '英雄联盟召唤师峡谷全景：河道、野区和双方基地构成完整战场。',
    source: 'https://www.leagueoflegends.com/en-us/news/dev/unleashing-the-elements/',
    credit: '© Riot Games · 召唤师峡谷'
  },
  hok: {
    name: '长安城', url: './assets/background-hok.jpg',
    alt: '王者荣耀世界观中的长安城：暮色下的宫殿、街市与灯火延伸至远方。',
    source: 'https://world.honorofkings.com/ipworld/en/region-detail-changan.html',
    credit: '© Tencent / TiMi · 王者长安城'
  },
  valorant: {
    name: '隐世修所', url: './assets/background-valorant.jpg',
    alt: '无畏契约隐世修所俯瞰图：夕阳照亮群山与寺院建筑。',
    source: 'https://playvalorant.com/en-us/media/',
    credit: '© Riot Games · China Launch / Haven Overlook'
  },
  ffxiv: {
    name: '图莱尤拉', url: './assets/background-ffxiv.jpg',
    alt: '最终幻想14黄金的遗产中的图莱尤拉：海湾、红色屋顶与山城阶梯。',
    source: 'https://eu.finalfantasyxiv.com/dawntrail/media/',
    credit: '© SQUARE ENIX · Dawntrail / 图莱尤拉'
  },
  wow: {
    name: '暴风城', url: './assets/background-wow.jpg',
    alt: '魔兽世界暴风城大门：巨型石像与城墙迎向远处的城镇和阳光。',
    source: 'https://worldofwarcraft.blizzard.com/en-gb/news/23429407/new-4k-digital-backgrounds-available',
    credit: '© Blizzard Entertainment · Stormwind City'
  },
  minecraft: {
    name: '方块世界', url: './assets/background-minecraft.jpg',
    alt: '我的世界官方场景：落日下的樱花、村庄、山峦与地下洞穴。',
    source: 'https://www.minecraft.com.cn/index-from-minecraft.html',
    credit: '© Mojang / Microsoft · 我的世界中国版官方场景'
  }
};

const questionArt = (file, alt, caption, hero) => ({
  url: `./assets/${file}`, alt,
  caption: `${caption} · 情境示意，请按自身偏好作答`,
  source: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero}_0.jpg`,
  credit: '© Riot Games'
});

// Each item corresponds to the same-index question in model.js. Artwork does not alter scores.
export const questionVisuals = [
  questionArt('question-01.jpg', '布隆举起盾牌，站在队伍前方。', '一起解决难关', 'Braum'),
  questionArt('question-02.jpg', '嘉文四世持长枪向前冲锋。', '创造突破机会', 'JarvanIV'),
  questionArt('question-03.jpg', '亚索持剑立于疾风之中。', '反应与操作', 'Yasuo'),
  questionArt('question-04.jpg', '迦娜驾驭环绕的风。', '支援与保护', 'Janna'),
  questionArt('question-05.jpg', '伊泽瑞尔使用发光的探险护手。', '尝试新方法', 'Ezreal'),
  questionArt('question-06.jpg', '李青在山地施展踢击。', '投入时间练习', 'LeeSin'),
  questionArt('question-07.jpg', '雷恩加尔独自在丛林中潜行。', '自己的节奏', 'Rengar'),
  questionArt('question-08.jpg', '艾希拉开冰弓，凝视远方。', '等待出手时机', 'Ashe'),
  questionArt('question-09.jpg', '斯维因与乌鸦俯视战场。', '留出思考空间', 'Swain'),
  questionArt('question-10.jpg', '凯特琳手持步枪执行任务。', '完成关键目标', 'Caitlyn'),
  questionArt('question-11.jpg', '巴德穿行于星光与奇妙生物之间。', '探索未知角落', 'Bard'),
  questionArt('question-12.jpg', '安妮与玩偶提伯斯一同出现在火光中。', '轻松开始一局', 'Annie')
];
