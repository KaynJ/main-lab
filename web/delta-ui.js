import {deltaClasses, deltaOperatorSources} from './delta-operators.js';
import {weaponSeasons, weaponScopeNote} from './delta-weapons.js';
import {deltaPortraits} from './delta-visuals.js';

const modeNames = {operations: '烽火地带', warfare: '全面战场'};
const platformNames = {pc: 'PC 端', mobile: '移动端', unspecified: '平台未注明'};
const rangeNames = {close: '近距离', mid: '中距离', long: '远距离', any: '距离灵活'};
const handlingNames = {low: '直观上手', easy: '直观上手', medium: '需要一些控枪练习', high: '需要较多控枪练习'};
const budgetNames = {economy: '经济耐用路线', balanced: '均衡配装路线', premium: '较高配装投入'};
const styleNames = {entry: '主动突破', intel: '侦察信息', anchor: '阵地工程', support: '救援支援', flank: '侧翼绕后'};
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
};
const append = (parent, ...children) => { for (const child of children.flat(Infinity)) if (child) parent.append(child); return parent; };
const list = (items, className = 'delta-list') => append(el('ul', className), (items || []).map(item => el('li', '', item)));
const chips = items => append(el('div', 'delta-tags'), items.filter(Boolean).map(item => el('span', 'delta-tag', item)));
const paragraph = (text, className = 'delta-copy') => el('p', className, text);
function externalLink(label, url) {
  const anchor = el('a', 'delta-link', label);
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !/(^|\.)(bilibili\.com|douyin\.com|qq\.com|taptap\.cn)$/.test(parsed.hostname)) return el('span', 'delta-copy', '来源入口暂不可用');
    anchor.href = parsed.href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    return anchor;
  } catch { return el('span', 'delta-copy', '来源入口暂不可用'); }
}
function button(text, active, onClick) {
  const node = el('button', `delta-switch${active ? ' delta-active' : ''}`, text);
  node.type = 'button';
  node.setAttribute('aria-pressed', String(active));
  if (onClick) node.addEventListener('click', onClick);
  else node.disabled = true;
  return node;
}
function section(number, title, intro) {
  const node = el('section', 'delta-section');
  append(node, el('p', 'delta-label', number), el('h4', 'delta-section-title', title));
  if (intro) node.append(paragraph(intro));
  return node;
}
function details(title, ...content) {
  return append(el('details', 'delta-details'), el('summary', 'delta-summary', title), content);
}
function roleButton(role, result, callbacks) {
  const current = role.id === result.primaryClass.id;
  const node = button('', current, callbacks.onRoleChange ? () => callbacks.onRoleChange(role.id) : null);
  node.classList.add('delta-role');
  node.dataset.role = role.id;
  node.setAttribute('aria-label', `${role.name} · ${current ? '当前试玩方向' : '切换对照'}`);
  append(node, el('small', 'delta-role-en', role.en), el('strong', 'delta-role-name', role.name), el('span', 'delta-role-headline', role.headline), el('span', 'delta-role-action', current ? '当前试玩方向' : '切换对照 ↗'));
  return node;
}
function renderOperator(operator, index, result) {
  const card = el('article', 'delta-operator-card');
  const head = el('div', 'delta-operator-head');
  const portrait = deltaPortraits[operator.id];
  const portraitUrl = typeof portrait === 'string' ? portrait : portrait?.url;
  if (portraitUrl) {
    const img = el('img', 'delta-portrait');
    img.src = portraitUrl;
    img.alt = `${operator.name} · 三角洲行动官方干员形象`;
    img.loading = 'lazy';
    img.width = 454;
    img.height = 262;
    head.append(img);
  }
  const identity = el('div', 'delta-identity');
  append(identity, el('span', 'delta-card-kicker', index === 0 ? '先试这一位' : '换一种体验'), el('h5', 'delta-card-title', operator.name), el('p', 'delta-full-name', operator.fullName || ''));
  append(head, identity);
  append(card, head, chips([rangeNames[operator.range], styleNames[operator.style], `学习投入 ${operator.learningCost} / 5`]), paragraph(operator.skillSummary), list(operator.reasons || []));
  if (operator.modeTips?.[result.context.mode]) {
    append(card, el('h6', 'delta-small-title', `${modeNames[result.context.mode]}打法`), paragraph(operator.modeTips[result.context.mode]));
  }
  append(card, paragraph(`取舍：${operator.tradeoff}`, 'delta-tradeoff'));
  const skillTags = chips(operator.skills || []);
  append(card, details('查看技能与入门练习', el('h6', 'delta-small-title', '官方技能名称'), skillTags, el('h6', 'delta-small-title', '先练这两件事'), list(operator.drills || [])));
  const links = el('div', 'delta-links');
  append(links, externalLink('官方干员资料 ↗', operator.officialUrl), externalLink('B站教学检索 ↗', operator.learningUrl));
  return append(card, links);
}
function recordScope(record, result) {
  const platform = platformNames[record.platform] || '平台未注明';
  const applicable = record.mode === result.context.mode && record.platform === result.context.platform;
  const scope = [modeNames[record.mode] || '模式未注明', platform];
  if (record.variant) scope.push(record.variant);
  return {applicable, label: scope.join(' · ')};
}
function renderSourceRecord(record, result) {
  const box = el('div', 'delta-source-record');
  const scope = recordScope(record, result);
  const source = record.source || {};
  append(box,
    el('p', 'delta-source-kicker', scope.applicable ? '作者原条件观点' : '作者原条件观点 · 不作为本端适用梯度'),
    paragraph(record.sourceRatingLabel || record.tier || '未逐枪核验梯度', 'delta-source-opinion'),
    paragraph(`${result.season.label} · 视频 ${record.date || source.date || '日期未注明'}`, 'delta-source-meta'),
    paragraph(scope.label, 'delta-source-meta'),
  );
  if (record.notes) box.append(paragraph(record.notes, 'delta-source-meta'));
  if (source.url) box.append(externalLink(`${source.author || 'ALWAYS聪聪'} · 原视频 ↗`, source.url));
  return box;
}
function renderWeapon(weapon, index, result) {
  const card = el('article', 'delta-weapon-card');
  append(card, el('span', 'delta-card-kicker', `手感候选 ${String(index + 1).padStart(2, '0')}`), el('h5', 'delta-card-title', weapon.name), chips([weapon.type, ...(weapon.range || []).map(range => rangeNames[range]), handlingNames[weapon.handling], result.context.mode === 'operations' ? budgetNames[weapon.budget] : null]));
  append(card, list(weapon.reasons || []), paragraph(`取舍：${weapon.tradeoff}`, 'delta-tradeoff'), el('h6', 'delta-small-title', '靶场怎么试'), paragraph(weapon.trial));
  const records = weapon.sourceRecords || [];
  const sources = el('div', 'delta-weapon-sources');
  if (records.length) {
    append(sources, records.map(record => renderSourceRecord(record, result)));
  } else {
    sources.append(paragraph(result.context.mode === 'warfare' ? '没有收录可用于全面战场的对应逐枪梯度；此处只比较手感方向。' : `${result.season.label} 暂未收录这把枪的逐枪评价，不借用其他赛季补齐。`, 'delta-source-empty'));
  }
  append(card, sources);
  if (weapon.learningUrl) {
    const kind = /search\.bilibili\.com/.test(weapon.learningUrl) ? 'B站学习检索 ↗' : 'B站相关解析 / 榜单 ↗';
    append(card, append(el('div', 'delta-links'), externalLink(kind, weapon.learningUrl)));
  }
  return card;
}

