// Curated playstyle candidates, not a live market or a complete reproduction of a tier list.
// A source's season, variant, mode and platform must all agree before using its tier in scoring.
export const WEAPON_REVIEWED = '2026-10-19';

const video = (id, title, date) => ({
  title, author: 'Always聪聪', date,
  url: `https://www.bilibili.com/video/${id}/`,
  kind: 'video', verified: true,
  verification: '已核对原视频公开标题、作者或简介；未验证当前版本实测表现',
});

export const weaponSources = {
  s11: video('BV1rdh86NE5J', 'S11 赛季武器强度榜（正式发布）', '2026-09-21'),
  s10: video('BV1zsND6dEDt', 'S10 赛季武器强度榜', '2026-07-14'),
  s9: video('BV13RRbB6EdL', 'S9 武器强度榜与版本分析', '2026-05-07'),
  k437: video('BV1x4Y36FEmw', 'S11 K437 长枪管解析与改法', '2026-09-11'),
  mk4: video('BV1tZeP6UE11', 'S11 MK4 三连发与全自动改法', '2026-09-17'),
  mdr: video('BV1M7Ya6oEDB', 'S11 MDR 解析与改法', '2026-09-10'),
  thompson: video('BV1JYtk6ZE5y', 'S11 汤姆逊先进枪身解析与改法', '2026-09-05'),
  rm277: video('BV1XuTA6EEMU', 'S10 RM277 中远程解析与改法', '2026-06-28'),
};

export const weaponSeasons = [
  { id: 's11', label: 'S11 · 群星', mode: 'operations', platform: 'unspecified',
    date: '2026-09-21', source: weaponSources.s11, verified: true, reviewed: WEAPON_REVIEWED,
    notes: '已核对正式榜的存在；单枪只收录下方已核验的少量解析观点，不补写整榜。原页面未明确 PC / 手游，均不计平台强度加分。' },
  { id: 's10', label: 'S10 · 历史参考', mode: 'operations', platform: 'unspecified',
    date: '2026-07-14', source: weaponSources.s10, verified: true, reviewed: WEAPON_REVIEWED,
    notes: '有限摘录本人榜单简介中的候选与变体；没有把 M250 手游条目移作 PC 评价。历史评价不用于 S11。' },
  { id: 's9', label: 'S9 · 历史参考', mode: 'operations', platform: 'unspecified',
    date: '2026-05-07', source: weaponSources.s9, verified: true, reviewed: WEAPON_REVIEWED,
    notes: '仅保留少量有助于比较变体的历史记录；不代表季中热更新或后续赛季。' },
];

export const weaponScopeNote = '枪械先按玩法和手感筛选。作者梯度是有赛季、配件、弹药和交战条件的个人观点；未注明平台的评价只展示原条件，不计 PC 或手游强度分。全面战场不套用烽火地带榜单，需在游戏内确认兵种、解锁和可用装备。预算标签为配装取向，不是实时哈夫币报价。';

const rating = (seasonId, tier, variant, source, notes = '') => ({
  seasonId, tier, variant, mode: 'operations', platform: 'unspecified',
  scope: '烽火地带；原视频公开页面未明确 PC / 手游',
  sourceRatingLabel: `${tier} · ${variant}`,
  source, date: source.date, verified: true,
  notes: `未注明平台，未计入强度加分。${notes}`,
});
const hist = (seasonId, tier, variant, notes) => rating(seasonId, tier, variant, weaponSources[seasonId], notes);
const base = (id, name, type, range, handling, budget, tags, tradeoff, trial, seasonRatings, source = weaponSources.s11) => ({
  id, name, type, range, handling, budget, tags, tradeoff, trial, seasonRatings,
  modes: ['operations', 'warfare'], platforms: ['pc', 'mobile'],
  source, learningUrl: source.url,
  availabilityNote: '候选配装思路；全面战场须确认当前兵种与解锁列表，未作全兵种可用保证。',
});

