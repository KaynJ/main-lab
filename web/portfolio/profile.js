// Professional facts selected from the existing user-provided résumé.
const professionalProfile = {
  education: [
    {
      zh: {name:'格拉斯哥大学',role:'心理学研究 · 硕士',date:'2025.09 — 2026.12（预计）',description:'研究实践涵盖 R 数据分析、访谈编码、主题分析与跨文化研究设计。'},
      en: {name:'University of Glasgow',role:'MSc Psychological Studies',date:'Sep 2025 — Dec 2026 (expected)',description:'Research practice includes data analysis in R, interview coding, thematic analysis and cross-cultural research design.'}
    },
    {
      zh: {name:'中央财经大学',role:'国民经济管理 · 学士',date:'2016.09 — 2020.07',description:'经济学背景为理解市场、商业环境和人的决策提供了分析视角。'},
      en: {name:'Central University of Finance and Economics',role:'National Economic Management · Bachelor’s degree',date:'Sep 2016 — Jul 2020',description:'An economics background informs how I approach markets, business contexts and people’s decisions.'}
    }
  ],
  experience: [
    {
      zh: {name:'北京汽车产业投资公司（深圳办）',role:'投资助理',date:'2021.03 — 2022.06',description:'参与新能源汽车产业链企业研究，开展案头研究、实地尽调与企业访谈；整理纪要和财务材料，参与立项、内审与投后报告。'},
      en: {name:'Beijing Automotive Industry Investment Company · Shenzhen office',role:'Investment Assistant',date:'Mar 2021 — Jun 2022',description:'Supported research on the new-energy vehicle supply chain, desk research, site-based due diligence and company interviews. Organized interview notes and financial materials, and contributed to investment review and post-investment reports.'}
    },
    {
      zh: {name:'中信建投证券股份有限公司',role:'承做实习生',date:'2020.06 — 2020.12',description:'参与拟 IPO 企业实地尽调、员工访谈及材料交叉核验，与律所及会计师事务所协作，支持报告撰写和再融资项目资料核对。'},
      en: {name:'China Securities Co., Ltd.',role:'Investment Banking Intern',date:'Jun 2020 — Dec 2020',description:'Supported on-site due diligence, employee interviews and document cross-checks for IPO candidates. Worked with legal and accounting teams, contributed to reports, and checked materials for a refinancing project.'}
    }
  ],
  researchTraining: {
    zh:'硕士论文使用 Millennium Cohort Study 纵向数据研究亲子关系与青少年内化问题，运用 R 进行回归、母亲与父亲差异及族群调节效应检验。此外，参与文化适应研究设计和英文焦点小组材料的主题分析。',
    en:'My master’s dissertation uses longitudinal Millennium Cohort Study data to examine parent–child relationships and adolescent internalizing problems, with regression in R, comparisons of maternal and paternal relationships, and tests of ethnic-group moderation. Other work includes cross-cultural adaptation research design and thematic analysis of English-language focus-group material.'
  }
};

copy.zh.projects[0].title = '三角洲行动\n玩家付费与体验研究';
copy.en.projects[0].title = 'Delta Force\nPlayer needs & experience research';
copy.zh.projects[0].description = '通过四份访谈，探索护航、陪玩等游戏外服务背后的需求，形成研究报告和 9 页展示 PPT。';
copy.en.projects[0].description = 'Four interviews exploring needs behind escort and companion services, developed into a research report and a nine-slide presentation.';
copy.zh.projects[0].metrics = [['04','访谈材料'],['09','展示页数']];
copy.en.projects[0].metrics = [['04','Interview records'],['09','Presentation slides']];
copy.zh.projects[0].body[2][1] = '形成三个研究主题，交付中文研究报告和 9 页关键内容 PPT；围绕组队匹配、学习支持和装备体验提出待验证的改善方向，保留证据链与研究局限。';
copy.en.projects[0].body[2][1] = 'Developed three research themes, a Chinese research report and a nine-slide presentation. Proposed ideas around team matching, learning support and equipment experience for further validation, retaining an evidence trail and the study’s limitations.';
copy.zh.projects[0].body[3][1] = '这是基于四份访谈材料（含一次试访）的探索性研究；提出的改善方向仍需进一步验证。这里展示项目方法与过程，不公开参与者资料。';
copy.en.projects[0].body[3][1] = 'Exploratory research based on four interview records, including one pilot interview. Proposed improvements require further validation. This summary shares the approach without publishing participant information.';

