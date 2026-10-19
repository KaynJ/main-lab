const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
};

/** Render editorial preference prose. Scoring and wording are supplied by the caller. */
export function renderPreferenceAnalysis(analysis = {}) {
  const section = element('section', 'preference-analysis');
  section.setAttribute('aria-labelledby', 'preference-analysis-title');

  const header = element('header', 'preference-analysis-header');
  if (analysis.kicker) header.append(element('p', 'preference-analysis-kicker', analysis.kicker));
  const title = element('h3', 'preference-analysis-title', analysis.title || '从回答里，看见你的偏好');
  title.id = 'preference-analysis-title';
  header.append(title);
  section.append(header);

  const body = element('div', 'preference-analysis-body');
  if (analysis.lead) body.append(element('p', 'preference-analysis-lead', analysis.lead));
  for (const paragraph of Array.isArray(analysis.paragraphs) ? analysis.paragraphs : []) {
    if (typeof paragraph === 'string' && paragraph.trim()) {
      body.append(element('p', 'preference-analysis-paragraph', paragraph));
    }
  }
  section.append(body);

  const evidence = (Array.isArray(analysis.evidence) ? analysis.evidence : []).filter(item => item && typeof item.question === 'string' && typeof item.answer === 'string' && item.question.trim() && item.answer.trim());
  if (evidence.length) {
    const details = element('details', 'preference-analysis-evidence');
    details.append(element('summary', 'preference-analysis-summary', '看看哪些回答形成了这些线索'));
    const list = element('ol', 'preference-analysis-evidence-list');
    for (const item of evidence) {
      const row = element('li', 'preference-analysis-evidence-item');
      row.append(
        element('p', 'preference-analysis-question', item.question),
        element('p', 'preference-analysis-answer', `你的回答：${item.answer}`)
      );
      list.append(row);
    }
    details.append(list);
    section.append(details);
  }

  if (analysis.note) section.append(element('p', 'preference-analysis-note', analysis.note));
  return section;
}
