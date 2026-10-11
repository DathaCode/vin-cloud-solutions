export const SITE_URL = 'https://cloud.vinsolutions.lk';

export const COMPANY_INFO = {
    name: 'VIN Cloud Solutions',
    shortName: 'VIN Cloud',
    tagline: "Reimagine what's possible through technology",
    summary:
        "VIN Cloud Solutions stands at the forefront of South Asia's digital transformation landscape, helping organizations reimagine what's possible through technology. By combining strategic thinking with hands-on technical expertise, we empower businesses to modernize, scale, and thrive in an increasingly digital world, one solution at a time.",
    email: 'info@vinsolutions.lk',
    phone: '+94 70 373 4412',
    whatsapp: '94703734412', // international format, digits only (wa.me links)
    website: 'cloud.vinsolutions.lk',
    region: 'South Asia',
    location: 'Ragama, Sri Lanka',
    address: { locality: 'Ragama', region: 'Western Province', country: 'LK' },
};

export const WHATSAPP_URL = `https://wa.me/${COMPANY_INFO.whatsapp}`;

// Leave a URL empty to hide that icon until the profile is ready.
export const SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/profile.php?id=61593988771682',
    linkedin: '',
    github: '',
    tiktok: '',
};

// Hash links are root-relative so they also work from /blog pages.
export const NAV_LINKS = [
    { name: 'Services', href: '/#services' },
    { name: 'AI', href: '/#ai' },
    { name: 'Platforms', href: '/#platforms' },
    { name: 'CRM', href: '/crm-solutions' },
    { name: 'Work', href: '/#work' },
    { name: 'Insights', href: '/blog' },
];

export const HERO_STATS = [
    { value: '6+', label: 'Cloud & SaaS ecosystems' },
    { value: '20–40%', label: 'Typical cloud cost savings' },
    { value: '360°', label: 'Strategy → build → run' },
    { value: '24/7', label: 'Post-launch support' },
];

