// Every editorial and interface label is paired. The language control changes order.
copy.zh.eyebrow = '研究 · 创作 · 探索';
copy.en.eyebrow = 'RESEARCH · CREATE · EXPLORE';
copy.zh.hero = ['理解人。', '把想法做出来。'];
copy.en.hero = ['Understand people.', 'Make ideas tangible.'];
copy.zh.workLabel = '精选作品';
copy.en.workLabel = 'SELECTED WORK';
copy.zh.aboutLabel = '关于我';
copy.en.aboutLabel = 'ABOUT RIVER';
copy.zh.collaborationLabel = '合作方向';
copy.en.collaborationLabel = 'COLLABORATION';
copy.zh.caseLabel = '项目记录';
copy.en.caseLabel = 'PROJECT NOTES';
copy.zh.categories = ['研究', '内容', '互动'];
copy.zh.primaryMail = '合作与交流';
copy.en.primaryMail = 'COLLABORATION';
copy.zh.secondaryMail = '备用联系';
copy.en.secondaryMail = 'ALTERNATIVE CONTACT';
copy.en.projects[0].short = 'Exploratory research on Delta Force escort and companion services';

const categoryKeys = ['all', 'research', 'content', 'interactive'];
let language = 'zh';
try { if (localStorage.getItem('river-language-order') === 'en') language = 'en'; } catch {}
let selectedFilter = 'all';
let lastCaseButton;
const arrow = '<span aria-hidden="true" class="arrow">↗</span>';
const escapeText = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lines = (value) => escapeText(value).replace(/\n/g, '<br>');
const both = (zh, en) => `${zh} / ${en}`;
function bi(zh, en, className = '') {
  if (typeof zh !== 'string' || typeof en !== 'string') throw new Error('Missing bilingual content');
  const values = language === 'zh' ? [[zh,'zh-CN'],[en,'en']] : [[en,'en'],[zh,'zh-CN']];
  return `<span class="dual ${className}" data-bilingual>${values.map(([text,lang],i)=>`<span class="${i===0?'primary-text':'secondary-text'}" lang="${lang}">${lines(text)}</span>`).join('')}</span>`;
}
const mailSubject = '项目合作 / Collaboration — River’s Lab';
const mailBody = '你好 River / Hi River,\n\n项目或机会 / Project or opportunity:\n希望解决的问题 / The problem to solve:\n已有材料 / Available materials:\n大致时间 / Rough timeline:\n\n';
const mailHref = (email, project = '') => `mailto:${email}?subject=${encodeURIComponent(project ? `${project} — ${mailSubject}` : mailSubject)}&body=${encodeURIComponent(mailBody)}`;

function projectCard(index) {
  const z = copy.zh.projects[index], e = copy.en.projects[index];
  const visual = z.image
    ? `<div class="project-visual image-visual ${z.id}"><img src="${z.image}" alt="${escapeText(both(z.imageAlt,e.imageAlt))}" loading="lazy" width="1265" height="712"><span class="image-caption">${bi(z.type==='content'?'作品画面':'原项目界面',z.type==='content'?'Frame from the project':'Original project interface')}</span></div>`
    : `<div class="project-visual research-visual"><span class="research-kicker">${bi('玩家体验 / 研究笔记','PLAYER EXPERIENCE / FIELD NOTES')}</span><div class="research-question">${bi(z.question,e.question)}</div><div class="research-flow">${z.diagram.map((step,i)=>`<div><span class="flow-dot">0${i+1}</span>${bi(step,e.diagram[i])}</div>`).join('')}</div><span class="research-orbit" aria-hidden="true"></span></div>`;
  const metrics=z.metrics?`<div class="project-metrics">${z.metrics.map(([value,label],i)=>`<div><span class="metric-value">${value}</span>${bi(label,e.metrics[i][1])}</div>`).join('')}</div>`:'';
  return `<article class="project project-${z.id}" data-category="${z.type}"><div class="project-heading"><span class="project-number">0${index+1}</span>${bi(copy.zh.filters[categoryKeys.indexOf(z.type)],copy.en.filters[categoryKeys.indexOf(z.type)])}</div><button class="visual-button" type="button" data-project="${z.id}" aria-label="${escapeText(both('查看项目：'+z.short,'Project notes: '+e.short))}">${visual}<span class="visual-arrow" aria-hidden="true">↗</span></button><div class="project-copy"><div><div class="project-label">${bi(z.label,e.label)}</div><h3>${bi(z.title,e.title)}</h3><p class="project-description">${bi(z.description,e.description)}</p><div class="tags">${z.tags.map((tag,i)=>bi(tag,e.tags[i])).join('')}</div>${metrics}</div><button type="button" class="text-link" data-project="${z.id}">${bi(copy.zh.detail,copy.en.detail)}${arrow}</button></div></article>`;
}

