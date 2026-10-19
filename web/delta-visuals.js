// Official Tencent artwork saved without image edits. Sources: docs/delta-visual-sources.md.
const official = 'https://df.qq.com/index.shtml';
const art = 'https://game.gtimg.cn/images/dfm/cp/a20240906main/';
const credit = '© Tencent / Team Jade · 三角洲行动官方美术';

export const deltaGameVisual = {
  name: '航天基地',
  url: './assets/delta/background.jpg',
  alt: '三角洲行动航天基地全景：火箭从发射塔升空，棕榈树与航天设施延伸至远方。',
  source: official,
  original: `${art}p7-m1-3.jpg`,
  credit
};

const questionArt = (index, original, alt, caption) => ({
  url: `./assets/delta/question-${String(index).padStart(2, '0')}.jpg`,
  alt,
  caption: `${caption} · 官方情境示意，请按自身偏好作答`,
  source: official,
  original: `${art}${original}`,
  credit
});

// One distinct official image for each same-index question in model.js.
// These scenes illustrate preferences; they neither change scoring nor establish psychological validity.
export const deltaQuestionVisuals = [
  questionArt(1, 'p3_img5.jpg', '多名三角洲干员在战场两侧协同推进，互相掩护。', '一起解决难关'),
  questionArt(2, 'p3_img2.jpg', '干员乘直升机进入燃烧的城市战区，地面载具正在推进。', '主动创造突破机会'),
  questionArt(3, 'p3_img7.jpg', '干员在近距离交火中使用护盾与战术装置，队友从两侧行动。', '快速反应与连续操作'),
  questionArt(4, 'p3_img6.jpg', '蝶蹲在倒地队员身边实施救援，两名队友在后方持枪警戒。', '支援和保护队友'),
  questionArt(5, 'p5_img1.jpg', '三角洲行动官方改枪展示，步枪配有多倍率瞄具、消音器和握把。', '尝试不同的配装方法'),
  questionArt(6, 'p6_img1.jpg', '一辆主战坦克停在训练区域，炮塔与履带清晰可见。', '投入时间掌握新装备'),
  questionArt(7, 'p3_img3.jpg', '一名干员站在直升机残骸前，观察充满烟尘的街道。', '决定自己的行动节奏'),
  questionArt(8, 'p7-m1-1.jpg', '从高处俯瞰巴克什的建筑与街道，远处高塔和烟柱清晰可见。', '先观察，再选择时机'),
  questionArt(9, 'p7-m1-5.jpg', '零号大坝前的掩体、道路与营地组成多条可选行动路线。', '留出观察与规划空间'),
  questionArt(10, 'p3_img4.jpg', '持盾干员在集装箱掩体后布置装置，队友向前方目标交火。', '亲自完成关键目标'),
  questionArt(11, 'p7-m1-4.jpg', '长弓溪谷区域的拱门、植被、街道和远处山丘。', '探索地图角落和新路线'),
  questionArt(12, 'p3_img1.jpg', '三名装备齐全的干员组成小队，在航天设施内准备行动。', '选择适合自己的上手方式')
];

// Internal keys match delta operator data. These keys are not displayed as verified English callsigns.
export const deltaPortraits = {
  hackclaw: './assets/delta/operator-hackclaw.png',
  vyron: './assets/delta/operator-vyron.png',
  uluru: './assets/delta/operator-uluru.png',
  luna: './assets/delta/operator-luna.png',
  stinger: './assets/delta/operator-stinger.png',
  dwolf: './assets/delta/operator-dwolf.png',
  shepherd: './assets/delta/operator-shepherd.png',
  toxik: './assets/delta/operator-toxik.png',
  sineva: './assets/delta/operator-sineva.png',
  nox: './assets/delta/operator-nox.png',
  tempest: './assets/delta/operator-tempest.png',
  raptor: './assets/delta/operator-raptor.png',
  bit: './assets/delta/operator-bit.png',
  gizmo: './assets/delta/operator-gizmo.png',
  echo: './assets/delta/operator-echo.jpg',
  nitrogen: './assets/delta/operator-nitrogen.jpg',
  rowan: './assets/delta/operator-rowan.jpg'
};
