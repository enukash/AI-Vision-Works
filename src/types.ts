export type PageRoute = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'service-slug' 
  | 'projects' 
  | 'project-slug' 
  | 'blog' 
  | 'blog-slug' 
  | 'contact';

export type ProjectCategory = 
  | 'all'
  | 'UI/UX Designing'
  | 'Poster Creation'
  | 'Logo Generation'
  | 'Social Media Posts'
  | 'Video Creation & Editing'
  | 'Digital & Visual Art'
  | 'Thumbnail Creation'
  | 'Agent Development';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectDeliverable {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  client: string;
  year: string;
  duration: string;
  featured: boolean;
  coverImage: string;
  secondaryImage?: string;
  summary: string;
  theChallenge: string;
  theSolution: string;
  methodology: string[];
  metrics: ProjectMetric[];
  deliverables: ProjectDeliverable[];
  techStack: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface BlogContentSection {
  heading?: string;
  paragraphs: string[];
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
  bulletPoints?: string[];
  highlightQuote?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Generative AI' | 'Prompt Engineering' | 'AI & Finance' | 'Agent Development' | 'Vibe Coding';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  featured?: boolean;
  keyTakeaways: string[];
  sections: BlogContentSection[];
}

export interface ServiceMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export type ServiceCategory = 
  | 'all'
  | 'Agent Development'
  | 'UI/UX & Prototyping'
  | 'Logo & Brand Identity'
  | 'Social Media Posts'
  | 'Video Creation & Editing'
  | 'Digital & Visual Art'
  | 'Thumbnail Creation';

export interface ServiceRichContent {
  seo?: {
    title: string;
    metaDescription: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  hero?: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCTA: string;
    secondaryCTA: string;
  };
  introduction?: {
    heading: string;
    description: string;
    supportingText?: string;
    highlights?: string[];
  };
  whatAreAutonomousAIAgents?: {
    heading: string;
    description: string;
    body: string;
    workflow: string[];
  };
  services?: {
    heading: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  capabilities?: {
    heading: string;
    description: string;
    items: string[];
    highlight?: string;
  };
  howItWorks?: {
    heading: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  useCases?: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  benefits?: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  comparison?: {
    heading: string;
    traditionalAutomation: {
      title: string;
      features: string[];
    };
    autonomousAIAgents: {
      title: string;
      features: string[];
    };
    conclusion?: string;
  };
  developmentProcess?: {
    heading: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  integrations?: {
    heading: string;
    description: string;
    items: string[];
    cta?: string;
  };
  whyAIvisionWorks?: {
    heading: string;
    description: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  targetAudience?: {
    heading: string;
    items: string[];
    description: string;
  };
  finalCTA?: {
    heading: string;
    description: string;
    primaryCTA: string;
    secondaryCTA: string;
  };
  faq?: {
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  coverImage: string;
  secondaryImage?: string;
  deliverables: string[];
  deliverablesDetails?: ServiceDeliverable[];
  businessImpact: string;
  metrics: ServiceMetric[];
  toolsUsed: string[];
  typicalDuration: string;
  badge?: string;
  theChallenge?: string;
  theSolution?: string;
  methodology?: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
  richContent?: ServiceRichContent;
}

export interface CoreSkill {
  id: string;
  name: string;
  level: string;
  tagline: string;
  description: string;
  practicalApplications: string[];
  toolsAndFrameworks: string[];
  businessValue: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  projectCategory: string;
  quote: string;
  metricsResult: string;
  avatar: string;
}