/** Return a self-contained report node. Parent owns form state and rerendering. */
export function renderDeltaReport(result, callbacks = {}) {
  const report = el('div', 'delta-report');
  report.dataset.mode = result.context.mode;
  const header = el('div', 'delta-report-header');
  append(header, el('p', 'delta-label', 'DELTA FORCE / 你的行动档案'), el('h3', 'delta-report-title', '先找到你喜欢的作战方式'), paragraph('从兵种、干员到枪械，做一组可以实际试玩的选择。'));
  const toolbar = el('div', 'delta-toolbar');
  const modeControl = el('div', 'delta-mode-switch');
  modeControl.setAttribute('role', 'group');
  modeControl.setAttribute('aria-label', '三角洲推荐模式');
  for (const [mode, name] of Object.entries(modeNames)) {
    const node = button(name, result.context.mode === mode, callbacks.onModeChange ? () => callbacks.onModeChange(mode) : null);
    node.dataset.mode = mode;
    modeControl.append(node);
  }
  const seasonControl = el('div', 'delta-season-control');
  const seasonLabel = el('label', 'delta-season-label', 'ALWAYS聪聪 · 赛季资料');
  const seasonSelect = el('select', 'delta-season-select');
  seasonSelect.id = 'delta-report-season';
  seasonLabel.htmlFor = seasonSelect.id;
  for (const [id, label] of [['latest-verified', '最近已收录资料'], ...weaponSeasons.map(season => [season.id, season.label])]) {
    const option = el('option', '', label);
    option.value = id;
    seasonSelect.append(option);
  }
  seasonSelect.value = result.context.season;
  if (callbacks.onSeasonChange) seasonSelect.addEventListener('change', () => callbacks.onSeasonChange(seasonSelect.value));
  else seasonSelect.disabled = true;
  append(seasonControl, seasonLabel, seasonSelect);
  append(toolbar, modeControl, seasonControl);
  append(report, header, toolbar, chips([modeNames[result.context.mode], platformNames[result.context.platform], result.context.range === 'any' ? '距离不限，先比较手感' : rangeNames[result.context.range]]));

  const roles = section('01 / 兵种比较', '优先试玩，再做对照', '四个方向都可以练。切换兵种会重新给出干员和打法，方便比较贡献方式。');
  const choices = el('div', 'delta-role-grid');
  append(choices, result.classRanks.map(role => roleButton(role, result, callbacks)));
  const highlight = el('div', 'delta-role-highlight');
  append(highlight, el('small', 'delta-card-kicker', '这次的试玩方向'), el('h5', 'delta-highlight-title', result.primaryClass.name), paragraph(result.primaryClass.headline), list(result.primaryClass.strengths || []), paragraph(`需要接受的取舍：${result.primaryClass.tradeoff}`, 'delta-tradeoff'));
  append(roles, choices, highlight);
  const tactics = el('ol', 'delta-playbook');
  append(tactics, (result.playbook || []).map(text => el('li', '', text)));
  append(roles, el('h5', 'delta-subtitle', `${modeNames[result.context.mode]} · 你的行动顺序`), tactics);
  report.append(roles);

  const operators = section('02 / 干员候选', '从这几位开始认识技能', '候选顺序来自玩法偏好与本局条件。学习投入是编辑建议，可通过试玩修正。');
  append(operators, append(el('div', 'delta-operator-grid'), (result.operators || []).map((operator, index) => renderOperator(operator, index, result))));
  report.append(operators);

  const weapons = section('03 / 枪械与赛季资料', '先试手感，再看配装条件', '以下是偏好候选顺序，不是枪械强度榜。距离、操控和投入优先；榜单观点保留原赛季与变体。');
  const scope = el('div', 'delta-scope');
  append(scope, paragraph(result.context.mode === 'warfare' ? '全面战场：先在客户端确认当前兵种可用枪池与解锁条件。这里尚未核验该清单，具体枪械只是手感方向候选；不套用烽火地带的梯度与市场预算。' : '烽火地带：配装投入是相对取向，不是实时价格。原视频未注明 PC / 手游的观点保留展示，但不会标成本端适用梯度，也不参与强度加分。'));
  const season = result.season;
  append(scope, paragraph(`已选资料 ${season.label} · 视频 ${season.date || '日期未注明'} · 本站收录核对 ${season.reviewed || result.reviewed}`, 'delta-source-meta'));
  if (season.source?.url) scope.append(externalLink(`ALWAYS聪聪 · ${season.source.title || '赛季榜单原视频'} ↗`, season.source.url));
  append(weapons, scope, append(el('div', 'delta-weapon-grid'), (result.weapons || []).map((weapon, index) => renderWeapon(weapon, index, result))));
  report.append(weapons);

  const trial = section('04 / 三次试玩', '用体验确认你的本命', '每次只改一个条件，记下喜欢与不喜欢的部分，下一次再调整。');
  const first = result.operators?.[0];
  const firstWeapon = result.weapons?.[0];
  const trialSteps = [
    ['第一次 · 熟悉手感', `先在靶场认识${first?.name || '推荐干员'}的技能和${firstWeapon?.name || '候选枪械'}的弹着。${first?.drills?.[0] || '比较开镜、移动和停稳后的射击。'}`],
    [result.context.mode === 'operations' ? '第二次 · 控制入场成本' : '第二次 · 围绕目标练职责', result.context.mode === 'operations' ? '选熟悉路线，带可承受损失的装备，只练一个职责。观察自己是否享受这种交战距离与队伍分工，保留撤离计划。' : '选一个明确职责跟队争点，重点观察推进、信息或救援是否顺手。先确认所选兵种能装备候选枪械。'],
    ['第三次 · 换一个对照', `切换到另一兵种，或把${first?.name || '当前干员'}换成第二候选；枪械和路线尽量保持相近。比较“想不想再玩一局”，再决定长期练谁。`],
  ];
  const trialGrid = el('div', 'delta-trial-grid');
  append(trialGrid, trialSteps.map(([title, text], index) => append(el('article', 'delta-trial-card'), el('span', 'delta-trial-number', `0${index + 1}`), el('h5', 'delta-trial-title', title), paragraph(text))));
  append(trial, trialGrid, paragraph('可以记三项：是否享受这个职责、常见交火距离是否舒服、愿不愿意继续练技能。实际体验与推荐不一致时，以你的体验为准。', 'delta-reflection'));
  report.append(trial);

  const methodContent = [paragraph(result.mbtiSummary), paragraph(result.method), paragraph(weaponScopeNote)];
  if (result.notes?.length) methodContent.push(list(result.notes));
  const methodLinks = el('div', 'delta-links');
  append(methodLinks, deltaOperatorSources.map(source => externalLink(`${source.title} ↗`, source.url)));
  append(report, details(`推荐方法与资料边界 · ${result.reviewed}`, methodContent, methodLinks));
  return report;
}

export const deltaUiLabels = {modeNames, platformNames, rangeNames};