export const SERVICES = [
    {
        id: 'ai',
        icon: 'Sparkles',
        title: 'AI-Powered Innovation & Implementation',
        short: 'AI Implementation',
        description:
            'From strategy to production: generative AI copilots, RAG knowledge assistants, intelligent automation and AI agents, built securely on your data and your cloud.',
        features: ['GenAI copilots & chat assistants', 'RAG over enterprise knowledge', 'AI agents & workflow automation', 'ML, forecasting & vision', 'Responsible AI & governance'],
        tags: ['Azure OpenAI', 'Bedrock', 'Vertex AI', 'Copilot', 'Rovo'],
        featured: true,
    },
    {
        id: 'development',
        icon: 'Code2',
        title: 'Web & Mobile Software Development',
        short: 'Web & Mobile',
        description:
            'Modern, fast and accessible products: customer portals, SaaS platforms, internal tools and cross-platform mobile apps engineered for scale.',
        features: ['React / Next.js web apps', 'iOS & Android (React Native / Flutter)', 'APIs & microservices', 'UI/UX & design systems', 'QA, CI/CD & DevOps'],
        tags: ['React', 'Node.js', '.NET', 'Flutter'],
    },
    {
        id: 'cloud',
        icon: 'Cloud',
        title: 'Cloud Infrastructure Consultation',
        short: 'Cloud Consulting',
        description:
            'Architecture, migration and optimization across AWS, Azure, Google Cloud and Oracle, with secure landing zones, cost control and resilient operations.',
        features: ['Cloud strategy & readiness', 'Data & workload migration', 'Landing zones & IaC', 'Managed infrastructure & 24/7 maintenance', 'FinOps cost optimization'],
        tags: ['AWS', 'Azure', 'GCP', 'OCI'],
    },
    {
        id: 'solutioning',
        icon: 'Compass',
        title: 'Technical Solutioning & Architecture',
        short: 'Solutioning',
        description:
            'Turn business goals into a buildable blueprint. We assess, design and de-risk solutions before a single line of production code is written.',
        features: ['Discovery & solution design', 'Enterprise architecture', 'Proof-of-concepts', 'Vendor & platform selection'],
        tags: ['Blueprints', 'PoC', 'Roadmaps'],
    },
    {
        id: 'integrations',
        icon: 'Workflow',
        title: 'Integrations & Automation',
        short: 'Integrations',
        description:
            'Connect anything: SSO, ERPs, CRMs, collaboration suites and custom systems via APIs, events and low-code automation.',
        features: ['API & middleware development', 'Identity & SSO', 'ERP / CRM integrations', 'Power Automate, Apps Script, Forge'],
        tags: ['REST', 'GraphQL', 'Webhooks', 'iPaaS'],
    },
    {
        id: 'crm',
        icon: 'Users',
        href: '/crm-solutions',
        title: 'CRM Solutions',
        short: 'CRM Solutions',
        description:
            'Win and keep more customers with an intelligent CRM: our own VIN CRM, Salesforce, Dynamics 365, HubSpot or Zoho, or a custom build, with AI built in.',
        features: ['VIN CRM, ready in days', 'Salesforce, Dynamics 365, HubSpot & Zoho', 'Custom CRM (web + mobile)', 'AI lead scoring & 24/7 assistant', 'WhatsApp & omnichannel inbox', 'Data migration & training'],
        tags: ['VIN CRM', 'Salesforce', 'Dynamics 365', 'HubSpot', 'Zoho'],
        isNew: true,
    },
    {
        id: 'licensing',
        icon: 'Package',
        title: 'Cloud Products & Licensing',
        short: 'Licensing',
        description:
            'Procure, license and administer Microsoft 365, Google Workspace, Atlassian and cloud subscriptions, with right-sizing and dedicated account management.',
        features: ['Licensing & subscription advisory', 'Tenant setup & administration', 'License optimization', 'Multi-vendor procurement'],
        tags: ['M365', 'Workspace', 'Atlassian'],
    },
];

export const AI_CAPABILITIES = [
    {
        id: 'copilots',
        outcome: 'Conversations',
        icon: 'Bot',
        title: 'GenAI Copilots & Assistants',
        description: 'Branded chat assistants for customers and employees, grounded in your documents, tickets and data, with guardrails and audit trails.',
        stack: ['Azure OpenAI', 'Amazon Bedrock', 'Gemini', 'Claude'],
    },
    {
        id: 'rag',
        outcome: 'Cited answers',
        icon: 'Database',
        title: 'Knowledge & RAG Search',
        description: 'Retrieval-augmented generation over SharePoint, Confluence, Google Drive and databases, so answers are cited and current.',
        stack: ['Vector DBs', 'Azure AI Search', 'Vertex AI Search', 'OCI GenAI'],
    },
    {
        id: 'agents',
        outcome: 'Autonomous actions',
        icon: 'Workflow',
        title: 'AI Agents & Automation',
        description: 'Agents that read, decide and act across your tools: triaging Jira tickets, drafting proposals, reconciling records and more.',
        stack: ['MCP', 'Power Automate', 'Atlassian Rovo', 'Function calling'],
    },
    {
        id: 'copilot-adoption',
        outcome: 'Team productivity',
        icon: 'Sparkles',
        title: 'Microsoft 365 Copilot & Gemini Rollouts',
        description: 'Readiness assessments, data governance, pilot design and adoption programs for Copilot and Gemini for Workspace.',
        stack: ['M365 Copilot', 'Copilot Studio', 'Gemini for Workspace', 'Purview'],
    },
    {
        id: 'ml',
        outcome: 'Forecasts',
        icon: 'LineChart',
        title: 'Predictive Analytics & ML',
        description: 'Forecasting, anomaly detection, churn and demand models, productionized with MLOps on your cloud of choice.',
        stack: ['SageMaker', 'Azure ML', 'Vertex AI', 'BigQuery ML'],
    },
    {
        id: 'vision',
        outcome: 'Structured data',
        icon: 'ScanEye',
        title: 'Document & Vision AI',
        description: 'Extract, classify and validate data from invoices, forms, IDs and images to eliminate manual data entry.',
        stack: ['Document Intelligence', 'Textract', 'Document AI', 'OCR'],
    },
];

