// Curated playstyle ideas for ARAM: Mayhem, independent of Summoner's Rift lanes.
// Scores express preference similarity; they are not win rates or psychological predictions.
export const HEXTECH_REVIEWED = '2026-10-19';
export const HEXTECH_VERSION = '0.3.0';
const traitKeys = ['team', 'risk', 'pace', 'support', 'explore', 'practice'];
const tags = (team, risk, pace, support, explore, practice) => ({team, risk, pace, support, explore, practice});
const search = query => `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`;
const heroSource = id => ({title: '腾讯英雄联盟 · 英雄资料', url: `https://lol.qq.com/data/info-defail.shtml?id=${id}`, kind: 'official'});

export const hextechSources = [
  {title: '英雄联盟官方：欢迎来到海克斯大乱斗', url: 'https://www.bilibili.com/video/BV1LHsiz3Eku/', creator: '英雄联盟官方', date: '2025-10-23', kind: 'official', note: '模式上线介绍；用于说明单路团战与强化符文，不代表当前强化池。'},
  {title: '海克斯大乱斗：乌迪尔两套出装玩法', url: 'https://www.bilibili.com/video/BV1AQfCBCEhZ/', creator: '酱油拌上白米饭', date: '2026-02-24', kind: 'video', note: '玩家玩法示例，非官方数值或当前版本保证。'},
  {title: '海克斯大乱斗：物理 AD 乌迪尔教学', url: 'https://www.bilibili.com/video/BV155rZBWExW/', creator: '声沙Hoarse', date: '2026-01-15', kind: 'video', note: '观察物理 Q 方向的进场与撤退；暴击与穿甲是不同属性，需按当局强化调整。'}
];

function build(id, name, description, seek, fallback, tradeoff, profile, style, query, lesson = null) {
  return {id, name, description, seek, fallback, tradeoff, tags: profile, style,
    url: search(query), source: {title: `${name} · B站教学搜索`, url: search(query), kind: 'search', note: '搜索入口，非固定视频；优先核对当前版本和原作者。'},
    ...(lesson ? {lesson} : {})};
}
function hero(id, name, alias, range, complexity, profile, reason, builds) {
  return {id, name, alias, range, complexity, tags: profile, reason, builds, source: heroSource(id)};
}

