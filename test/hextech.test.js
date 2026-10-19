import test from 'node:test';
import assert from 'node:assert/strict';
import {hextechHeroes, hextechSources, recommendHextech, hextechMarkdown} from '../web/hextech.js';

const traits = {team: 50, risk: 50, pace: 50, support: 50, explore: 50, practice: 50};
const context = {experience: 'regular', mechanics: 'medium', goal: 'relax', party: 'solo', style: 'auto', range: 'any', time: 'medium', lane: 'auto', macro: 'medium'};

test('海克斯资料有至少八位英雄，每位提供两种有取舍的流派', () => {
  assert.ok(hextechHeroes.length >= 8);
  for (const hero of hextechHeroes) {
    assert.ok(hero.builds.length >= 2);
    assert.equal(new Set(hero.builds.map(build => build.id)).size, hero.builds.length);
    for (const build of hero.builds) {
      assert.ok(build.description && build.fallback && build.tradeoff);
      assert.ok(build.seek.length >= 2);
      assert.equal(build.source.kind, 'search');
    }
  }
});

test('乌迪尔同时有大招流与穿甲流，说明觉醒 R 与终极技能强化区别', () => {
  const result = recommendHextech(traits, context, 'Udyr');
  assert.equal(result.picks.length, 1);
  assert.equal(result.picks[0].id, 'Udyr');
  const builds = result.picks[0].builds;
  assert.ok(builds.some(build => build.name.includes('大招流')));
  assert.ok(builds.some(build => build.name.includes('穿甲流')));
  assert.match(builds.find(build => build.name.includes('大招流')).description, /玩家.*觉醒 R/);
  assert.match(builds.find(build => build.name.includes('大招流')).description, /没有常规终极技能/);
});

test('已随机英雄始终只推荐该英雄，不受操作或距离偏好过滤掉', () => {
  for (const hero of hextechHeroes) {
    const result = recommendHextech(traits, {...context, mechanics: 'low', range: hero.range === 'melee' ? 'ranged' : 'melee'}, hero.id);
    assert.deepEqual(result.picks.map(pick => pick.id), [hero.id]);
    assert.equal(result.picks[0].builds.length, hero.builds.length);
  }
});

test('非法随机英雄和不完整偏好不会静默回落到其他英雄', () => {
  assert.throws(() => recommendHextech(traits, context, 'not-a-champion'), /请选择资料库/);
  assert.throws(() => recommendHextech(traits, context, null), /请选择资料库/);
  assert.throws(() => recommendHextech({...traits, risk: 101}, context), /六维偏好/);
  assert.throws(() => recommendHextech({...traits, pace: NaN}, context), /六维偏好/);
  assert.throws(() => recommendHextech({}, context), /六维偏好/);
});

test('峡谷分路与小地图选项不影响海克斯结果，也不返回五位置模型', () => {
  const a = recommendHextech(traits, {...context, lane: 'top', macro: 'low'});
  const b = recommendHextech(traits, {...context, lane: 'support', macro: 'high'});
  assert.deepEqual(a, b);
  assert.ok(!('rankedLanes' in a));
  assert.ok(!('lane' in a.context));
  assert.ok(a.picks.every(hero => !('lane' in hero)));
});

test('保护偏好与冒险操作偏好产生不同英雄及乌迪尔流派顺序', () => {
  const protective = {team: 100, risk: 5, pace: 20, support: 100, explore: 30, practice: 20};
  const aggressive = {team: 25, risk: 95, pace: 90, support: 10, explore: 80, practice: 90};
  const a = recommendHextech(protective, {...context, style: 'protect', range: 'ranged'});
  const b = recommendHextech(aggressive, {...context, mechanics: 'high', style: 'duel', range: 'melee'});
  assert.notDeepEqual(a.picks.map(hero => hero.id), b.picks.map(hero => hero.id));
  assert.equal(a.picks[0].id, 'Soraka');
  assert.equal(recommendHextech(aggressive, {...context, style: 'duel'}, 'Udyr').picks[0].primaryBuild, 'udyr-physical-q');
  const research = {team: 65, risk: 75, pace: 40, support: 35, explore: 100, practice: 45};
  assert.equal(recommendHextech(research, {...context, style: 'poke'}, 'Udyr').picks[0].primaryBuild, 'udyr-awakened-r');
});

test('流派解释只认差值不超过 30 的明确偏好，相反偏好不会被说成接近或均衡', () => {
  const opposite = {team: 100, risk: 0, pace: 0, support: 100, explore: 0, practice: 0};
  for (const build of recommendHextech(opposite, context, 'Udyr').picks[0].builds) {
    assert.doesNotMatch(build.reason, /偏好与这条路线较接近|均衡/);
    assert.match(build.reason, /未找到足够接近的玩法标签/);
  }
  const rReason = team => recommendHextech({...traits, team}, context, 'Udyr').picks[0].builds.find(build => build.id === 'udyr-awakened-r').reason;
  assert.match(rReason(95), /「团队配合」偏好与这条路线较接近/); // Target team=65: distance 30.
  assert.match(rReason(96), /未找到足够接近的玩法标签/); // Distance 31 must not qualify.
  assert.match(rReason(50), /六维偏好没有明显方向/);
});

test('报告提醒随机强化、时间限制与来源；所有链接使用中国平台', () => {
  const result = recommendHextech(traits, {...context, time: 'short'}, 'Udyr');
  const markdown = hextechMarkdown(result);
  assert.match(markdown, /不保证当局出现/);
  assert.match(markdown, /不能保证按时结束/);
  assert.match(markdown, /搜索入口，非固定视频/);
  const urls = [...JSON.stringify({hextechHeroes, hextechSources}).matchAll(/https:\/\/[^"\s]+/g)].map(match => match[0]);
  assert.ok(urls.length > 20);
  for (const url of urls) assert.match(new URL(url).hostname, /(^|\.)(qq\.com|bilibili\.com)$/);
});
