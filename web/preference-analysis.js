import {dimensions, questions, profile} from './model.js';
import {deltaQuestions} from './delta.js';

const answerLabels=['非常不同意','比较不同意','不确定 / 看情境','比较同意','非常同意'];
const mbtiLabels={I:'内向',E:'外向',N:'直觉',S:'实感',T:'思考',F:'情感',J:'判断',P:'知觉'};
const preferenceText={
 team:['独立决定行动节奏','和队友配合推进'],
 risk:['看清机会和退路再出手','主动承担风险创造机会'],
 pace:['留出观察与规划的空间','快速反应和连续操作'],
 support:['亲自完成关键输出或目标','通过支援让队友发挥'],
 explore:['把熟悉的路线练稳','探索新路线和组合'],
 practice:['较快获得上手反馈','靠反复练习掌握细节']
};
const join=items=>items.filter(Boolean).join('、');
const sentence=text=>text ? /[。！？]$/.test(text)?text:`${text}。` : '';

function leadFor(t,signals){
 if(t.team>=70&&t.support>=70)return '你更享受让配合产生结果。';
 if(t.risk>=70&&t.pace>=70)return '你更想主动创造机会，在变化中寻找反馈。';
 if(t.risk<=30&&t.pace<=30)return '你更喜欢先读清局势，再把行动做稳。';
 if(t.explore>=70&&t.practice>=70)return '你愿意把好奇心练成一套自己的打法。';
 if(t.practice<=30)return '你更在意尽快玩出手感和反馈。';
 return signals.length?`从「${signals[0].text}」出发，寻找更想投入的玩法。`:'先比较体验，再找到你想投入的方向。';
}

function quizReading(traits,answers,bank,mbti){
 const signals=dimensions.map(([id,label])=>({id,label,value:traits[id],distance:Math.abs(traits[id]-50),text:preferenceText[id][traits[id]>50?1:0]})).filter(s=>s.distance>=20).sort((a,b)=>b.distance-a.distance);
 const mixed=dimensions.filter(([id])=>{
  const pair=bank.flatMap((q,i)=>q[0]===id?[(q[2]?6-answers[i]:answers[i])-1]:[]);
  return Math.abs(pair[0]-pair[1])>=3;
 });
 const validMbti=typeof mbti==='string'&&/^[IE][NS][TF][JP]$/.test(mbti);
 const opening=validMbti?`你填写的 MBTI 是 ${mbti}（${[...mbti].map(c=>mbtiLabels[c]).join(' / ')}），为这份报告补充了一组自我描述。`:'你没有填写 MBTI，这份解读直接从本次作答开始。';
 let text=opening+(signals.length?`这轮问卷里较明确的线索是：你更看重${join(signals.slice(0,3).map(s=>s.text))}。这些回答描述的是你这次想获得的游戏体验。`:'这轮问卷没有明显的单向偏好，暂时不把你归入固定的玩法类型，先借助距离、操作投入等实际条件比较体验。');
 if(mixed.length)text+=`其中「${join(mixed.map(d=>d[1]))}」的两道题呈现不同方向，说明这部分回答比较分散，还需要结合具体情境确认。`;
 const keys=[...new Set([...signals.slice(0,2).map(s=>s.id),...mixed.map(d=>d[0])])];
 const indexes=keys.length?keys.flatMap(key=>bank.flatMap((q,i)=>q[0]===key?[i]:[])).slice(0,4):[0,6];
 const evidence=indexes.map(i=>({question:bank[i][1],answer:answerLabels[answers[i]-1]}));
 return {text,signals,evidence,lead:leadFor(traits,signals),validMbti};
}

function deltaReading(result,traits){
 const c=result.context,op=result.operators[0],weapon=result.weapons[0],role=result.primaryClass;
 const mode=c.mode==='operations'?'烽火地带':'全面战场';
 const range={close:'近距离交战',mid:'中距离交战',long:'远距离交战',any:'灵活比较交战距离'}[c.range];
 const style={auto:'结合问卷判断打法',entry:'主动突破',intel:'侦察信息',anchor:'阵地工程',support:'救援支援',flank:'侧翼绕后'}[c.style];
 const mechanics={low:'先从直观操作开始',medium:'愿意练压枪、跟枪与技能配合',high:'愿意反复练习复杂操作和配装'}[c.mechanics];
 let conditions=`放到${mode}里，你希望${range}、${style}，并且${mechanics}。`;
 if(c.mode==='operations')conditions+=`配装上选择${{economy:'控制损失',balanced:'兼顾手感与成本',premium:'接受较高投入'}[c.budget]}，所以枪械也要一起比较操控与相对成本。`;
 else conditions+='全面战场围绕争点和团队推进安排职责，不使用烽火地带的市场预算。';
 let selection=c.role==='auto'?`综合问卷与本局条件，先把${role.name}作为试玩方向`:`你主动选择了${role.name}，所以先在这个兵种内比较干员`;
 selection+=`，从${op.name}开始。${sentence(op.skillSummary)}${sentence(op.modeTips[c.mode])}`;
 let guns=`沿着同样的距离与操控要求，枪械先比较${weapon.name}${result.weapons.length>1?`，再用${join(result.weapons.slice(1).map(w=>w.name))}作对照`:''}：${weapon.reasons.join('')}`;
 guns+=c.mode==='warfare'?'这些是手感方向候选，使用前先确认当前兵种枪池与解锁条件。':weapon.sourceRecords.length?`ALWAYS聪聪的${result.season.label}资料保留原评价条件，未注明平台或特定改装的观点不会直接变成本次通用强度结论。`:`所选${result.season.label}暂未收录${weapon.name}的逐枪评价，这个首试顺序来自距离、操控与投入的匹配。`;
 let tension='';
 if(['entry','flank'].includes(c.style)&&traits.risk<=30)tension='你想体验主动突破或绕后，但问卷又偏稳健，可以先练有信息、有退路的小范围进攻，逐步增加进场压力。';
 else if(c.mechanics==='low'&&traits.practice>=70)tension='你在问卷中愿意反复练习，但这次选择先从直观操作开始，因此首轮仍按本次操作投入筛选，把复杂操作留给后续。';
 else if(c.role!=='auto'&&role.id==='support'&&traits.support<=30)tension='你主动选了支援位，同时问卷更看重亲自完成目标；试玩时可以留意救援与补给带来的反馈是否也让你满足。';
 const mbti=result.mbtiEnabled?'三角洲已开启 MBTI 轻量编辑参考，每位干员最多 ±1.5 分，自动兵种方向也可能随干员得分变化；不参与枪械评分，也不改变交战距离或模式资格。':result.mbti?'本次 MBTI 仅作自我描述，未参与兵种、干员或枪械排序。':'';
 return [conditions,selection,guns,`${tension}实际需要适应的是：${sentence(op.tradeoff)}第一轮可以这样练：${sentence(result.playbook[0])}${mbti}`];
}