// “Seek” entries are effect categories to look for in the offered cards, not invented augment names.
export const hextechHeroes = [
  hero('Udyr', '乌迪尔', '兽灵行者', 'melee', 3, tags(55, 75, 60, 25, 95, 65), '同一位英雄可以围绕觉醒 R 的范围伤害，或 Q 的近身爆发展开，适合喜欢研究两套构筑的人。', [
    build('udyr-awakened-r', '大招流 · AP 觉醒 R', '玩家常把这一路线叫“大招流”或“双 R 流”：重点是 R 姿态与被动觉醒 R 的范围魔法伤害。乌迪尔没有常规终极技能，不能因此推定所有“终极技能”强化都会触发；先读当前客户端说明。', ['法术强度与魔法穿透', '持续技能伤害与范围伤害', '进场后生存、移速或技能循环'], '没有适配的伤害强化时，保留 R 清线与减速，补生存装备做半肉团战；不为等某一张卡强行投入。', '要接近敌人才能覆盖更多目标；觉醒用在 R 后，就不能同时用觉醒 W / E 自保。避免把“自爆”理解成无条件送出击杀。', tags(65, 75, 40, 35, 100, 45), 'poke', '海克斯大乱斗 乌迪尔 AP 觉醒R 大招流 当前版本', hextechSources[1]),
    build('udyr-physical-q', '穿甲流 · 物理 Q 爆发', '以 Q 和觉醒 Q 的近身攻击窗口为中心，考虑攻击力、物理穿透与进场条件；随机到普攻或暴击强化后再决定是否转相应分支。', ['攻击力与物理穿透', '普攻收益或攻击距离改善', '接近目标、保命与撤退能力'], '缺乏接近或生存条件时，转半肉 Q 持续战斗；不要为了堆穿甲放弃所有容错。', '依赖能否摸到合适的目标；面对控制与拉扯时纯输出容易阵亡，物理穿透也不直接放大魔法伤害部分。', tags(25, 95, 90, 10, 80, 90), 'duel', '海克斯大乱斗 乌迪尔 穿甲 Q 进场 教学 当前版本', hextechSources[2])
  ]),
  hero('Malphite', '墨菲特', '熔岩巨兽 / 石头人', 'melee', 1, tags(80, 60, 35, 70, 45, 25), '技能目标直观，可以按强化与阵容在承伤控制和 AP 爆发间选择。', [
    build('malphite-frontline', '护甲生命 · 控制前排', '围绕抗性、生命与技能循环，用大招打断进攻或为队友创造输出时间。', ['生命、护甲与魔法抗性', '承伤减免或护盾', '技能急速与控制后的生存'], '强化不连贯时，按敌方伤害类型补抗性，先完成一次队友跟得上的控制。', '面对魔法伤害不能只堆护甲；冲入人群后也需要队友的距离支持。', tags(95, 40, 25, 90, 25, 20), 'engage', '海克斯大乱斗 墨菲特 坦克 护甲 控制 教学'),
    build('malphite-ap', 'AP 爆发 · 一轮进场', '围绕法强与法穿寻找一轮技能爆发，进场前先观察敌人的位移和护盾。', ['法术强度与魔法穿透', '技能爆发收益', '大招循环或进场后保命'], '没拿到爆发或循环条件时，转半肉控制，不把每轮胜负押在一次大招上。', '纯 AP 的承伤能力更低；技能未击中或没有击杀时可能很难退出。', tags(45, 95, 65, 15, 85, 50), 'duel', '海克斯大乱斗 石头人 AP 大招 爆发 教学')
  ]),
  hero('Brand', '布兰德', '复仇焰魂 / 火男', 'ranged', 2, tags(65, 35, 45, 25, 70, 40), '依靠技能与被动的团战伤害，适合喜欢观察范围覆盖和技能循环的人。', [
    build('brand-burn', '灼烧流 · 持续施压', '用被动和多目标技能维持伤害，优先考虑持续伤害与技能循环能否互相放大。', ['持续伤害与灼烧收益', '技能急速与法力支持', '法术穿透或对高生命目标收益'], '没有灼烧联动时，使用常规法强与穿透，先保证技能命中和安全距离。', '需要技能命中与持续站位，容易被突进；不要为触发效果走进敌方控制范围。', tags(65, 25, 30, 35, 60, 35), 'poke', '海克斯大乱斗 火男 灼烧 技能循环 教学 当前版本'),
    build('brand-burst', '法穿爆发 · 连招团伤', '等队友控制或对手靠近后，集中一轮技能打出多目标伤害。', ['法术强度与魔法穿透', '技能爆发或技能暴击条件', '技能衔接与进场自保'], '缺少爆发强化时，回到持续消耗，不把技能全交给同一个高抗性目标。', '短时间内需要处理技能顺序与目标；等待队友控制往往比自己走上去硬打更安全。', tags(55, 70, 75, 20, 85, 75), 'duel', '海克斯大乱斗 火男 法穿 爆发 连招 教学')
  ]),
  hero('MissFortune', '厄运小姐', '赏金猎人 / 女枪', 'ranged', 2, tags(60, 30, 35, 20, 80, 30), '可以尝试 AD 大招团伤或 AP 技能消耗，两套路线在出装和站位上有明显差异。', [
    build('missfortune-ad', 'AD 大招流 · 扇形团伤', '围绕物理输出，在队友控制后寻找安全的大招角度；平时保留普攻与 Q 的输出。', ['攻击力与物理穿透', '大招或技能循环', '施法期间的安全与自保'], '没有大招强化时，仍按物理输出构筑；等待对手打断技能交掉再开大。', '引导期间容易被打断或切入；不能为了覆盖更多人站到敌人脸上。', tags(75, 40, 40, 20, 45, 35), 'dps', '海克斯大乱斗 女枪 AD 大招流 教学 当前版本'),
    build('missfortune-ap', 'AP 消耗流 · E 区域压制', '围绕 E 的范围消耗与减速配合法强、持续伤害和技能循环，利用距离限制敌人行动。', ['法术强度与持续伤害', '技能急速与法力支持', '减速区域或技能命中收益'], '若强化更偏普攻或物理输出，及时转 AD；不要在没有联动时机械坚持 AP。', 'AP 会改变普攻和大招的相对收益；技能落空或对面有回复时，单纯远程消耗可能不足。', tags(45, 10, 20, 35, 100, 20), 'poke', '海克斯大乱斗 AP女枪 E 消耗 出装 教学 当前版本')
  ]),
  hero('Ashe', '艾希', '寒冰射手', 'ranged', 2, tags(80, 20, 60, 55, 50, 50), '减速、远程控制与普攻输出能分别构成偏功能或偏持续输出的体验。', [
    build('ashe-attacks', '攻速普攻流 · 拉扯输出', '围绕攻击速度与普攻收益，边移动边攻击安全范围内的目标。', ['攻击速度与普攻收益', '攻击距离或移动能力', '持续输出和生存'], '没有普攻联动时，保留射手基础输出并补生存，不强行追求极端攻速。', '没有常规位移，普攻频率越高越需要控制走位，不能站定输出。', tags(70, 35, 90, 15, 35, 80), 'dps', '海克斯大乱斗 艾希 攻速 普攻 走A 教学'),
    build('ashe-utility', '技能急速流 · 减速与控制', '围绕 W 的减速和 R 的控制为队友创造机会；先确认当局强化是否支持技能循环。', ['技能急速与法力支持', '远程控制与命中收益', '技能消耗与团队功能'], '拿不到循环条件时，回到常规普攻输出；控制依然可以作为队伍的开战工具。', '只追求技能频率可能导致打前排伤害不足；大招远距离命中也不代表队友能跟上。', tags(95, 10, 25, 95, 65, 25), 'protect', '海克斯大乱斗 艾希 技能急速 W 大招流 教学 当前版本')
  ]),
  hero('Soraka', '索拉卡', '众星之子 / 奶妈', 'ranged', 2, tags(100, 10, 30, 100, 50, 30), '以队友血量和关键技能的时机作为主要反馈，适合享受保护与救场的人。', [
    build('soraka-heal', '治疗续航流 · 团队补给', '围绕治疗收益、技能循环与自身生存，持续为能安全接近的队友恢复状态。', ['治疗与护盾收益', '技能急速和资源恢复', '自身抗性、生命与保命'], '没有治疗联动时，优先保证自己活着并用 E 阻断敌人；不为堆治疗量牺牲站位。', '模式内治疗修正与重伤会改变实际回复；治疗不是可以无限承担敌方爆发的保证。', tags(100, 5, 20, 100, 30, 20), 'protect', '海克斯大乱斗 索拉卡 治疗流 续航 教学 当前版本'),
    build('soraka-control', '急速功能流 · Q / E 反打', '更侧重 Q 命中后的持续周旋和 E 的沉默区域，仍保留治疗职责，用技能循环帮队友挡住切入。', ['技能急速与资源支持', '移动和自我生存', '控制区域与技能命中收益'], '循环收益不足时，回到治疗保护；不要把“功能流”理解成独自冲到前排打伤害。', '依赖技能预判；功能装与治疗装需要按当前局势取舍，不能保证同时最大化输出和治疗。', tags(95, 30, 55, 90, 85, 65), 'poke', '海克斯大乱斗 索拉卡 Q E 技能急速 反打 教学')
  ]),
  hero('Garen', '盖伦', '德玛西亚之力', 'melee', 1, tags(50, 65, 35, 35, 50, 20), '操作目标直观，可按当局强化选择更耐打的战士或偏 E 技能输出的路线。', [
    build('garen-bruiser', '半肉战士流 · 进退换血', '围绕生命、抗性和移动能力，承担一轮压力后寻找退出或再次进入的机会。', ['生命、抗性与减伤', '移速与接近目标', '持续战斗或恢复能力'], '没有成套联动时，按对方伤害补防装，先用沉默与站位干扰敌方关键目标。', '近战容易被拉扯；耐打不代表能独自承受五人集火。', tags(75, 50, 25, 65, 20, 15), 'engage', '海克斯大乱斗 盖伦 半肉 战士 出装 教学'),
    build('garen-spin', '转圈输出流 · E 伤害构筑', '围绕 E 的范围输出选择攻击属性；若出现针对旋转技能的强化，先确认它在当前版本对盖伦的实际说明。', ['攻击力及 E 可利用的攻击属性', '旋转或范围技能收益（仅当局出现时）', '进场能力与伤害期间保命'], '拿不到适配 E 的收益时，转半肉；不为等待某张旋转卡放弃可用强化。', '输出装备会降低容错，E 结束后容易被反打；历史视频的特殊组合可能已调整。', tags(35, 85, 60, 10, 95, 40), 'duel', '海克斯大乱斗 盖伦 E 旋转 输出 教学 当前版本')
  ]),
  hero('Lux', '拉克丝', '光辉女郎', 'ranged', 2, tags(70, 15, 30, 65, 45, 30), '在保留距离的同时，用消耗、控制或护盾参与团战，适合先熟悉技能预判的人。', [
    build('lux-poke', '法穿消耗流 · 远程技能', '围绕远程技能命中与法强法穿，保留控制处理突进，等待安全的爆发窗口。', ['法术强度与魔法穿透', '技能命中、爆发或范围伤害', '技能急速与法力支持'], '没有爆发联动时，用 E 清线和消耗，不冒险上前追求整套命中。', '技能落空会留下危险窗口；长手也需要观察对方突进距离。', tags(45, 10, 25, 25, 45, 25), 'poke', '海克斯大乱斗 拉克丝 法穿 消耗 教学'),
    build('lux-shield', '护盾功能流 · 保护与控制', '当强化和队伍需要都偏保护时，提高护盾与技能循环收益，用 W 和控制帮队友持续作战。', ['护盾与保护收益', '技能急速和法力支持', '团队功能与自我生存'], '没有保护联动或队伍缺伤害时，回到常规法强消耗，保持控制和护盾的基础价值。', '需要判断队友移动方向；过度投入保护可能让队伍缺少足够输出。', tags(100, 10, 30, 100, 65, 45), 'protect', '海克斯大乱斗 拉克丝 护盾 功能 辅助流 教学 当前版本')
  ])
];

