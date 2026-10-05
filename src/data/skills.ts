import { CoreSkill } from '../types';

export const CORE_SKILLS: CoreSkill[] = [
  {
    id: 'skill-prompt-eng',
    name: 'Prompt Engineering',
    level: 'Prompt Engineer & Architect',
    tagline: 'Making AI Models Give Accurate, Useful Answers Every Time',
    description: 'I design clear, structured prompts and instructions that guide AI models like Claude, ChatGPT, and Gemini to deliver precise, reliable results without guessing or making things up.',
    practicalApplications: [
      'Custom system prompts and AI instructions for businesses',
      'Structured AI data outputs (clean JSON, tables, and reports)',
      'Testing and refining prompts for high accuracy',
      'AI guardrails to prevent errors and off-topic answers',
      'Connecting AI models with company tools and databases',
      'Automating repetitive writing, analysis, and research tasks'
    ],
    toolsAndFrameworks: ['Claude 3.7', 'GPT-4o', 'Gemini 2.5', 'DeepSeek', 'JSON Schema', 'Prompt Testing Tools'],
    businessValue: 'Saves hours of manual work, improves answer accuracy to 99%+, and keeps your AI safe and dependable.'
  },
  {
    id: 'skill-branding',
    name: 'Branding & Visual Identity',
    level: 'Brand Designer & Creative Director',
    tagline: 'Memorable Logos, Color Palettes & Design Systems',
    description: 'I craft clean, modern brand identities that help businesses stand out and connect with their audience. From logos and typography to complete brand guidelines, I make sure your company looks polished across every touchpoint.',
    practicalApplications: [
      'Logo design and visual brand identity',
      'Color palettes, typography rules, and font pairings',
      'Complete brand guidelines and style books',
      'Marketing collateral, social media banners, and pitch decks',
      'Design systems for apps and websites (Figma components)',
      'Packaging, product mockups, and business cards'
    ],
    toolsAndFrameworks: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Tailwind CSS'],
    businessValue: 'Builds instant trust with customers, strengthens brand recall, and gives your team a consistent visual system.'
  },
  {
    id: 'skill-storyboarding',
    name: 'Storyboarding & Narrative Design',
    level: 'Visual Storyteller & Director',
    tagline: 'Turning Ideas into Clear, Engaging Visual Stories',
    description: 'Before creating a video or launch campaign, I map out each scene shot by shot. This helps teams visualize the story, plan the pacing, and align on the creative vision before spending budget on production.',
    practicalApplications: [
      'Shot-by-shot video storyboards and visual concepts',
      'Product launch and marketing video planning',
      'Pre-visualization video animatics with voiceover',
      'Explainer video scripts and visual flow',
      'High-retention social media video hooks',
      'Pitch deck visual narratives for startups'
    ],
    toolsAndFrameworks: ['Midjourney', 'Figma', 'ElevenLabs', 'Runway', 'DaVinci Resolve'],
    businessValue: 'Saves time and eliminates costly revisions by getting everyone on the same page before filming or rendering.'
  },
  {
    id: 'skill-video-creation',
    name: 'Video Creation & AI Video Editing',
    level: 'Video Producer & Editor',
    tagline: 'Cinematic AI Videos, Clear Voiceovers & Professional Editing',
    description: 'I produce high-quality promotional videos, product explainers, and cinematic stories by combining modern AI video tools with professional editing, voiceovers, sound effects, and color grading.',
    practicalApplications: [
      'Promotional product videos and social media ads',
      'AI-generated cinematic scenes and short films',
      'Natural AI voiceovers, background music, and sound design',
      'Dynamic 4K upscaling, smooth camera movements, and pacing',
      'Professional video editing, subtitles, and color grading',
      'High-energy YouTube intros, hooks, and explainer videos'
    ],
    toolsAndFrameworks: ['Runway Gen-3', 'Luma Dream Machine', 'DaVinci Resolve', 'Adobe Premiere Pro', 'ElevenLabs', 'After Effects'],
    businessValue: 'Gives your brand cinema-quality video content in days instead of months, at a fraction of traditional agency costs.'
  },
  {
    id: 'skill-vibe-coding',
    name: 'Vibe Coding & Web Development',
    level: 'Full-Stack Developer & Builder',
    tagline: 'Turning Ideas into Working Web Apps and MVPs in Days',
    description: 'Using modern AI coding tools and clean full-stack web standards, I build fast, responsive websites, SaaS apps, and functional prototypes directly from ideas—without slow development cycles.',
    practicalApplications: [
      'Full-stack web applications and SaaS MVPs',
      'Fast, modern websites built with React and Tailwind CSS',
      'Interactive dashboards, calculators, and client portals',
      'Connecting APIs, forms, and databases',
      'Mobile-friendly, responsive layouts that load instantly',
      'Rapid prototyping to test product ideas with real users'
    ],
    toolsAndFrameworks: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cursor', 'Node.js', 'PostgreSQL'],
    businessValue: 'Launches working digital products 10x faster, so you can test your idea in the market and start getting customers immediately.'
  },
  {
    id: 'skill-visual-art',
    name: 'Digital Art & Key Visuals',
    level: 'Concept Artist & Visual Designer',
    tagline: 'Stunning Concept Art, Keynote Visuals & Custom Imagery',
    description: 'I create custom digital artwork, marketing hero images, and futuristic concept visuals that grab attention and tell a story, giving your brand an original look that generic stock photos cannot match.',
    practicalApplications: [
      'Custom hero graphics for website banners and keynotes',
      'Concept art for products, tech visions, and campaigns',
      'High-resolution editorial art for articles and whitepapers',
      'Eye-catching visuals for social media campaigns',
      'Custom AI art generation tailored to your exact brand style',
      'High-resolution print-ready artwork'
    ],
    toolsAndFrameworks: ['Midjourney', 'ComfyUI', 'Photoshop', 'Magnific AI', 'Procreate'],
    businessValue: 'Stops people from scrolling past your content with custom, high-impact visuals that make your brand look world-class.'
  },
  {
    id: 'skill-agent-dev',
    name: 'Autonomous AI Agents',
    level: 'AI Systems Developer',
    tagline: 'Smart AI Agents that Automate Everyday Business Tasks',
    description: 'I build custom AI agents that can think through steps, use tools, call APIs, look up information, and complete multi-step tasks on their own—saving your team hours of repetitive work.',
    practicalApplications: [
      'Automated customer support and lead response agents',
      'Smart research agents that find and summarize information',
      'Connecting AI agents to your CRM, email, and spreadsheets',
      'Document processing and automated data extraction',
      'Safe human-in-the-loop controls for sensitive decisions',
      'Background automation that runs 24/7 reliably'
    ],
    toolsAndFrameworks: ['LangGraph', 'Python', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Webhooks'],
    businessValue: 'Takes repetitive, multi-hour chores off your team\'s plate so they can focus on growing the business.'
  }
];