function lolReading(result,hextech,traits,hasMbti){
 const c=result.context,hero=result.picks[0];
 const style={auto:'结合问卷比较玩法',duel:'抓机会和单挑',engage:'主动发起战斗',protect:'保护队友',poke:'保持距离消耗',dps:'发育后持续输出'}[c.style];
 const distance={any:'近战、远程都可比较',melee:'优先近战',ranged:'优先远程'}[c.range];
 const learning={low:'先练直观技能',medium:'愿意练一些连招与走位',high:'愿意反复练高操作英雄'}[c.mechanics];
 let conditions=`你这次更想${style}，距离上${distance}，操作上${learning}。峡谷先按熟悉程度与操作投入筛选英雄，再一起考虑问卷和小地图关注习惯。`;
 let lane=c.lane==='auto'?`综合这些线索，峡谷优先尝试${result.primary.name}`:`你主动选择了${result.primary.name}，所以峡谷在这个位置内比较英雄`;
 lane+=`，先从${hero.name}开始。${sentence(hero.hook)}`;
 if(c.lane!=='auto'&&result.primary.id!==result.rankedLanes[0].id)lane+=`若以后想换位置，当前条件下的另一条对照方向是${result.rankedLanes[0].name}。`;
 const hex=hextech.picks[0],build=hex.builds[0];
 const aram=(hextech.rolledHeroId==='auto'?`到了海克斯大乱斗，单独按团战与构筑偏好比较，随机选人阶段可以留意${hex.name}`:`海克斯部分按你当前指定查看或已随机到的${hex.name}展开`)+`，优先比较「${build.name}」。${sentence(build.reason)}英雄和强化仍要按本局实际选项调整，峡谷位置不参与这里的流派排序。`;
 let tension='';
 if(['duel','engage'].includes(c.style)&&traits.risk<=30)tension='你想抓机会或先手，但问卷更偏稳健，可以先把练习目标定为“确认队友与退路后再进场”。';
 else if(c.mechanics==='low'&&traits.practice>=70)tension='你愿意长期练习，同时这次希望从直观技能开始，先建立基本操作，再逐步增加复杂度会更便于比较感受。';
 const route=c.time==='short'?'你本次时间较短，先用可控制时长的单人练习验证手感。':`先按你的熟悉程度与组队条件安排准备路线：${sentence(result.rankedPlan.readiness)}`;
 return [conditions,lane,aram,`${tension}需要留意：${sentence(hero.tradeoffs[0])}${route}${hasMbti?'本次 MBTI 仅作自我描述，未参与英雄联盟的位置、英雄或流派排序。':''}`];
}

// Explain recorded answers and recommendation inputs; do not invent a hidden personality diagnosis.
export function buildPreferenceAnalysis(report,answers){
 const traits=profile(answers);
 if(!report||!report.traits||dimensions.some(([id])=>report.traits[id]!==traits[id]))throw new Error('偏好解读需要与本轮完整作答一致的数据。');
 const reading=quizReading(traits,answers,report.delta?deltaQuestions:questions,report.mbtiNote);
 const paragraphs=[reading.text];
 if(report.delta)paragraphs.push(...deltaReading(report.delta,traits));
 else if(report.lol&&report.hextech)paragraphs.push(...lolReading(report.lol,report.hextech,traits,reading.validMbti));
 else {
  const first=report.recommendations?.[0];
  if(first)paragraphs.push(`顺着这轮作答，${report.game}可以先比较「${first.name}」：${sentence(first.caution)}${sentence(first.trial)}`);
  if(reading.validMbti)paragraphs.push('本次 MBTI 仅作自我描述，基础玩法方向由问卷结果比较得出。');
 }
 return {kicker:'BEFORE YOUR PICKS / 从偏好到玩法',title:'你的游戏偏好解读',lead:reading.lead,paragraphs,evidence:reading.evidence,note:'这段解读总结本次作答与游玩条件，描述的是偏好，不是能力或胜率；实际试玩感受可以随时修正它。'};
}

export function analysisMarkdown(analysis){
 return ['## 你的游戏偏好解读',analysis.lead,'',...analysis.paragraphs.flatMap(p=>[p,'']),'### 本次作答线索',...analysis.evidence.map(e=>`- ${e.question} —— ${e.answer}`),'',analysis.note,''].join('\n');
}
