// All portfolio content lives here. Edit this file to update the site.

export const NAV = [['home', 'Home'], ['about', 'About'], ['experience', 'Journey'], ['projects', 'Work'], ['skills', 'Skills'], ['mllab', 'ML Lab'], ['terminal', 'Terminal'], ['contact', 'Contact']];

export const TYPED = ['CRM architecture and workflow systems.', 'Full-stack delivery with React, Node.js and PostgreSQL.', 'AI features embedded in business software.'];
export const HERO_LOG = ['$ traven.deploy()', 'api', 'workflows', 'database', 'ai-services', 'frontend'];
export const TECH = ['System Architecture', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST APIs', 'Workflow Automation', 'LLM Integration', 'RAG', 'Python', 'Computer Vision', 'AWS'];

export const GLANCE = [
  ['Now', 'Lead AI Engineer and Solutions Architect at TRAAEXPLORE, Bengaluru, owning a live, company-wide CRM platform.'],
  ['Strengths', 'System architecture, full-stack delivery with React, Node.js and PostgreSQL, workflow and access-control design, LLM and RAG integration.'],
  ['Looking for', 'Senior AI engineering, applied AI and solutions architecture roles in Bengaluru.'],
];

export const STAGES = [
  ['Discover', 'I work with the teams who will use the system, map their real workflows and business rules, and define what the software must enforce.'],
  ['Architect', 'I design the data model, services, access control and module boundaries so the platform can grow without rework.'],
  ['Build', 'I implement the React frontend and the Node.js and Express backend against PostgreSQL, in modular, testable components.'],
  ['Integrate AI', 'I add AI features where they remove effort inside a workflow, using LLMs, retrieval and classical ML behind clear interfaces.'],
  ['Operate', 'I ship through GitHub and Vercel, monitor production, and keep the platform stable as new modules arrive.'],
];

export const NUMBERS = [
  [5, 0, 'ownership areas: architecture, workflows, frontend, backend, AI'],
  [4, 0, 'business units served by one platform'],
  [3, 0, 'systems designed and built'],
  [2, 0, 'ML certifications'],
  [8.23, 2, 'CGPA, B.Tech IT'],
];

export const JOURNEY = [
  ['B.Tech, Information Technology', '8.23 CGPA'],
  ['Zero Gravity Group', 'Data Analyst, AI engineering · Chennai'],
  ['TRAAEXPLORE', 'Lead AI Engineer and Solutions Architect · Bengaluru', true],
  ['Next', 'Senior AI engineering and architecture roles'],
];

export const JOBS = [
  {
    title: 'Lead AI Engineer and Solutions Architect',
    when: 'TRAAEXPLORE, Bengaluru · Current',
    points: [
      'Architect and develop TRAVEN-AI, the company-wide CRM and performance management platform, as primary architect and developer.',
      'Design workflow management and role-based access across business units, roles and departments.',
      'Lead full-stack delivery: React frontend, Node.js and Express backend, PostgreSQL on Supabase.',
      'Implement AI features inside the CRM and plan the next modules, including finance, SOPs and meeting scheduling.',
    ],
  },
  {
    title: 'Data Analyst, AI Engineering contributions',
    when: 'Zero Gravity Group, Chennai · From Feb 2025',
    points: [
      'Led an AI wedding photo curation system that scores and ranks images on blur, brightness, faces and composition.',
      'Built end-to-end machine learning pipelines and improved models through feature engineering and tuning.',
      'Delivered an ETL pipeline and Power BI dashboards for sales KPIs, and analysed large datasets with Python and SQL.',
    ],
  },
];

export const ARCH = [
  ['Client', 'React · Vite', 'A component-driven React frontend with an established design system. Tabbed dashboards cover leads, planning, vendors and performance views.'],
  ['API', 'Node.js · Express', 'REST controllers per module, with role-based access control across business units, roles and departments.'],
  ['Engines', 'Filters · dedupe · rules', 'A dynamic JSON-DSL filter engine, multi-strategy duplicate detection, and business-rule enforcement for approvals and timelines.'],
  ['Data', 'PostgreSQL · Supabase', 'A universal leads table with department-specific detail tables, JSONB metadata and junction tables for cross-department tagging.'],
  ['Delivery', 'GitHub · Vercel · AWS', 'Code flows from GitHub to Vercel, with AWS S3 and SNS layers supporting storage and notifications.'],
  ['AI layer', 'LLM features', 'AI capabilities embedded in CRM workflows, alongside new finance, SOP and meeting-scheduling modules.'],
];

export const DECISIONS = [
  ['One leads table, per-department detail tables', 'Shared fields live in a universal leads table, while MICE, wedding and FIT tables hold what is specific. One pipeline serves every unit without forcing identical schemas.'],
  ['JSONB for department metadata', 'Flexible, department-specific attributes sit in JSONB on the leads table, so new fields do not need a migration each time.'],
  ['A JSON DSL filter engine', 'Filters are expressed as data rather than hard-coded queries, so complex views can be composed and reused.'],
  ['RBAC with cross-department tagging', 'Five roles across five business units, plus a junction table so one user can belong to several departments cleanly.'],
  ['Business rules enforced in code', 'Approval routing and closure timelines from the company SOP are enforced by the backend instead of being left to memory.'],
  ['Multi-strategy duplicate detection', 'Several matching strategies catch duplicate leads that a single exact-match check would miss.'],
];

export const SKILLS = [
  ['Architecture and workflows', ['CRM architecture', 'System design', 'Workflow management', 'Role-based access control', 'Database design', 'Modular services', 'REST API design']],
  ['Backend', ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'JSON DSL filter engine', 'Duplicate detection', 'FastAPI', 'Flask', 'Python']],
  ['AI and machine learning', ['LLM integration', 'RAG', 'Prompt engineering', 'LangChain', 'FAISS', 'Regression', 'Classification', 'Model tuning', 'Feature engineering', 'Computer vision (OpenCV)', 'TensorFlow', 'PyTorch']],
  ['Frontend', ['React', 'Vite', 'Component architecture', 'Design systems', 'Dashboards']],
  ['Data, cloud and delivery', ['Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'MySQL', 'Power BI', 'GitHub', 'Vercel', 'AWS S3', 'AWS SNS', 'AWS EC2', 'AWS Glue', 'AWS IAM']],
];

export const CERTS = [
  ['AWS', 'Certified Machine Learning Engineer, Associate', 'AWS'],
  ['IBM', 'Machine Learning Certification', 'IBM SkillsBuild'],
  ['BT', 'B.Tech, Information Technology', '8.23 CGPA'],
];

// Photo selector demo: [sharpness, brightness, faces, composition] per sample, 0..1
export const WEIGHTS = [['Sharpness', 50], ['Brightness', 20], ['Faces', 70], ['Composition', 40]];
export const SAMPLES = [[.9, .5, .8, .6], [.3, .9, .7, .8], [.8, .3, .4, .9], [.6, .7, .9, .3], [.95, .8, .2, .5], [.4, .4, .95, .9], [.7, .95, .6, .7], [.2, .6, .5, .4]];
export const HUES = [210, 30, 150, 340, 60, 270, 190, 10];

export const GLYPHS = {
  experience: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h6a4 4 0 0 0 0-8h-2a4 4 0 0 1 0-4h6"/>',
  projects: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  skills: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  mllab: '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6l3 5M7 18l3-5M14 12h3"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10l3 2-3 2M12 15h5"/>',
  certs: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"/>',
};

export const TERM = {
  whoami: 'Sundhareshwar, Lead AI Engineer and Solutions Architect at TRAAEXPLORE, Bengaluru.',
  about: 'Data analyst turned AI engineer. I lead the architecture and development of a company-wide CRM, owning the data model, backend, frontend, workflows and AI features.',
  skills: 'Architecture : CRM architecture, system design, workflow management, RBAC, REST API design\nBackend      : Node.js, Express, PostgreSQL, Supabase, FastAPI, Flask, Python\nFrontend     : React, Vite, design systems, dashboards\nAI / ML      : LLM integration, RAG, LangChain, FAISS, Scikit-learn, OpenCV, TensorFlow, PyTorch\nData / Cloud : Pandas, SQL, Power BI, GitHub, Vercel, AWS (S3, SNS, EC2, Glue, IAM)',
  projects: '1. TRAVEN-AI: CRM and performance platform, live in production across MICE, FIT, Weddings and Events.\n2. AI Wedding Photo Selector: scores and ranks images on blur, brightness, faces and composition.\n3. Sales Data Pipeline and Dashboard: ETL, automated workflows and Power BI KPI dashboards.',
  experience: 'Lead AI Engineer and Solutions Architect | TRAAEXPLORE, Bengaluru | Current\nData Analyst, AI Engineering contributions | Zero Gravity Group, Chennai | From Feb 2025',
  education: 'B.Tech, Information Technology | CGPA 8.23',
  certs: 'AWS Certified Machine Learning Engineer, Associate (AWS)\nMachine Learning Certification (IBM SkillsBuild)',
  contact: 'Email    : sundhars2823@gmail.com\nLinkedIn : linkedin.com/in/sundhars2823\nGitHub   : github.com/sundhars2823\nPhone    : +91 75581 54541\nLocation : Bengaluru, India',
  help: 'Commands: whoami, about, skills, projects, experience, education, certs, contact, theme, clear',
};
export const TERM_BUTTONS = ['help', 'whoami', 'about', 'skills', 'projects', 'experience', 'certs', 'contact'];

// ---- Guide bot ----
export const BOT_LABELS = { about: 'Who is Sundhareshwar?', traven: 'His flagship project', skills: 'Skills and stack', experience: 'Experience', looking: 'What is he looking for?', contact: 'Contact him', tour: 'Take the tour', relax: 'Relax for a moment', photo: 'Photo selector', certs: 'Education', ai: 'His AI work' };
export const BOT_DEFAULT = ['about', 'traven', 'skills', 'looking', 'tour', 'relax', 'contact'];
export const BOT = {
  hi: ['Hello! I am the guide for this portfolio. I can tell you about Sundhareshwar, show you around, or give you a calm minute.'],
  about: ['Sundhareshwar is a Lead AI Engineer and Solutions Architect at TRAAEXPLORE, Bengaluru. He started as a data analyst, moved into AI engineering, and now owns the architecture and delivery of a live, company-wide CRM.'],
  traven: ['His flagship work is TRAVEN-AI, a CRM and performance platform used across the MICE, FIT, Weddings and Events units. He designs the architecture and builds the React frontend, Node.js and Express backend and PostgreSQL database on Supabase, and he is adding AI features. Try the architecture explorer in Chapter 3.'],
  skills: ['Architecture and workflows, backend (Node.js, Express, PostgreSQL, FastAPI), frontend (React), AI and ML (LLM integration, RAG, LangChain, FAISS, scikit-learn, OpenCV), and delivery on GitHub, Vercel and AWS.'],
  experience: ['Now: Lead AI Engineer and Solutions Architect at TRAAEXPLORE, Bengaluru. Earlier: Data Analyst with AI engineering contributions at Zero Gravity Group, Chennai, from February 2025.'],
  photo: ['The AI Wedding Photo Selector scores images on blur, brightness, faces and composition, then ranks and filters them. Open Chapter 3 to try the ranking sliders.'],
  ai: ['His AI work covers computer vision (the photo selector), RAG and LLM integration, and the AI features he is implementing inside the CRM. He also holds the AWS Certified Machine Learning Engineer Associate certification.'],
  looking: ['He is open to senior AI engineering, applied AI and solutions architecture roles in Bengaluru.'],
  certs: ['B.Tech in Information Technology (8.23 CGPA), AWS Certified Machine Learning Engineer Associate, and an IBM SkillsBuild Machine Learning certification.'],
  contact: ['You can reach him at sundhars2823@gmail.com. Use the buttons below, or the contact form at the end of the page.', [['Email', 'email'], ['LinkedIn', 'linkedin'], ['GitHub', 'github']]],
  github: ['His GitHub is github.com/sundhars2823.', [['Open GitHub', 'github']]],
  linkedin: ['His LinkedIn is linkedin.com/in/sundhars2823.', [['Open LinkedIn', 'linkedin']]],
  salary: ['For compensation and availability, please email him directly.'],
  resume: ['A resume is available by email. You can also print this page as a PDF with Ctrl+P.'],
  location: ['He is based in Bengaluru, India, and works at TRAAEXPLORE there.'],
};
export const BOT_PATTERNS = [
  [/\b(hi|hello|hey)\b/, 'hi'], [/traven|crm|flagship|best project|project/, 'traven'], [/photo|wedding|vision|opencv/, 'photo'],
  [/skill|stack|tech|tool|expert/, 'skills'], [/experience|career|company|traaexplore|zero|work/, 'experience'],
  [/looking|open to|role|hire|hiring|available|opportunit/, 'looking'], [/github|repo/, 'github'], [/linkedin/, 'linkedin'],
  [/contact|email|mail|reach|phone|call/, 'contact'], [/cert|degree|educat|aws|ibm|study/, 'certs'], [/salary|ctc|pay|compens|lpa/, 'salary'],
  [/resume|cv/, 'resume'], [/\b(ai|llm|rag|ml)\b|machine/, 'ai'], [/tour|guide|walk|show me/, 'tour'], [/relax|break|calm|breath|stress/, 'relax'],
  [/where|location|bengaluru|bangalore|chennai/, 'location'], [/who|about|introduc|yourself|sundhar/, 'about'],
];
export const TOUR = [
  ['#about', 'Chapter 1: who he is. A data analyst who became an engineer and now owns a live CRM.'],
  ['#experience', 'Chapter 2: the journey from B.Tech, to Zero Gravity, to TRAAEXPLORE.'],
  ['#projects', 'Chapter 3: the work. TRAVEN-AI is the flagship, with an architecture explorer and the engineering decisions behind it.'],
  ['#skills', 'Chapter 4: the toolkit, grouped by the part of the system it serves.'],
  ['#mllab', 'Chapter 5: hands-on. Train a small classifier right in your browser.'],
  ['#terminal', 'Chapter 6: explore his profile from a command line.'],
  ['#contact', 'Final chapter: say hello. Email, LinkedIn and GitHub are all here.'],
];