// Ecosystems shown in the 3D platform explorer. `color` tints the node.
export const PLATFORMS = [
    {
        id: 'aws',
        name: 'AWS',
        full: 'Amazon Web Services',
        color: '#FF9900',
        summary: 'Well-architected AWS environments, from landing zones and migrations to serverless apps and generative AI on Bedrock.',
        infra: ['Control Tower landing zones', 'EC2, EKS & serverless', 'VPC, networking & hybrid'],
        services: ['Migration & modernization', 'Cost optimization (FinOps)', 'Security Hub & compliance'],
        products: ['Amazon Bedrock & SageMaker', 'RDS, Aurora & DynamoDB', 'Amazon Connect'],
    },
    {
        id: 'azure',
        name: 'Azure',
        full: 'Microsoft Azure',
        color: '#3B9CFF',
        summary: 'Enterprise-grade Azure platforms tightly integrated with Microsoft Entra ID, Microsoft 365 and Azure OpenAI.',
        infra: ['Azure landing zones & Bicep/Terraform', 'AKS, App Service & Functions', 'Hybrid with Azure Arc'],
        services: ['Datacenter & VM migration', 'Azure Virtual Desktop', 'Defender & Sentinel security'],
        products: ['Azure OpenAI & AI Foundry', 'Azure SQL & Cosmos DB', 'Fabric & Power BI'],
    },
    {
        id: 'google',
        name: 'Google',
        full: 'Google Cloud & Google Workspace',
        color: '#34A853',
        summary: 'Google Cloud for data and AI, plus Google Workspace deployments, migrations and Gemini adoption for teams.',
        infra: ['GCP landing zones', 'GKE & Cloud Run', 'BigQuery data platforms'],
        services: ['Workspace setup & migration', 'Gmail / Drive data migration', 'Workspace security & DLP'],
        products: ['Vertex AI & Gemini', 'Gemini for Workspace', 'AppSheet & Apps Script'],
    },
    {
        id: 'm365',
        name: 'Microsoft 365',
        full: 'Microsoft 365 for Business & Enterprise',
        color: '#E8613C',
        summary: 'Secure, well-governed Microsoft 365 tenants, from email migration to Teams, SharePoint intranets and Copilot.',
        infra: ['Tenant setup & Entra ID', 'Intune device management', 'Exchange Online migration'],
        services: ['Teams & SharePoint intranets', 'Purview data governance', 'Power Platform solutions'],
        products: ['Microsoft 365 Copilot', 'Copilot Studio agents', 'Business Premium & E3/E5 licensing'],
    },
    {
        id: 'oracle',
        name: 'Oracle',
        full: 'Oracle Cloud Infrastructure & Applications',
        color: '#F04A3A',
        summary: 'High-performance OCI for databases and critical workloads, plus integrations with Oracle Fusion applications.',
        infra: ['OCI landing zones', 'Exadata & Autonomous Database', 'Multicloud (Oracle@Azure/AWS)'],
        services: ['Database & EBS migration', 'Cost & license optimization', 'High-availability & DR'],
        products: ['OCI Generative AI', 'Oracle Integration Cloud', 'Fusion ERP/HCM integrations'],
    },
    {
        id: 'atlassian',
        name: 'Atlassian',
        full: 'Atlassian Cloud',
        color: '#4C8DFF',
        summary: 'Jira, Confluence and Jira Service Management configured for how your teams actually work, plus Server/DC to Cloud migration.',
        infra: ['Server / Data Center → Cloud migration', 'Atlassian Access & SSO', 'Bitbucket Pipelines CI/CD'],
        services: ['Workflow & schema design', 'ITSM with Jira Service Management', 'Admin, training & support'],
        products: ['Jira & Confluence Cloud', 'Atlassian Rovo (AI)', 'Forge apps & marketplace add-ons'],
    },
];

