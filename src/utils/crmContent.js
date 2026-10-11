// Copy and data for the /crm-solutions page (kept separate from constants.js because it's page-specific).
// Figures are representative results approved by the owner. No prices, no client names, no em dashes.

export const CRM_HERO = {
    eyebrow: 'CRM solutions',
    title: 'Turn every enquiry into',
    highlight: 'a relationship that grows.',
    description:
        'One connected view of every customer, automation that never forgets a follow-up, and AI that tells your team who to call next. We deliver our own VIN CRM, implement the world’s leading platforms, or build one around the way you work.',
    stat: { value: '+30%', label: 'more leads converted', note: 'Typical uplift within the first 6 months' },
};

export const CRM_MODELS = [
    {
        id: 'vin-crm',
        icon: 'Boxes',
        badge: 'Our product',
        title: 'VIN CRM',
        description: 'Our ready-to-use, cloud-hosted CRM for growing businesses: pipelines, automation, WhatsApp and AI included, configured for you in days.',
        points: ['Fast setup on secure cloud', 'Sinhala, Tamil & English templates', 'Mobile app for field teams'],
    },
    {
        id: 'platforms',
        icon: 'Layers',
        badge: 'Implementation',
        title: 'Leading CRM platforms',
        description: 'Licensing guidance, setup, customization and migration for Salesforce, Microsoft Dynamics 365, HubSpot and Zoho CRM.',
        points: ['Platform selection & fit-gap', 'Data migration from spreadsheets or legacy CRMs', 'Admin training & handover'],
    },
    {
        id: 'custom',
        icon: 'Hammer',
        badge: 'Custom build',
        title: 'Custom-built CRM',
        description: 'When off-the-shelf doesn’t fit, we design and build a CRM around your processes, with web and mobile apps your team will actually use.',
        points: ['Your workflows, your data model', 'Web + iOS/Android apps', 'Integrated with ERP, billing & portals'],
    },
    {
        id: 'ai-addons',
        icon: 'Sparkles',
        badge: 'AI for any CRM',
        title: 'AI add-ons',
        description: 'Plug AI into the CRM you already have: lead scoring, auto-drafted follow-ups and a 24/7 assistant that books meetings and logs everything.',
        points: ['Works with existing CRMs', 'Human review before sending', 'Secure, on your cloud'],
    },
];

// `preview` picks the mini illustration rendered on each card.
export const CRM_FEATURES = [
    {
        icon: 'Workflow',
        preview: 'automation',
        title: 'Automated follow-ups',
        description: 'Trigger tasks, reminders and personalized email, SMS or WhatsApp sequences the moment a lead arrives, so no enquiry goes cold.',
    },
    {
        icon: 'Contact',
        preview: 'contact',
        title: 'One customer record',
        description: 'Sales, service and support share a single, real-time profile: every call, message, quote and purchase in one timeline.',
    },
    {
        icon: 'LayoutDashboard',
        preview: 'dashboard',
        title: 'Live dashboards & reports',
        description: 'Track response times, pipeline value and team performance against goals, with insights surfaced automatically from your data.',
    },
    {
        icon: 'Smartphone',
        preview: 'mobile',
        title: 'Mobile CRM',
        description: 'Update deals, log visits, scan documents and reply to customers from any device, online or offline, anywhere in the field.',
    },
    {
        icon: 'Inbox',
        preview: 'inbox',
        title: 'Omnichannel inbox',
        description: 'WhatsApp, Facebook, Instagram, web chat, email and calls land in one shared inbox with ownership and SLAs.',
    },
    {
        icon: 'GitMerge',
        preview: 'clean',
        title: 'Self-cleaning data',
        description: 'Detect and merge duplicates, validate phone numbers and emails, and keep records current without manual cleanup.',
    },
    {
        icon: 'Kanban',
        preview: 'pipeline',
        title: 'Pipelines & catalog',
        description: 'Visual deal pipelines with your products, services or inventory, quotations and approvals, all updated from one place.',
    },
    {
        icon: 'Award',
        preview: 'coaching',
        title: 'Adoption & performance coaching',
        description: 'Our consultants review your numbers with you, tune workflows and train your team so the CRM keeps paying off.',
    },
];

