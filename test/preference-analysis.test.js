import test from 'node:test';
import assert from 'node:assert/strict';
import {profile, questions, games, recommend} from '../web/model.js';
import {deltaQuestions, recommendDelta} from '../web/delta.js';
import {recommendLol} from '../web/lol.js';
import {recommendHextech, hextechHeroes} from '../web/hextech.js';
import {buildPreferenceAnalysis, analysisMarkdown} from '../web/preference-analysis.js';

const neutral = Array(12).fill(3);
const protective = [5,1,2,5,3,2,1,5,4,1,3,4];
const deltaContext = {mode:'operations', platform:'pc', range:'long', style:'intel', mechanics:'medium', party:'duo', budget:'balanced', role:'auto', season:'s11', mbtiUse:'note', time:'medium'};
const lolContext = {experience:'regular', mechanics:'medium', goal:'climb', party:'duo', lane:'auto', style:'auto', macro:'medium', range:'any', time:'medium'};
const answerNames = ['非常不同意','比较不同意','不确定','比较同意','非常同意'];
const prose = analysis => [analysis.lead, ...analysis.paragraphs, analysis.note].join('\n');
function deltaReport(answers=neutral, overrides={}, mbti='') {
  const traits=profile(answers);
  return {game:'三角洲行动', traits, mbtiNote:mbti||null, delta:recommendDelta(traits,{...deltaContext,...overrides},mbti), lol:null, hextech:null, recommendations:[], isExample:false};
}
function lolReport(answers=neutral, overrides={}, mbti='', rolled='auto') {
  const traits=profile(answers), context={...lolContext,...overrides};
  return {game:'英雄联盟', traits, mbtiNote:mbti||null, delta:null, lol:recommendLol(traits,context), hextech:recommendHextech(traits,context,rolled), recommendations:[], isExample:false};
}
function checkEvidence(analysis, answers, bank) {
  assert.ok(Array.isArray(analysis.evidence));
  for (const item of analysis.evidence) {
    const index=bank.findIndex(question=>item.question.includes(question[1]));
    assert.ok(index>=0, `证据题目应来自当前问卷：${item.question}`);
    assert.ok(String(item.answer).includes(String(answers[index]))||String(item.answer).includes(answerNames[answers[index]-1]),
      `保留原始选择，不能把反向计分后的数值冒充原回答：${item.answer}`);
  }
}

test('作答和报告不一致时拒绝解释，避免把旧结果配上新答案', () => {
  const report=deltaReport(neutral);
  const changed=[...neutral];changed[0]=5;
  assert.throws(()=>buildPreferenceAnalysis(report,changed), /一致|作答/);
  assert.throws(()=>buildPreferenceAnalysis(report,neutral.slice(0,11)), /12|全部|完整/);
  assert.throws(()=>buildPreferenceAnalysis(null,neutral), /数据|完整|解读/);
});

test('中性答案提供比较和试玩解释，不捏造明确的人格偏好', () => {
  const analysis=buildPreferenceAnalysis(deltaReport(),neutral);
  assert.ok(analysis.kicker&&analysis.title&&analysis.lead&&analysis.note);
  assert.ok(Array.isArray(analysis.paragraphs)&&analysis.paragraphs.length>0);
  const text=prose(analysis);
  assert.match(text, /中性|没有明显|不明显|没有突出|随情境|尚未/);
  assert.doesNotMatch(text, /你(?:显然|强烈|必然|天生)|证明你|注定|最适合你的性格/);
  checkEvidence(analysis,neutral,deltaQuestions);
});

test('原始题目分散可揭示情境差异，即使六维平均值和全中性完全相同', () => {
  const scattered=[...neutral];
  scattered[0]=5;scattered[6]=5;
  assert.deepEqual(profile(scattered),profile(neutral));
  const baseline=buildPreferenceAnalysis(deltaReport(neutral),neutral);
  const analysis=buildPreferenceAnalysis(deltaReport(scattered),scattered);
  assert.notDeepEqual(analysis.paragraphs,baseline.paragraphs,'不能只读取平均分后生成相同解释');
  assert.match(prose(analysis), /情境|场景|分散|不一致|不同条件|同时|两面/);
  assert.ok(analysis.evidence.some(item=>item.question.includes(deltaQuestions[0][1])));
  assert.ok(analysis.evidence.some(item=>item.question.includes(deltaQuestions[6][1])));
  checkEvidence(analysis,scattered,deltaQuestions);
});

test('反向题解读保留原回答，并把保护与配合解释为偏好线索', () => {
  const report=lolReport(protective);
  assert.equal(report.traits.team,100);
  assert.equal(report.traits.support,100);
  const analysis=buildPreferenceAnalysis(report,protective);
  assert.match(prose(analysis), /配合|协作|团队/);
  assert.match(prose(analysis), /保护|支援|队友/);
  checkEvidence(analysis,protective,questions);
  assert.ok(analysis.evidence.some(item=>questions.some((q,i)=>q[2]&&item.question.includes(q[1])&&protective[i]!==3)),
    '证据应包含至少一道有方向的反向题，便于核对原回答');
});

test('手动兵种与位置被解释为主动选择，不包装成问卷自动推断', () => {
  const answers=[...neutral];
  const delta=deltaReport(answers,{role:'engineer'});
  const deltaText=prose(buildPreferenceAnalysis(delta,answers));
  assert.ok(deltaText.includes(delta.delta.primaryClass.name));
  assert.match(deltaText, /(?:主动|手动|明确|指定|自己).{0,12}(?:选择|兵种)|按你.{0,12}选择/);
  const lol=lolReport(protective,{lane:'mid'});
  const lolText=prose(buildPreferenceAnalysis(lol,protective));
  assert.ok(lolText.includes(lol.lol.primary.name));
  assert.match(lolText, /(?:主动|手动|明确|指定|自己).{0,12}(?:选择|位置)|按你.{0,12}选择/);
});