// handling: low = less practice, medium = some practice, high = deliberately practice recoil / rhythm.
// Budget is a broad build direction, never the weapon's current exchange price.
export const deltaWeapons = [
  base('mp7', 'MP7', '冲锋枪', ['close', 'mid'], 'medium', 'premium', ['近点', '机动', '跟枪'],
    '近距离取向更明显；月影改装的历史评价不能套给裸枪，远点先找掩体拉距离。',
    '先练近点跟枪，再在中距离检查弹着散布；开镜与腰射分别试，不把一套改法用于全部距离。',
    [hist('s10', 'S上', '榜单所述 MP7'), hist('s9', 'S上', '月影 MP7')]),
  base('asval', 'AS Val', '突击步枪', ['close', 'mid'], 'high', 'premium', ['突破', '近中距离', '高练习投入'],
    '更适合愿意反复练习跟枪与弹匣管理的玩家；换弹时机与持续交火消耗需要预先考虑。',
    '练一次短交火后回到掩体，再尝试补枪；确认自己可接受弹药与续航管理。',
    [hist('s10', 'S+', '榜单所述 ASVAL'), hist('s9', 'S+天王', '榜单所述 ASVAL')]),
  base('m7', 'M7', '战斗步枪', ['mid', 'long'], 'medium', 'premium', ['均衡', '中远距离', '补枪'],
    '堤风与蓝管属于不同变体，不能因为都叫 M7 就共用同一梯度；成型配装与弹药也有成本。',
    '先试中距离控枪，再测试被贴脸时的应对；预算不够时优先比较自己能稳定命中的改法。',
    [hist('s10', 'S+', '堤风 M7'), hist('s10', 'A+', '蓝管 M7'), hist('s9', 'S+天王', '榜单上位 M7'), hist('s9', 'S下', '榜单另列 M7 变体；未补写枪管名称')]),
  base('m14', 'M14', '射手步枪', ['close', 'mid'], 'high', 'premium', ['爆发', '控枪练习', '补枪'],
    '名称是射手步枪也不等于远距离更适合；该候选侧重中近距离爆发，需要明显的控枪投入。',
    '分别测试操控和稳定配装，在自己常打的距离连射；若持续散布难以控制，先换低学习成本候选。',
    [hist('s10', 'S+', '榜单所述 M14'), hist('s9', 'S+', '榜单所述 M14')]),
  base('mk47', 'MK47', '突击步枪', ['mid', 'long'], 'high', 'premium', ['架点', '中远距离', '高练习投入'],
    '余烬、鏖战和普通版本差别很大。这里推荐先试架枪习惯，绝不把余烬评价套到基础版本。',
    '在靶场先比较自己实际能装出的版本，再练掩体后预瞄与连续命中，避免只看榜单购买高阶配件。',
    [hist('s10', 'S+天王', '余烬 MK47'), hist('s10', 'S+', '鏖战 MK47'), hist('s10', 'A+上', '普通 MK47')]),
  base('k437', 'K437', '突击步枪', ['close', 'mid', 'long'], 'medium', 'premium', ['均衡', '架点', '跟枪'],
    'S11 解析评价明确对应长枪管成型；不能套给裸枪或把全距离理解为没有距离衰减。',
    '比较近点开镜和中距离跟枪，再看自己是否需要更高稳定；先按实际可接受的整套预算试用。',
    [rating('s11', 'S+天王', '长枪管成型', weaponSources.k437), hist('s10', 'S中', '榜单所述 K437')], weaponSources.k437),
  base('k416', 'K416', '突击步枪', ['close', 'mid'], 'low', 'balanced', ['均衡', '容易上手', '跟枪'],
    '这里把它作为较易理解的自动武器试用起点，不保证低价裸枪具有高改表现。',
    '用能接受的改装练一个弹匣的短点射与跟枪，优先比较命中稳定，而非单看理论击杀时间。',
    [hist('s10', 'S中', '榜单所述 K416')]),
  base('p90', 'P90', '冲锋枪', ['close', 'mid'], 'low', 'balanced', ['近点', '续航管理', '跟枪'],
    '侧重近点跟枪体验；远处目标与高级护甲交战仍受弹药和距离限制，不替代中远架枪。',
    '先练近点移动目标，再观察连续交火后的剩余弹量，养成回掩体补状态的习惯。',
    [hist('s10', 'S下', '榜单所述 P90')]),
  base('akm', 'AKM', '突击步枪', ['mid'], 'medium', 'economy', ['预算控制', '中距离', '掩体'],
    '经济取向指先做必要改装；弹药和配件仍需按入场目标选择，没有固定的全套价格。',
    '先用适合自己的低倍镜练掩体点射，再决定是否值得追加稳定配件，保留可承受的撤离成本。',
    [hist('s10', 'A+', '普通 AKM；不包括急停版')]),
  base('m4a1', 'M4A1', '突击步枪', ['close', 'mid'], 'low', 'economy', ['预算控制', '均衡', '容易上手'],
    '属于可先试手感的基础路线；普通与急停版的训练方式不同，本页不将两者混称。',
    '先练连续命中与换弹回掩体，预算留给能承担的弹药和防护；不要为追逐梯度无上限加配件。',
    [hist('s10', 'A+', '普通 M4A1；不包括急停版')]),
  base('pkm', 'PKM', '通用机枪', ['mid', 'long'], 'high', 'premium', ['架点', '持续火力', '工程配合'],
    '机枪路线更需要预先站位与转移计划；持枪机动和主动清近点不如专门的突破思路直接。',
    '先练占住掩体后的持续射击，再练停火转移；全面战场先检查所用兵种能否携带。',
    [hist('s10', 'S上', '榜单所述 PKM')]),
  base('rm277', 'RM277', '突击步枪', ['mid', 'long'], 'medium', 'balanced', ['中远距离', '架点', '预瞄'],
    '本人 S10 解析把近战和较慢操控列为短板。更适合先架点，不适合无准备地贴脸冲房。',
    '选择中远距离移动靶试持续命中，再练被近点压迫时后撤或让队友接枪。',
    [hist('s10', 'S下', '榜单所述 RM277')], weaponSources.rm277),
  base('mk4', 'MK4', '冲锋枪', ['close', 'mid'], 'medium', 'balanced', ['近点', '节奏', '腰射'],
    '尖头弹三连发与全自动是两种不同路线；跳跃腰射、连发节奏与配弹会改变体验。',
    '先各试三连发和全自动：前者练点击节奏，后者练控枪；以命中和是否顺手决定路线。',
    [rating('s11', 'S+天王', '尖头弹三连发', weaponSources.mk4), rating('s11', 'S+', '全自动改装', weaponSources.mk4), hist('s10', 'S下', '三连发 MK4'), hist('s10', 'A+上', '全自动 MK4')], weaponSources.mk4),
  base('mdr', 'MDR', '突击步枪', ['close', 'mid', 'long'], 'high', 'premium', ['均衡', '控枪练习', '补枪'],
    '解析中的高改路线有明显水平跳动与续航限制；不要因为称为替代方案就认定所有预算都容易上手。',
    '先练中距离短交火，观察水平散布，再决定选操控或稳定路线；连续交火时预留换弹窗口。',
    [rating('s11', 'S上至S+', '解析中的成型改装范围', weaponSources.mdr, '原文是区间评价，不强行换算成单一数值。')], weaponSources.mdr),
  base('thompson', '汤姆逊', '冲锋枪', ['close', 'mid'], 'medium', 'balanced', ['近点', '机动', '短交火'],
    '先进枪身与弹药等级是评价前提，四弹局与五弹局不能共用“天王”标签；还需留意弹匣续航。',
    '先比较实际打算带的弹药与配件，练近点短交火和回掩体换弹；中远架枪交给更合适的候选。',
    [rating('s11', 'S+天王', '先进枪身 · 四弹局', weaponSources.thompson), rating('s11', 'S中上', '先进枪身 · 五弹局', weaponSources.thompson)], weaponSources.thompson),
];

// Source records can be displayed with their conditions even when platform is unknown.
export const weaponSourceRecordsFor = (weapon, seasonId, mode = 'operations') =>
  weapon.seasonRatings.filter(r => r.seasonId === seasonId && r.mode === mode);

// Unknown is never a wildcard. Do not silently substitute historical seasons or modes.
export function weaponRatingFor(weapon, seasonId, mode = 'operations', platform = 'pc') {
  if (!['pc', 'mobile'].includes(platform)) return null;
  const records = weaponSourceRecordsFor(weapon, seasonId, mode)
    .filter(r => r.verified && r.platform === platform && r.tier !== null);
  // Multiple variants need a user/build selection; selecting the highest would hide that requirement.
  return records.length === 1 ? records[0] : null;
}
