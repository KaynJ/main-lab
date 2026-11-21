const copy = {
  zh: {
    title: 'River’s Lab — River 的个人主页',
    description: 'River 的个人主页。研究人的需求，探索游戏与文化，用 AI 把想法做成内容与互动作品。',
    nav: ['作品', '关于', '合作'], lang: 'EN', langLabel: 'Switch to English', menu: '打开导航',
    eyebrow: 'RIVER / 研究 · 创作 · 探索', hero: ['理解人。', '把想法', '做出来。'],
    intro: '你好，我是 River。带着经济学与心理学的视角，我关注人的选择、游戏与文化，也用 AI 把研究和想法做成内容与互动作品。',
    view: '看我的作品', talk: '聊聊合作', scroll: '继续向下探索', note: '我的工作方式',
    noteTitle: '从一个好问题，\n走向看得见的成果。',
    steps: ['提出问题', '寻找证据', '形成洞察', '做成作品'],
    noteFoot: '研究提供方向，创作让想法被看见。',
    interests: ['人的行为', '游戏与文化', 'AI 协作'],
    workLabel: '01 / SELECTED WORK', workTitle: '想法，落在这些作品里。', workIntro: '个人项目与研究实践。每一件作品，都是一次从问题到交付的尝试。',
    filters: ['全部作品', '研究', '内容', '互动'], categories: ['研究 / RESEARCH', '内容 / CONTENT', '互动 / INTERACTIVE'],
    detail: '查看项目', noResults: '这个分类暂时没有作品。',
    projects: [
      { id: 'delta', type: 'research', number: '01', title: '玩家为什么愿意\n为游戏外服务付费？', short: '《三角洲行动》护航与陪玩服务探索性研究', description: '从四份访谈出发，整理付费动机、体验落差与待验证的改善方向。', tags: ['定性访谈', '主题分析', '研究报告'], label: '个人研究 / 4 份访谈', image: '',
        question: '在玩家的付费选择背后，还有哪些尚未被满足的需求？', diagram: ['访谈材料', '编码与比较', '主题与解释', '改善假设'],
        subtitle: '从付费行为，理解玩家体验', role: '研究设计、访谈与分析判断；AI 辅助材料整理和初步编码。',
        body: [
          ['研究问题', '探索玩家购买护航、陪玩等游戏外服务的动机，以及哪些需求可能通过游戏内体验改善得到满足。'],
          ['我的工作', '围绕研究目标开展访谈，逐份复核编码，比较案例中的共性与差异，并区分访谈发现和产品设想。AI 用于辅助整理和分析初稿，解释与判断由我复核。'],
          ['交付成果', '形成中文研究报告和 9 页关键内容展示，讨论组队匹配、学习支持与装备体验等改善方向。'],
          ['研究范围', '这是基于四份访谈的探索性研究；提出的改善方向仍需进一步验证。这里展示项目方法与过程，不公开参与者资料。']
        ], action: '交流这个研究项目', link: '' },
      { id: 'jiahao', type: 'content', number: '02', title: '《嘉豪》：从网络文化，\n走向心理学解释。', short: 'AI 辅助的文化与玩家心理视频', description: '把文化观察、脚本思考与 AI 视觉制作串成一条完整的内容工作流。', tags: ['内容策划', 'AI 视觉', '双语表达'], label: '个人创作 / AI 协作', image: './assets/jiahao-cover.jpg', imageAlt: '《嘉豪》项目中的 AI 生成校园场景',
        subtitle: '让复杂的想法，有可以观看的表达', role: '内容思考、脚本与分镜规划、AI 素材迭代和剪辑整合。',
        body: [
          ['创作出发点', '围绕“嘉豪”这一网络文化现象，结合玩家文化、社会评价与心理学视角，尝试兼顾解释和观看体验。'],
          ['我的工作', '组织脚本和画面逻辑，迭代生成素材，整合旁白、字幕与剪辑。使用 Codex、ComfyUI、Wan / Seedance 和剪映辅助完成制作。'],
          ['交付成果', '积累了脚本、分镜、AI 生成画面与视频片段，以及可复用的制作工作流。封面为项目中的 AI 生成画面。'],
          ['查看方式', '可以通过邮件交流项目、索取合适的展示片段；最终公开视频链接将随作品整理更新。']
        ], action: '索取视频片段', link: '' },
      { id: 'game-lab', type: 'interactive', number: '03', title: '下一局，\n找到你的本命。', short: '游戏偏好问卷与推荐工具', description: '从偏好问答出发，把解释、选择与游戏推荐做成可体验的网页。', tags: ['问卷体验', '推荐逻辑', 'AI 协作开发'], label: '个人项目 / 可在线体验', image: './assets/game-lab.png', imageAlt: '本命实验室游戏偏好工具的真实页面截图',
        subtitle: '把“了解自己”变成一次互动体验', role: '需求与体验规划、问卷和解释逻辑设计、与 AI 协作实现。',
        body: [
          ['项目目标', '让玩家从自己喜欢的游戏体验出发，探索适合的位置、角色和玩法，而不只得到一个缺少解释的推荐结果。'],
          ['我的工作', '规划问卷和结果页，结合回答提供偏好解释，继续衔接到具体推荐；与 AI 协作实现并迭代页面。'],
          ['交付成果', '已发布可体验网页，包含英雄联盟与三角洲相关场景、偏好解释和报告下载。'],
          ['使用范围', '这是用于游戏偏好探索的互动原型，不作为标准化心理测评。推荐适合用来发现和讨论玩法偏好。']
        ], action: '打开在线作品', link: 'https://kaynj.github.io/main-lab/' }
    ],
    aboutLabel: '02 / A LITTLE ABOUT ME', aboutTitle: '好奇心是起点，\n做出来是下一步。',
    aboutText: ['我对人的行为、游戏里的选择和跨文化表达保持好奇。经济学与心理学背景，让我习惯先问“为什么”，再回到材料和证据中寻找解释。', '我也喜欢动手实现：把发现整理成报告，把想法写成脚本，把一个问题做成能点、能看、能体验的原型。AI 是这个过程中的协作工具，最终的选择与判断由我负责。'],
    aboutAside: '这个网站是一份持续更新的个人记录，也是一扇合作的门。',
    facts: [['视角', '经济学 × 心理学'], ['关注', '用户 · 游戏 · 文化'], ['表达', '中文 / English'], ['方式', '研究 + 创作 + 实践']],
    collaborationLabel: '03 / LET’S WORK TOGETHER', collaborationTitle: '这些事情，\n我们可以一起做。',
    services: [
      ['01', '研究与洞察', '访谈材料与主题分析、中文资料研究、竞品与玩家反馈整理。', '报告 / 证据表 / 汇报 PPT'],
      ['02', '内容与表达', '从选题、脚本到 AI 辅助视觉制作，帮助知识和观点找到合适的表达。', '解释视频 / 双语内容 / 视觉素材'],
      ['03', '互动与原型', '围绕明确的小需求，制作问卷、推荐页面和可体验的展示工具。', '互动网页 / 功能原型 / 演示']
    ],
    contactLabel: '有一个问题，或一个想法？', contactTitle: '从一次交流开始。', contactText: '欢迎项目合作、研究交流与合适的工作机会。邮件里告诉我你的目标、已有材料和大致时间，我们一起判断下一步。',
    primaryMail: 'GMAIL / 合作与交流', secondaryMail: 'QQ MAIL / 备用联系', send: '发送邮件', copy: '复制', copied: '邮箱已复制', copyFailed: '请选中邮箱文字手动复制',
    mailSubject: '通过 River’s Lab 联系 / 项目合作', mailBody: '你好 River，\n\n我想和你聊聊：\n项目 / 机会：\n希望解决的问题：\n已有材料：\n大致时间：\n\n',
    footer: '保持好奇，持续做出新东西。', github: 'GitHub 项目', close: '关闭项目详情', role: '我的角色', caseLabel: 'PROJECT NOTES', back: '回到作品', copyright: '个人作品与研究实践'
  },
  en: {
    title: 'River’s Lab — Research, Content & Interactive Work',
    description: 'River’s personal portfolio: user research, games and culture, AI-assisted content, and interactive prototypes.',
    nav: ['Work', 'About', 'Collaborate'], lang: '中文', langLabel: '切换到中文', menu: 'Open navigation',
    eyebrow: 'RIVER / RESEARCH · CREATE · EXPLORE', hero: ['Understand people.', 'Make ideas', 'tangible.'],
    intro: 'Hi, I’m River. With a background in economics and psychology, I explore human choices, games and culture—and use AI to turn research and ideas into content and interactive work.',
    view: 'Explore my work', talk: 'Let’s talk', scroll: 'A little further down', note: 'HOW I WORK', noteTitle: 'A good question.\nSomething you can see.',
    steps: ['Ask', 'Investigate', 'Interpret', 'Create'], noteFoot: 'Research gives direction. Making brings it to life.',
    interests: ['Human behavior', 'Games & culture', 'Working with AI'],
    workLabel: '01 / SELECTED WORK', workTitle: 'Ideas, put into practice.', workIntro: 'Personal projects and research practice. A collection of questions explored through tangible work.',
    filters: ['All work', 'Research', 'Content', 'Interactive'], categories: ['RESEARCH', 'CONTENT', 'INTERACTIVE'], detail: 'Project notes', noResults: 'No projects in this category yet.',
    projects: [
      { id: 'delta', type: 'research', number: '01', title: 'Why do players pay\nfor services outside a game?', short: 'An exploratory study of Delta Force player services', description: 'Four interviews exploring payment motivations, gaps in the player experience, and ideas for further investigation.', tags: ['Interviews', 'Thematic analysis', 'Research report'], label: 'PERSONAL RESEARCH / 4 INTERVIEWS', image: '',
        question: 'What unmet needs sit behind a player’s decision to pay?', diagram: ['Interviews', 'Coding', 'Themes', 'Hypotheses'], subtitle: 'Understanding player experience through payment decisions', role: 'Research design, interviews, coding review and interpretation, with AI-assisted organization and initial coding.',
        body: [['Research question', 'Explore why players purchase escort and companion services outside the game, and which needs could potentially be addressed through changes to the in-game experience.'], ['My contribution', 'Conducted interviews, reviewed coding, compared patterns across cases, and separated interview findings from proposed product ideas. AI supported organization and initial analysis; I reviewed the interpretation and conclusions.'], ['Outputs', 'A Chinese research report and a nine-slide presentation covering ideas around team matching, learning support and equipment experience.'], ['Scope', 'Exploratory research based on four interviews. Proposed improvements require further validation. This summary shares the approach without publishing participant information.']], action: 'Discuss this research', link: '' },
      { id: 'jiahao', type: 'content', number: '02', title: 'JIAHAO: internet culture,\nthrough a psychology lens.', short: 'AI-assisted video on culture and player psychology', description: 'Connecting cultural observations, script development and AI visual production in one creative workflow.', tags: ['Content planning', 'AI visuals', 'Bilingual content'], label: 'PERSONAL PROJECT / AI-ASSISTED', image: './assets/jiahao-cover.jpg', imageAlt: 'An AI-generated campus scene from the JIAHAO project', subtitle: 'Giving complex ideas a watchable form', role: 'Concept development, scripts, storyboards, AI asset iteration and editing.',
        body: [['Starting point', 'An exploration of the JIAHAO internet phenomenon through player culture, social evaluation and psychological perspectives, balancing explanation with a watchable narrative.'], ['My contribution', 'Organized scripts and visual sequences, iterated generated assets, and combined narration, subtitles and editing. The workflow included Codex, ComfyUI, Wan / Seedance and CapCut.'], ['Outputs', 'Scripts, storyboards, AI-generated images and video segments, alongside a reusable production workflow. The cover is an AI-generated project image.'], ['Viewing', 'Email me to discuss the project or request suitable sample clips. A final public video link will be added as the work is organized.']], action: 'Request sample clips', link: '' },
      { id: 'game-lab', type: 'interactive', number: '03', title: 'Your next game.\nYour own way to play.', short: 'An interactive game preference and recommendation tool', description: 'Turning preference questions, explanations and game recommendations into an experience you can try.', tags: ['Questionnaire UX', 'Recommendation logic', 'AI-assisted development'], label: 'PERSONAL PROJECT / LIVE DEMO', image: './assets/game-lab.png', imageAlt: 'A screenshot of the Main Lab game preference tool', subtitle: 'Making preference exploration interactive', role: 'Product and experience planning, questionnaire and explanation logic, and AI-assisted implementation.',
        body: [['Project goal', 'Help players explore roles, characters and playstyles based on the experiences they enjoy, with explanations behind the recommendations.'], ['My contribution', 'Planned questions and result pages, linked responses to preference explanations and recommendations, and collaborated with AI on implementation and iteration.'], ['Outputs', 'A published web experience covering League of Legends and Delta Force, with preference explanations and downloadable reports.'], ['Scope', 'An interactive prototype for exploring gaming preferences, rather than a standardized psychological assessment. It is designed to inspire and discuss ways to play.']], action: 'Try the live project', link: 'https://kaynj.github.io/main-lab/' }
    ],
    aboutLabel: '02 / A LITTLE ABOUT ME', aboutTitle: 'Start with curiosity.\nThen make something.',
    aboutText: ['I’m curious about human behavior, the choices people make in games, and how ideas travel across cultures. Economics and psychology have taught me to ask why, then return to evidence and context.', 'I also enjoy making: shaping findings into reports, ideas into scripts, and questions into prototypes people can explore. AI supports this work; I take responsibility for the choices and judgments.'],
    aboutAside: 'An evolving record of my work, and an open door to collaboration.',
    facts: [['PERSPECTIVE', 'Economics × Psychology'], ['INTERESTS', 'People · Games · Culture'], ['LANGUAGES', 'Chinese / English'], ['APPROACH', 'Research + Create + Make']],
    collaborationLabel: '03 / LET’S WORK TOGETHER', collaborationTitle: 'A few things\nwe can make happen.',
    services: [['01', 'Research & insights', 'Interview synthesis, thematic analysis, Chinese-language desk research, and competitor or player-feedback reviews.', 'Reports / Evidence tables / Presentations'], ['02', 'Content & storytelling', 'From an initial question and script to AI-assisted visuals, finding a clear form for knowledge and ideas.', 'Explainer videos / Bilingual content / Visuals'], ['03', 'Interactive prototypes', 'Small, clearly scoped questionnaires, recommendation pages and interactive tools you can demonstrate.', 'Web experiences / Prototypes / Demos']],
    contactLabel: 'A QUESTION, AN IDEA, A POSSIBILITY?', contactTitle: 'Let’s start a conversation.', contactText: 'Open to project collaboration, research conversations and relevant work opportunities. Tell me your goal, available materials and rough timeline, and we can explore the next step.',
    primaryMail: 'GMAIL / COLLABORATION', secondaryMail: 'QQ MAIL / ALTERNATIVE', send: 'Send an email', copy: 'Copy', copied: 'Email copied', copyFailed: 'Please select the email address and copy it manually',
    mailSubject: 'Hello from River’s Lab / Collaboration', mailBody: 'Hi River,\n\nI would like to discuss:\nProject / opportunity:\nThe problem to solve:\nAvailable materials:\nRough timeline:\n\n',
    footer: 'Stay curious. Keep making.', github: 'GitHub project', close: 'Close project details', role: 'MY ROLE', caseLabel: 'PROJECT NOTES', back: 'Back to work', copyright: 'Personal projects & research practice'
  }
};