test('英雄联盟的 MBTI 只作备注，三角洲说明干员上限及自动兵种可能变化', () => {
  const lol=lolReport(protective,{},'INTJ');
  const lolText=prose(buildPreferenceAnalysis(lol,protective));
  assert.match(lolText, /INTJ/);
  assert.match(lolText, /MBTI.{0,45}(?:备注|未参与|不参与)|(?:未参与|不参与).{0,20}(?:排名|排序)/);
  const note=deltaReport(protective,{mbtiUse:'note'},'INTJ');
  const light=deltaReport(protective,{mbtiUse:'light'},'INTJ');
  assert.deepEqual(note.delta.weapons.map(w=>[w.id,w.score]),light.delta.weapons.map(w=>[w.id,w.score]));
  const text=prose(buildPreferenceAnalysis(light,protective));
  assert.match(text, /INTJ/);
  assert.match(text, /干员/);
  assert.match(text, /1\.5/);
  assert.match(text, /编辑|假设|探索/);
  assert.match(text, /自动兵种.{0,30}(?:可能|随).{0,20}变化/);
  assert.match(text, /(?:不|未|不会).{0,20}(?:枪械|武器)|(?:枪械|武器).{0,20}(?:不|未|不会)/);
  const answers=[5,3,5,2,2,4,1,3,2,3,3,2];
  const overrides={mbtiUse:'light',role:'auto',style:'auto',range:'any'};
  let baselineWeapons;
  for (const type of ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP']) {
    const report=deltaReport(answers,overrides,type),reading=prose(buildPreferenceAnalysis(report,answers));
    // Do not assume the aggregate class stays fixed: explain whichever class the actual engine selected.
    assert.ok(reading.includes(report.delta.primaryClass.name));
    assert.ok(reading.includes(report.delta.operators[0].name));
    const weapons=report.delta.weapons.map(weapon=>[weapon.id,weapon.score]);
    if(baselineWeapons)assert.deepEqual(weapons,baselineWeapons);
    else baselineWeapons=weapons;
  }
});

test('解读使用当前模式及实际首选干员、枪械和英雄，不读过期示例', () => {
  for (const mode of ['operations','warfare']) {
    const report=deltaReport(protective,{mode,role:'recon'});
    const text=prose(buildPreferenceAnalysis(report,protective));
    assert.ok(text.includes(mode==='operations'?'烽火地带':'全面战场'));
    assert.ok(text.includes(report.delta.operators[0].name));
    assert.ok(text.includes(report.delta.weapons[0].name));
  }
  const report=lolReport(protective,{lane:'support',style:'protect'});
  const text=prose(buildPreferenceAnalysis(report,protective));
  assert.ok(text.includes(report.lol.picks[0].name));
  assert.ok(text.includes(report.hextech.picks[0].name));
});

test('指定乌迪尔后只解释该英雄的实际首选流派，不声称问卷选出了随机英雄', () => {
  const report=lolReport(protective,{lane:'support',style:'protect'},'','Udyr');
  const analysis=buildPreferenceAnalysis(report,protective),text=prose(analysis);
  const udyr=report.hextech.picks[0];
  assert.equal(udyr.id,'Udyr');
  assert.ok(text.includes(udyr.name));
  assert.ok(text.includes(udyr.builds[0].name));
  assert.match(text, /已随机|实际随机|已经.{0,8}(?:拿到|选定)|当前.{0,8}英雄|指定.{0,8}英雄/);
  for (const other of hextechHeroes.filter(hero=>hero.id!=='Udyr'&&!report.lol.picks.some(pick=>pick.id===hero.id))) {
    assert.ok(!text.includes(`${other.name}的流派`),`不可解释未入选的${other.name}`);
  }
});

test('其余游戏的基础方向也使用实际报告，无缺失字段或虚构英雄', () => {
  const answers=[...protective],traits=profile(answers),game=games.find(g=>g.id==='minecraft');
  const report={game:game.name,traits,mbtiNote:null,delta:null,lol:null,hextech:null,recommendations:recommend(game,traits),isExample:false};
  const analysis=buildPreferenceAnalysis(report,answers),text=prose(analysis);
  assert.ok(text.includes(report.recommendations[0].name));
  assert.doesNotMatch(text, /\bundefined\b|\bnull\b|\bNaN\b/);
  checkEvidence(analysis,answers,questions);
});

test('Markdown 保留标题、引导、全部段落、原答案证据和说明', () => {
  const reports=[deltaReport(protective,{mode:'warfare'},'INTJ'),lolReport(protective,{lane:'mid'},'INTJ','Udyr')];
  for (const report of reports) {
    const analysis=buildPreferenceAnalysis(report,protective),markdown=analysisMarkdown(analysis);
    for (const text of [analysis.title,analysis.lead,...analysis.paragraphs,analysis.note]) assert.ok(markdown.includes(text));
    for (const item of analysis.evidence) {
      assert.ok(markdown.includes(item.question));
      assert.ok(markdown.includes(String(item.answer)));
    }
    assert.doesNotMatch(markdown, /\bundefined\b|\bnull\b|\bNaN\b/);
  }
});
