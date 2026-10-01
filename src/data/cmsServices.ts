import { ServiceItem } from '../types';

export const CMS_SERVICES: ServiceItem[] = [
  {
    id: 'srv-agents',
    slug: 'autonomous-ai-agents',
    title: 'Autonomous AI Agent Architecture',
    tagline: 'Custom goal-directed agent collectives that execute real-world enterprise operations.',
    description: 'Transform labor-intensive multi-step business workflows into self-healing, tool-enabled AI agent systems. From automated supply chain triage to multi-source financial report compilation, I build resilient agents with deterministic schema verification and human-in-the-loop safety gates.',
    category: 'Agent Development',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '3 - 6 Weeks',
    badge: 'High Enterprise ROI',
    businessImpact: 'Reduces operational overhead by 70-85% while cutting task completion turnaround from days to minutes.',
    metrics: [
      { label: 'Operational Speedup', value: '8.4x', change: 'faster pipeline throughput' },
      { label: 'Manual Effort Reduction', value: '78%', change: 'automated triage & analysis' },
      { label: 'Deterministic Accuracy', value: '99.2%', change: 'schema validated outputs' }
    ],
    theChallenge: 'Modern enterprises suffer from fragmented manual operations—employees spend hundreds of hours copy-pasting data between legacy ERPs, CRM tickets, and unstructured email chains, creating severe bottlenecks, hallucinations, and compliance vulnerabilities.',
    theSolution: 'I architect multi-agent systems using LangGraph, Python microservices, and deterministic tool declarations. Agents execute coordinated plans, utilize persistent memory checkpoints, automatically retry recoverable errors, and escalate anomalies through a modern web review dashboard.',
    methodology: [
      'Comprehensive workflow audit, tool boundary definition, and fail-safe policy mapping',
      'System prompt engineering and structured JSON Schema input/output contracts',
      'State-machine orchestration with checkpointing, rollback, and human approval gates',
      'Telemetry integration with latency monitoring, token consumption analytics, and automated evals'
    ],
    deliverables: [
      'Multi-Agent System Blueprint & Tool Definitions',
      'Python/TypeScript Orchestration Microservice',
      'REST & Webhook Connectors to your ERP/CRM/Database',
      'Telemetry Monitoring Dashboard & Human Audit Interface',
      'Comprehensive Deployment & Failure Recovery Runbook'
    ],
    deliverablesDetails: [
      {
        title: 'Multi-Agent Blueprint',
        description: 'Complete architecture diagram detailing agent roles, tool definitions, inter-agent messaging, and security rules.'
      },
      {
        title: 'Orchestration Microservice',
        description: 'Hardened Dockerized Node/Python microservice running stateful graph workflows with memory and retries.'
      },
      {
        title: 'Enterprise Connectors',
        description: 'Bidirectional webhooks and authenticated API adapters integrating directly into your existing CRM, SQL, and internal tools.'
      },
      {
        title: 'Audit & Review Dashboard',
        description: 'Responsive web portal where operational teams can supervise pending actions, inspect agent logs, and approve high-stakes transactions.'
      },
      {
        title: 'Runbook & SLA Documentation',
        description: 'Exhaustive operations guide with environment setups, schema migration policies, and step-by-step incident resolution instructions.'
      }
    ],
    toolsUsed: ['LangGraph', 'Python', 'TypeScript', 'Docker', 'PostgreSQL', 'JSON Schema'],
    clientQuote: {
      text: 'The autonomous agent collective deployed by Renuka slashed our weekly logistics audit cycle from 4 days of manual spreadsheet reconciliation to under 20 minutes of automated execution with zero hallucinations.',
      author: 'David Sterling',
      role: 'VP of Operations',
      company: 'LogiCore Logistics'
    }
  },
  {
    id: 'srv-vibe-coding-uiux',
    slug: 'vibe-coding-prototyping',
    title: 'Vibe Coding & Full-Stack Rapid Prototyping',
    tagline: 'From napkin concept to interactive, production-ready web application in days.',
    description: 'Bypassing months of sluggish software development cycles. Leveraging modern conversational IDEs, clean React/Tailwind architectures, and multimodal design feedback loops, I rapidly build and deploy functional, ergonomic web apps and client dashboards.',
    category: 'UI/UX & Prototyping',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 3 Weeks',
    badge: 'Rapid Turnaround',
    businessImpact: 'Launches your MVP into the market 5x to 10x faster than traditional software development agencies.',
    metrics: [
      { label: 'Time-to-Market', value: '10x', change: 'faster than traditional agencies' },
      { label: 'Production Code Quality', value: '100%', change: 'TypeScript strict compilation' },
      { label: 'Design System Coverage', value: '60+', change: 'modular reusable components' }
    ],
    theChallenge: 'Startups and enterprise innovation teams waste quarters discussing wireframes while paying exorbitant agency retainers for slow code, often resulting in outdated deliverables before they even reach real users.',
    theSolution: 'By pairing cutting-edge conversational coding environments with a battle-tested design system of high-contrast Blue/White/Black tokens, I translate raw concepts into fully responsive, typed web applications with working state and clean APIs in days.',
    methodology: [
      'Rapid discovery session to lock in user journeys, data entities, and visual direction',
      'Instant component scaffolding using modular TypeScript and Tailwind CSS styles',
      'Full-stack API layer implementation with resilient error boundaries and local mock fallbacks',
      'Continuous automated deployment to high-availability serverless containers'
    ],
    deliverables: [
      'Production-Ready Responsive React / Vite / Next.js Web App',
      'Tailwind CSS Ergonomic Component System (Blue/White/Black palette)',
      'Backend REST / PHP / Node API integration layers',
      'Clean TypeScript interfaces & JSON data models',
      'Live Containerized Deployment on Cloud Run or Vercel'
    ],
    deliverablesDetails: [
      {
        title: 'Full-Stack React SPA',
        description: 'Single-page web application featuring modular components, typed hooks, client routing, and sub-second load times.'
      },
      {
        title: 'Tailwind Design System',
        description: 'Complete UI component library matching modern aesthetic standards with crisp typography, focus states, and zero visual fluff.'
      },
      {
        title: 'REST / Backend Endpoints',
        description: 'Structured API routes handling data persistence, validation, sanitization, and session state.'
      },
      {
        title: 'Cloud Deployment',
        description: 'Turnkey continuous deployment pipeline with preview URLs, custom domain setup, and automated SSL termination.'
      }
    ],
    toolsUsed: ['Cursor', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node / Express'],
    clientQuote: {
      text: 'We handed Renuka a 2-page brief on Monday and had an enterprise-ready dashboard live in front of investors by Friday afternoon. The build speed and quality were frankly unbelievable.',
      author: 'Evelyn Brooks',
      role: 'Co-Founder & CTO',
      company: 'Aura Health Technologies'
    }
  },
  {
    id: 'srv-branding-identity',
    slug: 'brand-identity-design-systems',
    title: 'Brand Identity & Generative Design Systems',
    tagline: 'Distinctive, corporate-grade branding that commands investor and customer authority.',
    description: 'Crafting comprehensive visual identity systems that marry geometric precision with AI-driven visual coherence. I develop vector logos, design tokens, typography lockups, and holistic brand books tailored for forward-thinking technology and enterprise leaders.',
    category: 'Logo & Brand Identity',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '2 - 4 Weeks',
    badge: 'Complete Identity',
    businessImpact: 'Positions your brand among industry leaders, increasing investor pitch conversion and customer trust.',
    metrics: [
      { label: 'Investor Pitch Conversion', value: '+42%', change: 'increase post-rebrand' },
      { label: 'Asset Consistency', value: '100%', change: 'cross-platform token ledger' },
      { label: 'Brand Recall Index', value: '88%', change: 'above benchmark' }
    ],
    theChallenge: 'Many high-growth tech companies have brilliant engineering but look amateurish, relying on generic Canva templates or fragmented visual aesthetics that fail to inspire institutional investor confidence.',
    theSolution: 'I create unified corporate identity frameworks built upon mathematical grids, distinctive chromatic palettes (deep sapphire, crisp white, obsidian), and high-resolution generative motifs that scale effortlessly from mobile app icons to stadium billboards.',
    methodology: [
      'Strategic market positioning analysis and competitor visual landscape audit',
      'Geometric vector mark development with optical kerning and ratio calibration',
      'System design token definition (hex values, typography scales, safe spacing rules)',
      'Real-world asset stress testing across digital displays, pitch decks, and physical merchandise'
    ],
    deliverables: [
      'Primary, Monogram, and Responsive Vector Logo Suite (SVG/EPS)',
      'Design Token Ledger (Color hierarchies, spacing ratios, type scales)',
      'Corporate Brand Style Guide (PDF Master + Figma Source)',
      'Executive Stationary, Pitch Deck Templates & Social Media Kits',
      'Generative Visual Asset Prompting Guidelines for Marketing Teams'
    ],
    deliverablesDetails: [
      {
        title: 'Master Vector Logo Suite',
        description: 'Pixel-perfect scalable vector assets including primary horizontal lockup, stacked mark, and 16px favicon.'
      },
      {
        title: 'Comprehensive Brand Book',
        description: 'A 40-page definitive manual outlining typography hierarchies, clear-space zones, incorrect usage examples, and editorial tone.'
      },
      {
        title: 'Design Token System',
        description: 'Exportable JSON and CSS variable design tokens ready for direct import into frontend engineering repositories.'
      },
      {
        title: 'Investor Pitch & Collateral Suite',
        description: 'High-impact slide decks, one-pagers, letterheads, and social media header templates ready for executive outreach.'
      }
    ],
    toolsUsed: ['Figma', 'Adobe Illustrator', 'InDesign', 'Photoshop', 'Vector Geometry'],
    clientQuote: {
      text: 'Our Series A lead investor explicitly remarked on how polished and institutional our brand identity felt. AI Vision Works gave our young company the visual gravity of a Fortune 500 firm.',
      author: 'Julian Chen',
      role: 'Chief Executive Officer',
      company: 'QuantumSync Systems'
    }
  },
  {
    id: 'srv-video-production',
    slug: 'video-creation-editing',
    title: 'Promotional & Storytelling Video Production',
    tagline: 'Cinematic brand films, product launches, and narrative motion graphics.',
    description: 'Directing and editing world-class commercial videos utilizing generative video generation, meticulous timeline editing, sound design, and narrative pacing. Deliver breathtaking visual storytelling without the astronomical overhead of global location shoots.',
    category: 'Video Creation & Editing',
    coverImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '2 - 4 Weeks',
    badge: 'Cinematic Quality',
    businessImpact: 'Drives viral social engagement, elevates keynote presentations, and quadruples investor deck completion rates.',
    metrics: [
      { label: 'Audience Retention', value: '78%', change: 'average completion rate' },
      { label: 'Production Cost Savings', value: '82%', change: 'vs on-location film crew' },
      { label: 'Turnaround Speed', value: '3 Weeks', change: 'concept to 4K delivery' }
    ],
    theChallenge: 'Traditional video production costs $50,000 to $150,000, takes 3 to 6 months of crew scheduling and location permits, and yields only a single fixed-cut video that cannot be quickly edited for different channels.',
    theSolution: 'I orchestrate cutting-edge generative video pipelines (Runway Gen-3, Luma Dream Machine) with professional timeline post-production in DaVinci Resolve, layering bespoke sound design, studio voice synthesis, and dynamic title graphics at a fraction of the cost.',
    methodology: [
      'Narrative scriptwriting and structured three-act visual storyboard conception',
      'Generative sequence rendering with prompt consistency matching and camera motion control',
      'Non-linear editing in DaVinci Resolve with rhythmic pacing and beat-matched cuts',
      'Multi-stem audio master: ambient beds, foley sound effects, and voice mastering'
    ],
    deliverables: [
      '4K Cinematic Master Brand Film (60 - 90 Seconds)',
      'Social Cutdowns (15s & 30s vertical and square formats)',
      'Narrative Scriptwriting and Visual Storyboard Arc',
      'Multi-track Sound Mixing, Foley Effects & Studio Voiceover',
      'Broadcast-Ready Color Grading & Motion Typography'
    ],
    deliverablesDetails: [
      {
        title: 'Master 4K Brand Film',
        description: 'Full-length cinematic video with professional color grading, cinematic sound mix, and 4K ProRes export.'
      },
      {
        title: 'Multi-Platform Social Edits',
        description: 'Vertical 9:16 reels/shorts and 1:1 square versions with burned-in animated subtitles optimized for silent viewing.'
      },
      {
        title: 'Full Audio Stem Package',
        description: 'Separated audio tracks (voiceover, score, SFX) for modular remixing across future product launches.'
      },
      {
        title: 'Custom Motion Titles',
        description: 'Tailored kinetic typography and logo reveal animations built to match your brand guidelines.'
      }
    ],
    toolsUsed: ['Runway Gen-3', 'Luma Dream Machine', 'DaVinci Resolve', 'Premiere Pro', 'ElevenLabs'],
    clientQuote: {
      text: 'The keynote video AI Vision Works produced received a spontaneous standing ovation at our annual developer summit. It captured the soul of our product with Hollywood-level artistry.',
      author: 'Elena Rostova',
      role: 'Head of Global Brand',
      company: 'OmniCompute Cloud'
    }
  },
  {
    id: 'srv-visual-art-posters',
    slug: 'digital-visual-art-posters',
    title: 'Digital & Visual Art, Poster & Editorial Visuals',
    tagline: 'Exhibition-grade fine art, keynote posters, and captivating publication visuals.',
    description: 'High-concept digital artwork and print-ready poster campaigns that cut through digital noise. Combining mathematical compositions, sophisticated lighting models, and hand-finished digital detailing to produce visuals worthy of international exhibitions and major media covers.',
    category: 'Digital & Visual Art',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 3 Weeks',
    badge: 'Fine Craft',
    businessImpact: 'Captivates audience attention instantly, transforming technical concepts into memorable cultural artifacts.',
    metrics: [
      { label: 'Print Resolution', value: '16K', change: 'ultra-crisp gallery fidelity' },
      { label: 'Visual Engagement', value: '+140%', change: 'higher click & share rates' },
      { label: 'Design Turnaround', value: '7 Days', change: 'from theme to final print files' }
    ],
    theChallenge: 'Most editorial and event marketing looks sterile and cookie-cutter. Generic stock photography fails to communicate sophisticated technological concepts, leaving conference halls and article headers feeling uninspired.',
    theSolution: 'I create museum-grade digital artwork and typographic poster series that blend surrealist spatial geometries, ray-traced lighting models, and hand-tuned digital brushwork, creating commanding visuals that audiences want to display on their walls.',
    methodology: [
      'Thematic dissection of the conceptual narrative and spatial framing principles',
      'Algorithmic prompt generation and latent space exploration for non-trivial compositions',
      'High-dynamic-range upscaling to 16,000+ pixels with micro-texture preservation',
      'CMYK offset print prepress proofing with precise ink-bleed margins and pantone calibration'
    ],
    deliverables: [
      'Ultra-High Resolution Master Artwork (up to 16K Print Ready)',
      'Event & Symposium Poster Series (B1, A0, and Digital Billboards)',
      'Editorial Illustrations for Research Papers and Articles',
      'Layered Multi-Channel PSD Masters with Color Separation',
      'Digital Display Animations (Ambient Gallery Loops)'
    ],
    deliverablesDetails: [
      {
        title: 'Large-Format Print Masters',
        description: 'A0, B1, and 300 DPI CMYK ready-to-print vector and raster files with calibrated color profiles for commercial offset printing.'
      },
      {
        title: 'Multi-Layer PSD Sources',
        description: 'Organized master files separating foreground typography, midground subjects, and lighting overlays for infinite adjustability.'
      },
      {
        title: 'Editorial Article Visuals',
        description: 'Cropped, responsive image sets sized for web headers, Substack covers, Twitter cards, and academic journal publications.'
      },
      {
        title: 'Ambient Gallery Loops',
        description: 'Seamless 60fps video loops designed for digital signage, lobby displays, and conference background staging.'
      }
    ],
    toolsUsed: ['Midjourney v6', 'ComfyUI', 'Photoshop', 'Magnific AI', 'Illustrator'],
    clientQuote: {
      text: 'The keynote posters for our AI ethics symposium became instant collector items. Attendees were literally taking them down from the venue walls to frame them at home.',
      author: 'Prof. Henrik Lindqvist',
      role: 'Symposium Director',
      company: 'Nordic AI Society'
    }
  },
  {
    id: 'srv-youtube-thumbnails',
    slug: 'youtube-thumbnail-packaging',
    title: 'High-CTR YouTube Packaging & Visual Psychology',
    tagline: 'Thumbnails and packaging systems engineered to maximize click-through velocity.',
    description: 'Strategic packaging for high-profile creators, tech founders, and media channels. Using gaze-tracking principles, contrast theory, and expression synthesis, I create thumbnail systems that consistently break through algorithmic noise and drive massive viewer retention.',
    category: 'Thumbnail Creation',
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 2 Weeks / Ongoing',
    badge: 'Audience Growth',
    businessImpact: 'Consistently boosts video click-through rates by 40% to 120%, unlocking exponential subscriber growth.',
    metrics: [
      { label: 'Average CTR Boost', value: '+68%', change: 'over previous channel baseline' },
      { label: 'A/B Test Win Rate', value: '87%', change: 'outperformed control thumbnails' },
      { label: 'Initial 24h Velocity', value: '2.5x', change: 'faster algorithmic pickup' }
    ],
    theChallenge: 'Creators and corporate channels spend dozens of hours producing high-value video content only to suffer lackluster views because their thumbnails are low-contrast, cluttered, or lack emotional tension on small mobile feeds.',
    theSolution: 'I design thumbnails using psychological visual cues: high-contrast 3-point edge lighting, exaggerated facial expression grading, minimal high-impact copy (max 3 words), and rigorous A/B variant testing on small phone screens before release.',
    methodology: [
      'Gaze-pathway mapping and visual focal point anchoring',
      'Advanced subject isolation, hair refinement, and custom skin specular enhancement',
      'Contrast and color grading optimized specifically for dark-mode YouTube mobile feeds',
      'Split-test variant generation (emotional vs curiosity angles) for algorithmic testing'
    ],
    deliverables: [
      'Batch of Split-Test YouTube Thumbnails (Dual Variants)',
      'High-Contrast Mobile Optimization Matrix',
      'Custom Title & Packaging Synergy Analysis',
      'Reusable Modular Photoshop & Figma Master PSD Templates',
      'Monthly CTR Performance Review & Optimization Recommendations'
    ],
    deliverablesDetails: [
      {
        title: 'Dual A/B Thumbnail Pairs',
        description: 'Two strategically distinct variants per video (e.g. curiosity-driven vs high-stakes question) formatted for YouTube Test & Compare.'
      },
      {
        title: 'Mobile Stress Test Previews',
        description: 'Simulated views of the thumbnail inside YouTube search, recommended sidebar, and 4-inch mobile screen sizes.'
      },
      {
        title: 'Title-Thumbnail Synergy Matrix',
        description: '3 recommended title pairings per thumbnail to ensure viewer expectation matches video payoff and avoids clickbait bounce.'
      },
      {
        title: 'Master Layered PSD Templates',
        description: 'Complete Photoshop files with editable text effects, smart object face cutouts, and color grading adjustment layers.'
      }
    ],
    toolsUsed: ['Photoshop', 'Figma', 'Generative Subject Isolation', 'Color Grading'],
    clientQuote: {
      text: 'Switching to Renuka’s thumbnail packaging doubled our average view count within three weeks. Our videos now routinely crack the top 10% of YouTube algorithm recommendations.',
      author: 'Carter Walsh',
      role: 'Creator & Tech Host (850K subs)',
      company: 'Silicon Frontiers Media'
    }
  }
];

export const SERVICE_CATEGORIES = [
  'all',
  'Agent Development',
  'UI/UX & Prototyping',
  'Logo & Brand Identity',
  'Video Creation & Editing',
  'Digital & Visual Art',
  'Thumbnail Creation'
] as const;
