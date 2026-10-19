import {games,findGame,questions,dimensions,profile,recommend} from './model.js';
import {contextFields,lanes,recommendLol,validateContext,lolMarkdown,sources,REVIEWED} from './lol.js';
import {tutorials,observersByLane} from './lol-media.js';
import {hextechHeroes,recommendHextech,hextechMarkdown} from './hextech.js';
import {gameVisuals,questionVisuals} from './visuals.js';

const $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
const link=(text,url)=>{const node=el('a',text,'resource-link');node.href=url;node.target='_blank';node.rel='noopener noreferrer';return node;};
const isChinaPlatform=url=>{try{const host=new URL(url).hostname;return ['bilibili.com','douyin.com','douyu.com','huya.com','qq.com'].some(domain=>host===domain||host.endsWith('.'+domain));}catch{return false;}};
const mediaLink=(text,url)=>isChinaPlatform(url)?link(text,url):el('span','中国平台资料整理中','fine');
let selectedGame=null,index=0,answers=Array(questions.length).fill(null),report=null,isExample=false,rolledHeroId='auto';
let visualGame=null,activeWorld=0,worldRequest=0;

function applyWorld(game){
 if(!game||visualGame===game.id)return;
 const visual=gameVisuals[game.id];if(!visual)return;
 visualGame=game.id;document.body.dataset.game=game.id;$('scene-name').textContent=game.name;
 const source=typeof visual.source==='string'?visual.source:visual.source?.url;
 if(source){$('scene-source').href=source;$('scene-source').hidden=false;}else $('scene-source').hidden=true;
 const layers=[$('world-image-a'),$('world-image-b')],next=activeWorld===0?1:0,request=++worldRequest;
 layers[next].onload=()=>{if(request!==worldRequest)return;layers[next].classList.add('is-active');layers[activeWorld].classList.remove('is-active');activeWorld=next;};
 layers[next].onerror=()=>{if(request===worldRequest)visualGame=null;};
 layers[next].src=visual.url;
}
for(const game of games){
 const button=el('button',undefined,'game-chip');button.dataset.game=game.id;button.append(el('strong',game.name),el('small',game.id==='lol'?'RANKED + HEXTECH':game.kind));
 button.onclick=()=>{$('game').value=game.name;resolve();};$('game-chips').append(button);
}
for(const a of ['I','E'])for(const b of ['N','S'])for(const c of ['T','F'])for(const d of ['J','P'])$('mbti').append(new Option(a+b+c+d,a+b+c+d));
const fieldPicture={experience:5,mechanics:2,goal:4,party:0,lane:8,style:9,macro:10,range:7};
for(const field of contextFields){
 const box=el('div');const label=el('label',field.label);label.htmlFor=`ctx-${field.id}`;const visual=questionVisuals[fieldPicture[field.id]];
 const select=el('select');select.id=label.htmlFor;select.append(new Option('请选择',''));for(const [value,text] of field.options)select.append(new Option(text,value));
 box.append(label);if(visual){const img=el('img');img.src=visual.url;img.alt='';img.className='field-visual';img.loading='lazy';box.append(img);}box.append(select);$('context-fields').append(box);
}
function resolve(){
 selectedGame=findGame($('game').value);
 $('game-status').textContent=selectedGame?`${selectedGame.name} · ${selectedGame.id==='lol'?'峡谷排位 + 海克斯大乱斗双模式':'基础玩法探索'}`:($('game').value.trim()?'暂未收录这个名称，请选择上方游戏。':'选择一个主场，开始探索。');
 $('game-status').className=selectedGame||!$('game').value.trim()?'status':'status error';$('lol-context').hidden=selectedGame?.id!=='lol';$('setup-error').textContent='';
 for(const button of $('game-chips').children){const selected=button.dataset.game===selectedGame?.id;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));}
 if(selectedGame)$('hero-copy').textContent=selectedGame.id==='lol'?'从你享受的游戏瞬间出发。找到想练的英雄、适合的位置，以及让你上头的海克斯流派。':`从你享受的游戏瞬间出发，探索${selectedGame.name}里的角色定位与玩法，找到更想投入的一种。`;
 applyWorld(selectedGame);return selectedGame;
}
$('game').addEventListener('input',resolve);$('game').value='英雄联盟';resolve();
const context=()=>({...Object.fromEntries(contextFields.map(f=>[f.id,$(`ctx-${f.id}`).value])),time:$('time').value});
function screen(name){
 for(const id of ['setup','quiz','results'])$(id).hidden=id!==name;
 ['step1','step2','step3'].forEach((id,i)=>$(id).classList.toggle('active',i===['setup','quiz','results'].indexOf(name)));
 document.body.classList.toggle('showing-results',name==='results'&&selectedGame?.id==='lol');
}
$('start').onclick=()=>{
 if(!resolve()){$('game').focus();return;}
 if(selectedGame.id==='lol')try{validateContext(context());}catch(error){$('setup-error').textContent=error.message;const missing=contextFields.find(f=>!$(`ctx-${f.id}`).value);if(missing)$(`ctx-${missing.id}`).focus();return;}
 if(answers.every(x=>x!==null)){renderResults();return;}screen('quiz');renderQuestion();
};
function renderQuestion(){
 const visual=questionVisuals[index];$('question').textContent=questions[index][1];$('counter').textContent=`${String(index+1).padStart(2,'0')} / ${questions.length}`;$('progress').value=answers.filter(x=>x!==null).length;
 $('question-image').src=visual.url;$('question-image').alt=visual.alt;$('question-caption').textContent=visual.caption||'游戏情境示意';
 $('answers').replaceChildren();['非常不同意','比较不同意','不确定 / 看情境','比较同意','非常同意'].forEach((label,i)=>{
  const button=el('button',label,'answer'+(answers[index]===i+1?' selected':''));button.append(el('span',String(i+1)));button.setAttribute('aria-pressed',String(answers[index]===i+1));
  button.onclick=()=>{answers[index]=i+1;renderQuestion();$('answers').children[i].focus();};$('answers').append(button);
 });
 $('next').disabled=answers[index]===null;$('next').textContent=index===questions.length-1?'生成我的本命报告 →':'下一题 →';$('question').focus();
}
$('back').onclick=()=>{if(index===0){screen('setup');$('game').focus();}else{index--;renderQuestion();}};
$('next').onclick=()=>{if(answers[index]===null)return;if(index<questions.length-1){index++;renderQuestion();}else renderResults();};
function sectionTitle(kicker,title,text){const box=el('div',undefined,'section-title');box.append(el('div',kicker,'eyebrow'),el('h4',title));if(text)box.append(el('p',text,'muted'));return box;}
function sectionHeading(kicker,title,text,badge,hex=false){const box=el('div',undefined,'section-heading');const content=el('div');content.append(el('div',kicker,'eyebrow'),el('h3',title),el('p',text,'muted'));box.append(content,el('span',badge,'mode-badge'+(hex?' hex':'')));return box;}
function portrait(hero){const box=el('div',hero.name.slice(0,1),'portrait'),img=el('img');img.src=`./assets/champions/${hero.id}.png`;img.alt='';img.loading='lazy';img.onerror=()=>img.remove();box.append(img);return box;}
function heroHeading(hero,kicker){const box=el('div',undefined,'champion-heading'),names=el('div');names.append(el('div',kicker,'eyebrow'),el('h4',hero.name),el('p',hero.alias,'muted'));box.append(portrait(hero),names);return box;}
function heroCard(hero,i){
 const card=el('article',undefined,'champion-card');card.append(heroHeading(hero,i===0?'优先练习':`备选英雄 0${i+1}`));
 const tags=el('div',undefined,'tag-row');[hero.learningLabel,hero.range==='ranged'?'远程':'近战',lanes.find(l=>l.id===hero.lane).name].forEach(t=>tags.append(el('span',t)));card.append(tags,el('h5','与你的偏好，怎样契合？'));
 const reasons=el('ul');hero.reasons.forEach(text=>reasons.append(el('li',text)));card.append(reasons,el('p',`需要适应：${hero.tradeoffs.join(' ')}`,'caution'));
 const drill=el('details');drill.append(el('summary','三次练习，具体做什么'));const steps=el('ol');hero.drill.forEach(d=>steps.append(el('li',d)));drill.append(steps);card.append(drill);
 const lesson=tutorials[hero.id];if(lesson){const study=el('div',undefined,'hero-lesson');study.append(el('h5',`学习线索 · ${lesson.creator}`),mediaLink(lesson.title+' ↗',lesson.url),el('p',`${lesson.platform||'B站'} · ${lesson.kind==='search'?'搜索入口，按当前结果筛选':lesson.year||'具体视频'}`,'fine'),el('p',lesson.focus,'muted'));card.append(study);}
 const resources=el('div',undefined,'card-links');resources.append(link('国服英雄资料 ↗',hero.source));card.append(resources);return card;
}
function renderObservers(laneId,root){
 root.append(sectionTitle('WATCH & LEARN','看高手，也看他如何思考。','职业选手看比赛决策，主播看完整对局与讲解。所有入口使用中国平台。'));
 const grid=el('div',undefined,'observer-grid'),data=observersByLane[laneId];
 for(const [key,label,sub] of [['professionals','职业选手','PRO PLAYERS'],['streamers','主播','STREAMERS']]){
  const category=el('section',undefined,'observer-category'+(key==='streamers'?' streamer':''));category.append(el('div',sub,'eyebrow'),el('h4',label));
  for(const person of data[key]){const card=el('article',undefined,'observer-card');card.append(el('h5',person.name),el('p',person.focus),mediaLink(`${person.kind==='search'?'查找':'打开'}${person.platform||'B站'}对应内容 ↗`,person.url),el('small',`${person.platform||'B站'} · ${person.kind==='search'?'检索入口，非固定视频':'具体内容'}`));category.append(card);}grid.append(category);
 }root.append(grid);
}
function renderRanked(result){
 const outer=$('lol-results');outer.replaceChildren();
 const jump=el('nav',undefined,'report-jump');jump.setAttribute('aria-label','两种模式的推荐');
 for(const [target,title,text] of [['ranked-recommendations','召唤师峡谷 · 排位','推荐位置、英雄池、职业选手与主播'],['hextech-recommendations','海克斯大乱斗','推荐英雄、流派，以及强化取舍']]){const a=el('a');a.href='#'+target;const copy=el('div');copy.append(el('strong',title),el('small',text));a.append(copy,el('b','↗'));jump.append(a);}outer.append(jump);
 const root=el('section',undefined,'report-section');root.id='ranked-recommendations';root.append(sectionHeading('01 / SUMMONER’S RIFT','召唤师峡谷 · 排位推荐','围绕长期练习建立英雄池，在五个位置里找到更想投入的一路。','RANKED'));
 const summary=el('div',undefined,'recommendation-hero');summary.append(el('div','YOUR RANKED DIRECTION','eyebrow'),el('h4',`先练${result.primary.name}，从${result.picks[0].name}开始。`),el('p',result.primary.work));
 const overview=el('div',undefined,'overview-grid');[['位置',result.primary.name],['英雄池',result.picks.map(h=>h.name).join(' / ')],['排位队列',result.rankedPlan.queue],['练习侧重',result.primary.headline]].forEach(([label,value])=>{const item=el('div');item.append(el('small',label),el('strong',value));overview.append(item);});summary.append(overview);root.append(summary);
 root.append(el('p',result.rankedPlan.readiness,'notice'));result.warnings.forEach(w=>root.append(el('p',w,'fine')));
 const conditions=el('details',undefined,'condition-summary');conditions.append(el('summary','查看这份建议使用的游玩条件'));const conditionList=el('ul');for(const field of contextFields)conditionList.append(el('li',`${field.label}：${field.options.find(o=>o[0]===result.context[field.id])[1]}`));conditions.append(conditionList);root.append(conditions);
 root.append(sectionTitle('POSITION','你想认真试哪条路？','点击位置，英雄池和两类观摩对象会一起更新。海克斯推荐不受峡谷位置影响。'));
 const laneChoices=el('div',undefined,'lane-choices');for(const [i,lane] of result.rankedLanes.entries()){
  const button=el('button',undefined,'lane-choice'+(lane.id===result.primary.id?' selected':''));button.setAttribute('aria-pressed',String(lane.id===result.primary.id));button.append(el('small',lane.en),el('strong',lane.name),el('span',i===0?'偏好较接近':`可探索方向 ${i+1}`));button.onclick=()=>{$('ctx-lane').value=lane.id;renderResults(false);$('ranked-recommendations').scrollIntoView({block:'start'});};laneChoices.append(button);
 }root.append(laneChoices);
 const laneNote=el('div',undefined,'lane-note');laneNote.append(el('strong',result.primary.headline),el('p',result.primary.friction));root.append(laneNote);
 root.append(sectionTitle('CHAMPION POOL','一个主练英雄，一组可比较的备选。','先按你愿意承担的操作成本筛选，再结合偏好和玩法判断。'));
 const cards=el('div',undefined,'champion-grid');result.picks.forEach((hero,i)=>cards.append(heroCard(hero,i)));root.append(cards);
 if(result.challenge){const box=el('div',undefined,'challenge');box.append(el('strong',`进阶后再试 · ${result.challenge.name}`),el('p',result.challenge.hook),link('查看国服英雄资料 ↗',result.challenge.source));root.append(box);}
 root.append(sectionTitle('RANKED ROUTE','把推荐变成自己的排位准备路线。',result.partyTip));const steps=el('div',undefined,'mode-grid');result.rankedPlan.steps.forEach((step,i)=>{const card=el('article',undefined,'mode-card');card.append(el('small',`STEP 0${i+1}`),el('h4',step.name),el('p',step.description));steps.append(card);});root.append(steps);
 renderObservers(result.primary.id,root);
 const details=el('details',undefined,'method-details');details.append(el('summary','峡谷推荐方式与资料来源'),el('p',`资料编辑日期 ${REVIEWED}。人格与偏好不决定技术水平；英雄入门成本、玩法标签和练习建议由本实验室编辑整理。`),el('p','先按操作投入筛选，再结合偏好、玩法、距离和地图负担排序。手动选择的位置优先。'));sources.forEach(source=>details.append(link(source.title+' ↗',source.url)));root.append(details);outer.append(root);
}
function renderHextech(result){
 const outer=$('hextech-results');outer.replaceChildren();const root=el('section',undefined,'report-section');root.id='hextech-recommendations';root.append(sectionHeading('02 / ARAM: MAYHEM','海克斯大乱斗 · 英雄与流派','同一位英雄，也可以玩出不同体验。按实际随机到的英雄、强化和阵容来调整。','HEXTECH',true));
 const controls=el('div',undefined,'hex-controls'),selectBox=el('div'),label=el('label','已经随机到哪位英雄？');label.htmlFor='rolled-hero';const select=el('select');select.id='rolled-hero';select.append(new Option('还没随机：先看适合留意的英雄','auto'));hextechHeroes.forEach(hero=>select.append(new Option(hero.name,hero.id)));select.value=rolledHeroId;
 select.onchange=()=>{rolledHeroId=select.value;report.hextech=recommendHextech(report.traits,context(),rolledHeroId);renderHextech(report.hextech);$('rolled-hero').focus({preventScroll:true});};selectBox.append(label,select);const udyr=el('button','直接看乌迪尔的两条路线 ↗','secondary');udyr.onclick=()=>{rolledHeroId='Udyr';report.hextech=recommendHextech(report.traits,context(),rolledHeroId);renderHextech(report.hextech);$('rolled-hero').focus({preventScroll:true});};controls.append(selectBox,udyr);root.append(controls);
 root.append(el('p',result.notes[0],'hex-note'));if(result.context.time==='short')root.append(el('p','你选择了 30 分钟以内的时段：海克斯对局不能保证准时结束，有硬性截止时间时请先选择单人练习。','notice'));
 result.picks.forEach((hero,i)=>{
  const card=el('article',undefined,'hex-hero-card');card.append(heroHeading(hero,result.rolledHeroId==='auto'?`值得留意的英雄 0${i+1}`:'本局拿到的英雄'),el('p',hero.reason,'muted'));
  const builds=el('div',undefined,'build-grid');hero.builds.forEach((build,j)=>{
   const box=el('section',undefined,'build-card');box.append(el('small',j===0?'优先探索的路线':'可比较的另一条路线'),el('h5',build.name),el('p',build.description),el('p',build.reason,'fine'),el('h6','优先寻找的强化属性 / 机制'));
   const seeks=el('ul');build.seek.forEach(text=>seeks.append(el('li',text)));box.append(seeks,el('h6','没拿到理想强化时'),el('p',build.fallback),el('p',`这条路线的取舍：${build.tradeoff}`,'caution'));
   if(build.lesson){box.append(el('h6',`看具体玩法 · ${build.lesson.creator}`),mediaLink(build.lesson.title+' ↗',build.lesson.url),el('p',`${build.lesson.date} · ${build.lesson.note}`,'fine'));}
   box.append(mediaLink('B站查找这条流派 ↗',build.url));builds.append(box);
  });card.append(builds);root.append(card);
 });
 root.append(el('p',result.notes[1],'fine'));
 const details=el('details',undefined,'method-details');details.append(el('summary','海克斯推荐方式与资料来源'),el('p',result.method),el('p',result.note));result.sources.forEach(source=>details.append(mediaLink(source.title+' ↗',source.url)));root.append(details);outer.append(root);
}
function renderProfile(traits){
 $('profile').replaceChildren();dimensions.forEach(([id,label,low,high])=>{const row=el('div',undefined,'trait'),head=el('div');head.append(el('strong',label),el('span',traits[id]===50?'随情境变化':traits[id]>50?high:low));const meter=el('meter');meter.min=0;meter.max=100;meter.value=traits[id];meter.setAttribute('aria-label',`${label}：${low}到${high}，${traits[id]}/100`);row.append(head,meter);$('profile').append(row);});
}
function renderResults(focus=true){
 const traits=profile(answers),lol=selectedGame.id==='lol'?recommendLol(traits,context()):null,hextech=lol?recommendHextech(traits,context(),rolledHeroId):null;
 report={version:'0.3.0',game:selectedGame.name,mbtiNote:$('mbti').value||null,session:$('time').value,traits,recommendations:recommend(selectedGame,traits),lol,hextech,isExample,method:'探索性游戏偏好问卷；编辑规则推荐；MBTI仅作个人备注。'};
 screen('results');$('example-notice').hidden=!isExample;$('result-title').textContent=lol?'你的本命报告 · 两种战场，两份路线':`你的本命报告 · ${selectedGame.name}`;$('result-summary').textContent=lol?'先看峡谷排位中的位置与英雄池，再探索海克斯大乱斗的英雄和流派。':'从你的偏好出发，比较值得尝试的玩法方向。';renderProfile(traits);$('recommendations').replaceChildren();$('lol-results').replaceChildren();$('hextech-results').replaceChildren();
 if(lol){renderRanked(lol);renderHextech(hextech);}else{
  $('recommendations').append(el('p','这款游戏暂为基础方向版，英雄与职业细分正在扩充。','basic-note'));
  report.recommendations.forEach((r,i)=>{const card=el('article',undefined,'rec');card.append(el('div',`值得尝试的方向 0${i+1}`,'rank'),el('h3',r.name),el('p',`偏好线索：${r.reasons.map(m=>`${m.label}上${m.preference}`).join('；')}。`),el('p',r.caution),el('p',`试玩任务：${r.trial}`,'trial'));$('recommendations').append(card);});
 }
 $('session-tip').textContent=lol?'':'一次先尝试一个方向，记录享受程度、压力和继续玩的意愿。';if(focus)$('result-title').focus();
}
$('example').onclick=()=>{isExample=true;rolledHeroId='auto';$('game').value='英雄联盟';resolve();$('time').value='medium';const demo={experience:'regular',mechanics:'medium',goal:'climb',party:'duo',lane:'support',style:'protect',macro:'medium',range:'ranged'};for(const [key,value] of Object.entries(demo))$(`ctx-${key}`).value=value;answers=[5,1,2,5,3,2,1,5,4,1,3,4];renderResults();};
$('adjust').onclick=()=>{screen('setup');$('start').textContent='用这些条件更新建议 ↗';$('game').focus();};
$('restart').onclick=()=>{isExample=false;rolledHeroId='auto';index=0;answers=Array(questions.length).fill(null);report=null;$('start').textContent='进入偏好探索 ↗';screen('setup');$('game').focus();};
$('download').onclick=()=>{
 if(!report)return;const head=`# 本命实验室 · ${report.game}本命报告\n\nMAIN LAB / ${report.version}\n\n${report.isExample?'示例报告：预设答案，并非个人测评。\n\n':''}${report.method}\n\nMBTI 备注：${report.mbtiNote||'未填写'}\n\n`;
 const text=head+(report.lol?lolMarkdown(report.lol)+'\n\n'+hextechMarkdown(report.hextech):report.recommendations.map((r,i)=>`## ${i+1}. ${r.name}\n${r.caution}\n试玩任务：${r.trial}\n`).join('\n'));
 const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'})),a=el('a');a.href=url;a.download='main-lab-report.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
