import {dimensions} from './model.js';
import {deltaClasses, deltaOperators} from './delta-operators.js';
import {weaponSeasons, deltaWeapons, weaponRatingFor} from './delta-weapons.js';

export const DELTA_VERSION = '0.4.0';
export const DELTA_REVIEWED = '2026-10-19';
export const deltaQuestions = [
  ['team', '接敌或推进目标时，我更想和队友沟通后一起行动。'],
  ['risk', '即使可能率先倒地，我也愿意主动进点创造突破机会。'],
  ['pace', '我享受贴近交战、快速反应和连续转移的过程。'],
  ['support', '报出关键信息、救起队友或提供补给，也会让我很有成就感。'],
  ['explore', '比起反复走最熟悉的路线，我更愿意尝试新路线和配装。'],
  ['practice', '为了熟悉干员技能、压枪和跟枪，我愿意专门练习。'],
  ['team', '比起跟着队伍，我更喜欢自己决定路线和行动节奏。', true],
  ['risk', '我更愿意等到有把握、有退路时，再主动交火。', true],
  ['pace', '我喜欢提前架枪、观察和规划，而不是连续突进。', true],
  ['support', '相比提供信息、医疗或掩护，我更想亲自完成关键击倒。', true],
  ['explore', '我会主动研究侧翼、不同交战距离和枪械组合。'],
  ['practice', '如果一种干员或枪械需要反复练习，我通常会先换一个直观的。', true]
];

export const deltaContextFields = [
  {id:'mode', label:'这次主要玩什么模式？', default:'operations', options:[['operations','烽火地带 · 搜索、交战与撤离'],['warfare','全面战场 · 争夺目标与团队推进']]},
  {id:'platform', label:'在哪个平台游玩？', default:'pc', options:[['pc','PC 端'],['mobile','移动端']]},
  {id:'range', label:'更喜欢哪种交战距离？', options:[['close','近距离 · 室内、转角与贴点'],['mid','中距离 · 掩体之间的交火'],['long','远距离 · 观察、架枪与点射'],['any','都可以，结合问卷比较']]},
  {id:'style', label:'最想体验哪种打法？', options:[['auto','还不确定，结合问卷判断'],['entry','主动突破 · 发起交火'],['intel','侦察信息 · 报点和找机会'],['anchor','阵地工程 · 掩护和守住通道'],['support','救援支援 · 医疗与团队续航'],['flank','侧翼绕后 · 换角度创造机会']]},
  {id:'mechanics', label:'愿意投入多少操作练习？', options:[['low','先试直观技能和容易控制的枪'],['medium','愿意练压枪、跟枪与技能配合'],['high','愿意反复练习复杂操作与配装']]},
  {id:'party', label:'通常怎样组队？', options:[['solo','主要自己玩 / 与陌生队友配合'],['duo','与一位朋友一起'],['squad','固定队伍，有沟通和分工']]},
  {id:'budget', label:'烽火地带的配装取向', default:'balanced', options:[['economy','经济耐用 · 尽量控制损失'],['balanced','均衡投入 · 手感与成本兼顾'],['premium','愿意投入 · 接受成型配装成本']], help:'这是相对投入偏好，不代表实时市场价格；全面战场不使用此条件。'},
  {id:'role', label:'兵种有没有明确偏好？', default:'auto', options:[['auto','帮我比较四种方向'],...deltaClasses.map(c=>[c.id,c.name])]},
  {id:'season', label:'ALWAYS聪聪的赛季资料', default:'latest-verified', options:[['latest-verified','最近已收录的视频资料'],...weaponSeasons.map(s=>[s.id,s.label])], help:'收录日期和视频日期分别标注。历史榜单不代表当前版本，枪管、套件和平台条件不会自动套用。'},
  {id:'mbtiUse', label:'已有 MBTI 怎样参与？', default:'note', options:[['note','只作个人备注'],['light','轻量探索参考 · 干员排序最多 ±1.5 分']], help:'轻量参考是编辑假设，未经预测效果验证；距离、打法和问卷仍主导推荐。未填写类型时不启用。'}
];

const keys = dimensions.map(d=>d[0]);
const clamp = n=>Math.max(0,Math.min(100,n));
const mean = values=>values.reduce((sum,n)=>sum+n,0)/values.length;
const similarity = (a,b)=>100-mean(keys.map(key=>Math.abs(a[key]-b[key])));
const modeLabel = mode=>mode==='operations'?'烽火地带':'全面战场';
const classById = id=>deltaClasses.find(c=>c.id===id);
const round = n=>Math.round(n*10)/10;