function backgroundSection() {
  const records=(items)=>items.map(({zh:z,en:e})=>`<article class="background-record"><div class="record-date">${bi(z.date,e.date)}</div><h4>${bi(z.name,e.name)}</h4><div class="record-role">${bi(z.role,e.role)}</div><p>${bi(z.description,e.description)}</p></article>`).join('');
  return `<section class="background-section container section" id="background" aria-labelledby="background-title"><div class="section-top"><div class="section-label"><span class="section-number">03</span>${bi('教育与经历','EDUCATION & EXPERIENCE')}</div><div><h2 id="background-title">${bi('这些经历，构成了我的视角。','The experience behind my perspective.')}</h2><p class="section-intro">${bi('从经济与商业研究，到心理学与用户洞察。','From economics and business research to psychology and user insights.')}</p></div></div><div class="background-columns"><div class="background-column"><h3>${bi('教育背景','EDUCATION')}</h3>${records(professionalProfile.education)}</div><div class="background-column"><h3>${bi('工作与实习','WORK & INTERNSHIPS')}</h3>${records(professionalProfile.experience)}</div></div><div class="training-note"><h3>${bi('研究实践','RESEARCH PRACTICE')}</h3><p>${bi(professionalProfile.researchTraining.zh,professionalProfile.researchTraining.en)}</p></div></section>`;
}

