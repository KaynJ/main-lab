import test from 'node:test';
import assert from 'node:assert/strict';
import {
  deltaContextFields, deltaMbtiBonus, deltaMarkdown, recommendDelta, validateDeltaContext,
} from '../web/delta.js';
import {deltaClasses, deltaOperators} from '../web/delta-operators.js';
import {
  deltaWeapons, weaponSeasons, weaponRatingFor, weaponSourceRecordsFor,
} from '../web/delta-weapons.js';

const neutral = {team:50, risk:50, pace:50, support:50, explore:50, practice:50};
const entryTraits = {team:65, risk:95, pace:95, support:10, explore:65, practice:90};
const intelTraits = {team:85, risk:20, pace:15, support:60, explore:100, practice:85};
const supportTraits = {team:100, risk:15, pace:30, support:100, explore:35, practice:30};
const context = {mode:'operations', platform:'pc', range:'mid', style:'auto', mechanics:'medium', party:'squad', budget:'balanced', role:'auto', season:'s11', mbtiUse:'note', time:'medium'};
const run = (traits=neutral, overrides={}, mbti='') => recommendDelta(traits, {...context, ...overrides}, mbti);
const types = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const operatorScores = result => Object.fromEntries(result.classRanks.flatMap(role=>role.candidates.map(op=>[op.id, op.score])));
const weaponScores = result => result.weapons.map(({id,score,tierBonus})=>({id,score,tierBonus}));
const domestic = url => {
  const host = new URL(url).hostname;
  return host==='bilibili.com'||host.endsWith('.bilibili.com')||host==='qq.com'||host.endsWith('.qq.com')||host==='taptap.cn'||host.endsWith('.taptap.cn');
};

test('三角洲拒绝缺失条件、异常偏好和无效 MBTI，不生成看似完整的报告', () => {
  assert.throws(()=>recommendDelta(null, context), /偏好问卷/);
  assert.throws(()=>recommendDelta(neutral, null), /游玩条件/);
  for (const field of deltaContextFields) {
    const missing = {...context};
    delete missing[field.id];
    assert.throws(()=>recommendDelta(neutral, missing), /请选择/, field.id);
    assert.throws(()=>run(neutral, {[field.id]:'not-an-option'}), /请选择/, field.id);
  }
  for (const bad of [NaN, Infinity, -1, 101, '50', undefined]) {
    assert.throws(()=>run({...neutral, risk:bad}), /偏好题/, `risk=${String(bad)}`);
  }
  assert.throws(()=>run(neutral, {time:'three-hours'}), /游玩时长/);
  assert.throws(()=>run(neutral, {}, 'XXXX'), /MBTI/);
  assert.deepEqual(validateDeltaContext(context, neutral), context);
});

test('近点突破、远点侦察和团队救援得到不同兵种、干员与枪械体验', () => {
  const entry = run(entryTraits, {range:'close', style:'entry', mechanics:'high'});
  const intel = run(intelTraits, {range:'long', style:'intel', mechanics:'high'});
  const support = run(supportTraits, {range:'mid', style:'support', mechanics:'low'});
  assert.equal(entry.primaryClass.id, 'assault');
  assert.equal(intel.primaryClass.id, 'recon');
  assert.equal(support.primaryClass.id, 'support');
  assert.notEqual(entry.operators[0].id, intel.operators[0].id);
  assert.notEqual(intel.operators[0].id, support.operators[0].id);
  assert.notDeepEqual(entry.weapons.map(w=>w.id), intel.weapons.map(w=>w.id));
  assert.ok(entry.weapons.every(w=>w.range.includes('close')));
  assert.ok(intel.weapons.every(w=>w.range.includes('long')));
  assert.ok(support.operators.every(op=>op.learningCost<=3));
  assert.ok(entry.playbook.some(text=>text.includes('撤离')));
});

test('手动选择兵种优先于性格排序，兵种内按练习投入筛选', () => {
  for (const role of deltaClasses) {
    const result = run(entryTraits, {role:role.id, mechanics:'medium'});
    assert.equal(result.primaryClass.id, role.id);
    assert.ok(result.operators.length>0);
    assert.ok(result.operators.every(op=>op.classId===role.id));
    assert.ok(result.operators.every(op=>op.learningCost<=4));
  }
  const demanding = run(entryTraits, {role:'assault', range:'close', style:'entry', mechanics:'high'});
  const moderate = run(entryTraits, {role:'assault', range:'close', style:'entry', mechanics:'medium'});
  assert.ok(demanding.primaryClass.candidates.some(op=>op.learningCost===5));
  assert.ok(moderate.primaryClass.candidates.every(op=>op.learningCost<=4));
});