export const INTEGRATIONS = [
    {
        icon: 'KeyRound',
        title: 'Identity & Single Sign-On',
        description: 'One login everywhere with Microsoft Entra ID, Google Identity, Okta, SAML and OIDC, with automated provisioning.',
        examples: ['Entra ID', 'Google SSO', 'Okta', 'SCIM'],
    },
    {
        icon: 'Building2',
        title: 'ERP, CRM & Business Apps',
        description: 'Sync customers, orders and finance data across Salesforce, Dynamics 365, SAP, Oracle Fusion, Zoho and HubSpot.',
        examples: ['Salesforce', 'Dynamics 365', 'SAP', 'Oracle Fusion'],
    },
    {
        icon: 'MessagesSquare',
        title: 'Collaboration Suites',
        description: 'Bridge Microsoft 365, Google Workspace, Slack and Atlassian, so tickets, documents and notifications flow where people work.',
        examples: ['Teams', 'Slack', 'Jira', 'Google Chat'],
    },
    {
        icon: 'Plug',
        title: 'Custom APIs & Middleware',
        description: 'Robust REST/GraphQL APIs, event-driven architectures, webhooks and message queues built for reliability and scale.',
        examples: ['REST', 'GraphQL', 'Kafka', 'EventBridge'],
    },
    {
        icon: 'Zap',
        title: 'Low-code & Workflow Automation',
        description: 'Automate approvals and repetitive tasks with Power Automate, Apps Script, Atlassian Automation, n8n and Logic Apps.',
        examples: ['Power Automate', 'Apps Script', 'n8n', 'Logic Apps'],
    },
    {
        icon: 'GitBranch',
        title: 'DevOps & Data Pipelines',
        description: 'CI/CD across GitHub, Azure DevOps and Bitbucket, plus ETL/ELT pipelines feeding your warehouse and BI dashboards.',
        examples: ['GitHub Actions', 'Azure DevOps', 'Bitbucket', 'dbt'],
    },
];

export const PROCESS_STEPS = [
    { step: '01', title: 'Discover', description: 'Workshops to understand goals, users, constraints and current systems.', icon: 'Search' },
    { step: '02', title: 'Design', description: 'Solution architecture, UX and a phased roadmap with clear success metrics.', icon: 'PenTool' },
    { step: '03', title: 'Build', description: 'Agile delivery in short sprints with demos, automated tests and CI/CD.', icon: 'Hammer' },
    { step: '04', title: 'Launch', description: 'Secure deployment, data migration, training and change management.', icon: 'Rocket' },
    { step: '05', title: 'Evolve', description: 'Monitoring, optimization and continuous improvement, including AI.', icon: 'RefreshCw' },
];

export const WHY_CHOOSE_US = [
    {
        icon: 'Layers',
        title: 'Multi-cloud, vendor-neutral',
        description: 'We work across AWS, Azure, Google, Oracle, Microsoft 365 and Atlassian, so recommendations fit your needs, not a single vendor’s.',
    },
    {
        icon: 'ShieldCheck',
        title: 'Security first',
        description: 'Identity, encryption, least-privilege and compliance-aware design are built in from day one, aligned with ISO 27001 and GDPR practices.',
    },
    {
        icon: 'TrendingDown',
        title: 'Cost-conscious engineering',
        description: 'FinOps discipline and right-sized licensing typically save 20–40% on cloud and SaaS spend.',
    },
    {
        icon: 'Handshake',
        title: 'Strategy + hands-on delivery',
        description: 'The same team that designs your solution builds, launches and supports it, with no hand-off gaps.',
    },
];

