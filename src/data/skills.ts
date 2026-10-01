import { CoreSkill } from '../types';

export const CORE_SKILLS: CoreSkill[] = [
  {
    id: 'skill-prompt-eng',
    name: 'Prompt Engineering',
    level: 'Principal / Architect',
    tagline: 'AI Prompt Engineering & Solutions',
    description: 'I create clear and effective prompts that help AI tools produce more accurate and useful results. I work with AI workflows, system prompts, prompt optimization, and AI automation to solve real-world business problems.',
    practicalApplications: [
      'Prompt engineering for business and creative tasks',
      'System prompts and AI instructions',
      'Structured AI outputs and workflows',
      'AI testing and prompt optimization',
      'AI safety and quality checks',
      'AI integration with apps and business processes'
    ],
    toolsAndFrameworks: ['Claude opus', 'GPT-6 astra', 'Gemini ', 'DeepSeek', 'JSON Schema'],
    businessValue: 'Helps teams save time, improve AI output quality, and use AI more effectively.'
  },
  {
    id: 'skill-branding',
    name: 'Branding',
    level: 'Creative Director',
    tagline: 'Turning ideas into a strong and memorable brand',
    description: 'I create modern brand identities and visual systems that help businesses communicate their personality clearly and consistently.',
    practicalApplications: [
      'Logo and brand identity design',
      'Visual branding',
      'Color and typography selection',
      'Social media creatives',
      'Brand guidelines',
      'AI-generated visual concepts'
    ],
    toolsAndFrameworks: ['Figma', 'Canva', 'Adobe Photoshop'],
    businessValue: 'Creates a consistent visual identity that makes a brand easier to recognize and remember.'
  },
  {
    id: 'skill-storyboarding',
    name: 'Storyboarding & Visual Storytelling',
    level: 'Senior Director',
    tagline: 'Turning ideas into engaging stories',
    description: 'I transform concepts, products, and ideas into visual stories and cinematic experiences that are easier for audiences to understand and connect with.',
    practicalApplications: [
      'Video storyboarding',
      'Shot-by-shot concepts',
      'Promotional videos',
      'Visual storytelling',
      'YouTube and social media content',
      'AI-generated video concepts'
    ],
    toolsAndFrameworks: ['ChatGPT', 'Nano Banana', 'Google Flow', 'Elevenlabs'],
    businessValue: 'Helps brands communicate their ideas clearly and create more engaging content.'
  },
  {
    id: 'skill-video-creation',
    name: 'Video Creation and Editing',
    level: 'Master Editor & Producer',
    tagline: 'AI-Powered Video & Visual Storytelling',
    description: 'I create engaging videos that combine AI video generation, storytelling, editing, and creative direction. From short promotional videos to cinematic stories, I focus on making content that looks professional and keeps the audience interested.',
    practicalApplications: [
      'AI-generated promotional and marketing videos',
      'Cinematic storytelling and short films',
      'YouTube and social media videos',
      'Video editing and pacing',
      'Voiceovers, sound effects, and background music',
      'Scene planning and visual storytelling',
      'Color correction and final video enhancement'
    ],
    toolsAndFrameworks: ['Omniflash', 'Veo', 'Runway Gen-3', 'Luma Dream Machine', 'DaVinci Resolve Studio', 'Premiere Pro', 'ElevenLabs', 'After Effects'],
    businessValue: 'Helps brands create professional video content faster and with less production cost.'
  },
  {
    id: 'skill-vibe-coding',
    name: 'Vibe Coding',
    level: 'Full-Stack Rapid Architect',
    tagline: 'Building Digital Solutions with AI',
    description: 'I use Vibe Coding and AI-assisted development to turn ideas into working websites, web applications, dashboards, and MVPs without making the development process unnecessarily complicated.',
    practicalApplications: [
      'AI-assisted website development',
      'Landing pages and business websites',
      'Web applications and MVPs',
      'Interactive dashboards and tools',
      'AI-powered applications',
      'Rapid prototyping and product testing',
      'Database and API integration'
    ],
    toolsAndFrameworks: ['Cursor', 'Google AI Studio', 'Claude', 'Lyzr', 'Kimi2.5', 'Lovable AI', 'Framer AI', 'Bolt'],
    businessValue: 'Helps businesses turn ideas into working digital products faster, making it easier to test and launch new concepts.'
  },
  {
    id: 'skill-visual-art',
    name: 'Visual Art',
    level: 'Concept & Fine Artist',
    tagline: 'High-Impact Digital Art, Keynote Visuals & Surreal Concept Design',
    description: 'Crafting bespoke digital art, museum-grade key art, atmospheric concept landscapes, and marketing imagery with exquisite control over lighting, perspective, and micro-textures.',
    practicalApplications: [
      'High-resolution promotional key visuals for global enterprise campaigns',
      'Exhibition-scale digital artwork with ultra-fine detail for fine art print',
      'Editorial illustrations for leading technology publications and whitepapers',
      'Concept art for architectural, product, and brand worldbuilding'
    ],
    toolsAndFrameworks: ['Midjourney v6', 'ComfyUI (Custom Latents)', 'Adobe Photoshop', 'Magnific AI', 'Procreate'],
    businessValue: 'Stops viewer scroll cold with unique, mathematically balanced art that elevates brand perception beyond stock photography.'
  },
  {
    id: 'skill-agent-development',
    name: 'Agent Development',
    level: 'Cognitive Systems Architect',
    tagline: 'Autonomous Goal-Directed Workflows, Multi-Agent Tool Calling & Orchestration',
    description: 'Architecting resilient autonomous agents capable of multi-step reasoning, external tool execution, API calls, database interaction, self-reflection, and robust human-in-the-loop control.',
    practicalApplications: [
      'Multi-agent specialized architectures (Dispatcher, Specialist, Auditor, Committer)',
      'Function calling and tool-use integrations with enterprise ERPs and CRM systems',
      'Persistent memory architectures, session state, and vector retrieval pipelines',
      'Circuit breakers, safety boundaries, and human-in-the-loop authorization gates'
    ],
    toolsAndFrameworks: ['LangGraph', 'Python', 'TypeScript', 'Docker', 'PostgreSQL / Vector DBs', 'REST Webhooks'],
    businessValue: 'Automates complex, multi-hour knowledge worker processes into autonomous background workflows that run with 99%+ accuracy.'
  }
];
