export const dimensions=[
  ['team','协作方式','偏独立行动','偏团队协作'],
  ['risk','风险偏好','稳健推进','主动冒险'],
  ['pace','操作节奏','从容规划','快速应变'],
  ['support','贡献方式','直接达成目标','帮助队友发挥'],
  ['explore','探索动机','精通熟悉路线','尝试未知可能'],
  ['practice','练习意愿','轻松上手','反复磨练']
];
export const questions=[
  ['team','遇到难关时，我更想和队友配合解决。'],
  ['risk','即使可能失败，我也愿意主动创造突破机会。'],
  ['pace','我享受需要快速反应、连续操作的过程。'],
  ['support','帮助队友打出精彩表现，会让我很有成就感。'],
  ['explore','比起重复最有效的路线，我更喜欢试试新方法。'],
  ['practice','为了熟练掌握一种玩法，我愿意专门花时间练习。'],
  ['team','游戏中，我更喜欢自己决定节奏，不依赖别人。',true],
  ['risk','我宁愿等待更稳妥的时机，也不想冒险出手。',true],
  ['pace','我更喜欢留有思考时间、操作不紧迫的玩法。',true],
  ['support','相比支援和保护，我更想亲自完成关键输出或目标。',true],
  ['explore','我会主动探索支线、地图角落或不同的配装组合。'],
  ['practice','如果一种玩法需要大量练习，我通常会换一个更容易上手的。',true]
];
// Editorial examples, not validated psychological mappings or live balance data.
const role=(name,tags,caution,trial)=>({name,tags,caution,trial});
const shared={
  moba:[role('保护与支援',{team:90,risk:35,pace:45,support:95,explore:45,practice:45},'需要观察队友与局势，支援定位不代表操作简单。','试玩三局，记录保护队友和处理视野是否让你享受。'),role('主动开团',{team:85,risk:90,pace:75,support:65,explore:55,practice:65},'主动决策带来较多失误风险，需要与队友沟通。','先练习一个明确的进场时机，每局复盘一次开团。'),role('持续输出',{team:65,risk:35,pace:80,support:15,explore:35,practice:80},'输出体验常依赖站位、资源与队伍保护。','用熟悉的角色练习生存与稳定输出，观察是否愿意重复练习。'),role('游走与节奏',{team:65,risk:80,pace:80,support:40,explore:85,practice:85},'需要持续判断地图信息，学习成本较高。','每局只设一个地图目标，看看宏观决策是否比正面对抗更吸引你。')],
  fps:[role('信息与支援',{team:90,risk:35,pace:50,support:90,explore:65,practice:55},'道具和信息收益可能不直接体现在击杀数。','尝试围绕信息和道具配合打三局，记录合作是否带来满足。'),role('突破与先手',{team:70,risk:95,pace:95,support:25,explore:55,practice:85},'需要快速判断，也需要接受率先被淘汰的可能。','与队友约定一次配合进攻，体验先手压力。'),role('架点与防守',{team:60,risk:20,pace:50,support:50,explore:30,practice:60},'等待和重复守点可能降低新鲜感，仍需即时反应。','选择一个区域练习信息判断与转点，避免只评价击杀数。')],
  rpg:[role('防护与前排',{team:90,risk:60,pace:55,support:80,explore:40,practice:65},'团队内容中可能承担路线、机制和节奏责任。','先在低压力内容中体验保护与承担责任。'),role('治疗与增益',{team:95,risk:30,pace:65,support:100,explore:40,practice:65},'需要关注队友状态，紧急救场可能很忙碌。','体验一段低难度团队内容，留意救场带来的成就或压力。'),role('输出与构筑',{team:45,risk:65,pace:75,support:15,explore:65,practice:85},'追求效率可能需要重复练习和研究机制。','选择一套易上手构筑，比较操作和研究哪部分更让你投入。'),role('探索与收集',{team:15,risk:30,pace:20,support:20,explore:100,practice:20},'收集成长可能较慢，部分奖励需要重复内容。','给自己一次不看效率攻略的探索时间，记录想继续做的活动。')],
  sandbox:[role('建造与规划',{team:30,risk:15,pace:15,support:40,explore:75,practice:65},'大型项目需要耐心，也可能产生重复劳动。','用一个短时段完成小型建筑，体验规划到落成。'),role('生存与冒险',{team:45,risk:90,pace:75,support:25,explore:95,practice:65},'资源损失和意外失败可能带来挫折。','设置一条可返回的探索路线，尝试有限风险的冒险。'),role('合作与后勤',{team:95,risk:25,pace:30,support:100,explore:45,practice:40},'贡献不一定显眼，需要与你的伙伴对齐分工。','与朋友完成一个小项目，体验收集、补给或协调。')]
};
export const games=[
 {id:'lol',name:'英雄联盟',aliases:['lol','league of legends','英雄联盟','撸啊撸'],kind:'MOBA',roles:shared.moba},
 {id:'hok',name:'王者荣耀',aliases:['王者','王者荣耀','honor of kings','hok'],kind:'MOBA',roles:shared.moba},
 {id:'valorant',name:'无畏契约',aliases:['无畏契约','瓦','瓦罗兰特','valorant'],kind:'战术射击',roles:shared.fps},
 {id:'ffxiv',name:'最终幻想14',aliases:['ff14','ffxiv','最终幻想14','最终幻想xiv'],kind:'MMORPG',roles:shared.rpg},
 {id:'wow',name:'魔兽世界',aliases:['wow','魔兽世界','world of warcraft'],kind:'MMORPG',roles:shared.rpg},
 {id:'minecraft',name:'我的世界',aliases:['mc','minecraft','我的世界'],kind:'沙盒',roles:shared.sandbox}
];
export const normalize=s=>String(s).normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
export function findGame(input){const key=normalize(input);return games.find(g=>g.aliases.some(a=>normalize(a)===key))||null;}
export function profile(answers){
 if(answers.length!==questions.length||answers.some(x=>!Number.isInteger(x)||x<1||x>5))throw new Error('请完成全部 12 道题。');
 return Object.fromEntries(dimensions.map(([id])=>{const values=questions.flatMap((q,i)=>q[0]===id?[(q[2]?6-answers[i]:answers[i])-1]:[]);return[id,values.reduce((a,b)=>a+b,0)/values.length*25];}));
}
export function recommend(game,traits){
 return game.roles.map(r=>{
 const matches=dimensions.map(([id,label,low,high])=>({id,label,fit:100-Math.abs(traits[id]-r.tags[id]),preference:traits[id]===50?'随情境变化':traits[id]>50?high:low}));
 const score=matches.reduce((s,m)=>s+m.fit,0)/matches.length;
 return {...r,score:Math.round(score),reasons:[...matches].sort((a,b)=>b.fit-a.fit).slice(0,2),tension:[...matches].sort((a,b)=>a.fit-b.fit)[0]};
 }).sort((a,b)=>b.score-a.score).slice(0,3);
}