export function validateDeltaContext(input, traits) {
  if (!input || typeof input!=='object') throw new Error('请先填写三角洲这一局的游玩条件。');
  const context = {};
  for (const field of deltaContextFields) {
    const value = input[field.id];
    if (!field.options.some(option=>option[0]===value)) throw new Error(`请选择「${field.label}」。`);
    context[field.id]=value;
  }
  if (traits && keys.some(key=>!Number.isFinite(traits[key])||traits[key]<0||traits[key]>100)) throw new Error('请完成全部游戏偏好题，不能用缺失答案生成报告。');
  if (input.time!==undefined&&!['short','medium','long'].includes(input.time)) throw new Error('请选择单次游玩时长。');
  context.time=input.time||'medium';
  return context;
}

// A user-selectable editorial cue, not a validated personality-to-performance model.
// It never affects weapon ranks, engagement distance, mode eligibility or availability.
export function deltaMbtiBonus(tags, type, use) {
  if (use!=='light'||typeof type!=='string'||!/^[IE][NS][TF][JP]$/.test(type)) return 0;
  const directions={team:type[0]==='E'?1:-1,explore:type[1]==='N'?1:-1,support:type[2]==='F'?1:-1,pace:type[3]==='P'?1:-1,risk:type[3]==='P'?1:-1};
  return round(mean(Object.entries(directions).map(([key,sign])=>((tags[key]-50)/50)*sign))*1.5);
}

function operatorReasons(traits, operator, context) {
  const signals=dimensions.filter(([key])=>Math.abs(traits[key]-50)>=20&&Math.abs(traits[key]-operator.tags[key])<=30).sort((a,b)=>Math.abs(traits[a[0]]-operator.tags[a[0]])-Math.abs(traits[b[0]]-operator.tags[b[0]])).slice(0,2).map(([key,,low,high])=>traits[key]>50?high:low);
  const reasons=signals.length?[`你的「${signals.join('、')}」偏好与其编辑玩法标签较接近。`]:['先把它作为对照体验，用实际试玩确认是否喜欢这种贡献方式。'];
  if(context.style===operator.style)reasons.push('回应了你明确选择的打法体验。');
  if(context.range!=='any'&&context.range===operator.range)reasons.push('其建议打法也覆盖你偏好的交战距离；干员本身不决定武器射程。');
  return reasons;
}

function operatorFit(operator, traits, context, mbti) {
  const style=context.style==='auto'?65:operator.style===context.style?100:35;
  const distance=context.range==='any'?65:operator.range===context.range?100:operator.range==='any'?75:35;
  const cost=operator.learningCost||3;
  const learning=Math.max(0,100-(cost-1)*({low:22,medium:12,high:5}[context.mechanics]));
  const party=context.party==='solo'?100-Math.abs(operator.tags.team-55):operator.tags.team;
  const personality=deltaMbtiBonus(operator.tags,mbti,context.mbtiUse);
  return {...operator, score:round(similarity(traits,operator.tags)*.55+style*.18+distance*.10+learning*.10+party*.07+personality), mbtiBonus:personality, reasons:operatorReasons(traits,operator,context)};
}

const weaponHandling = {low:1,easy:1,medium:2,high:3};
const budgetLevel = {economy:1,balanced:2,premium:3};
function selectedSeason(context) {
  return context.season==='latest-verified'?weaponSeasons[0]:weaponSeasons.find(s=>s.id===context.season);
}

function weaponFit(weapon, context, primaryClass, season) {
  const rangeFit=context.range==='any'?75:weapon.range.includes(context.range)?100:30;
  const handling=weaponHandling[weapon.handling]||2;
  const skill=context.mechanics==='low'?clamp(115-handling*28):context.mechanics==='medium'?clamp(110-handling*14):95;
  const cost=budgetLevel[weapon.budget]||2;
  const budget=context.mode==='warfare'?75:clamp(100-Math.max(0,cost-budgetLevel[context.budget])*35);
  const type=weapon.type;
  const styleFit=context.style==='entry'||context.style==='flank'?(weapon.range.includes('close')?95:35):context.style==='anchor'?(weapon.range.includes('mid')?95:65):context.style==='intel'?(weapon.range.includes('long')?95:65):context.style==='support'?(handling<=2?95:60):75;
  const rating=weaponRatingFor(weapon,season.id,context.mode,context.platform);
  // A tier is used only when the source scope matches the selected mode AND platform.
  // Variant-specific ratings stay informational until a variant is explicitly selected.
  const neutralVariant=rating&&(!rating.variant||['标准','标准枪械','基础枪械'].includes(rating.variant));
  const tierBonus=neutralVariant?({'S+天王':3,'S+':2.5,'S上':2,'S':1.5,'S中':1.5,'S下':1,'A+':.5}[rating.tier]||0):0;
  const sourceRecords=(weapon.seasonRatings||[]).filter(record=>record.seasonId===season.id&&record.mode===context.mode);
  const reasons=[];
  if(context.range!=='any'&&weapon.range.includes(context.range))reasons.push('建议用途覆盖你选择的交战距离。');
  if(context.mechanics==='low'&&handling===1)reasons.push('优先提供较直观的操控练习起点。');
  if(context.mode==='operations'&&cost<=budgetLevel[context.budget])reasons.push('符合你选的相对配装投入范围。');
  if(context.mode==='operations'&&cost>budgetLevel[context.budget])reasons.push('这把枪通常需要更高的相对投入，可作为提高预算后的对照；先确认整套配装的可承受损失。');
  if(!reasons.length)reasons.push('作为不同枪械手感的比较候选，先在靶场验证。');
  return {...weapon, score:round(rangeFit*.43+skill*.25+budget*.20+styleFit*.12+tierBonus), reasons, rating, sourceRecords, tierBonus, availabilityConfirmed:context.mode==='operations'||Array.isArray(primaryClass.allowedWeaponTypes), type};
}

