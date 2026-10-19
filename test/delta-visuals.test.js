import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, realpath, stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {basename, relative, isAbsolute} from 'node:path';
import {dimensions, questions} from '../web/model.js';
import {deltaQuestions} from '../web/delta.js';
import {deltaOperators} from '../web/delta-operators.js';
import {deltaGameVisual, deltaQuestionVisuals, deltaPortraits} from '../web/delta-visuals.js';

const assetRoot = new URL('../web/assets/delta/', import.meta.url);

async function localImage(url) {
  // Public data must reference one local file, with no traversal, URL escapes or external hosts.
  assert.match(url, /^\.\/assets\/delta\/[a-z0-9-]+\.(jpg|png)$/, `不允许的素材路径：${url}`);
  const resolved = new URL(`../web/${url.slice(2)}`, import.meta.url);
  const rootPath = await realpath(fileURLToPath(assetRoot));
  const filePath = await realpath(fileURLToPath(resolved));
  const inside = relative(rootPath, filePath);
  assert.ok(inside && !inside.startsWith('..') && !isAbsolute(inside), `素材越过目录边界：${url}`);
  assert.ok((await stat(filePath)).isFile(), `素材不是普通文件：${url}`);
  const bytes = await readFile(filePath);
  assert.ok(bytes.length > 1000, `素材为空或不完整：${url}`);
  if (url.endsWith('.png')) {
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `不是 PNG：${url}`);
    assert.equal(bytes.subarray(12, 16).toString('ascii'), 'IHDR', `缺少 PNG 图像头：${url}`);
    assert.ok(bytes.readUInt32BE(16) >= 100 && bytes.readUInt32BE(20) >= 100, `PNG 尺寸过小：${url}`);
  } else {
    assert.equal(bytes.subarray(0, 3).toString('hex'), 'ffd8ff', `不是 JPEG：${url}`);
    assert.equal(bytes.subarray(-2).toString('hex'), 'ffd9', `JPEG 缺少结束标记：${url}`);
  }
  return bytes;
}

function officialSource(picture) {
  assert.ok(picture.alt?.trim() && picture.credit?.trim(), `素材缺少说明或署名：${picture.url}`);
  const page = new URL(picture.source);
  assert.equal(page.protocol, 'https:');
  assert.equal(page.hostname, 'df.qq.com');
  const original = new URL(picture.original);
  assert.equal(original.protocol, 'https:');
  assert.equal(original.hostname, 'game.gtimg.cn');
  assert.match(original.pathname, /^\/images\/dfm\/cp\/a20240906main\/[a-z0-9_-]+\.jpg$/);
}

test('三角洲问卷与共享评分维度和反向题逐项对应，配图不会导致计分错位', () => {
  assert.equal(deltaQuestions.length, questions.length);
  assert.deepEqual(deltaQuestions.map(([dimension, , reverse]) => [dimension, Boolean(reverse)]), questions.map(([dimension, , reverse]) => [dimension, Boolean(reverse)]));
  assert.equal(new Set(deltaQuestions.map(question => question[1])).size, deltaQuestions.length, '问题文本不应重复');
  for (const [key] of dimensions) {
    assert.equal(deltaQuestions.filter(question => question[0] === key).length, 2, `${key} 应保留两道题`);
  }
});

test('三角洲12道题各有不同本地图片、情境说明和可追溯官方来源', async () => {
  assert.equal(deltaQuestionVisuals.length, deltaQuestions.length);
  assert.equal(deltaQuestionVisuals.length, 12);
  const hashes = new Set();
  for (const picture of deltaQuestionVisuals) {
    officialSource(picture);
    assert.ok(picture.caption?.trim(), `题目图片缺少情境说明：${picture.url}`);
    hashes.add(createHash('sha256').update(await localImage(picture.url)).digest('hex'));
  }
  assert.equal(hashes.size, deltaQuestions.length, '12道题应使用不同图像，而不只是不同文件名');
});

test('三角洲首页背景为独立本地图片并记录官方来源', async () => {
  officialSource(deltaGameVisual);
  assert.ok(deltaGameVisual.name?.trim());
  const background = createHash('sha256').update(await localImage(deltaGameVisual.url)).digest('hex');
  for (const picture of deltaQuestionVisuals) {
    assert.notEqual(background, createHash('sha256').update(await localImage(picture.url)).digest('hex'), '首页背景应与问卷图片不同');
  }
});

test('17位干员都有对应本地图片，肖像集合与干员数据一致并有来源记录', async () => {
  assert.equal(deltaOperators.length, 17);
  assert.deepEqual(Object.keys(deltaPortraits).sort(), deltaOperators.map(operator => operator.id).sort());
  const sources = await readFile(new URL('../docs/delta-visual-sources.md', import.meta.url), 'utf8');
  const hashes = new Set();
  for (const operator of deltaOperators) {
    const url = deltaPortraits[operator.id];
    const bytes = await localImage(url);
    hashes.add(createHash('sha256').update(bytes).digest('hex'));
    assert.ok(sources.includes(basename(url)), `来源表缺少 ${operator.name} 的本地文件`);
    assert.ok(sources.includes(`| ${operator.name} |`), `来源表缺少 ${operator.name} 的身份对应`);
  }
  assert.equal(hashes.size, deltaOperators.length, '干员卡面应逐人对应，不得复用占位图');
  const portraitSources = [...sources.matchAll(/\]\((https:\/\/game\.gtimg\.cn\/images\/dfm\/cp\/a20240906main\/p4_m\d+\.(?:png|jpg))\)/g)].map(match => match[1]);
  assert.equal(new Set(portraitSources).size, deltaOperators.length, '每个干员都应记录官方原图来源');
});
