import { ServiceItem } from '../types';
import { aiAutomationWorkflowCover } from '../assets/images';

export const CMS_SERVICES: ServiceItem[] = [
  {
    id: 'srv-agents',
    slug: 'autonomous-ai-agents',
    title: 'Autonomous AI Agents for Smarter Business Automation',
    tagline: 'Turn Repetitive Work Into Intelligent Automation.',
    description: 'Build intelligent AI agents that can understand tasks, make decisions, use tools, and complete workflows with minimal human effort. From customer support to business automation, we create AI agents designed around your goals.',
    category: 'Agent Development',
    coverImage: aiAutomationWorkflowCover,
    secondaryImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '2 - 5 Weeks',
    badge: 'High Business ROI',
    businessImpact: 'Saves 70% to 85% of manual operational time, turning repetitive multi-step processes into automated runs completed in minutes.',
    metrics: [
      { label: 'Process Speed', value: '10x', change: 'faster workflow execution' },
      { label: 'Manual Effort Saved', value: '80%', change: 'operational time recovered' },
      { label: 'Operational Availability', value: '24/7', change: 'continuous task handling' }
    ],
    theChallenge: 'Your team should not have to spend hours handling repetitive tasks. Traditional AI only responds when you ask a question, leaving team members stuck copy-pasting data, processing documents, or managing manual handoffs between tools.',
    theSolution: 'We design autonomous AI agents that understand natural-language goals, plan multi-step workflows, connect to your business software via APIs, make contextual decisions, and alert your team whenever human approval is required.',
    methodology: [
      'Discover: We understand your business, workflow, challenges, and goals.',
      'Map the Workflow: We identify repetitive tasks, decisions, tools, and human intervention points.',
      'Design the Agent: We define the agent responsibilities, instructions, tools, knowledge, and decision logic.',
      'Build & Integrate: We connect the AI agent with relevant applications, APIs, databases, and business systems.',
      'Test & Optimize: We test different scenarios and improve reliability, accuracy, and workflow performance.',
      'Deploy: The agent is integrated into your workflow and prepared for real-world use.',
      'Improve: We continuously identify opportunities to make the system more useful and efficient.'
    ],
    deliverables: [
      'Business Automation Agents',
      'Customer Support Agents',
      'Research & Data Agents',
      'Lead Management Agents',
      'Content & Marketing Agents',
      'Workflow Automation Agents',
      'Internal Knowledge Agents',
      'Custom AI Agents'
    ],
    deliverablesDetails: [
      {
        title: 'Business Automation Agents',
        description: 'Automate repetitive operational tasks and workflows so your team can focus on higher-value work.'
      },
      {
        title: 'Customer Support Agents',
        description: 'Create AI-powered support agents that answer questions, understand customer requests, and provide instant assistance.'
      },
      {
        title: 'Research & Data Agents',
        description: 'Build agents that collect information, analyze data, summarize findings, and generate useful reports.'
      },
      {
        title: 'Lead Management Agents',
        description: 'Automate lead qualification, follow-ups, customer communication, and lead organization.'
      },
      {
        title: 'Content & Marketing Agents',
        description: 'Use AI agents to support content research, content creation, campaign workflows, and marketing operations.'
      },
      {
        title: 'Workflow Automation Agents',
        description: 'Connect multiple applications and automate complete business processes from start to finish.'
      },
      {
        title: 'Internal Knowledge Agents',
        description: 'Create AI agents that work with your documents, knowledge bases, company information, and internal resources.'
      },
      {
        title: 'Custom AI Agents',
        description: 'Design an AI agent around your specific business process, requirements, tools, and goals.'
      }
    ],
    toolsUsed: ['LangGraph', 'Python', 'TypeScript', 'Docker', 'PostgreSQL', 'APIs & Webhooks'],
    clientQuote: {
      text: 'The autonomous agent system built by Renuka cut our weekly supplier audit from four full days of spreadsheet work to under 20 minutes of automated execution. The built-in data verification gives our management team complete peace of mind.',
      author: 'David Sterling',
      role: 'VP of Operations',
      company: 'LogiCore Logistics'
    },
    richContent: {
      seo: {
        title: 'Autonomous AI Agents & AI Automation Services | AI Vision Works',
        metaDescription: 'Build custom autonomous AI agents that automate workflows, use business tools, analyze information, and complete tasks with less manual effort.',
        primaryKeyword: 'Autonomous AI Agents',
        secondaryKeywords: [
          'AI Agent Development',
          'AI Automation',
          'AI Workflow Automation',
          'Custom AI Agents',
          'Business AI Agents',
          'Intelligent Automation',
          'AI Automation Solutions',
          'Autonomous AI Solutions'
        ]
      },
      hero: {
        eyebrow: 'AUTONOMOUS AI AGENTS',
        heading: 'AI Agents That Work, Decide & Automate for You',
        description: 'Build intelligent AI agents that understand tasks, make decisions, use tools, and complete workflows with minimal human effort. From customer support to business automation, we create AI agents designed around your goals.',
        primaryCTA: 'Build Your AI Agent',
        secondaryCTA: 'Explore AI Solutions'
      },
      introduction: {
        heading: 'Turn Repetitive Work Into Intelligent Automation',
        description: 'Your team should not have to spend hours handling repetitive tasks. Our autonomous AI agents can connect with your tools, follow business rules, process information, and complete multi-step workflows automatically.',
        supportingText: 'We design AI agent systems that help businesses save time, reduce manual work, improve productivity, and create more scalable operations.',
        highlights: [
          'Automate repetitive business tasks',
          'Connect AI with your existing tools',
          'Process information and take action',
          'Handle multi-step workflows',
          'Reduce manual effort',
          'Scale operations with intelligent automation'
        ]
      },
      whatAreAutonomousAIAgents: {
        heading: 'AI That Can Do More Than Just Respond',
        description: 'Traditional AI responds when you ask a question. Autonomous AI agents can go further.',
        body: 'They can understand a goal, plan the required steps, use connected tools, perform actions, and adapt based on results.',
        workflow: [
          'Receive a request',
          'Understand the task',
          'Search information',
          'Analyze the data',
          'Make a decision',
          'Take action',
          'Report the result'
        ]
      },
      services: {
        heading: 'AI Agents Built Around Your Business',
        items: [
          {
            number: '01',
            title: 'Business Automation Agents',
            description: 'Automate repetitive operational tasks and workflows so your team can focus on higher-value work.'
          },
          {
            number: '02',
            title: 'Customer Support Agents',
            description: 'Create AI-powered support agents that answer questions, understand customer requests, and provide instant assistance.'
          },
          {
            number: '03',
            title: 'Research & Data Agents',
            description: 'Build agents that collect information, analyze data, summarize findings, and generate useful reports.'
          },
          {
            number: '04',
            title: 'Lead Management Agents',
            description: 'Automate lead qualification, follow-ups, customer communication, and lead organization.'
          },
          {
            number: '05',
            title: 'Content & Marketing Agents',
            description: 'Use AI agents to support content research, content creation, campaign workflows, and marketing operations.'
          },
          {
            number: '06',
            title: 'Workflow Automation Agents',
            description: 'Connect multiple applications and automate complete business processes from start to finish.'
          },
          {
            number: '07',
            title: 'Internal Knowledge Agents',
            description: 'Create AI agents that work with your documents, knowledge bases, company information, and internal resources.'
          },
          {
            number: '08',
            title: 'Custom AI Agents',
            description: 'Design an AI agent around your specific business process, requirements, tools, and goals.'
          }
        ]
      },
      capabilities: {
        heading: 'From Simple Tasks to Multi-Step Workflows',
        description: 'Our AI agents can be designed to handle repetitive tasks, complex workflows, information processing, and automated actions.',
        items: [
          'Understand natural-language instructions',
          'Search and collect information',
          'Analyze documents and data',
          'Generate reports and summaries',
          'Make rule-based decisions',
          'Communicate with customers',
          'Manage repetitive workflows',
          'Connect with APIs and business tools',
          'Trigger automated actions',
          'Work with databases and knowledge bases',
          'Monitor specific processes',
          'Escalate complex tasks to humans'
        ],
        highlight: 'We do not just build chatbots. We build AI systems that can take action.'
      },
      howItWorks: {
        heading: 'From Goal to Action',
        steps: [
          {
            number: '01',
            title: 'Understand',
            description: 'The agent receives your goal, request, or business trigger.'
          },
          {
            number: '02',
            title: 'Plan',
            description: 'It determines the steps required to complete the task.'
          },
          {
            number: '03',
            title: 'Connect',
            description: 'The agent accesses the tools, data, applications, or knowledge it needs.'
          },
          {
            number: '04',
            title: 'Execute',
            description: 'It performs the required actions across your workflow.'
          },
          {
            number: '05',
            title: 'Evaluate',
            description: 'The agent checks the results and determines whether additional steps are required.'
          },
          {
            number: '06',
            title: 'Report',
            description: 'The completed task, result, or important exception is delivered to your team.'
          }
        ]
      },
      useCases: {
        heading: 'Where Autonomous AI Agents Can Help',
        items: [
          {
            title: 'Sales',
            description: 'Lead qualification, follow-ups, CRM updates, and sales research.'
          },
          {
            title: 'Marketing',
            description: 'Content workflows, competitor research, campaign assistance, and reporting.'
          },
          {
            title: 'Customer Support',
            description: 'Customer queries, ticket classification, FAQs, and escalation.'
          },
          {
            title: 'Operations',
            description: 'Task management, workflow automation, and document processing.'
          },
          {
            title: 'Finance',
            description: 'Data collection, report preparation, invoice workflows, and financial information processing.'
          },
          {
            title: 'HR',
            description: 'Employee queries, onboarding workflows, and candidate screening assistance.'
          },
          {
            title: 'Research',
            description: 'Information gathering, analysis, summaries, and research reports.'
          }
        ]
      },
      benefits: {
        heading: 'Why Businesses Use AI Agents',
        items: [
          {
            title: 'Save Time',
            description: 'Automate repetitive work and reduce hours spent on manual processes.'
          },
          {
            title: 'Work Faster',
            description: 'AI agents can process information and execute workflows quickly.'
          },
          {
            title: 'Reduce Manual Errors',
            description: 'Standardize repetitive processes and follow predefined business rules.'
          },
          {
            title: 'Scale Operations',
            description: 'Handle increasing workloads without increasing every manual task.'
          },
          {
            title: 'Improve Productivity',
            description: 'Give your team more time for strategy, creativity, and decision-making.'
          },
          {
            title: '24/7 Availability',
            description: 'AI agents can support workflows beyond traditional working hours.'
          }
        ]
      },
      comparison: {
        heading: 'Automation That Can Adapt to the Task',
        traditionalAutomation: {
          title: 'Traditional Automation',
          features: [
            'Follows predefined rules',
            'Works well for predictable workflows',
            'Requires fixed conditions',
            'Usually handles specific tasks'
          ]
        },
        autonomousAIAgents: {
          title: 'Autonomous AI Agents',
          features: [
            'Understand natural language',
            'Can handle changing inputs',
            'Can plan multiple steps',
            'Can use different tools',
            'Can make contextual decisions',
            'Can adapt workflows based on results'
          ]
        },
        conclusion: 'Combine AI intelligence with reliable automation to create workflows that are both powerful and practical.'
      },
      developmentProcess: {
        heading: 'How We Build Your AI Agent',
        steps: [
          {
            number: '01',
            title: 'Discover',
            description: 'We understand your business, workflow, challenges, and goals.'
          },
          {
            number: '02',
            title: 'Map the Workflow',
            description: 'We identify repetitive tasks, decisions, tools, and human intervention points.'
          },
          {
            number: '03',
            title: 'Design the Agent',
            description: 'We define the agent responsibilities, instructions, tools, knowledge, and decision logic.'
          },
          {
            number: '04',
            title: 'Build & Integrate',
            description: 'We connect the AI agent with relevant applications, APIs, databases, and business systems.'
          },
          {
            number: '05',
            title: 'Test & Optimize',
            description: 'We test different scenarios and improve reliability, accuracy, and workflow performance.'
          },
          {
            number: '06',
            title: 'Deploy',
            description: 'The agent is integrated into your workflow and prepared for real-world use.'
          },
          {
            number: '07',
            title: 'Improve',
            description: 'We continuously identify opportunities to make the system more useful and efficient.'
          }
        ]
      },
      integrations: {
        heading: 'Connect AI With the Tools You Already Use',
        description: 'Your AI agent does not have to work alone. It can be designed to work with the applications, data, and systems your business already uses.',
        items: [
          'Business applications',
          'CRM systems',
          'Databases',
          'APIs',
          'Websites',
          'Communication platforms',
          'Knowledge bases',
          'Documents',
          'Cloud services',
          'Internal business systems'
        ],
        cta: 'Build an Integrated AI Workflow'
      },
      whyAIvisionWorks: {
        heading: 'We Build AI Around Your Workflow — Not the Other Way Around',
        description: 'At AI Vision Works, we focus on creating practical AI solutions that solve real business problems.',
        pillars: [
          {
            title: 'Business Understanding',
            description: 'We first understand what you actually need to automate.'
          },
          {
            title: 'AI Strategy',
            description: 'We identify where AI can create the most value.'
          },
          {
            title: 'Workflow Design',
            description: 'We turn complex processes into structured AI-powered workflows.'
          },
          {
            title: 'Automation',
            description: 'We connect AI with the tools required to complete the work.'
          },
          {
            title: 'Human Oversight',
            description: 'Important decisions can remain under human control when required.'
          }
        ]
      },
      targetAudience: {
        heading: 'AI Automation for Different Types of Businesses',
        items: [
          'Startups',
          'Small businesses',
          'Growing companies',
          'Agencies',
          'E-commerce businesses',
          'Education companies',
          'Service businesses',
          'Marketing teams',
          'Sales teams',
          'Operations teams',
          'Content businesses',
          'Enterprises'
        ],
        description: 'Whether you want to automate one repetitive task or an entire workflow, the solution can be designed around your requirements.'
      },
      finalCTA: {
        heading: 'Ready to Put AI to Work?',
        description: "Stop spending valuable time on repetitive tasks. Let's build an AI agent that can understand your workflow, work with your tools, and help your business get more done.",
        primaryCTA: 'Build My AI Agent',
        secondaryCTA: 'Talk to an AI Expert'
      },
      faq: {
        heading: 'Frequently Asked Questions',
        items: [
          {
            question: 'What is an autonomous AI agent?',
            answer: 'An autonomous AI agent is an AI-powered system that can understand a goal, plan tasks, use connected tools, and complete workflows with limited human intervention.'
          },
          {
            question: 'Is an AI agent the same as a chatbot?',
            answer: 'No. A chatbot mainly communicates with users, while an AI agent can also perform tasks, use tools, access information, and take actions within a workflow.'
          },
          {
            question: 'Can AI agents connect with existing software?',
            answer: 'Yes. AI agents can be designed to work with APIs, databases, CRM systems, business applications, documents, and other digital tools.'
          },
          {
            question: 'Can you build a custom AI agent for my business?',
            answer: 'Yes. AI agents can be designed around your specific business process, tools, goals, and automation requirements.'
          },
          {
            question: 'Can an AI agent make decisions?',
            answer: 'AI agents can make decisions within defined instructions, rules, available information, and permissions. For sensitive or high-impact decisions, human approval can be included.'
          },
          {
            question: 'Can AI agents work without human involvement?',
            answer: 'Some workflows can run with minimal intervention, while others should include human approval or escalation. The level of autonomy depends on the workflow and business requirements.'
          },
          {
            question: 'How much does an AI agent cost?',
            answer: 'The cost depends on the complexity of the workflow, integrations, AI models, data requirements, and level of automation.'
          }
        ]
      }
    }
  },
  {
    id: 'srv-vibe-coding-uiux',
    slug: 'vibe-coding-prototyping',
    title: 'Vibe Coding & Rapid Full-Stack Web Development',
    tagline: 'Turn your napkin idea into a working, responsive web application in days.',
    description: 'Skip months of slow development cycles. Using modern AI-assisted coding and clean full-stack web standards (React 19, TypeScript, Tailwind CSS), I quickly transform your vision into a fast, mobile-friendly web application, interactive client dashboard, or functional MVP that you can share with customers and investors immediately.',
    category: 'UI/UX & Prototyping',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 3 Weeks',
    badge: 'Rapid Turnaround',
    businessImpact: 'Launches your product 5x to 10x faster than traditional software agencies, giving you an immediate market advantage.',
    metrics: [
      { label: 'Time-to-Market', value: '10x', change: 'faster than traditional agencies' },
      { label: 'Code Quality', value: '100%', change: 'strict TypeScript compilation' },
      { label: 'Reusable Components', value: '60+', change: 'modular design tokens' }
    ],
    theChallenge: 'Startups and business leaders often spend months in endless wireframing meetings and pay massive agency fees before seeing a single working prototype. By the time the software arrives, market opportunities have passed or user requirements have changed.',
    theSolution: 'By combining conversational AI coding environments with a battle-tested library of clean React and Tailwind components, I turn sketches and requirements directly into functional, responsive web applications with real forms, databases, and smooth animations in just days.',
    methodology: [
      'Quick discovery session to define core user journeys, data fields, and visual preferences',
      'Rapid interactive component building using React, TypeScript, and clean Tailwind styling',
      'Connecting backend endpoints, database models, and resilient error-handling boundaries',
      'One-click automated deployment to fast cloud hosting with custom domain and SSL'
    ],
    deliverables: [
      'Modern Responsive React / Vite / Next.js Web Application',
      'Tailwind CSS Component System & Design Tokens',
      'REST & Database API Integration Endpoints',
      'Clean TypeScript Codebase with Zero Dependencies Bloat',
      'Live Cloud Deployment with Preview URLs and Custom Domain'
    ],
    deliverablesDetails: [
      {
        title: 'Full-Stack Web App',
        description: 'Single-page web application featuring smooth page transitions, responsive layouts, and instant load times.'
      },
      {
        title: 'Clean Design System',
        description: 'Reusable UI components designed with crisp typography, thoughtful spacing, and accessibility standards.'
      },
      {
        title: 'Working Backend & APIs',
        description: 'Structured server routes handling user submissions, database updates, and external API requests.'
      },
      {
        title: 'Turnkey Cloud Hosting',
        description: 'Live deployment on high-speed cloud infrastructure with automated SSL and domain setup.'
      }
    ],
    toolsUsed: ['Cursor', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node / Express'],
    clientQuote: {
      text: 'We gave Renuka a 2-page brief on Monday and had a working investor dashboard live by Friday afternoon. The build speed and attention to detail were frankly unbelievable.',
      author: 'Evelyn Brooks',
      role: 'Co-Founder & CTO',
      company: 'Aura Health Technologies'
    }
  },
  {
    id: 'srv-branding-identity',
    slug: 'brand-identity-design-systems',
    title: 'Brand Identity & Visual Design Systems',
    tagline: 'Distinctive, modern branding that builds instant trust and commands attention.',
    description: 'Create a memorable visual identity that makes your business look established, innovative, and trustworthy from day one. I craft clean vector logos, color palettes, typography guidelines, and complete brand style books that look stunning across web, mobile apps, social media, and printed collateral.',
    category: 'Logo & Brand Identity',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '2 - 4 Weeks',
    badge: 'Complete Identity',
    businessImpact: 'Positions your company as an industry leader, dramatically improving customer trust and investor confidence.',
    metrics: [
      { label: 'Pitch Conversion', value: '+42%', change: 'increase after rebrand' },
      { label: 'Brand Consistency', value: '100%', change: 'unified across all platforms' },
      { label: 'Brand Recall Index', value: '88%', change: 'above industry average' }
    ],
    theChallenge: 'Many innovative businesses have fantastic products but look amateurish because they rely on generic templates, clip art, or inconsistent colors. A disjointed visual look makes it hard to build trust with customers and institutional investors.',
    theSolution: 'I create unified corporate identity frameworks built with geometric precision, memorable color pairings (deep sapphire, crisp white, obsidian), and high-resolution visual assets that scale effortlessly from mobile app favicons to billboard displays.',
    methodology: [
      'Market research and visual audit of competitors to identify unique positioning opportunities',
      'Vector logo design exploring primary marks, monograms, and responsive icon variations',
      'Defining brand design tokens (hex color palettes, typography pairings, and layout spacing rules)',
      'Real-world mockups across website headers, investor pitch decks, social media, and packaging'
    ],
    deliverables: [
      'Primary, Monogram, and Responsive Vector Logo Suite (SVG, EPS, PNG)',
      'Complete Corporate Brand Style Guide (PDF Master + Figma Source)',
      'Design Token System for Frontend Engineers (Colors, Spacing, Typography)',
      'Investor Pitch Deck Templates & Social Media Branding Kits',
      'Generative Image Prompt Guide for Your Marketing Team'
    ],
    deliverablesDetails: [
      {
        title: 'Master Vector Logo Suite',
        description: 'Pixel-perfect scalable vector assets including primary horizontal logo, stacked mark, and square social icon.'
      },
      {
        title: 'Comprehensive Brand Book',
        description: 'A clear guide outlining font hierarchies, clear-space rules, dos and don’ts, and brand voice guidelines.'
      },
      {
        title: 'Digital Design Tokens',
        description: 'Ready-to-use color and typography values that your development team can plug directly into their code.'
      },
      {
        title: 'Executive Pitch Collateral',
        description: 'Polished presentation slide templates, letterheads, and social banner templates ready to share.'
      }
    ],
    toolsUsed: ['Figma', 'Adobe Illustrator', 'InDesign', 'Photoshop', 'Vector Geometry'],
    clientQuote: {
      text: 'Our lead investor specifically remarked on how polished and established our brand identity felt. Renuka gave our young company the visual credibility of an industry leader.',
      author: 'Julian Chen',
      role: 'Chief Executive Officer',
      company: 'QuantumSync Systems'
    }
  },
  {
    id: 'srv-video-production',
    slug: 'video-creation-editing',
    title: 'Promotional Video Production & Storytelling',
    tagline: 'Cinematic brand films, product launch videos, and engaging motion storytelling.',
    description: 'Produce high-impact commercial videos that tell your product’s story with cinema-grade visuals. By combining generative AI video tools (Runway Gen-3, Luma Dream) with professional timeline editing, natural voiceovers, dynamic music, and sound design in DaVinci Resolve, I deliver broadcast-quality video without the massive cost of traditional film crews.',
    category: 'Video Creation & Editing',
    coverImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '2 - 4 Weeks',
    badge: 'Cinematic Quality',
    businessImpact: 'Boosts social media engagement, enhances keynote launches, and quadruples viewer retention on marketing pages.',
    metrics: [
      { label: 'Viewer Retention', value: '78%', change: 'average video completion rate' },
      { label: 'Production Cost Savings', value: '82%', change: 'vs traditional film crew' },
      { label: 'Turnaround Time', value: '3 Weeks', change: 'from script to 4K delivery' }
    ],
    theChallenge: 'Traditional video production can easily cost $50,000 to $100,000, takes months of logistics, and produces only a single rigid video that cannot easily be edited or repurposed for social channels.',
    theSolution: 'I use modern AI video tools paired with professional editing software to create stunning cinematic scenes on demand. I layer studio voiceovers, custom sound effects, and animated text overlays to create videos that hook viewers from the very first second.',
    methodology: [
      'Story scriptwriting and scene-by-scene storyboard planning to align on visual direction',
      'High-resolution cinematic video generation with consistent lighting and smooth camera movements',
      'Timeline editing in DaVinci Resolve with rhythmic cuts matched to the background soundtrack',
      'Studio-grade audio mastering: clear narration, ambient background beds, and impact sound effects'
    ],
    deliverables: [
      '4K Cinematic Master Brand Video (60 - 90 Seconds)',
      'Social Media Cutdowns (15s & 30s Vertical and Square Formats)',
      'Complete Scriptwriting & Scene Storyboard Deck',
      'Multi-track Audio Package (Voiceover, Music Bed, Sound Effects)',
      'Animated Subtitles & Custom Motion Title Sequences'
    ],
    deliverablesDetails: [
      {
        title: 'Master 4K Video',
        description: 'Full-length cinematic video with professional color grading, crisp audio mix, and 4K export.'
      },
      {
        title: 'Vertical & Square Edits',
        description: 'Reels, Shorts, and LinkedIn cuts with animated subtitles optimized for mobile viewers.'
      },
      {
        title: 'Complete Audio Stems',
        description: 'Clean voiceover, background soundtrack, and sound effects provided separately for future edits.'
      },
      {
        title: 'Motion Graphics & Titles',
        description: 'Clean kinetic text and logo reveal animations built to match your brand style guide.'
      }
    ],
    toolsUsed: ['Runway Gen-3', 'Luma Dream Machine', 'DaVinci Resolve', 'Premiere Pro', 'ElevenLabs'],
    clientQuote: {
      text: 'The keynote video produced by Renuka received a spontaneous standing ovation at our annual product summit. It captured the vision of our platform with true cinematic artistry.',
      author: 'Elena Rostova',
      role: 'Head of Global Brand',
      company: 'OmniCompute Cloud'
    }
  },
  {
    id: 'srv-visual-art-posters',
    slug: 'digital-visual-art-posters',
    title: 'Digital Art, Keynote Posters & Editorial Visuals',
    tagline: 'Custom artwork, conference posters, and striking visuals that cut through digital noise.',
    description: 'Transform complex technical concepts into captivating digital art and print-ready poster campaigns. By blending thoughtful composition, natural lighting, and hand-finished digital brushwork, I create custom visuals that grab immediate attention on website headers, article covers, and conference displays.',
    category: 'Digital & Visual Art',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 3 Weeks',
    badge: 'Custom Artwork',
    businessImpact: 'Stops people from scrolling past your content and transforms technical ideas into memorable visual stories.',
    metrics: [
      { label: 'Print Resolution', value: '16K', change: 'crisp large-format fidelity' },
      { label: 'Social Engagement', value: '+140%', change: 'higher shares and clicks' },
      { label: 'Design Turnaround', value: '7 Days', change: 'concept to final print files' }
    ],
    theChallenge: 'Most technology marketing visuals look cookie-cutter and uninspired. Generic stock photos fail to communicate sophisticated ideas, leaving websites, research papers, and event halls feeling forgettable.',
    theSolution: 'I create original digital artwork and typographic poster series that blend clean geometric forms with realistic lighting and texture, producing striking visuals that audiences remember and want to share.',
    methodology: [
      'Exploring visual themes, composition angles, and focal points to support your message',
      'Iterative digital generation and concept exploration for unique, non-generic imagery',
      'High-dynamic upscaling to ultra-sharp print resolution with texture preservation',
      'Color calibration for commercial CMYK offset printing and high-res digital screens'
    ],
    deliverables: [
      'Ultra-High Resolution Master Artwork (up to 16K Print Ready)',
      'Event & Conference Poster Series (A0, B1, and Digital Screen Formats)',
      'Editorial Visuals for Articles, Reports, and Whitepapers',
      'Layered Photoshop Master Files (PSD) with Separate Text & Art',
      'Ambient Motion Art Loops for Digital Event Displays'
    ],
    deliverablesDetails: [
      {
        title: 'Large-Format Print Masters',
        description: 'Print-ready vector and raster files with calibrated CMYK profiles for commercial offset printing.'
      },
      {
        title: 'Organized Master Files',
        description: 'Layered PSD files separating foreground text, subjects, and background lighting for easy updates.'
      },
      {
        title: 'Editorial Web Visuals',
        description: 'Sized and optimized graphics ready for blog headers, LinkedIn carousels, and publication covers.'
      },
      {
        title: 'Ambient Display Loops',
        description: 'Smooth video loops designed for conference backdrops, lobby screens, and digital booths.'
      }
    ],
    toolsUsed: ['Midjourney v6', 'ComfyUI', 'Photoshop', 'Magnific AI', 'Illustrator'],
    clientQuote: {
      text: 'The keynote posters Renuka designed for our annual symposium became instant collector items. Attendees were literally taking them down from the venue walls to frame them at home.',
      author: 'Prof. Henrik Lindqvist',
      role: 'Symposium Director',
      company: 'Nordic AI Society'
    }
  },
  {
    id: 'srv-youtube-thumbnails',
    slug: 'youtube-thumbnail-packaging',
    title: 'High-CTR YouTube Packaging & Thumbnail Design',
    tagline: 'Strategic thumbnails and titles tested to maximize click-through velocity and views.',
    description: 'Transform your video reach with psychology-backed YouTube thumbnails and titles. Using viewer eye-tracking principles, high-contrast lighting, and expression tuning, I create packaging systems that stand out on crowded mobile feeds and turn impressions into loyal subscribers.',
    category: 'Thumbnail Creation',
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 2 Weeks / Ongoing',
    badge: 'Audience Growth',
    businessImpact: 'Consistently boosts video click-through rates by 40% to 120%, unlocking exponential algorithmic reach.',
    metrics: [
      { label: 'Average CTR Boost', value: '+68%', change: 'over previous channel baseline' },
      { label: 'A/B Test Win Rate', value: '87%', change: 'outperformed control thumbnails' },
      { label: '24h Velocity', value: '2.5x', change: 'faster algorithmic pickup' }
    ],
    theChallenge: 'Creators and businesses spend hours producing great video content only to get few views because their thumbnails are cluttered, dark, or hard to read on a 4-inch mobile screen.',
    theSolution: 'I design thumbnails tailored specifically for small phone displays: 3-point visual focal points, isolated high-contrast subjects, bold easy-to-read typography (max 3 words), and dual A/B variations ready for YouTube testing.',
    methodology: [
      'Viewer gaze mapping to place emotional cues and key words where the eye naturally looks first',
      'Precise subject isolation, hair refinement, and custom skin lighting for maximum clarity',
      'Contrast and color balancing tested against dark-mode mobile YouTube feeds',
      'Dual A/B variations per video (curiosity vs. high-stakes angle) to test what audiences prefer'
    ],
    deliverables: [
      'Dual A/B Thumbnail Variations for Each Video',
      'Small-Screen Mobile Optimization & Contrast Testing',
      'Title and Thumbnail Synergy Recommendations (3 Title Options)',
      'Modular Photoshop & Figma Template Kits',
      'Monthly Performance Review & CTR Optimization Tips'
    ],
    deliverablesDetails: [
      {
        title: 'A/B Thumbnail Pairs',
        description: 'Two strategically distinct options per video formatted for YouTube’s official Test & Compare feature.'
      },
      {
        title: 'Mobile Stress Previews',
        description: 'Simulations showing how the thumbnail looks in YouTube search results and recommendations.'
      },
      {
        title: 'Title Synergy Matrix',
        description: 'Recommended titles that pair with each thumbnail to build curiosity without misleading viewers.'
      },
      {
        title: 'Master Layered Templates',
        description: 'Organized PSD templates with editable text styles and cutout layers for rapid thumbnail creation.'
      }
    ],
    toolsUsed: ['Photoshop', 'Figma', 'Generative Subject Isolation', 'Color Grading'],
    clientQuote: {
      text: 'Working with Renuka doubled our average view count within three weeks. Our videos now routinely break into the top 10% of YouTube algorithm recommendations.',
      author: 'Carter Walsh',
      role: 'Creator & Tech Host (850K subs)',
      company: 'Silicon Frontiers Media'
    }
  },
  {
    id: 'srv-social-media',
    slug: 'social-media-post-design',
    title: 'High-Converting Social Media Posts & Viral Carousels',
    tagline: 'Swipeable carousels, algorithmic engagement designs, and brand storytelling for modern social platforms.',
    description: 'Elevate your online authority with tailored social media creative systems for LinkedIn, X, and Instagram. I transform dense technical papers, product updates, and executive thoughts into visually compelling, swipeable infographics and carousels that drive genuine organic engagement and inbound business leads.',
    category: 'Social Media Posts',
    coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '1 - 3 Weeks / Monthly Retainer',
    badge: 'High Viral Reach',
    businessImpact: 'Boosts social post engagement rates by 3x to 5x, establishing thought leadership and generating consistent inbound inquiries.',
    metrics: [
      { label: 'Organic Reach', value: '+320%', change: 'higher post impressions' },
      { label: 'Engagement Rate', value: '7.4%', change: 'above industry benchmarks' },
      { label: 'Production Speed', value: '4x', change: 'faster with modular design kit' }
    ],
    theChallenge: 'Technical founders and enterprise leaders often post plain text or generic stock graphics that get lost in fast-moving social feeds, failing to capture executive attention or communicate complex value propositions.',
    theSolution: 'I create an executive social post system: thumb-stopping hook slides, high-contrast dark and light mode typographic layouts, custom AI architecture diagrams, and multi-slide carousels formatted precisely for LinkedIn and Instagram algorithms.',
    methodology: [
      'Audience content audit to identify topics and visual hooks that resonate with executive decision-makers',
      'Development of a modular Figma component library (quotes, stats, frameworks, diagrams)',
      'High-contrast typography grading optimized for instant mobile readability',
      'Multi-slide storyboarding that maximizes swipe-through completion rates and bookmark saves'
    ],
    deliverables: [
      'Multi-Slide Carousel Posts (LinkedIn & Instagram PDF / PNG)',
      'Modular Figma Social Design System (Light & Dark Mode)',
      'High-Impact Single-Image Hook Graphics & Quote Cards',
      'Executive Social Post Copywriting & Hook Formulas',
      'Platform Safe-Zone Guides & Performance Tracking Templates'
    ],
    deliverablesDetails: [
      {
        title: 'Swipeable Carousel Sets',
        description: 'Multi-slide presentations converting complex AI concepts, blueprints, and data into easily digestible visual stories.'
      },
      {
        title: 'Figma Componentized Kit',
        description: 'Reusable templates with auto-layout text blocks, stat counters, and brand gradient accents for rapid weekly publishing.'
      },
      {
        title: 'Algorithm-Ready Asset Exports',
        description: 'Exported in exact pixel-perfect aspect ratios (4:5 vertical and 1:1 square) with zero compression degradation.'
      },
      {
        title: 'Hook & Headline Playbook',
        description: 'Proven copywriting frameworks designed to stop the scroll in the first 2 seconds on mobile feeds.'
      }
    ],
    toolsUsed: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Generative Design Systems', 'Canva Pro'],
    clientQuote: {
      text: 'Our LinkedIn engagement skyrocketed from the first week we started posting these carousels. They make our technical AI offerings look world-class and accessible.',
      author: 'Maya Lin',
      role: 'Head of Growth',
      company: 'Synthetix Dynamics'
    }
  }
];

export const SERVICE_CATEGORIES = [
  'all',
  'Agent Development',
  'UI/UX & Prototyping',
  'Logo & Brand Identity',
  'Social Media Posts',
  'Video Creation & Editing',
  'Digital & Visual Art',
  'Thumbnail Creation'
] as const;