function render() {
  render.events?.abort();
  render.events = new AbortController();
  const z=copy.zh, e=copy.en;
  document.documentElement.lang = language==='zh'?'zh-CN':'en';
  document.documentElement.dataset.order = language;
  document.title = 'River’s Lab · 个人主页 / Personal Portfolio';
  document.getElementById('app').innerHTML = `
    <header class="site-header"><div class="container header-inner"><a class="brand" href="#" aria-label="River’s Lab · 主页 / Home"><span class="brand-mark" aria-hidden="true">r.</span><span class="brand-name">River’s Lab${bi('个人主页','Personal portfolio','brand-caption')}</span></a><button class="menu-toggle" type="button" aria-label="打开或关闭导航 / Open or close navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button><nav class="site-nav" id="site-nav" aria-label="主导航 / Main navigation">${z.nav.map((label,i)=>`<a href="#${['work','about','contact'][i]}">${bi(label,e.nav[i])}</a>`).join('')}</nav><button class="language-button" type="button" aria-label="${language==='zh'?'切换为英文优先 / Put English first':'切换为中文优先 / Put Chinese first'}"><span class="${language==='zh'?'active':''}" lang="zh-CN">中</span><span class="language-divider" aria-hidden="true">/</span><span class="${language==='en'?'active':''}" lang="en">EN</span></button></div></header>
    <main id="main">
      <section class="hero container" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${bi(z.eyebrow,e.eyebrow)}</p><h1 id="hero-title">${bi(z.hero.join('\n'),e.hero.join('\n'))}</h1><p class="hero-intro">${bi(z.intro,e.intro)}</p><div class="hero-actions"><a class="button primary" href="#work">${bi(z.view,e.view)}<span class="arrow" aria-hidden="true">↓</span></a><a class="button quiet" href="#contact">${bi(z.talk,e.talk)}${arrow}</a></div><div class="hero-location">${bi('立足中国，关注跨文化表达','BASED IN CHINA · WORKING ACROSS CULTURES')}</div></div><aside class="hero-note" aria-labelledby="note-title"><div class="note-heading"><span class="small-index">01—04</span>${bi(z.note,e.note)}</div><h2 id="note-title">${bi(z.noteTitle.replace('\n',''),e.noteTitle.replace('\n',' '))}</h2><ol class="note-steps">${z.steps.map((s,i)=>`<li><span class="step-number">0${i+1}</span>${bi(s,e.steps[i])}<span class="step-mark" aria-hidden="true">${i===3?'↗':'+'}</span></li>`).join('')}</ol><p class="note-foot">${bi(z.noteFoot,e.noteFoot)}</p></aside></section>
      <div class="interest-strip container">${z.interests.map((interest,i)=>`<span class="interest-item"><span class="tiny-cross" aria-hidden="true">+</span>${bi(interest,e.interests[i])}</span>`).join('')}<span class="strip-note">${bi('持续探索，保持实践','ALWAYS EXPLORING. ALWAYS MAKING.')}</span></div>
      <section class="work-section container section" id="work" aria-labelledby="work-title"><div class="section-top"><div class="section-label"><span class="section-number">01</span>${bi(z.workLabel,e.workLabel)}</div><div><h2 id="work-title">${bi(z.workTitle,e.workTitle)}</h2><p class="section-intro">${bi(z.workIntro,e.workIntro)}</p></div></div><div class="filters" role="group" aria-label="筛选作品 / Filter projects">${z.filters.map((label,i)=>`<button type="button" data-filter="${categoryKeys[i]}" aria-pressed="${selectedFilter===categoryKeys[i]}">${bi(label,e.filters[i])}<span class="filter-count">0${i===0?z.projects.length:z.projects.filter(p=>p.type===categoryKeys[i]).length}</span></button>`).join('')}</div><div class="projects">${z.projects.map((_,i)=>projectCard(i)).join('')}</div></section>
      <section class="about-section" id="about" aria-labelledby="about-title"><div class="container about-grid"><div><div class="section-label"><span class="section-number">02</span>${bi(z.aboutLabel,e.aboutLabel)}</div><div class="identity-note"><span class="river-monogram" aria-hidden="true">R.</span>${bi('保持好奇','CURIOUS BY NATURE.')}<span class="identity-rule" aria-hidden="true"></span>${bi('研究 / 创作 / 实践','RESEARCH / CREATE / MAKE')}</div></div><div class="about-copy"><h2 id="about-title">${bi(z.aboutTitle.replace('\n',''),e.aboutTitle.replace('\n',' '))}</h2>${z.aboutText.map((p,i)=>`<p>${bi(p,e.aboutText[i])}</p>`).join('')}<div class="facts">${z.facts.map(([label,value],i)=>`<div><div class="fact-label">${bi(label,e.facts[i][0])}</div><strong>${bi(value,e.facts[i][1])}</strong></div>`).join('')}</div><p class="about-aside">${bi(z.aboutAside,e.aboutAside)}</p></div></div></section>
      <section class="services-section container section" id="collaborate" aria-labelledby="services-title"><div class="section-top"><div class="section-label"><span class="section-number">03</span>${bi(z.collaborationLabel,e.collaborationLabel)}</div><h2 id="services-title">${bi(z.collaborationTitle.replace('\n',''),e.collaborationTitle.replace('\n',' '))}</h2></div><div class="service-list">${z.services.map(([n,title,desc,output],i)=>`<div class="service-row"><span class="service-number">${n}</span><h3>${bi(title,e.services[i][1])}</h3><div><p>${bi(desc,e.services[i][2])}</p><div class="service-output">${bi(output,e.services[i][3])}</div></div></div>`).join('')}</div></section>
      <section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="container contact-grid"><div class="contact-heading"><p class="eyebrow">${bi(z.contactLabel,e.contactLabel)}</p><h2 id="contact-title">${bi(z.contactTitle,e.contactTitle)}</h2><p class="contact-intro">${bi(z.contactText,e.contactText)}</p></div><div class="email-list">${[['kaynyang98@gmail.com',z.primaryMail,e.primaryMail,'GMAIL'],['804454718@qq.com',z.secondaryMail,e.secondaryMail,'QQ MAIL']].map(([email,zh,en,provider])=>`<div class="email-card"><div class="email-meta"><span class="email-provider">${provider}</span>${bi(zh,en)}</div><a class="email-address" href="${mailHref(email)}">${email}</a><div class="email-actions"><a href="${mailHref(email)}">${bi(z.send,e.send)}${arrow}</a><button type="button" data-copy="${email}">${bi(z.copy,e.copy)}<span aria-hidden="true">⧉</span></button></div></div>`).join('')}</div></div></section>
    </main><footer class="site-footer container"><a href="#" class="footer-brand">River’s Lab<span aria-hidden="true">↗</span></a><p>${bi(z.footer,e.footer)}</p><div class="copyright"><span>© ${new Date().getFullYear()} River</span>${bi(z.copyright,e.copyright)}</div></footer><dialog id="project-dialog" aria-labelledby="dialog-title"><div id="dialog-content"></div></dialog><div class="toast" role="status" aria-live="polite"></div>`;
  document.querySelector('#collaborate').insertAdjacentHTML('beforebegin',backgroundSection());
  const backgroundLink=document.createElement('a');
  backgroundLink.href='#background';
  backgroundLink.innerHTML=bi('经历','Background');
  document.querySelector('.site-nav a[href="#contact"]').before(backgroundLink);
  document.querySelector('#collaborate .section-number').textContent='04';
  bindEvents();
  applyFilter();
}

