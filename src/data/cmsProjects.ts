import { Project } from '../types';

export const CMS_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'finpulse-ai-analytics-dashboard',
    title: 'FinPulse: Financial Intelligence & Risk Analytics Dashboard',
    subtitle: 'Full-stack UI/UX design, modular component system, and responsive web workflows',
    category: 'UI/UX Designing',
    client: 'FinPulse Capital',
    year: '2025',
    duration: '6 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Designed and built a modern, intuitive desktop and mobile web dashboard for a financial intelligence platform, turning dense financial data and market forecasts into clean, easy-to-read interactive charts.',
    theChallenge: 'Financial analysts were buried under complicated spreadsheets, fragmented macroeconomic feeds, and cluttered layouts that caused fatigue and delayed critical portfolio decisions during market volatility.',
    theSolution: 'Built a clean, ergonomic design system with high-contrast blue, white, and dark tones adhering to accessibility standards. Designed modular dashboard cards, quick-filter widgets, and interactive charts that make finding insights effortless.',
    methodology: [
      'In-depth interviews with quantitative analysts to identify daily workflow bottlenecks',
      'Restructuring information architecture so primary metrics are visible at a glance',
      'Rapid prototype iteration using high-fidelity Figma components and interactive states',
      'Usability testing under simulated high-volume market trading sessions'
    ],
    metrics: [
      { label: 'Analysis Speed', value: '+64%', change: 'faster task completion' },
      { label: 'Onboarding Time', value: '-45%', change: 'easier for new analysts' },
      { label: 'User Satisfaction', value: '94.8%', change: 'positive analyst rating' }
    ],
    deliverables: [
      { title: 'Interactive Design System', description: 'Over 80 reusable components in Figma with light mode tokens, fluid typography, and clear documentation.' },
      { title: 'Responsive Dashboard Layout', description: 'Clean multi-pane interface optimized for large desktop monitors down to tablet and mobile screens.' },
      { title: 'Clickable Prototype', description: 'Interactive user journeys demonstrating fast portfolio risk reviews and automated alerts.' }
    ],
    techStack: ['Figma', 'React/Tailwind Design Tokens', 'JSON Schema', 'D3.js Charts', 'UX Heuristics'],
    clientQuote: {
      text: 'The clarity and simplicity of this dashboard transformed how our team views real-time data. It is rare to find someone who understands both complex technical logic and intuitive user interface design.',
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
    summary: 'Designed a flagship series of 6 large-format symposium posters combining geometric precision, bold sapphire accents, and clean negative space to present AI innovation with true intellectual elegance.',
    theChallenge: 'The conference organizers wanted an iconic visual identity that commanded attention in international convention halls without relying on overused clichés like glowing humanoid robots or matrix code.',
    theSolution: 'Created a visual identity inspired by Swiss modernist graphic design. Used structured geometric grids, sapphire blue (#1D4ED8), clean typography, and spatial harmony to communicate human and machine collaboration.',
    methodology: [
      'Visual concept exploration focusing on geometric balance and optical contrast',
      'Harmonization of bilingual typography (English and French) for international readability',
      'Vector scaling and prepress CMYK color separation checks for commercial lithographic printing'
    ],
    metrics: [
      { label: 'Printed Posters', value: '15,000+', change: 'distributed across 18 countries' },
      { label: 'Registration Growth', value: '+38%', change: 'year-over-year increase' },
      { label: 'Design Recognition', value: 'Top 3', change: 'European Design Awards finalist' }
    ],
    deliverables: [
      { title: '6 Large-Format Keynote Posters', description: 'Print-ready B1 and A0 master vector files with custom typography lockups.' },
      { title: 'Digital Social Adaptation Kit', description: 'Sized graphics for LinkedIn carousels, X banners, and main-stage LED displays.' },
      { title: 'Visual Guidelines One-Sheet', description: 'Clear grid rules, margin specs, and color formulas for event staff.' }
    ],
    techStack: ['Adobe Illustrator', 'InDesign', 'Midjourney (Concept Art)', 'Photoshop Retouching', 'Grid Systems'],
    clientQuote: {
      text: 'Our summit has never looked so prestigious. The posters commanded the conference floor with genuine authority and visual elegance.',
      author: 'Dr. Elena Rostova',
      role: 'Symposium Director',
      company: 'Global AI Summit'
    }
  },
  {
    id: 'proj-3',
    slug: 'kairo-quantum-brand-identity',
    title: 'Kairo Therapeutics: Brand Identity & Vector Logo Suite',
    subtitle: 'Clean corporate branding, geometric mark, and comprehensive brand style book',
    category: 'Logo Generation',
    client: 'Kairo Bio-Intelligence',
    year: '2024',
    duration: '4 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Crafted a memorable, medical-grade brand mark and unified identity system for a clinical biotechnology company using generative algorithms for molecular discovery.',
    theChallenge: 'Kairo needed an authoritative brand that inspired clinical confidence among pharmaceutical partners while highlighting their technological edge, avoiding tired clichés like literal DNA spirals.',
    theSolution: 'Developed an architectural vector mark combining clean circular geometry with interlocking molecular motifs in deep royal navy and electric blue. The mark remains sharp at 16px favicons and 10-meter building signage alike.',
    methodology: [
      'Competitive landscape audit across 40 biotechnology and healthtech ventures',
      'Vector geometry optimization ensuring visual balance across light and dark backgrounds',
      'Real-world testing across investor slide decks, lab coats, digital platforms, and packaging'
    ],
    metrics: [
      { label: 'Series A Funding', value: '$18.5M', change: 'secured following rebrand' },
      { label: 'Brand Recognition', value: '+72%', change: 'among biotech investors' },
      { label: 'System Consistency', value: '100%', change: 'across all digital & print assets' }
    ],
    deliverables: [
      { title: 'Primary & Monogram Logo System', description: 'Scalable SVG, EPS, and high-resolution master exports across multiple color variations.' },
      { title: 'Corporate Brand Style Guide', description: 'A 42-page brand book detailing font choices, color palettes, and clear application rules.' },
      { title: 'Executive Collateral Suite', description: 'Polished slide deck templates, letterheads, business cards, and digital signatures.' }
    ],
    techStack: ['Vector Geometry', 'Figma', 'Illustrator', 'Typography Systems', 'Design Tokens'],
    clientQuote: {
      text: 'The brand identity gave our scientific research immediate weight with venture investors and pharmaceutical partners. It made us look established on day one.',
      author: 'Julian Thorne',
      role: 'Co-Founder & CEO',
      company: 'Kairo Therapeutics'
    }
  },
  {
    id: 'proj-4',
    slug: 'solaria-energy-storytelling-video',
    title: 'Solaria: Renewable Horizons Brand Film & Motion Narrative',
    subtitle: 'Visual storyboarding, cinematic pacing, studio voiceovers, and dynamic sound design',
    category: 'Video Creation & Editing',
    client: 'Solaria Grid Technologies',
    year: '2025',
    duration: '5 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    summary: 'Produced an inspiring 90-second brand video combining generative cinematic visuals, seamless timeline editing, clean animated typography, and studio sound design.',
    theChallenge: 'Filming live drone footage across 12 solar energy installations worldwide was impossible within a 5-week launch window and limited budget.',
    theSolution: 'Built an AI-assisted video pipeline. Mapped out shot-by-shot storyboards, generated photorealistic aerial camera movements, and edited them alongside professional voice narration, sound effects, and kinetic titles in DaVinci Resolve.',
    methodology: [
      'Story scriptwriting and narrative visual arc development',
      'Scene-by-scene motion video generation with consistent lighting and atmosphere',
      'Post-production editing, color grading, frame stabilization, and 4K mastering'
    ],
    metrics: [
      { label: 'Cost Savings', value: '-78%', change: 'vs traditional drone film crew' },
      { label: 'Video Views', value: '820K+', change: 'across social and launch pages' },
      { label: 'Viewer Retention', value: '4.9x', change: 'above industry average' }
    ],
    deliverables: [
      { title: '90-Second 4K Master Brand Video', description: 'Full cinematic video with custom color grade, animated titles, and crisp audio mix.' },
      { title: '15s & 30s Social Cutdowns', description: 'Vertical 9:16 reels and 1:1 edits with burned-in subtitles for LinkedIn and mobile feeds.' },
      { title: 'Complete Storyboard Ledger', description: '36-frame visual deck detailing camera movements, lighting, and narrative cues.' }
    ],
    techStack: ['Runway Gen-3', 'Luma Dream Machine', 'DaVinci Resolve Studio', 'ElevenLabs Voiceover', 'Premiere Pro'],
    clientQuote: {
      text: 'Our team was stunned by the cinematic quality. Nobody believed this was delivered in five weeks without flying film crews to three continents.',
      author: 'Claire Montrose',
      role: 'VP of Communications',
      company: 'Solaria Grid'
    }
  },
  {
    id: 'proj-5',
    slug: 'chrono-architectures-visual-art',
    title: 'Chrono Architectures: Digital Art & Gallery Exhibition',
    subtitle: 'High-resolution digital art series exploring futuristic sustainable architecture',
    category: 'Digital & Visual Art',
    client: 'Nordic Centre for Architecture',
    year: '2024',
    duration: '4 Weeks',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    summary: 'Created an acclaimed digital exhibition of 12 speculative architectural pieces, blending organic biomimicry with classical forms and serene natural illumination.',
    theChallenge: 'The museum curators needed artwork that engaged professional architects and civil engineers while remaining deeply inspiring for the general public.',
    theSolution: 'Iterated through dozens of compositional studies focusing on realistic atmospheric depth, soft shadows, and concrete texture fidelity. Rendered to ultra-large 16K exhibition scale for museum prints.',
    methodology: [
      'Architectural perspective drafting and structural balance studies',
      'Generative concept synthesis with strict control over scale and realism',
      'Hand-finished digital brushwork for fine surface textures and lighting highlights'
    ],
    metrics: [
      { label: 'Exhibition Visitors', value: '62,000+', change: 'over 3-month museum run' },
      { label: 'Fine Art Prints', value: '100%', change: 'all limited prints sold out' },
      { label: 'Press Feature', value: 'Featured', change: 'in leading architecture journals' }
    ],
    deliverables: [
      { title: '12 Master Ultra-HD Fine Art Canvases', description: '16K resolution museum-grade files optimized for archival giclée printing.' },
      { title: 'Exhibition Catalog Layout', description: 'Clean typography booklet describing the environmental premises behind each design.' },
      { title: 'Ambient Motion Art Loops', description: 'Smooth video loops created for 85-inch digital gallery displays.' }
    ],
    techStack: ['Midjourney v6', 'ComfyUI', 'Photoshop Painting', 'Magnific AI Upscaling', 'Color Grading'],
    clientQuote: {
      text: 'A profound exploration of where spatial imagination and computational artistry meet. The lighting and textures are simply breathtaking.',
      author: 'Henrik Lindqvist',
      role: 'Chief Curator',
      company: 'Nordic Centre for Architecture'
    }
  },
  {
    id: 'proj-6',
    slug: 'techventures-youtube-high-ctr-thumbnails',
    title: 'TechVentures: High-CTR YouTube Master Thumbnail System',
    subtitle: 'Audience-tested visual packaging, high-contrast framing, and split-test thumbnail suite',
    category: 'Thumbnail Creation',
    client: 'TechVentures Media (1.4M Subscribers)',
    year: '2025',
    duration: 'Ongoing / 12 Weeks',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Engineered a repeatable, viewer-psychology thumbnail system for a top technology channel, boosting click-through rates from 5.1% to 11.4% across 30 long-form videos.',
    theChallenge: 'With fierce competition on YouTube feeds, older hand-made thumbnails were getting lost, lacking focal contrast and emotional punch on small phone screens.',
    theSolution: 'Built a systematic design framework: 3-point visual focal points, isolated high-contrast foreground subjects, bold readable typography limited to 3 words, and custom lighting designed to pop on dark-mode mobile screens.',
    methodology: [
      'Viewer gaze analysis to position faces and title keywords where viewers look first',
      'Dual A/B variations testing different color schemes and facial expressions per video',
      'Mobile stress testing to verify readability at small phone sizes before upload'
    ],
    metrics: [
      { label: 'Average CTR', value: '11.4%', change: 'up from 5.1% baseline' },
      { label: 'Initial 48h Impressions', value: '+140%', change: 'faster algorithmic pickup' },
      { label: 'Subscriber Growth', value: '+220K', change: 'in first 90 days' }
    ],
    deliverables: [
      { title: '30 High-Performing Thumbnails', description: 'Delivered in dual A/B test pairs with mobile-optimized contrast grading.' },
      { title: 'Thumbnail Design Template Kit', description: 'Modular PSD and Figma templates with safe zones and text styles.' },
      { title: 'CTR Analysis Tracking Sheet', description: 'Performance spreadsheet correlating design changes with YouTube view metrics.' }
    ],
    techStack: ['Adobe Photoshop', 'Figma', 'Generative Subject Isolation', 'Color Grading', 'YouTube Studio A/B Testing'],
    clientQuote: {
      text: 'Our click-through rate doubled in under three weeks. This is not just pretty graphics—it is a proven method for earning viewer attention on YouTube.',
      author: 'David Vance',
      role: 'Lead Creator & Founder',
      company: 'TechVentures Media'
    }
  },
  {
    id: 'proj-7',
    slug: 'autoflow-multi-agent-procurement',
    title: 'AutoFlow: Autonomous Multi-Agent Procurement & Invoice Engine',
    subtitle: 'Automated AI agent orchestration, structured data validation, and ERP system integration',
    category: 'Agent Development',
    client: 'LogisCore Global Supply',
    year: '2025',
    duration: '8 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    summary: 'Built and deployed an automated 4-agent workflow that monitors incoming supplier quotes, parses unstructured PDF invoices, checks pricing against contracts, and prepares automated purchase orders.',
    theChallenge: 'LogisCore’s supply team was spending over 1,200 hours each month manually reviewing PDF quotes from 40 suppliers, resulting in delayed orders and missed volume discounts.',
    theSolution: 'Engineered a multi-agent system with clear responsibilities: an Invoice Reader Agent, a Contract Verification Agent, a Price Comparison Agent, and an ERP Order Agent with automated human approval triggers for purchases over $25,000.',
    methodology: [
      'Decomposing procurement steps into predictable automated tasks and verification checks',
      'Strict JSON schema validation to guarantee 100% accuracy on prices and quantities',
      'Complete audit logging so managers can review any transaction in seconds'
    ],
    metrics: [
      { label: 'Review Time', value: '4 mins', change: 'down from 48 hours' },
      { label: 'Annual Cost Savings', value: '$340K', change: 'captured volume discount tiers' },
      { label: 'Data Accuracy', value: '99.7%', change: 'production verified' }
    ],
    deliverables: [
      { title: 'Multi-Agent Automation Core', description: 'Clean Python/TypeScript service running stateful workflows with retry queues and alerts.' },
      { title: 'Human Review Dashboard', description: 'Simple web interface for procurement managers to approve high-value transactions.' },
      { title: 'ERP & Database Connectors', description: 'Secure integrations connecting the agents to SAP and internal SQL databases.' }
    ],
    techStack: ['Python', 'LangGraph / Agent Tools', 'TypeScript/Node', 'JSON Schema Validation', 'Docker', 'PostgreSQL'],
    clientQuote: {
      text: 'AutoFlow has saved our operations team thousands of hours. The agent accuracy and audit logging gave our compliance officers complete confidence.',
      author: 'Sarah Jenkins',
      role: 'Chief Operating Officer',
      company: 'LogisCore Global'
    }
  },
  {
    id: 'proj-8',
    slug: 'novatech-ai-social-media-campaign',
    title: 'NovaTech: Generative Social Media Content & Carousel Campaign',
    subtitle: 'High-converting multi-platform social carousels, algorithmic engagement design, and visual storytelling',
    category: 'Social Media Posts',
    client: 'NovaTech AI Systems',
    year: '2025',
    duration: '4 Weeks',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    summary: 'Designed an editorial 40-post social media campaign across LinkedIn and Instagram, pairing structured visual carousels with sharp insights on enterprise generative AI that generated over 3.2M organic impressions.',
    theChallenge: 'NovaTech struggled to stand out on social media feeds with dry technical whitepapers and generic stock graphics that produced low engagement rates and inconsistent branding across platforms.',
    theSolution: 'Developed an eye-catching, modular social design system featuring clean sapphire gradients, dark mode typography cards, swipeable carousel infographics, and high-impact hooks engineered specifically for executive feeds.',
    methodology: [
      'Audience engagement analysis identifying high-retention carousel formats across LinkedIn and Instagram',
      'Creation of 8 modular social templates with standardized typography, aspect ratios, and safe margins',
      'Integration of custom AI diagrams and infographics that distill complex architectures into 10-second reads',
      'Comprehensive hashtag strategy, posting schedule, and engagement tracking framework'
    ],
    metrics: [
      { label: 'Total Impressions', value: '3.2M+', change: '100% organic reach' },
      { label: 'Engagement Rate', value: '6.8%', change: '3.4x industry average' },
      { label: 'Inbound Leads', value: '+185%', change: 'qualified executive inquiries' }
    ],
    deliverables: [
      { title: '40 Multi-Slide Social Carousels', description: 'Exported in high-res 1080x1350 and 1080x1080 formats for LinkedIn and Instagram.' },
      { title: 'Editable Figma Social Design System', description: 'Componentized design kit with pre-built slide layouts, metric badges, and quote callouts.' },
      { title: 'Content Distribution Playbook', description: 'Guidelines on hook copywriting, visual hierarchy, and publishing workflows.' }
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Generative Visual Systems', 'LinkedIn Analytics', 'Brand Architecture'],
    clientQuote: {
      text: 'The social campaign completely transformed our digital brand presence. Our carousel posts routinely get reshared by industry leaders, and our inbound pipeline has surged.',
      author: 'Elena Rostova',
      role: 'VP of Marketing & Growth',
      company: 'NovaTech AI Systems'
    }
  }
];