export const CRM_AI = {
    eyebrow: 'AI inside your CRM',
    title: 'Respond first,',
    highlight: 'personalize every time.',
    description:
        'Customers expect quick, relevant answers, even after hours. Our CRM AI reads the signals already in your data, drafts the right message for each person and keeps the conversation going around the clock, while your team stays in control.',
    stat: { value: '< 1 min', label: 'average first response', note: 'With the 24/7 AI assistant handling new enquiries' },
    capabilities: [
        { icon: 'Target', title: 'Predictive lead scoring', description: 'Ranks leads by buying intent using activity, history and engagement, so your team calls the hottest prospects first.' },
        { icon: 'Wand2', title: 'GenAI follow-ups', description: 'Drafts personalized emails and WhatsApp messages in seconds. Review, edit and send with one click.' },
        { icon: 'Bot', title: '24/7 virtual assistant', description: 'Answers questions, qualifies leads and books appointments on WhatsApp and web chat, then hands over to a person.' },
        { icon: 'ListChecks', title: 'Summaries & next steps', description: 'Turns long conversations and calls into short summaries with the next best action, logged on the record.' },
    ],
};

export const CRM_ADDONS = [
    { icon: 'MessageCircle', title: 'WhatsApp Business', description: 'Official WhatsApp Business API with templates, broadcasts and chat history saved to each customer.' },
    { icon: 'MessageSquareText', title: 'SMS & bulk campaigns', description: 'Personalized SMS campaigns and reminders through local and international gateways, with opt-out handling.' },
    { icon: 'PhoneCall', title: 'Call tracking & recording', description: 'Log, record and review customer calls with click-to-call, missed-call alerts and AI call summaries.' },
    { icon: 'ScanLine', title: 'Document & ID capture', description: 'Scan IDs, invoices and forms with OCR and attach the extracted data straight to the right record.' },
    { icon: 'Video', title: 'Video messages', description: 'Record short personal videos and share them by email or WhatsApp to stand out and build trust.' },
    { icon: 'FileSignature', title: 'Quotes & e-signatures', description: 'Generate branded quotations and contracts from the CRM and collect e-signatures in minutes.' },
    { icon: 'CloudDownload', title: 'Data warehouse sync', description: 'Stream CRM data securely to your cloud warehouse or BI tools, with no manual exports.' },
    { icon: 'Languages', title: 'Multilingual templates', description: 'Sinhala, Tamil and English message templates and AI drafts that speak your customers’ language.' },
];

export const CRM_INTEGRATIONS = [
    'Microsoft 365 & Outlook', 'Google Workspace & Gmail', 'WhatsApp Business', 'Facebook & Instagram leads', 'Website forms & chat',
    'ERP (SAP, Oracle, Dynamics)', 'Accounting & invoicing', 'Payment gateways', 'Telephony & call centers', 'Power BI & Looker',
];

export const CRM_INDUSTRIES = [
    { icon: 'ShoppingBag', title: 'Retail & e-commerce', description: 'Loyalty, repeat-purchase campaigns and unified online/in-store customer history.' },
    { icon: 'Home', title: 'Real estate', description: 'Property enquiries, site-visit scheduling and buyer pipelines from first call to handover.' },
    { icon: 'Car', title: 'Automotive', description: 'Showroom and online leads, test drives, trade-ins and service reminders in one place.' },
    { icon: 'GraduationCap', title: 'Education', description: 'Student enquiries, admissions pipelines and parent communication at scale.' },
    { icon: 'Landmark', title: 'Financial services', description: 'Compliant onboarding, relationship management and cross-sell insights.' },
    { icon: 'HeartPulse', title: 'Healthcare', description: 'Patient enquiries, appointment reminders and follow-up care journeys.' },
    { icon: 'Hotel', title: 'Hospitality & travel', description: 'Bookings, guest preferences and personalized offers before and after each stay.' },
    { icon: 'Briefcase', title: 'B2B & professional services', description: 'Account management, proposals and renewals with full visibility of every deal.' },
];

export const CRM_STEPS = [
    { step: '01', title: 'Discover', description: 'Map your sales and service journeys, data sources and goals.' },
    { step: '02', title: 'Configure & migrate', description: 'Set up pipelines, automation and integrations; import and clean your data.' },
    { step: '03', title: 'Train & launch', description: 'Role-based training, go-live support and quick wins in the first weeks.' },
    { step: '04', title: 'Optimize', description: 'Monthly reviews of adoption and results, plus new automations and AI as you grow.' },
];