export const CASE_CATEGORIES = [
    { id: 'all', label: 'All work' },
    { id: 'ai-solution', label: 'AI Solutions' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'data-migration', label: 'Data Migration' },
    { id: 'cloud-infra', label: 'Cloud Infrastructure' },
    { id: 'crm', label: 'CRM' },
];

// `featured` entries are in-house AI products; the rest are representative client engagements.
export const CASE_STUDIES = [
    {
        id: 'sinhala-proofreader',
        category: 'ai-solution',
        featured: true,
        title: 'Sinhala AI Proofreader',
        sector: 'Media & Publishing',
        summary:
            'A Windows desktop app that proofreads Sinhala text (spelling, grammar and Unicode/encoding errors) using Google Gemini, and gets smarter with every human correction.',
        challenge:
            'Generic spell-checkers don’t understand Sinhala grammar, colloquial or inflected forms, or legacy encoding errors. Office PCs often run offline, and giving every machine its own API key isn’t secure.',
        solution:
            'A single self-contained .exe with a modern dark/light UI and English ↔ Sinhala switching. A conservative Sinhala-linguistics prompt flags errors only at ≥ 0.75 confidence and returns corrected text, a typed error list and bilingual explanations. In LAN mode, up to ~20 offline client PCs route requests through one internet-connected Control PC that holds the key.',
        highlights: [
            'Self-learning SQLite corrections database: verified fixes are injected as few-shot examples',
            'Confirmed corrections are applied instantly on-device, with no API call',
            'Ignores English words, Sri Lankan proper nouns, numbers, dates and valid colloquial forms',
            'Bilingual (Sinhala + English) explanations and summary for every check',
        ],
        results: [
            { value: '~20', label: 'offline PCs served by one secured key' },
            { value: '≥ 0.75', label: 'confidence gate cuts false positives' },
            { value: '0', label: 'API calls for repeat corrections' },
        ],
        stack: ['Google Gemini', 'Python', 'SQLite', 'Windows desktop', 'LAN client/server'],
    },
    {
        id: 'graphic-cast',
        category: 'ai-solution',
        featured: true,
        title: 'Graphic-Cast: Broadcast Graphics',
        sector: 'Broadcast Media',
        summary:
            'Operators type Sinhala Unicode and get broadcast-ready graphics that drop straight into playout. No design tool, no hand-kerning, no waiting for the graphics desk.',
        challenge:
            'Every quote and headline depended on a graphics desk. The required display font has zero Sinhala Unicode coverage, and new graphics had to match years of hand-made originals exactly.',
        solution:
            'A web platform with two live tools: Quote Text renders a 1920×1080 transparent PNG lower-third, and Headline renders a 14.16 s Apple ProRes 4444 .mov with alpha. Text stays Unicode and is converted to legacy FM bytes only at render time; the on-screen preview is the real renderer’s output, so preview and export can never drift.',
        highlights: [
            'Gemini-assisted keyword highlighting; the operator’s manual choice always wins',
            'Gemini failure never blocks the operator; the API key never reaches the browser',
            'Calibrated against existing hand-made graphics (≈84.5% horizontal condense)',
            'Shared auth, storage and admin console, so tool #3 is a new route, not a new app',
        ],
        results: [
            { value: '2', label: 'broadcast tools live in playout' },
            { value: '1:1', label: 'preview = export, zero drift' },
            { value: 'Seconds', label: 'from typed text to on-air file' },
        ],
        stack: ['Google Gemini', 'Python renderer', 'ProRes 4444 alpha', 'Docker', 'Web app'],
    },
    {
        id: 'knowledge-copilot',
        category: 'ai-integration',
        title: 'Enterprise Knowledge Copilot',
        sector: 'Professional Services',
        summary: 'A Microsoft Teams copilot that answers staff questions from SharePoint and Confluence with cited sources, and triages incoming Jira requests.',
        challenge: 'Staff spent hours searching scattered policies, proposals and project docs, and the service desk was flooded with repeat L1 questions.',
        solution: 'Retrieval-augmented generation with Azure OpenAI and Azure AI Search over SharePoint and Confluence, permission-aware and delivered in Teams, plus an AI agent that classifies and routes Jira tickets.',
        highlights: ['Permission-aware retrieval: users only see what they can access', 'Every answer cites its source documents', 'Ticket triage agent with human-in-the-loop approval'],
        results: [
            { value: '65%', label: 'faster answers to internal queries' },
            { value: '40%', label: 'fewer L1 service-desk tickets' },
            { value: '100%', label: 'answers with cited sources' },
        ],
        stack: ['Azure OpenAI', 'Azure AI Search', 'Microsoft Teams', 'Confluence', 'Jira'],
    },
    {
        id: 'erp-data-migration',
        category: 'data-migration',
        title: 'Legacy Database & ERP Data Migration',
        sector: 'Manufacturing',
        summary: 'Migrated an ageing on-premise Oracle and SQL Server estate to managed cloud databases with full reconciliation and a single-weekend cutover.',
        challenge: 'End-of-life hardware, failing nightly batches and 15 years of inconsistent ERP data blocked reporting and modernization.',
        solution: 'Data profiling and cleansing, then phased replication to Oracle Autonomous Database and Azure SQL using Azure Data Factory, with automated row-count and checksum reconciliation before cutover.',
        highlights: ['Automated reconciliation reports for every table', 'Rehearsed cutover runbook with rollback plan', 'Cleansed master data ready for BI'],
        results: [
            { value: '4.2 TB', label: 'migrated and reconciled' },
            { value: '0', label: 'records lost' },
            { value: '< 2 h', label: 'cutover downtime' },
        ],
        stack: ['Oracle Autonomous DB', 'Azure SQL', 'Azure Data Factory', 'Python'],
    },
    {
        id: 'omnichannel-crm',
        category: 'crm',
        title: 'Omnichannel CRM with AI Assistant',
        sector: 'Retail & E-commerce',
        summary: 'Replaced spreadsheets and personal phones with one CRM that captures every WhatsApp, web and showroom enquiry, scores it and follows up automatically.',
        challenge: 'Leads arrived through WhatsApp, Facebook, the website and walk-ins, but lived in staff phones and spreadsheets. Follow-ups were missed and managers had no visibility.',
        solution: 'VIN CRM with an omnichannel inbox, automated follow-up sequences, AI lead scoring and a 24/7 WhatsApp assistant that qualifies enquiries and books store visits, plus a mobile app for the sales floor.',
        highlights: ['Every enquiry logged on one customer record', 'AI assistant hands warm leads to the right salesperson', 'Live dashboards for response time and conversion'],
        results: [
            { value: '+32%', label: 'lead-to-sale conversion' },
            { value: '< 1 min', label: 'first response, 24/7' },
            { value: '40%', label: 'less manual data entry' },
        ],
        stack: ['VIN CRM', 'WhatsApp Business API', 'Meta Lead Ads', 'AI lead scoring'],
    },
    {
        id: 'aws-platform',
        category: 'cloud-infra',
        title: 'AWS Platform Build & FinOps',
        sector: 'Retail & E-commerce',
        summary: 'Rebuilt a fragile AWS setup as a secure, automated landing zone, then took over day-to-day operations and cost management.',
        challenge: 'Hand-built servers, rising monthly bills and slow, risky releases during peak sales seasons.',
        solution: 'Control Tower landing zone, Terraform-managed EKS with autoscaling, CI/CD pipelines, and Savings Plans plus rightsizing, followed by 24/7 monitoring and maintenance.',
        highlights: ['Everything as code: environments rebuilt in minutes', 'Autoscaling for seasonal peaks', 'Monthly FinOps reviews and reports'],
        results: [
            { value: '32%', label: 'lower monthly AWS costs' },
            { value: '60%', label: 'faster deployments' },
            { value: '24/7', label: 'monitoring & maintenance' },
        ],
        stack: ['AWS Control Tower', 'Amazon EKS', 'Terraform', 'CloudWatch'],
    },
    {
        id: 'azure-oci-managed',
        category: 'cloud-infra',
        title: 'Managed Azure & Oracle Cloud Infrastructure',
        sector: 'Financial Services',
        summary: 'Designed, migrated and now maintain a hybrid Azure + OCI platform for customer-facing apps and core databases.',
        challenge: 'Legacy infrastructure limited scalability and made compliance audits painful.',
        solution: 'Azure landing zone for applications, Oracle Cloud Infrastructure for core databases, cross-region disaster recovery, Defender and Sentinel security monitoring, and a managed-service SLA.',
        highlights: ['Cross-region DR tested quarterly', 'Security monitoring with Microsoft Sentinel', 'Patch and backup management under SLA'],
        results: [
            { value: '99.99%', label: 'uptime SLA achieved' },
            { value: '15 min', label: 'disaster-recovery RTO' },
            { value: 'PCI DSS', label: 'compliance maintained' },
        ],
        stack: ['Microsoft Azure', 'Oracle Cloud (OCI)', 'Microsoft Sentinel', 'Terraform'],
    },
];