function applyFilter() {
  document.querySelectorAll('[data-category]').forEach(project=>{project.hidden=selectedFilter!=='all'&&project.dataset.category!==selectedFilter;});
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===selectedFilter)));
}

function showProject(id, trigger) {
  const index=copy.zh.projects.findIndex(p=>p.id===id);
  if(index<0)return;
  const z=copy.zh.projects[index],e=copy.en.projects[index];
  lastCaseButton=trigger;
  document.getElementById('dialog-content').innerHTML=`<div class="dialog-header"><div class="section-label"><span class="section-number">${z.number}</span>${bi(copy.zh.caseLabel,copy.en.caseLabel)}</div><button type="button" class="close-dialog" aria-label="关闭项目详情 / Close project details">×</button></div><h2 id="dialog-title">${bi(z.short,e.short)}</h2><p class="dialog-subtitle">${bi(z.subtitle,e.subtitle)}</p><div class="dialog-role"><div class="fact-label">${bi(copy.zh.role,copy.en.role)}</div><p>${bi(z.role,e.role)}</p></div>${z.video ? `<video class="case-preview" controls playsinline preload="metadata" poster="${z.image}" src="${z.video}"></video>` : ''}<div class="case-sections">${z.body.map(([title,body],i)=>`<section><h3>${bi(title,e.body[i][0])}</h3><p>${bi(body,e.body[i][1])}</p></section>`).join('')}</div><div class="dialog-actions"><a class="button primary" href="${z.link||mailHref('kaynyang98@gmail.com',both(z.short,e.short))}" ${z.link?'target="_blank" rel="noopener noreferrer"':''}>${bi(z.action,e.action)}${arrow}</a><button class="button quiet close-dialog" type="button">${bi(copy.zh.back,copy.en.back)}</button></div>`;
  const dialog=document.getElementById('project-dialog');
  dialog.querySelectorAll('.close-dialog').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

function toast(zh,en) {
  const node=document.querySelector('.toast');
  node.innerHTML=bi(zh,en);
  node.classList.add('shown');
  clearTimeout(toast.timeout);
  toast.timeout=setTimeout(()=>node.classList.remove('shown'),3500);
}

function bindEvents() {
  document.querySelector('.language-button').addEventListener('click',()=>{
    language=language==='zh'?'en':'zh';
    try{localStorage.setItem('river-language-order',language);}catch{}
    render();
    document.querySelector('.language-button').focus({preventScroll:true});
  });
  const menu=document.querySelector('.menu-toggle');
  const closeMenu=()=>{menu.setAttribute('aria-expanded','false');document.querySelector('.site-nav').classList.remove('open');};
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.site-nav').classList.toggle('open',open);});
  document.querySelectorAll('.site-nav a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();},{signal:render.events?.signal});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{selectedFilter=button.dataset.filter;applyFilter();}));
  document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>showProject(button.dataset.project,button)));
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(button.dataset.copy);toast(copy.zh.copied,copy.en.copied);}catch{
      const selection=window.getSelection(),range=document.createRange();
      range.selectNodeContents(button.closest('.email-card').querySelector('.email-address'));
      selection.removeAllRanges();selection.addRange(range);
      toast(copy.zh.copyFailed,copy.en.copyFailed);
    }
  }));
  const dialog=document.getElementById('project-dialog');
  dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();document.body.classList.remove('dialog-open');lastCaseButton?.focus({preventScroll:true});});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
}

render();