test('低练习投入不静默推荐超出上手限制的干员', () => {
  const automatic = run(entryTraits, {range:'close', style:'entry', mechanics:'low'});
  // If the requested playstyle has no easy operator, explain the mismatch or offer an eligible direction.
  assert.ok(automatic.operators.every(op=>op.learningCost<=3)||automatic.notes.some(note=>/练习|上手/.test(note)&&/超出|没有|不足|较高|成本|限制/.test(note)),
    '自动推荐应满足低练习限制，或明确说明超出限制');
  const manual = run(entryTraits, {role:'assault', range:'close', style:'entry', mechanics:'low'});
  assert.equal(manual.primaryClass.id, 'assault');
  assert.ok(manual.operators.every(op=>op.learningCost<=3)||manual.notes.some(note=>/练习|上手/.test(note)&&/超出|没有|不足|较高|成本|限制/.test(note)),
    '手动选兵种而无低成本干员时，也必须解释取舍');
});

test('全面战场不按烽火预算排序，不展示其赛季梯度，并提示实际枪池待确认', () => {
  const economy = run(neutral, {mode:'warfare', budget:'economy'});
  const premium = run(neutral, {mode:'warfare', budget:'premium'});
  assert.deepEqual(weaponScores(economy), weaponScores(premium));
  assert.deepEqual(economy.operators.map(op=>op.id), premium.operators.map(op=>op.id));
  assert.ok(economy.weapons.every(w=>w.tierBonus===0&&w.sourceRecords.length===0&&w.rating===null));
  assert.ok(economy.notes.some(note=>note.includes('全面战场')&&note.includes('预算')));
  assert.ok(economy.notes.some(note=>/兵种/.test(note)&&/未核验|确认|解锁/.test(note)));
  const operations = run(neutral);
  assert.notDeepEqual(economy.playbook, operations.playbook);
});

test('MBTI 默认只备注：16 型都不改变任何兵种、干员或枪械的排序', () => {
  const baseline = run();
  for (const type of types) {
    const result = run(neutral, {mbtiUse:'note'}, type);
    assert.equal(result.mbtiEnabled, false);
    assert.equal(result.primaryClass.id, baseline.primaryClass.id);
    assert.deepEqual(operatorScores(result), operatorScores(baseline));
    assert.deepEqual(weaponScores(result), weaponScores(baseline));
  }
});

test('主动开启 MBTI 轻量参考最多 ±1.5 分，不改变模式资格与枪械推荐', () => {
  for (const mode of ['operations','warfare']) {
    const baseline = run(neutral, {mode, mechanics:'high'});
    const before = operatorScores(baseline);
    for (const type of types) {
      const result = run(neutral, {mode, mechanics:'high', mbtiUse:'light'}, type);
      assert.equal(result.mbtiEnabled, true);
      assert.deepEqual(weaponScores(result), weaponScores(baseline));
      assert.deepEqual(Object.keys(operatorScores(result)).sort(), Object.keys(before).sort());
      for (const role of result.classRanks) for (const operator of role.candidates) {
        assert.ok(operator.modes.includes(mode));
        assert.ok(Math.abs(operator.mbtiBonus)<=1.5);
        assert.ok(Math.abs(operator.score-before[operator.id])<=1.500001);
      }
    }
  }
  assert.equal(run(neutral, {mbtiUse:'light'}).mbtiEnabled, false);
  assert.equal(deltaMbtiBonus(neutral, 'XXXX', 'light'), 0);
});

test('S9、S10、S11 只使用对应档案，未知平台与特殊变体不套为基础枪强度', () => {
  for (const season of weaponSeasons) {
    for (const platform of ['pc','mobile']) {
      const result = run(neutral, {season:season.id, platform});
      assert.equal(result.season.id, season.id);
      for (const weapon of result.weapons) {
        assert.ok(weapon.sourceRecords.every(record=>record.seasonId===season.id&&record.mode==='operations'));
        assert.equal(weapon.tierBonus, 0, '未明确平台或配装时不能给强度加分');
      }
    }
  }
  assert.equal(run(neutral, {season:'latest-verified'}).season.id, weaponSeasons[0].id);
  const m7 = deltaWeapons.find(w=>w.id==='m7');
  const mk47 = deltaWeapons.find(w=>w.id==='mk47');
  assert.ok(weaponSourceRecordsFor(m7, 's10').some(r=>r.variant.includes('堤风')));
  assert.ok(weaponSourceRecordsFor(m7, 's10').some(r=>r.variant.includes('蓝管')));
  assert.ok(weaponSourceRecordsFor(mk47, 's10').some(r=>r.variant.includes('余烬')));
  assert.ok(weaponSourceRecordsFor(mk47, 's10').some(r=>r.variant.includes('普通')));
  for (const weapon of deltaWeapons) for (const season of weaponSeasons) for (const platform of ['pc','mobile']) {
    assert.equal(weaponRatingFor(weapon, season.id, 'warfare', platform), null);
    const unknown = weaponSourceRecordsFor(weapon, season.id).filter(r=>r.platform==='unspecified');
    if (unknown.length) assert.equal(weaponRatingFor(weapon, season.id, 'operations', platform), null);
  }
  const explicit = {seasonRatings:[{seasonId:'s10',mode:'operations',platform:'pc',tier:'S+',variant:'标准',verified:true}]};
  assert.equal(weaponRatingFor(explicit, 's10', 'operations', 'pc').tier, 'S+');
  assert.equal(weaponRatingFor(explicit, 's11', 'operations', 'pc'), null);
  assert.equal(weaponRatingFor(explicit, 's10', 'operations', 'mobile'), null);
  assert.equal(weaponRatingFor(explicit, 's10', 'warfare', 'pc'), null);
  const variants = {seasonRatings:[...explicit.seasonRatings,{...explicit.seasonRatings[0],tier:'S+天王',variant:'特殊枪管'}]};
  assert.equal(weaponRatingFor(variants, 's10', 'operations', 'pc'), null, '不能无条件择取最高变体');
});