export const CRM_RESULTS = [
    { value: '+30%', label: 'lead-to-customer conversion' },
    { value: '< 1 min', label: 'first response with AI assistant' },
    { value: '40%', label: 'less manual data entry' },
    { value: '2×', label: 'more follow-ups completed on time' },
];

export const CRM_FAQ = [
    {
        question: 'What is a CRM and why does my business need one?',
        answer: 'A CRM (customer relationship management) system keeps every customer interaction, lead and deal in one place. It helps your team respond faster, follow up consistently and see which activities actually win business, instead of relying on spreadsheets and memory.',
    },
    {
        question: 'Should we use VIN CRM, a platform like Salesforce, or a custom build?',
        answer: 'It depends on your processes, team size and existing systems. VIN CRM is the fastest way to start, leading platforms suit organizations that need their ecosystem, and a custom build fits unique workflows. We recommend the right option after a free requirement analysis.',
    },
    {
        question: 'Can you move our data from spreadsheets or another CRM?',
        answer: 'Yes. We import and clean contacts, deals and history from spreadsheets or legacy CRMs, remove duplicates and validate the data before go-live, so you start with records you can trust.',
    },
    {
        question: 'How does the AI work, and do we stay in control?',
        answer: 'The AI scores leads, drafts messages and answers routine questions using your CRM data. You decide what can be sent automatically and what needs a person to review it first, and every AI action is logged on the customer record.',
    },
    {
        question: 'Does it work with WhatsApp and our other tools?',
        answer: 'Yes. We connect WhatsApp Business, social media leads, email, website forms, telephony, accounting and ERP systems, so data flows into the CRM automatically.',
    },
    {
        question: 'How long does it take to go live?',
        answer: 'VIN CRM can be live in days. Platform implementations usually take 2 to 8 weeks and custom builds 6 to 16 weeks, depending on scope. You get a clear timeline after discovery.',
    },
    {
        question: 'Is our customer data secure?',
        answer: 'Data is encrypted in transit and at rest, hosted on trusted cloud providers, and protected with role-based access, single sign-on options and audit logs.',
    },
    {
        question: 'How is pricing decided?',
        answer: 'Pricing depends on the option, number of users and scope, so we don’t publish fixed prices. After a free requirement analysis we share a clear proposal, with no obligation.',
    },
];

// Comparison table. Values: 'yes' (included), 'partial' (limited, or a paid add-on), 'no' (not available).
export const CRM_COMPARISON = {
    eyebrow: 'Why VIN Cloud CRM',
    title: 'More than software,',
    highlight: 'a CRM that fits how you work.',
    description:
        'Generic tools give you features. We give you a CRM shaped around your sales, service and operations, connected to your systems and supported by a local team.',
    columns: [
        { id: 'vin', label: 'VIN Cloud CRM', highlight: true },
        { id: 'generic', label: 'Off-the-shelf CRM' },
        { id: 'manual', label: 'Spreadsheets & chat apps' },
    ],
    rows: [
        { label: 'Complete CRM features: pipelines, tasks, reporting', vin: 'yes', generic: 'yes', manual: 'no' },
        { label: 'WhatsApp, Facebook and web chat in one inbox', vin: 'yes', generic: 'partial', manual: 'partial' },
        { label: 'AI lead scoring, drafted follow-ups and 24/7 assistant', vin: 'yes', generic: 'partial', manual: 'no' },
        { label: 'Sinhala, Tamil and English templates', vin: 'yes', generic: 'partial', manual: 'no' },
        { label: 'Built around your workflows: quotes, orders, production', vin: 'yes', generic: 'partial', manual: 'no' },
        { label: 'Integrated with your ERP, accounting and legacy systems', vin: 'yes', generic: 'partial', manual: 'no' },
        { label: 'Data migration, clean-up and team training included', vin: 'yes', generic: 'no', manual: 'no' },
        { label: 'Ongoing optimization by a dedicated local team', vin: 'yes', generic: 'no', manual: 'no' },
    ],
};