copy.zh.intro = '我是 River Yang。我研究玩家为什么为陪伴付费，也做能亲手试的游戏和工具。这里收录了我的访谈研究、游戏序章、训练小程序和视频作品。';
copy.en.intro = 'I’m River Yang. I study why players pay for companionship and build games and tools you can try. This collection brings together interview research, a playable prologue, a workout mini program and video work.';
copy.zh.workIntro = '可以从一场教学战开始，也可以看一段成片，或翻开玩家访谈的研究展示稿。';
copy.en.workIntro = 'Play a tutorial battle, watch a film excerpt or read the findings from my player interviews.';
for (const lang of ['zh','en']) {
  const [delta, film] = copy[lang].projects;
  delta.link = './assets/delta-research.pdf';
  delta.action = lang === 'zh' ? '阅读研究展示稿（PDF）' : 'Read the research slides (PDF)';
  film.video = film.link = './assets/jiahao-preview.mp4';
  film.action = lang === 'zh' ? '单独打开视频节选' : 'Open the excerpt';
  film.body[2][1] = lang === 'zh' ? '完成一部完整版与四个主题短版。短版分别讲嘉豪的起源、与凡尔赛的区别、玩家对帅气的追求，以及观众如何在这个角色身上看到自己。' : 'The full film is accompanied by four thematic cuts covering the character’s origins, comparisons with humblebragging, style in defeat and moments of self-recognition.';
  film.body[3][1] = lang === 'zh' ? '本页可播放《嘉豪起源》的开场节选。' : 'The player on this page shows the opening excerpt from The Origins of Jiahao.';
}

const additions = [
  {
    id:'bone-ridge', type:'interactive', image:'./assets/bone-ridge.webp', link:'https://kaynj.github.io/bashi-yinan/',
    zh:['八十一难 · 西游异世行记','在白骨岭，排出你的第一支队伍。拖动五位角色布阵，看攻击范围与站位怎样改变战局。','游戏设计 · 可试玩序章','白骨岭教学战实机截图','战斗引导','网页游戏','设定游戏方向，用 oiioii 制作剧情动画，与 AI 协作完成分镜、程序和素材接入。','六段剧情动画串起首次布阵与教学战。获胜后选择先追寻哪位同伴，试玩会保存这次选择。','进入序章试玩'],
    en:['Eighty-One Trials','Place five characters on the field at White Bone Ridge and see how position and attack range shape their first battle.','Game design · Playable prologue','In-game tutorial battle at White Bone Ridge','Combat onboarding','Browser game','I directed the game and made its narrative sequences in oiioii, using AI assistance for storyboarding, implementation and asset integration.','Six narrative sequences connect formation setup to the tutorial battle. After winning, choose which companion to pursue. The demo saves that choice.','Play the prologue']
  },
  {
    id:'set-break', type:'interactive', image:'./assets/set-break.webp', link:'./assets/set-break.pdf',
    zh:['组间 · 健身微信小程序','最后一次推举结束，先点一下开始休息，再补记次数和重量。一个围绕组间几十秒设计的训练工具。','产品原型 · 微信开发者工具预览版','组间的训练首页和休息时长选择','交互设计','训练记录','把计时和记录拆成两个动作，让补记数据的人也能保留准确的休息截止时间。','训练结束后可以按日期导出逐组明细，未补填的组会单独标记。展示稿附有真实界面与流程。','查看产品展示（PDF）'],
    en:['Set Break','Start the rest timer the moment a set ends, then enter reps and weight. A training log built around the seconds between sets.','Product prototype · WeChat developer preview','Set Break training screen with rest duration selection','Interaction design','Workout logging','I separated starting the timer from entering set details, so correcting a weight leaves the rest deadline intact.','Export a dated image of each set after training. Incomplete entries stay marked for review. The walkthrough shows the interface and flow.','View the walkthrough (PDF)']
  },
  {
    id:'airdrop', type:'content', image:'./assets/airdrop.jpg', video:'./assets/airdrop-preview.mp4', link:'./assets/airdrop-preview.mp4',
    zh:['空投熊','以《英雄联盟》为题材的视频项目。播放阶段样片的开场，查看角色出场、构图和剪辑节奏。','视频制作 · 阶段样片','空投熊阶段样片中的画面','游戏题材','视频样片','围绕角色和场景组织画面，把视觉素材剪成可连续观看的段落。','此处展示阶段样片的开场节选。','单独打开样片节选'],
    en:['Airdrop Bear','A League of Legends video project. Watch the opening of the work in progress for its character staging, framing and pacing.','Video production · Work in progress','Still from the Airdrop Bear work in progress','Game culture','Video sample','I arranged the character and scene material into an edited sequence.','The embedded excerpt shows the opening of the current sample.','Open the sample excerpt']
  }
];
for (const {zh,en,...asset} of additions) {
  for (const [lang,fields] of Object.entries({zh,en})) {
    const [title,description,label,imageAlt,tag1,tag2,role,result,action] = fields;
    const projects = copy[lang].projects;
    projects.push({...asset, number:String(projects.length+1).padStart(2,'0'),title,short:title,description,label,imageAlt,tags:[tag1,tag2],subtitle:description,role,body:[[lang==='zh'?'作品体验':'Inside the project',result]],action});
  }
}