export const FAQ_ITEMS = [
    {
        question: 'What kind of AI solutions can you implement?',
        answer: 'We build generative AI assistants, RAG knowledge search, AI agents that automate workflows, document and vision AI, and predictive models. We also run Microsoft 365 Copilot and Gemini for Workspace readiness and adoption programs. Solutions are built on Azure OpenAI, Amazon Bedrock, Google Vertex AI, OCI Generative AI or other models depending on your needs.',
    },
    {
        question: 'Do you build both web and mobile applications?',
        answer: 'Yes. We design and develop web platforms (React, Next.js, Node.js, .NET) and cross-platform mobile apps for iOS and Android (React Native, Flutter), including APIs, admin portals, CI/CD and ongoing maintenance.',
    },
    {
        question: 'Which cloud platforms do you support?',
        answer: 'We consult on AWS, Microsoft Azure, Google Cloud and Oracle Cloud Infrastructure, and we deploy and administer Microsoft 365, Google Workspace and Atlassian Cloud. We are vendor-neutral and also design multi-cloud and hybrid architectures.',
    },
    {
        question: 'Can you integrate our existing systems?',
        answer: 'Absolutely. We integrate identity/SSO, ERP and CRM systems (SAP, Oracle Fusion, Dynamics 365, Salesforce), collaboration suites and custom applications using APIs, event-driven middleware and low-code automation.',
    },
    {
        question: 'Can you migrate our data and maintain our cloud infrastructure?',
        answer: 'Yes. We migrate databases, files, email and ERP data with automated reconciliation and rehearsed cutovers, then build and maintain infrastructure on AWS, Azure and Oracle Cloud under a managed-service SLA, with monitoring, patching, backups and cost optimization included.',
    },
    {
        question: 'How long does a cloud migration typically take?',
        answer: 'It depends on complexity. Simple migrations take 2–4 weeks, while enterprise migrations usually take 2–3 months. You get a detailed timeline after the discovery phase.',
    },
    {
        question: 'Do you provide licensing for Microsoft 365, Google Workspace and Atlassian?',
        answer: 'Yes. We help you choose the right plans, procure licenses, set up and secure your tenant, migrate data and right-size subscriptions over time.',
    },
    {
        question: 'How is pricing determined?',
        answer: 'Every engagement is different, so we don’t publish fixed prices. After a free requirement analysis we share a clear proposal with scope, timeline and cost, with no obligation.',
    },
    {
        question: 'Do you provide post-launch support?',
        answer: 'Yes. We offer support and managed-service packages, including 24/7 technical support, monitoring, optimization and user training.',
    },
];
