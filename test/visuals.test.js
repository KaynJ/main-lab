import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {games, questions} from '../web/model.js';
import {gameVisuals, questionVisuals} from '../web/visuals.js';
import {champions} from '../web/lol.js';
import {hextechHeroes} from '../web/hextech.js';

test('每款已收录游戏和每道题都有不同的本地配图及来源', async () => {
  assert.deepEqual(Object.keys(gameVisuals).sort(), games.map(game => game.id).sort());
  assert.equal(questionVisuals.length, questions.length);
  const pictures = [...Object.values(gameVisuals), ...questionVisuals];
  const hashes = new Set();
  for (const picture of pictures) {
    assert.match(picture.url, /^\.\/assets\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.jpg$/);
    assert.ok(picture.alt && picture.credit);
    assert.equal(new URL(picture.source).protocol, 'https:');
    const bytes = await readFile(new URL(`../web/${picture.url.slice(2)}`, import.meta.url));
    assert.ok(bytes.length > 1000, `缺失或不完整的配图：${picture.url}`);
    assert.equal(bytes.readUInt16BE(0), 0xffd8, `${picture.url} 不是 JPEG`);
    hashes.add(createHash('sha256').update(bytes).digest('hex'));
  }
  assert.equal(hashes.size, pictures.length, '各游戏与题目应使用不同的配图');
});

test('品牌头像已包含在本地资源中', async () => {
  const bytes = await readFile(new URL('../web/assets/brand-avatar.png', import.meta.url));
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
});

test('两种模式的所有英雄头像都能从本地资源解析', async () => {
  for (const id of new Set([...champions, ...hextechHeroes].map(hero => hero.id))) {
    const bytes = await readFile(new URL(`../web/assets/champions/${id}.png`, import.meta.url));
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${id} 不是 PNG`);
    assert.ok(bytes.readUInt32BE(16) >= 100 && bytes.readUInt32BE(20) >= 100, `${id} 头像过小`);
  }
});
