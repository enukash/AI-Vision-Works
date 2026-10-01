import { Project } from '../types';

export const CMS_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'finpulse-ai-analytics-dashboard',
    title: 'FinPulse: Intelligent Financial Intelligence Platform',
    subtitle: 'End-to-end UI/UX architecture, adaptive design system, and multi-viewport workflows',
    category: 'UI/UX Designing',
    client: 'FinPulse Capital',
    year: '2025',
    duration: '6 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Architected a comprehensive modern desktop and mobile UI/UX system for an institutional financial intelligence terminal, simplifying multi-factor forecasting and live portfolio variance into an intuitive, high-legibility interface.',
    theChallenge: 'Financial analysts were overwhelmed by dense legacy spreadsheet tables, scattered macroeconomic feeds, and inconsistent visual hierarchies that led to decision fatigue and high error rates during market volatility.',
    theSolution: 'Developed an ergonomic, blue-white-black contrast design system adhering to strict WCAG 2.1 AA standards. Integrated modular dashboard components, progressive disclosure widgets, and responsive data-dense charts that streamline analysis workflows without visual clutter.',
    methodology: [
      'Comprehensive heuristic analysis of existing quantitative workflows',
      'Information architecture restructuring into contextual hierarchical layers',
      'Rapid prototype iteration using high-fidelity Figma components',
      'Usability stress testing under simulated market trading scenarios'
    ],
    metrics: [
      { label: 'Task Completion Speed', value: '+64%', change: 'faster analysis' },
      { label: 'Analyst Onboarding Time', value: '-45%', change: 'reduction' },
      { label: 'User Satisfaction (CSAT)', value: '94.8%', change: 'top quartile' }
    ],
    deliverables: [
      { title: 'Interactive Design System', description: 'Over 80 reusable components in Figma with light mode tokens, tokens variables, and fluid typography' },
      { title: 'Responsive Dashboard Shell', description: 'High-density multi-pane workstation layout for 4K displays down to tablet interfaces' },
      { title: 'Interactive Prototype', description: 'Clickable user journeys demonstrating rapid triage of portfolio risk events' }
    ],
    techStack: ['Figma', 'React/Tailwind Design Tokens', 'JSON Schema', 'D3.js Layouts', 'UX Heuristics'],
    clientQuote: {
      text: 'The clarity and composure of this design transformed how our partners view real-time data. It is rare to find someone who understands both cutting-edge AI logic and pristine interface ergonomics.',
      author: 'Marcus Vance',
      role: 'Chief Investment Officer',
      company: 'FinPulse Capital'
    }
  },
  {
    id: 'proj-2',
    slug: 'global-ai-summit-poster-series',
    title: 'Cognitive Frontiers: World AI Symposium Poster Series',
    subtitle: 'Strategic editorial typography, visual composition, and print-ready creative campaign',
    category: 'Poster Creation',
    client: 'International AI Forum (Geneva)',
    year: '2025',
    duration: '3 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    summary: 'Designed a flagship series of 6 large-format international symposium posters combining mathematical precision, high-contrast monochrome and sapphire blue accents, and deep symbolic abstraction.',
    theChallenge: 'The symposium needed an iconic visual identity that stood out in global convention halls without reverting to overplayed tropes like glowing human brains or cyberpunk matrix wireframes.',
    theSolution: 'Formulated a visual language rooted in modernist Swiss graphic design and optical constructivism. Used structural grids, pure sapphire blue (#1D4ED8), clean negative space, and dimensional typography to evoke human-AI cognitive synergy.',
    methodology: [
      'Visual motif exploration centered around dimensional geometry and optical balance',
      'Harmonization of multi-language bilingual typography (English/French)',
      'Vector scaling and offset-lithography CMYK color separation prepress validation'
    ],
    metrics: [
      { label: 'Physical Print Circulation', value: '15,000+', change: 'distributed across 18 countries' },
      { label: 'Event Registration Uplift', value: '+38%', change: 'year over year' },
      { label: 'Design Excellence Recognition', value: 'Top 3', change: 'European Design Awards' }
    ],
    deliverables: [
      { title: '6 Large Format Keynote Posters', description: 'B1 & A0 print-ready CMYK master vector files with custom typography lockups' },
      { title: 'Digital Social Adaptation Kit', description: 'Aspect ratios for LinkedIn, X header, Instagram carousels, and stage LED displays' },
      { title: 'Brand Guidelines One-Sheet', description: 'Grid rules, margins, color breakdowns, and optical alignment specifications' }
    ],
    techStack: ['Adobe Illustrator', 'InDesign', 'Midjourney (Pre-Visualization)', 'Photoshop Master Retouching', 'Typography Grids'],
    clientQuote: {
      text: 'Our summit has never looked so prestigious. The posters commanded the conference floor with absolute authority and intellectual elegance.',
      author: 'Dr. Elena Rostova',
      role: 'Symposium Director',
      company: 'Global AI Summit'
    }
  },
  {
    id: 'proj-3',
    slug: 'kairo-quantum-brand-identity',
    title: 'Kairo Therapeutics: Brand Identity & Vector Logo Suite',
    subtitle: 'Minimalist corporate branding, dynamic geometric mark, and comprehensive brand book',
    category: 'Logo Generation',
    client: 'Kairo Bio-Intelligence',
    year: '2024',
    duration: '4 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Constructed an authoritative, medical-grade brand mark and holistic identity system for a clinical-stage biotechnology company leveraging generative molecular design.',
    theChallenge: 'Kairo needed to bridge credibility for clinical trials with the forward-looking innovation of computation, steering clear of juvenile bio-tech cliches like literal double-helix icons.',
    theSolution: 'Synthesized an architectural mark combining the Greek letter Kappa with interlocking molecular orbitals in deep royal navy and crisp electric blue. The mark retains optical balance at 16px favicons and 10-meter headquarters signage alike.',
    methodology: [
      'Comprehensive competitive audit across 40 biotechnology ventures',
      'Vector geometry optimization with golden-ratio circular grids',
      'Scalability stress testing across digital screens, embroidered lab coats, and investor decks'
    ],
    metrics: [
      { label: 'Series A Funding Secured', value: '$18.5M', change: 'post-rebrand' },
      { label: 'Brand Recognition Index', value: '+72%', change: 'among biotech investors' },
      { label: 'Asset Reusability', value: '100%', change: 'vector system' }
    ],
    deliverables: [
      { title: 'Primary & Monogram Logo System', description: 'Scalable SVG, EPS, and high-res master exports across 5 color configurations' },
      { title: 'Corporate Brand Style Guide', description: '42-page brand book outlining typography, color psychology, and application rules' },
      { title: 'Executive Collateral Suite', description: 'Pitch deck master templates, stationary, business cards, and digital badges' }
    ],
    techStack: ['Vector Geometry', 'Figma', 'Illustrator', 'Typography Systems', 'JSON Brand Tokens'],
    clientQuote: {
      text: 'The identity gave our scientific research immediate weight with venture investors and pharmaceutical partners. It felt established on day one.',
      author: 'Julian Thorne',
      role: 'Co-Founder & CEO',
      company: 'Kairo Therapeutics'
    }
  },
  {
    id: 'proj-4',
    slug: 'solaria-energy-storytelling-video',
    title: 'Solaria: Renewable Horizons Brand Film & Motion Narrative',
    subtitle: 'Generative storyboarding, cinematic pacing, voiceover synthesis, and final sound mixing',
    category: 'Video Creation & Editing',
    client: 'Solaria Grid Technologies',
    year: '2025',
    duration: '5 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    summary: 'Produced an impactful 90-second brand narrative film combining hyper-realistic generative video generation, meticulous timeline editing, dynamic typography callouts, and bespoke sound design.',
    theChallenge: 'Traditional live-action drone video shoots across 12 worldwide solar mega-plants were logistically impossible within a 5-week timeframe and tight launch budget.',
    theSolution: 'Pioneered an AI-native cinematic pipeline. Developed precision storyboards, generated photorealistic aerial camera maneuvers with controlled lens characteristics, and spliced them seamlessly with studio sound design and voice narration.',
    methodology: [
      'Narrative scriptwriting and visual pacing storyboard development',
      'Scene-by-scene motion generation with consistent lighting and atmosphere continuity',
      'Post-production color grading, frame stabilization, and 4K upscaling'
    ],
    metrics: [
      { label: 'Video Production Cost', value: '-78%', change: 'vs. traditional shoot' },
      { label: 'Total Video Views', value: '820K+', change: 'across social & web' },
      { label: 'Investor Engagement Rate', value: '4.9x', change: 'above benchmark' }
    ],
    deliverables: [
      { title: '90-Second 4K Master Brand Film', description: 'Full cinematic cut with color grade and multi-channel audio mix' },
      { title: '15s & 30s Social Cutdowns', description: 'Vertical 9:16 and 1:1 edits optimized for LinkedIn and executive conference screens' },
      { title: 'Complete Storyboard Ledger', description: '36-frame narrative arc detailing camera focal lengths, cues, and lighting parameters' }
    ],
    techStack: ['Runway Gen-3', 'Luma Dream Machine', 'DaVinci Resolve Studio', 'ElevenLabs (Voice Direction)', 'Premiere Pro'],
    clientQuote: {
      text: 'Our stakeholders were stunned by the cinematic quality. Nobody believed this was delivered in five weeks without flying film crews to three continents.',
      author: 'Claire Montrose',
      role: 'VP of Communications',
      company: 'Solaria Grid'
    }
  },
  {
    id: 'proj-5',
    slug: 'chrono-architectures-visual-art',
    title: 'Chrono Architectures: Generative Spatial Art Installation',
    subtitle: 'High-resolution digital art series exploring speculative sustainable megastructures',
    category: 'Digital & Visual Art',
    client: 'Nordic Centre for Architecture',
    year: '2024',
    duration: '4 Weeks',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    summary: 'Created an acclaimed digital exhibition of 12 monumental speculative architectural pieces, blending organic biomimicry with classical brutalist form and serene natural illumination.',
    theChallenge: 'The museum curators required artwork that engaged serious architects and civil engineers while remaining deeply mesmerizing for general museum visitors.',
    theSolution: 'Iterated through hundreds of compositional studies focusing on realistic atmospheric depth, ray-traced shadows, and concrete texture fidelity. Rendered to ultra-large 16K exhibition scale using multi-pass latent upscalers.',
    methodology: [
      'Architectural drafting of structural massing and perspective grids',
      'Latent diffusion composition with bespoke control nets for physical scale fidelity',
      'Artisanal digital paint-over for micro-texture refinement and specular reflections'
    ],
    metrics: [
      { label: 'Exhibition Visitors', value: '62,000+', change: '3-month run' },
      { label: 'Limited Edition Fine Art Prints', value: '100%', change: 'sold out' },
      { label: 'Critical Praise', value: 'Featured', change: 'Architectural Digest' }
    ],
    deliverables: [
      { title: '12 Master Ultra-HD Fine Art Canvases', description: '16K resolution museum-grade files optimized for archival giclée printing' },
      { title: 'Exhibition Catalog Layout', description: 'High-contrast typography book detailing the speculative ecological engineering premise' },
      { title: 'Ambient Motion Art Loops', description: 'Slow-evolving 60fps dynamic displays for 85-inch digital gallery installations' }
    ],
    techStack: ['Midjourney v6', 'ComfyUI (Custom Workflows)', 'Photoshop Painting', 'Magnific AI Upscaling', 'Color Balance Calibration'],
    clientQuote: {
      text: 'A profound exploration of where spatial imagination and computational artistry intersect. The textures and light quality are breathtaking.',
      author: 'Henrik Lindqvist',
      role: 'Chief Curator',
      company: 'Nordic Centre for Architecture'
    }
  },
  {
    id: 'proj-6',
    slug: 'techventures-youtube-high-ctr-thumbnails',
    title: 'TechVentures: High-CTR YouTube Master Thumbnail System',
    subtitle: 'Conversion-driven visual hierarchy, expression curation, and split-test thumbnail suite',
    category: 'Thumbnail Creation',
    client: 'TechVentures Media (1.4M Subscribers)',
    year: '2025',
    duration: 'Ongoing / 12 Weeks',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Engineered a repeatable, psychology-backed thumbnail production system for a tier-one tech channel, boosting click-through rates from 5.1% to 11.4% across 30 long-form videos.',
    theChallenge: 'With algorithmic competition intensifying, previous hand-made thumbnails lacked visual punch, consistent color hierarchy, and focal contrast, causing viewer scroll-past.',
    theSolution: 'Built a systematic framework: 3-point visual focal points, isolated high-contrast foreground subjects, bold sans-serif text limited to 3 words, and custom color-theory lighting that pops on mobile feeds.',
    methodology: [
      'Quantitative heatmap analysis of viewer eye-tracking on mobile YouTube feeds',
      'Multi-variant thumbnail generation testing 3 color schemes and 2 emotional expressions per video',
      'Automated batch preparation pipeline with standardized aspect ratios and compression checks'
    ],
    metrics: [
      { label: 'Average Video CTR', value: '11.4%', change: 'up from 5.1%' },
      { label: 'First 48h Impressions', value: '+140%', change: 'algorithmic push' },
      { label: 'Channel Subscriber Growth', value: '+220K', change: 'in 90 days' }
    ],
    deliverables: [
      { title: '30 High-Performing Thumbnails', description: 'Delivered in dual A/B test variations with customized mobile-contrast grading' },
      { title: 'Thumbnail Design Template Kit', description: 'Modular PSD and Figma canvas with safe zones, title overlays, and color grade presets' },
      { title: 'CTR Analysis Analytics Sheet', description: 'Comprehensive metric tracking correlating design choices with view performance' }
    ],
    techStack: ['Adobe Photoshop', 'Figma', 'Generative Subject Isolation', 'Color Grading', 'YouTube Studio A/B Test Suite'],
    clientQuote: {
      text: 'Our CTR doubled in under three weeks. This is not just pretty pictures—it is an exact science of viewer psychology and visual dominance.',
      author: 'David Vance',
      role: 'Lead Creator & Founder',
      company: 'TechVentures Media'
    }
  },
  {
    id: 'proj-7',
    slug: 'autoflow-multi-agent-procurement',
    title: 'AutoFlow: Autonomous Multi-Agent Enterprise Procurement Engine',
    subtitle: 'Multi-LLM agent orchestration, JSON schema validation, and ERP system integration',
    category: 'Agent Development',
    client: 'LogisCore Global Supply',
    year: '2025',
    duration: '8 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    summary: 'Architected and deployed an autonomous 4-agent cognitive workflow that monitors supplier quotes, parses unstructured invoices, evaluates contractual risk, and triggers automated PO generation.',
    theChallenge: 'LogisCore supply team spent 1,200 hours monthly manually checking PDF supplier quotes across 40 vendors, leading to missed volume discounts and delayed manufacturing schedules.',
    theSolution: 'Engineered a resilient agent collective with tool-calling permissions: Parser Agent, Contract Auditor Agent, Price Comparison Agent, and ERP Committer Agent with strict human approval thresholds for transactions over $25,000.',
    methodology: [
      'Decomposition of procurement steps into deterministic vs. cognitive probabilistic tasks',
      'JSON schema contract enforcement to prevent hallucinated supplier quantities',
      'Circuit breakers and telemetry logging for 100% auditability'
    ],
    metrics: [
      { label: 'Procurement Cycle Time', value: '4 mins', change: 'down from 48 hours' },
      { label: 'Direct Cost Savings', value: '$340K', change: 'captured volume tiers' },
      { label: 'Parsing Accuracy Rate', value: '99.7%', change: 'production verified' }
    ],
    deliverables: [
      { title: 'Multi-Agent Orchestration Core', description: 'Modular Python/TypeScript backend with asynchronous tool-use handlers and retry queues' },
      { title: 'Human-in-the-Loop Audit Dashboard', description: 'Clean administrative UI for supply managers to review edge-case flags in real time' },
      { title: 'ERP & REST Webhook Adapters', description: 'Secure JSON-based integration connectors for SAP and internal SQL databases' }
    ],
    techStack: ['Python', 'LangGraph / Agent Tools', 'TypeScript/Node', 'JSON Schema Validation', 'Docker', 'PostgreSQL'],
    clientQuote: {
      text: 'AutoFlow has saved our operations team thousands of hours. The agent accuracy and audit logging gave our compliance officers complete confidence.',
      author: 'Sarah Jenkins',
      role: 'Chief Operating Officer',
      company: 'LogisCore Global'
    }
  }
];