test('全部 17 位以上干员与 15 把枪都有完整可读资料、有效模式和国内来源', () => {
  assert.ok(deltaOperators.length>=17);
  assert.ok(deltaWeapons.length>=15);
  assert.equal(new Set(deltaOperators.map(op=>op.id)).size, deltaOperators.length);
  assert.equal(new Set(deltaWeapons.map(w=>w.id)).size, deltaWeapons.length);
  const all = run(neutral, {mechanics:'high'}).classRanks.flatMap(role=>role.candidates);
  assert.equal(all.length, deltaOperators.length, '高练习投入下每位已收录干员都可参与比较');
  for (const operator of deltaOperators) {
    assert.ok(deltaClasses.some(role=>role.id===operator.classId));
    assert.ok(operator.tradeoff&&operator.skillSummary&&operator.drills.length>=2);
    assert.ok(domestic(operator.officialUrl)&&domestic(operator.learningUrl));
    assert.ok(Number.isInteger(operator.learningCost)&&operator.learningCost>=1&&operator.learningCost<=5);
    for (const mode of operator.modes) assert.ok(['operations','warfare'].includes(mode));
    for (const key of Object.keys(neutral)) assert.ok(Number.isFinite(operator.tags[key])&&operator.tags[key]>=0&&operator.tags[key]<=100);
  }
  for (const weapon of deltaWeapons) {
    assert.ok(weapon.tradeoff&&weapon.trial&&weapon.source?.title);
    assert.ok(domestic(weapon.learningUrl)&&domestic(weapon.source.url));
    assert.ok(weapon.range.length&&weapon.range.every(range=>['close','mid','long'].includes(range)));
    assert.ok(['economy','balanced','premium'].includes(weapon.budget));
    for (const record of weapon.seasonRatings) {
      assert.ok(weaponSeasons.some(season=>season.id===record.seasonId));
      assert.ok(record.scope&&record.variant&&record.sourceRatingLabel&&record.source?.date);
      assert.ok(domestic(record.source.url));
    }
  }
  assert.equal(new Set(['mp7','asval','m7','m14','mk47'].map(id=>deltaWeapons.find(w=>w.id===id))).size, 5);
});

test('两种模式、三个赛季、四兵种的导出报告都可读且保留来源与限制', () => {
  for (const mode of ['operations','warfare']) for (const season of weaponSeasons) for (const role of deltaClasses) {
    const result = run(neutral, {mode, season:season.id, role:role.id, mechanics:'high'}, 'INTJ');
    const markdown = deltaMarkdown(result);
    assert.doesNotMatch(markdown, /\bundefined\b|\bnull\b|\bNaN\b/);
    assert.match(markdown, /三角洲行动/);
    assert.match(markdown, /官方资料：https:\/\//);
    assert.match(markdown, /学习入口：https:\/\//);
    assert.match(markdown, /使用说明/);
    assert.match(markdown, /榜单资料/);
    assert.ok(markdown.includes(result.season.source.url));
    assert.ok(result.notes.every(note=>markdown.includes(note)));
    assert.ok(result.operators.every(op=>markdown.includes(op.name)));
    for (const operator of result.operators) {
      assert.ok(markdown.includes(`技能概述：${operator.skillSummary}`));
      assert.ok(operator.modeTips[mode]&&markdown.includes(operator.modeTips[mode]),
        `${mode} / ${operator.id} 的具体打法应与网页一致`);
    }
    assert.ok(result.weapons.every(weapon=>markdown.includes(weapon.name)));
    const conditionLines=markdown.split('\n').filter(line=>line.startsWith('烽火地带的配装取向：')||line.startsWith('ALWAYS聪聪的赛季资料：'));
    assert.equal(conditionLines.length, 2);
    assert.ok(conditionLines.every(line=>line.includes('全面战场不参与计算')===(mode==='warfare')));
    assert.doesNotMatch(markdown, /youtube\.com|youtu\.be|twitch\.tv/);
  }
});