const defaults = {experience: 'regular', mechanics: 'medium', goal: 'relax', party: 'solo', style: 'auto', range: 'any', time: 'medium'};
const options = {experience: ['new', 'returning', 'regular'], mechanics: ['low', 'medium', 'high'], goal: ['learn', 'relax', 'climb'], party: ['solo', 'duo', 'group'], style: ['auto', 'duel', 'engage', 'protect', 'poke', 'dps'], range: ['any', 'melee', 'ranged'], time: ['short', 'medium', 'long']};
function validate(traits, input) {
  if (!traits || traitKeys.some(key => !Number.isFinite(traits[key]) || traits[key] < 0 || traits[key] > 100)) throw new Error('海克斯推荐需要完整的六维偏好数据（0–100）。');
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('海克斯推荐需要游玩条件。');
  // Lane and macro are deliberately excluded: this is one-lane team combat.
  const context = Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, input[key] ?? value]));
  for (const [key, values] of Object.entries(options)) if (!values.includes(context[key])) throw new Error(`海克斯游玩条件无效：${key}`);
  return context;
}
const similarity = (traits, target) => 100 - traitKeys.reduce((sum, key) => sum + Math.abs(traits[key] - target[key]), 0) / traitKeys.length;
function learningFit(hero, c) {
  const ceiling = {low: 1, medium: 3, high: 5}[c.mechanics];
  return Math.max(0, 100 - Math.max(0, hero.complexity - ceiling) * 30 - (c.experience === 'new' ? (hero.complexity - 1) * 10 : 0));
}
const styleFit = (build, c) => c.style === 'auto' ? 60 : build.style === c.style ? 100 : 25;
const preferenceLabels = {team: ['独立判断', '团队配合'], risk: ['稳健试探', '主动冒险'], pace: ['从容规划', '快速应变'], support: ['亲自输出', '保护队友'], explore: ['熟悉路线', '探索构筑'], practice: ['轻松上手', '反复练习']};
function buildReason(traits, entry, c) {
  const directional = traitKeys.filter(key => Math.abs(traits[key] - 50) >= 20);
  const closest = directional.filter(key => Math.abs(traits[key] - entry.tags[key]) <= 30).sort((a, b) => Math.abs(traits[a] - entry.tags[a]) - Math.abs(traits[b] - entry.tags[b])).slice(0, 2);
  const signals = closest.map(key => preferenceLabels[key][traits[key] > 50 ? 1 : 0]);
  if (signals.length) return `你的「${signals.join('、')}」偏好与这条路线较接近${c.style === entry.style ? '，也回应了本次选择的操作体验' : ''}。`;
  return directional.length ? '本次明确偏好未找到足够接近的玩法标签，可将这条路线作为对照体验，先比较操作和风险，再按当局强化调整。' : '本次六维偏好没有明显方向，可先比较这条路线的操作与风险，再按当局强化调整。';
}