const playbooks={
  operations:{
    assault:['先确认敌人位置和队友能否跟进，再决定是否突破。','围绕掩体进退，主动交火后保留撤回和救援窗口。','击倒只是一个阶段；重新确认第三方威胁、物资与撤离路线。'],
    recon:['先观察和使用信息工具，再用方位、人数和移动方向报点。','让信息转化为队友可以执行的路线或交火机会。','持续换观察角度，别为了收集信息长时间脱离队伍。'],
    engineer:['优先处理队伍侧后方、固定通道与有价值的掩体位置。','用工程工具制造安全窗口，再配合队友推进或撤离。','守住一个点不等于一直停留；局势变化后及时转移。'],
    support:['先保证自己的安全位置，再判断治疗、补给与救援时机。','让烟幕、掩护或技能窗口服务于队友的实际行动。','救援前确认枪线和撤回路线，撤离时保持可互相支援的距离。']
  },
  warfare:{
    assault:['围绕当前争夺目标推进，先找掩体与队友形成交叉枪线。','技能投入后给出跟进信号，减少独自进点的空窗。','失败后复盘进点时机与落点，不只评价击倒数量。'],
    recon:['关注敌方主通道和侧翼，把信息报给正在争点的队友。','选择能持续观察且能转移的位置，保持与目标的联系。','发现突破窗口时参与推进，而不是无限远距离停留。'],
    engineer:['观察载具威胁、固定火力点和队伍需要保护的通道。','按当前可用工程装备安排反载具、掩体或区域防守任务。','装备和弹药不足时及时寻找补给，随目标变化转移。'],
    support:['围绕目标维持补给、治疗与救援节奏。','利用队友掩护接近倒地点，避免连续倒在同一条枪线上。','让队伍持续有人能争点，把自身存活也当成贡献。']
  }
};

