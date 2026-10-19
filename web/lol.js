import {tutorials,observersByLane} from './lol-media.js';
// Gameplay profiles are editorial hypotheses, not psychological or win-rate predictions.
export const LOL_VERSION = '0.3.0';
export const REVIEWED = '2026-10-19';
export const official = id => `https://lol.qq.com/data/info-defail.shtml?id=${encodeURIComponent(id)}`;
export const bilibiliSearch = query => `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`;
export const sources = [
  {title:'英雄联盟国服官网',url:'https://lol.qq.com/main.shtml'},
  {title:'国服英雄资料',url:'https://lol.qq.com/data/'},
  {title:'英雄联盟官方B站',url:'https://space.bilibili.com/20500104'}
];
const t=(team,risk,pace,support,explore,practice)=>({team,risk,pace,support,explore,practice});
export const lanes = [
  {id:'top',name:'上单',en:'TOP',headline:'在一条路上，建立自己的优势',tags:t(25,65,55,25,35,65),macro:45,work:'独立对线、换血、兵线与边线选择。',friction:'单线被压制时容易长时间缺少支援；单带也需要观察队伍位置。'},
  {id:'jungle',name:'打野',en:'JUNGLE',headline:'把地图信息变成下一步行动',tags:t(70,70,65,50,85,75),macro:95,work:'刷野路线、抓人时机、资源交换与目标区视野。',friction:'需要同时判断多条线与敌方打野动向，并承担路线学习成本。'},
  {id:'mid',name:'中单',en:'MID',headline:'把对线主动权带到地图上',tags:t(45,60,70,30,65,65),macro:65,work:'补刀与消耗、清线、支援和技能命中。',friction:'既要照顾自己的兵线，也容易受到两侧游走影响。'},
  {id:'bot',name:'下路 / ADC',en:'BOT',headline:'用安全的站位，换来持续输出',tags:t(75,35,80,15,30,75),macro:45,work:'补刀、攻击距离、双人对线与团战持续输出。',friction:'射手需要时刻观察威胁，缺少位移时尤其依赖站位。'},
  {id:'support',name:'辅助',en:'SUPPORT',headline:'用保护、控制或先手改变团战',tags:t(90,45,50,95,60,50),macro:70,work:'双人对线、视野、保护与开团；保护型和先手型体验差异很大。',friction:'需要预判队友和敌人的行动，并承担视野与开团判断。'}
];
for(const lane of lanes){
 const person=observersByLane[lane.id].professionals[0];
 lane.coach=person.name;
 lane.coachStyle=person.focus;
 lane.video={title:person.title||`${person.name} · ${lane.name}观摩`,url:person.url,publisher:person.platform||'B站',year:person.year||'按平台结果筛选',hero:person.hero||'对应位置',kind:person.kind||'search'};
}
const champion=(id,name,alias,lane,complexity,range,style,tags,hook,watchout,drill,slug=id.toLowerCase())=>({id,name,alias,lane,complexity,range,style,tags,hook,watchout,drill,source:official(id)});
// Complexity 1–5 is our onboarding estimate, NOT Riot's difficulty rating.
export const champions=[
 champion('Garen','盖伦','德玛西亚之力','top',1,'melee','duel',t(20,45,35,20,20,25),'技能循环直观，能把注意力放在补刀、换血与撤退时机。','近战容易被拉开距离；技能简单不代表对线一定轻松。',['先练只用普攻补刀，记录 10 分钟补刀数作为个人基线。','换血后主动拉开，观察恢复和下一轮进场时机。','复盘一次追击：继续追之前看了敌方位置吗？']),
 champion('Malphite','墨菲特','熔岩巨兽 / 石头人','top',1,'melee','engage',t(65,60,30,65,20,25),'用较明确的大招先手参与团战，适合想承担前排又不想练复杂连招的玩家。','大招空掉或队友跟不上会很难受；不要把所有对局都当作同一种抗压局。',['熟悉大招范围，先练命中静止目标再练移动目标。','进场前确认最近的队友能否及时跟进。','尝试保留一次大招保护后排，比较主动开团的体验。']),
 champion('Ornn','奥恩','山隐之焰','top',3,'melee','engage',t(75,40,40,75,40,65),'更偏向稳住对线、提供控制与团队价值的前排方向。','地形、击飞衔接和大招二段需要练习，不能只靠坦度。',['练习围绕地形使用控制。','把一次团战目标设为阻挡切入者。','复盘大招方向与队友跟进距离。']),
 champion('Fiora','菲奥娜','无双剑姬','top',5,'melee','duel',t(15,90,90,10,55,95),'弱点、格挡与边线决斗带来持续的操作和博弈空间。','对线细节和格挡判断要求高，逆风时不能靠盲目单带解决。',['训练模式先练移动打弱点。','每局选一种关键控制练习格挡时机。','带线前先数小地图上的敌人，再决定进退。']),
 champion('Amumu','阿木木','殇之木乃伊','jungle',2,'melee','engage',t(90,55,40,75,45,35),'围绕控制和团队跟进展开，适合先学习打野基本路线与团战。','绷带命中和进场时机仍然重要；不要有大招就独自冲进人群。',['在训练模式走完一条刷野路线。','抓人前先看队友位置与兵线。','团战只练一个目标：控制到队友能攻击的人。']),
 champion('Warwick','沃里克','祖安怒兽 / 狼人','jungle',2,'melee','duel',t(45,80,60,25,65,40),'追击反馈鲜明，适合喜欢主动找机会、又想从较直观的近战打野开始的人。','血迹信号不是安全进场保证，追击过深容易脱离队友。',['练习刷野过程中的血量管理。','追击前先确认敌方其他人出现在哪里。','每局回顾一次追击是否值得放弃野区资源。']),
 champion('JarvanIV','嘉文四世','德玛西亚皇子','jungle',3,'melee','engage',t(85,80,65,65,75,65),'主动抓人与发起团战的行动感较强，适合愿意为团队创造机会的人。','位移与地形限制可能同时影响队友；需要先判断跟进条件。',['练习旗枪连招的距离。','抓人前先发信号，再判断线上是否有跟进能力。','每次大招后观察是否挡住了队友撤退路线。'],'jarvaniv'),
 champion('LeeSin','李青','盲僧','jungle',5,'melee','duel',t(65,95,100,40,90,100),'位移与技能衔接空间大，适合享受训练、主动创造机会的进阶玩家。','学习成本高；好看的回旋踢不能替代发育和路线判断。',['先把一条基础刷野路线练稳定。','练习一个能成功撤出的简单进场组合。','看完整对局中的无战斗时段，而不只学回旋踢。'],'leesin'),
 champion('Annie','安妮','黑暗之女','mid',1,'ranged','engage',t(50,60,40,35,25,30),'技能目标清晰，可以先练补刀、控制准备与爆发时机。','没有常规位移，走位失误后并不容易脱身。',['练习补刀并观察被动层数。','进入河道前确认控制是否准备好。','复盘一次开团：距离够吗、队友在吗？']),
 champion('Lux','拉克丝','光辉女郎','mid',2,'ranged','poke',t(45,20,35,45,45,35),'远距离消耗与控制较突出，适合喜欢保留距离、用技能寻找机会的人。','依赖技能命中，控制落空后容易被近身；辅助拉克丝是另一套资源与职责。',['练习预判走位，不急着把所有技能同时交掉。','保留控制技能应对一次近身威胁。','用录像检查施法位置是否过于靠前。']),
 champion('Ahri','阿狸','九尾妖狐','mid',3,'ranged','duel',t(45,75,80,25,85,70),'位移、魅惑和游走带来主动抓机会的体验。','关键控制命中与进退判断影响很大；位移不等于可以无条件追人。',['练习魅惑后衔接技能。','离开中路前先处理兵线。','每次追击前给自己保留撤退方案。']),
 champion('Orianna','奥莉安娜','发条魔灵','mid',4,'ranged','poke',t(80,35,65,60,45,85),'球的位置同时影响消耗、保护和团战，适合愿意练习空间控制的人。','需要持续跟踪球和自身的位置；高光大招只是玩法的一部分。',['练习移动自己时跟踪球的位置。','用球控制通道而不只追求命中伤害。','复盘一次大招前的站位与队友接近方式。']),
 champion('Ashe','艾希','寒冰射手','bot',2,'ranged','dps',t(85,25,65,45,35,55),'减速、视野与远程开团让你在持续输出之外也能帮助队伍。','没有常规位移，越想持续输出越需要注意站位。',['练习普攻后移动，先保证节奏稳定。','进危险区域前利用信息技能与队友视野。','大招先练配合近处队友，不追求全图命中。']),
 champion('MissFortune','厄运小姐','赏金猎人 / 女枪','bot',1,'ranged','dps',t(70,30,40,15,25,30),'对线与团战目标较直观，适合从补刀和大招角度开始学习射手。','大招时的站位容易被切入或打断；需要观察对手关键控制。',['先练稳定补刀和保持攻击距离。','等敌方关键威胁暴露后再寻找大招角度。','回顾一次大招：队友控制是否已经命中？'],'missfortune'),
 champion('Jinx','金克丝','暴走萝莉','bot',3,'ranged','dps',t(80,45,85,10,35,75),'持续输出和参与击杀后的节奏变化，适合喜欢发育后接管团战的人。','发育阶段要有耐心；被动触发后也不能忽略敌方控制。',['比较两种武器的距离和清线体验。','团战先攻击安全范围内的目标。','触发被动后先判断能否追击，再向前移动。']),
 champion('Ezreal','伊泽瑞尔','探险家 / EZ','bot',4,'ranged','poke',t(50,40,80,15,65,85),'技能命中、普攻穿插和位移选择带来较多自主操作空间。','位移只是工具；只在远处放技能而不普攻，会丢失重要输出。',['练习技能与普攻穿插。','把位移保留给一次明确的危险。','记录空技能之后自己是否仍保持安全距离。']),
 champion('Soraka','索拉卡','众星之子 / 奶妈','support',2,'ranged','protect',t(100,15,35,100,25,40),'以治疗与保护队友为主要反馈，适合享受支援贡献的人。','很容易成为对手优先目标，关注队友血量的同时要照顾自己。',['先找一个能支援队友又不暴露自己的位置。','观察治疗前后自己的血量与敌方距离。','每局复盘一次被切入，找出可以更早后退的时刻。']),
 champion('Lulu','璐璐','仙灵女巫','support',2,'ranged','protect',t(95,25,50,100,35,50),'保护、强化与限制敌人之间有选择空间，适合喜欢精细照顾队友的人。','同一个技能用给队友或敌人会改变结果，不能无脑连按。',['分清技能给队友和敌人的不同作用。','先练留一个关键技能应对切入。','和搭档约定一次保护后再反打的配合。']),
 champion('Nautilus','诺提勒斯','深海泰坦','support',2,'melee','engage',t(90,85,50,80,45,45),'控制链和先手目标清晰，适合愿意主动为队友创造输出窗口的人。','钩中不代表必须进场；没有跟进时先手可能变成送出优势。',['先确认队友距离，再尝试出钩。','用一次控制阻止敌人接近后排。','每局复盘一个本可以不出的钩子。']),
 champion('Thresh','锤石','魂锁典狱长','support',4,'ranged','engage',t(95,75,85,90,80,90),'钩子、灯笼与位移打断兼顾先手和救援，适合愿意练细节的辅助玩家。','技能选择与沟通要求较高；不要只追求命中钩子的镜头。',['先练灯笼落点，让队友能安全接到。','尝试用控制打断一次敌人进场。','复盘钩中后是否真的需要二段跟进。'])
];
export const contextFields = [
 {id:'experience',label:'你对英雄联盟的熟悉程度',options:[['new','新手：规则和英雄都还在学'],['returning','回归：玩过，但需要重新熟悉'],['regular','常玩：熟悉基础与对局节奏']]},
 {id:'mechanics',label:'愿意承担多少操作学习成本',options:[['low','先从直观技能开始'],['medium','愿意练一些连招与走位'],['high','愿意反复练高操作英雄']]},
 {id:'goal',label:'这次最想得到什么体验',options:[['learn','练会一个位置 / 英雄'],['relax','放松娱乐、体验团战'],['climb','稳定练习，准备排位']]},
 {id:'party',label:'通常和谁玩',options:[['solo','主要单排'],['duo','和一位朋友一起'],['group','三人及以上朋友组队']]},
 {id:'lane',label:'位置有没有明确偏好',options:[['auto','帮我比较五个位置'],...lanes.map(l=>[l.id,`只在${l.name}中推荐英雄`])]},
 {id:'style',label:'更向往哪种操作体验',options:[['auto','还不确定，结合问卷判断'],['duel','抓机会、单挑与反杀'],['engage','发起战斗、打出控制'],['protect','保护队友、化解危险'],['poke','保持距离、技能消耗'],['dps','发育、走位与持续输出']]},
 {id:'macro',label:'愿意多频繁地关注小地图',options:[['low','先专注眼前的操作'],['medium','能在操作间隙关注地图'],['high','喜欢判断路线、支援和资源']]},
 {id:'range',label:'距离偏好',options:[['any','近战远程都可以'],['ranged','优先远程，保留操作距离'],['melee','优先近战，喜欢贴身交锋']]}
];
export function validateContext(context){
 for(const field of contextFields)if(!field.options.some(([value])=>context[field.id]===value))throw new Error(`请填写：${field.label}`);
 if(!['short','medium','long'].includes(context.time))throw new Error('请选择单次游戏时长');
 return context;
}
const similarity=(a,b)=>100-Object.keys(b).reduce((sum,key)=>sum+Math.abs(a[key]-b[key]),0)/Object.keys(b).length;
const levelNames=['','入门成本较低','入门成本较低','需要一些练习','建议专项练习','高练习投入'];
export function chooseModes(c){
 const practice={id:'practice',name:'训练模式 / 自定义练习',reason:'可以围绕指定英雄反复练习，先解决技能手感和操作问题。',limit:'单人训练不等于真实对线；可用英雄与具体功能以客户端为准。',fixedChampion:true};
 const coop={id:'coop',name:'人机对战',reason:'先熟悉买装备、补刀、地图与完整胜利流程，再增加真人对抗压力。',limit:'需要预留完整对局时间；电脑行为不能替代真人对线经验。',fixedChampion:true};
 const normal={id:'normal',name:'召唤师峡谷 · 非排位对局',reason:c.party==='solo'?'在真人对抗中检验英雄与位置是否适合自己。':'和朋友先约定分工，在非排位环境尝试配合。',limit:'排队名称、选人规则和可用队列因服务器而异；位置及英雄可能被占用或禁用。',fixedChampion:true};
 const aram={id:'aram',name:'极地大乱斗',reason:'更适合把目标放在团战、技能熟悉和与朋友一起娱乐。',limit:'随机分配英雄，不能保证选到推荐英雄；没有常规五位置分路，也不保证 30 分钟内结束。',fixedChampion:false};
 const ranked={id:'ranked',name:c.party==='group'?'灵活组排（满足客户端组队条件时）':'单 / 双排（满足客户端准入条件时）',reason:'在已熟悉英雄和位置之后，再用排位检验稳定性。',limit:'不建议把首次试玩放进排位。资格、组队人数与段位限制以当前客户端为准。',fixedChampion:true};
 if(c.time==='short')return {primary:practice,alternatives:[],note:'你的时间少于 30 分钟：先做可控时长的单人练习；不要把大乱斗或非排位视为能准时结束。'};
 if(c.experience==='new')return {primary:coop,alternatives:[practice,normal],note:'先熟悉流程，再用非排位验证推荐；排位暂不作为起点。'};
 if(c.goal==='relax')return {primary:aram,alternatives:[normal],note:'下方位置与英雄卡用于另一次峡谷试玩。大乱斗中按随机到的英雄体验，不套用固定分路。'};
 if(c.goal==='climb'&&c.experience==='regular')return {primary:normal,alternatives:[ranked,practice],note:'先用非排位试英雄，熟悉后再进入排位；不以首次试玩胜负判断是否适合。'};
 return {primary:normal,alternatives:[practice],note:c.experience==='returning'?'回归玩家先检查技能与装备变化，历史视频中的数值和出装可能已过时。':'先固定一个英雄与位置，减少同时改变太多因素。'};
}
export function recommendLol(traits,input){
 const c=validateContext({...input});
 if(Object.values(traits).length!==6||['team','risk','pace','support','explore','practice'].some(k=>!Number.isFinite(traits[k])||traits[k]<0||traits[k]>100))throw new Error('偏好数据不完整');
 const ceiling=Math.min({low:2,medium:4,high:5}[c.mechanics],c.experience==='new'?3:5);
 const scored=champions.map(hero=>{
   const lane=lanes.find(l=>l.id===hero.lane);
   const preference=similarity(traits,hero.tags);
   const learning=Math.max(0,100-(hero.complexity-1)*{low:20,medium:10,high:4}[c.mechanics]);
   const style=c.style==='auto'?60:hero.style===c.style?100:25;
   const range=c.range==='any'?60:hero.range===c.range?100:20;
   const macro=100-Math.abs(lane.macro-{low:20,medium:55,high:90}[c.macro]);
   const score=.50*preference+.18*learning+.16*style+.08*range+.08*macro;
   const reasons=[hero.hook];
   const traitLabels={team:['独立行动','团队协作'],risk:['稳健推进','主动冒险'],pace:['从容规划','快速应变'],support:['亲自完成目标','帮助队友发挥'],explore:['精通熟悉路线','尝试新方法'],practice:['轻松上手','反复磨练']};
   const signals=Object.keys(hero.tags).filter(k=>Math.abs(traits[k]-50)>=20).sort((a,b)=>Math.abs(traits[a]-hero.tags[a])-Math.abs(traits[b]-hero.tags[b])).filter(k=>Math.abs(traits[k]-hero.tags[k])<=30).slice(0,2);
   if(signals.length)reasons.push(`问卷中你更偏向${signals.map(k=>`「${traitLabels[k][traits[k]>50?1:0]}」`).join('、')}，与这位英雄的玩法标签较接近。`);
   if(c.style===hero.style)reasons.push(`回应了你选择的「${contextFields.find(f=>f.id==='style').options.find(o=>o[0]===c.style)[1]}」。`);
   if(c.range!=='any'&&hero.range===c.range)reasons.push(`符合你优先${c.range==='ranged'?'远程':'近战'}的距离偏好。`);
   reasons.push(hero.complexity<=ceiling?'操作入门成本在你本次选择的练习范围内。':'更适合作为后续进阶目标，先从本位置较直观的英雄开始。');
   const tradeoffs=[hero.watchout];
   if(c.range!=='any'&&hero.range!==c.range)tradeoffs.push('这位英雄不符合你的优先距离偏好，是本位置的替代体验。');
   if(c.style!=='auto'&&hero.style!==c.style)tradeoffs.push('主要玩法与指定体验不同，属于备选方向。');
   return {...hero,score,reasons,tradeoffs,learningLabel:levelNames[hero.complexity]};
 }).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const rankedLanes=lanes.map(l=>{
   const pool=scored.filter(h=>h.lane===l.id&&h.complexity<=ceiling);
   return {...l,score:pool.slice(0,2).reduce((s,h)=>s+h.score,0)/Math.min(2,pool.length)};
 }).sort((a,b)=>b.score-a.score);
 const primary=c.lane==='auto'?rankedLanes[0]:rankedLanes.find(l=>l.id===c.lane);
 const pool=scored.filter(h=>h.lane===primary.id&&h.complexity<=ceiling);
 const picks=pool.slice(0,3);
 const challenge=scored.find(h=>h.lane===primary.id&&h.complexity>ceiling)||null;
 const altLane=rankedLanes.find(l=>l.id!==primary.id);
 const alternate=scored.find(h=>h.lane===altLane.id&&h.complexity<=ceiling);
 const warnings=[];
 if(c.lane!=='auto'&&primary.id!==rankedLanes[0].id)warnings.push(`按你的指定位置筛选了${primary.name}。问卷与本次条件综合更接近${rankedLanes[0].name}，但不会覆盖你的主动选择。`);
 if(primary.id==='jungle'&&c.macro==='low')warnings.push('你选择先专注眼前操作，但打野的地图判断负担较高；可以先在人机里只练路线。');
 if(c.mechanics==='high'&&c.experience==='new')warnings.push('你愿意练高操作，但目前是新手：首轮先给基础候选，高成本英雄放在进阶区。');
 const modes=chooseModes(c);
 return {version:LOL_VERSION,context:c,primary,rankedLanes,picks,challenge,alternate,modes,rankedPlan:rankedPlanFor(c),warnings,ceiling,
   partyTip:c.party==='duo'?'双人建议：先约定谁负责发起、谁负责跟进或保护；选下路与辅助组合时更容易观察配合。':c.party==='group'?'朋友组队：先确认没人被迫玩不喜欢的位置，再决定谁先手、谁保护；排位组队人数以客户端为准。':'单排建议：先用信号表达意图，避免把推荐建立在队友一定会跟进的假设上。'};
}
export function rankedPlanFor(c){
 const queue=c.party==='group'?'灵活组排':c.party==='duo'?'单 / 双排 · 双人配合':'单 / 双排 · 单人路线';
 const readiness=c.time==='short'?'本次时间不足以保证完成排位，先做可控时长的单人练习。':c.experience==='new'?'先通过人机和非排位熟悉英雄，再在达到客户端准入条件后进入排位。':c.experience==='returning'?'回归后先检查技能、装备与地图变化，恢复熟悉度后再进入排位。':'先固定一个位置和两位英雄，在满足当前账号及组队条件后开始排位。';
 return {queue,readiness,steps:[
  {name:'建立一个小英雄池',description:'先练首选英雄，再用一位备选应对被禁用、被选走或阵容变化。'},
  {name:'用非排位验证手感',description:'固定位置，关注补刀、站位或资源选择，每次只复盘一个问题。'},
  {name:`进入${queue}`,description:'账号等级、英雄数、段位及组队限制以客户端为准，开始前预留完整对局时间。'}
 ]};
}
export function lolMarkdown(result){
 const lines=['## 第一部分：召唤师峡谷 · 排位推荐',`规则版本：${result.version}；资料编辑日期：${REVIEWED}`,`单次游戏时长：${{short:'30 分钟以内',medium:'30–90 分钟',long:'90 分钟以上'}[result.context.time]}`,...contextFields.map(f=>`${f.label}：${f.options.find(o=>o[0]===result.context[f.id])[1]}`),`排位队列：${result.rankedPlan.queue}`,result.rankedPlan.readiness,`推荐位置：${result.primary.name}`,`位置职责：${result.primary.work}`,`需要适应：${result.primary.friction}`,`五位置比较：${result.rankedLanes.map(l=>l.name).join(' → ')}`,result.partyTip,...result.warnings];
 for(const hero of result.picks){
   lines.push('',`### ${hero.name}（${hero.alias}）`,hero.learningLabel,...hero.reasons,`需要适应：${hero.tradeoffs.join(' ')}`,...hero.drill.map((d,i)=>`${i+1}. ${d}`),`国服英雄资料：${hero.source}`);
   const lesson=tutorials[hero.id];
   if(lesson)lines.push(`学习入口：${lesson.creator} · ${lesson.title}${lesson.year?`（${lesson.year}）`:''}`,lesson.kind==='search'?`${lesson.platform||'B站'}搜索入口，请核对上传者与内容。`:`${lesson.platform||'B站'}具体内容，适用版本见原视频。`,lesson.url,lesson.focus);
 }
 if(result.challenge)lines.push('',`进阶再试：${result.challenge.name} — ${result.challenge.watchout}`);
 lines.push('','### 排位准备路线',...result.rankedPlan.steps.map((step,i)=>`${i+1}. ${step.name}：${step.description}`));
 const observers=observersByLane[result.primary.id];
 for(const [key,label] of [['professionals','职业选手'],['streamers','主播']]){
  lines.push('',`### 观摩 · ${label}`);
  for(const person of observers[key])lines.push(`- ${person.name}：${person.focus}`,`${person.platform||'B站'} · ${person.kind==='search'?'搜索入口（非固定视频）':'具体内容'}`,person.url);
 }
 lines.push('','方法：依据游戏偏好的编辑建议，不预测技术水平或胜率。');
 return lines.join('\n');
}