export function recommendHextech(traits, input, rolledHeroId = 'auto') {
  const context = validate(traits, input);
  if (typeof rolledHeroId !== 'string' || (rolledHeroId !== 'auto' && !hextechHeroes.some(hero => hero.id === rolledHeroId))) throw new Error('请选择资料库中的已随机英雄，或选择“尚未随机到英雄”。');
  const pool = rolledHeroId === 'auto' ? hextechHeroes : hextechHeroes.filter(hero => hero.id === rolledHeroId);
  const picks = pool.map(hero => {
    const learning = learningFit(hero, context);
    const builds = hero.builds.map(entry => ({...entry, score: Math.round(similarity(traits, entry.tags) * .72 + styleFit(entry, context) * .18 + learning * .10), reason: buildReason(traits, entry, context)})).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    const range = context.range === 'any' ? 60 : context.range === hero.range ? 100 : 15;
    const party = context.party === 'solo' ? 60 : hero.tags.team;
    const style = Math.max(...hero.builds.map(entry => styleFit(entry, context)));
    const goalFit = context.goal === 'learn' ? learning : context.goal === 'relax' ? 100 - Math.max(0, hero.complexity - 2) * 15 : 60;
    const score = Math.round(similarity(traits, hero.tags) * .40 + builds[0].score * .15 + learning * .15 + style * .10 + range * .10 + party * .05 + goalFit * .05);
    return {...hero, score, builds, reason: `${hero.reason} ${builds[0].reason}`, learningLabel: hero.complexity <= 2 ? '先熟悉站位与技能即可尝试' : '先练姿态切换和进退时机', primaryBuild: builds[0].id};
  }).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, rolledHeroId === 'auto' ? 3 : 1);
  const notes = [
    '海克斯大乱斗按单路团战与强化构筑推荐；英雄随机分配，推荐列表不代表你能自由选到。已随机到英雄时，可以只查看该英雄的两条路线。',
    '“优先寻找”列出的是强化的属性或机制方向，不是具体海克斯名称，也不保证当局出现。以实际给出的选项、当前技能说明和双方阵容决定路线。',
    '流派是编辑整理的试玩思路，排序表示偏好相似程度，不是胜率或版本强度；历史视频仅供观察操作，不照搬旧强化池。'
  ];
  if (context.time === 'short') notes.push('你本次时间少于 30 分钟：海克斯大乱斗不能保证按时结束；有硬性截止时间时先做可随时结束的单人练习。');
  if (context.goal === 'climb') notes.push('本次选择了准备排位：此处提供娱乐模式的另一套尝试，排位练习请使用召唤师峡谷方案。');
  return {version: HEXTECH_VERSION, reviewed: HEXTECH_REVIEWED, mode: '海克斯大乱斗', context, rolledHeroId, picks, note: notes.join(' '), notes, sources: hextechSources, method: '六维偏好 + 操作成本 + 距离 / 体验 / 组队条件；独立于峡谷位置评分。'};
}