export function recommendDelta(traits, input, mbti='') {
  const context=validateDeltaContext(input,traits);
  if(!traits||keys.some(key=>!Number.isFinite(traits[key])))throw new Error('请完成游戏偏好问卷。');
  if(mbti&& !/^[IE][NS][TF][JP]$/.test(mbti))throw new Error('请选择有效的 MBTI 类型，或暂不填写。');
  const ceiling={low:3,medium:4,high:5}[context.mechanics];
  const available=deltaOperators.filter(operator=>operator.modes.includes(context.mode));
  const scored=available.map(operator=>operatorFit(operator,traits,context,mbti));
  const classRanks=deltaClasses.map(role=>{
    const pool=scored.filter(operator=>operator.classId===role.id);
    const eligible=pool.filter(operator=>operator.learningCost<=ceiling);
    const candidates=(eligible.length?eligible:pool).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
    return {...role, candidates,hasEligible:eligible.length>0,score:candidates.length?round(mean(candidates.slice(0,2).map(operator=>operator.score))):-1};
  }).filter(role=>role.candidates.length).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
  const primaryClass=context.role==='auto'?(classRanks.find(role=>role.hasEligible)||classRanks[0]):classRanks.find(role=>role.id===context.role);
  if(!primaryClass)throw new Error('这个模式尚无所选兵种的可核验候选。');
  const season=selectedSeason(context);
  const allowedTypes=context.mode==='warfare'&&Array.isArray(primaryClass.allowedWeaponTypes)?primaryClass.allowedWeaponTypes:null;
  const weapons=deltaWeapons.filter(weapon=>weapon.modes.includes(context.mode)&&weapon.platforms.includes(context.platform)&&(!allowedTypes||allowedTypes.includes(weapon.type))).map(weapon=>weaponFit(weapon,context,primaryClass,season)).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,3);
  const mbtiEnabled=Boolean(mbti&&context.mbtiUse==='light');
  const notes=[
    '这是一份偏好探索与试玩建议，兵种不是能力评定，排名也不是胜率。干员能力来自官方资料；偏好标签、学习成本与路线由本实验室编辑。',
    '枪械先按距离、操控与投入匹配。ALWAYS聪聪的评价是对应视频和改装条件下的观点，不代表官方排名或实时强度。未注明平台、跨模式或变体不明的评价不计入强度加分。'
  ];
  if(!primaryClass.hasEligible)notes.push('所选兵种暂时没有符合本次操作投入的候选。这里保留可比较的干员，并建议先在训练场体验；它们不是低成本首试保证。');
  if(context.mode==='warfare')notes.push('全面战场不套用烽火地带赛季梯度和市场预算。下列具体枪械是手感方向候选；当期兵种可用枪池尚未核验，请先在客户端确认兵种和解锁条件。');
  if(context.mode==='operations'&&context.party==='solo'&&primaryClass.id==='support')notes.push('你主要自己玩：支援仍可作为偏好方向，但先确认队友配合和自身生存，不把医疗收益等同于单人交战优势。');
  if(context.time==='short')notes.push('你选择了 30 分钟以内：真人对局和撤离时间不能保证，有硬性截止时间时先用靶场练习。');
  return {version:DELTA_VERSION,reviewed:DELTA_REVIEWED,context,traits,mbti:mbti||null,mbtiEnabled,mbtiSummary:mbtiEnabled?`${mbti} 已开启轻量编辑参考，单个干员最多 ±1.5 分；不改变武器射程、模式限制或枪械梯度。`:(mbti?`${mbti} 仅作个人备注，不参与排序。`:'未填写 MBTI；推荐完全使用游戏偏好和本局条件。'),primaryClass,classRanks,operators:primaryClass.candidates.slice(0,3),weapons,season,playbook:playbooks[context.mode][primaryClass.id],notes,method:'六维偏好与实际条件主导干员及打法推荐；MBTI 默认只作备注，可主动开启最多 ±1.5 分的编辑假设。枪械主匹配距离、操控与投入；来源范围完全一致且非特殊改装的赛季评级最多加 3 分。分数仅用于内部排序。'};
}

export function deltaMarkdown(result) {
  const lines=[`## 三角洲行动 · ${modeLabel(result.context.mode)}`,`规则版本：${result.version}；资料编辑日期：${result.reviewed}`,result.method,result.mbtiSummary,''];
  for(const field of deltaContextFields){
    const ignored=result.context.mode==='warfare'&&['budget','season'].includes(field.id);
    lines.push(`${field.label}：${field.options.find(([value])=>value===result.context[field.id])[1]}${ignored?'（全面战场不参与计算）':''}`);
  }
  lines.push('',`### 优先尝试：${result.primaryClass.name}`,result.primaryClass.headline||'',...result.playbook.map((step,i)=>`${i+1}. ${step}`),'','### 干员候选');
  for(const operator of result.operators){
    lines.push(`#### ${operator.name}`,`兵种：${classById(operator.classId).name}`,`技能概述：${operator.skillSummary}`, ...operator.reasons.map(reason=>`- ${reason}`));
    const modeTip=operator.modeTips?.[result.context.mode];
    if(modeTip)lines.push(`${modeLabel(result.context.mode)}打法：${modeTip}`);
    lines.push(`取舍：${operator.tradeoff}`, ...(operator.drills||[]).map((step,i)=>`练习 ${i+1}：${step}`),`官方资料：${operator.officialUrl}`,`学习入口：${operator.learningUrl}`,'');
  }
  lines.push(`### 枪械候选 · ${result.season.label}`,'这是玩法匹配顺序，并非按强度榜直接排序。');
  for(const weapon of result.weapons){lines.push(`#### ${weapon.name} · ${weapon.type}`,...weapon.reasons.map(reason=>`- ${reason}`),`取舍：${weapon.tradeoff}`,`试玩：${weapon.trial}`);
    if(weapon.sourceRecords.length)for(const record of weapon.sourceRecords)lines.push(`视频观点：${record.sourceRatingLabel||record.tier||'未逐枪核验梯度'}；条件：${record.variant||'以原视频为准'}；${record.scope||''}；${record.notes||''}`,`来源：${record.source?.url||weapon.learningUrl}`);
    else lines.push('本模式 / 所选赛季没有可适用的逐枪梯度，不使用其他赛季或模式补分。');
    lines.push(`学习入口：${weapon.learningUrl}`,'');
  }
  lines.push('### 使用说明',...result.notes.map(note=>`- ${note}`),'','### 榜单资料',`资料：${result.season.label}`);
  const source=result.season.source;if(source)lines.push(`${source.title||result.season.label}：${source.url}`);
  return lines.join('\n');
}