export function hextechMarkdown(result) {
  const lines = ['## 海克斯大乱斗 · 英雄与强化构筑', `资料编辑日期：${result.reviewed}；规则版本：${result.version}`, result.rolledHeroId === 'auto' ? '以下是随机选人阶段可留意的英雄候选。' : '已按你实际随机到的英雄筛选。', result.note];
  for (const hero of result.picks) {
    lines.push('', `### ${hero.name}（${hero.alias}）`, hero.reason, hero.learningLabel, `[英雄资料](${hero.source.url})`);
    for (const entry of hero.builds) {
      lines.push('', `#### ${entry.name}`, entry.description, entry.reason, `优先寻找的属性 / 机制：${entry.seek.join('；')}。`, `没拿到时：${entry.fallback}`, `取舍：${entry.tradeoff}`, `[B站教学搜索入口，非固定视频](${entry.url})`);
      if (entry.lesson) lines.push(`[${entry.lesson.title}](${entry.lesson.url}) · ${entry.lesson.creator} · ${entry.lesson.date}；${entry.lesson.note}`);
    }
  }
  lines.push('', '### 资料来源', ...result.sources.map(source => `- [${source.title}](${source.url}) · ${source.creator} · ${source.date}；${source.note}`), '', result.method);
  return lines.join('\n');
}
