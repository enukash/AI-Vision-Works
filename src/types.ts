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
  | 'AI Video Creation'
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

export interface ProjectVideoHighlight {
  title: string;
  description: string;
}

export interface ProjectCreativeProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ProjectCallToAction {
  heading: string;
  description: string;
  buttonText: string;
}

export interface ProjectSEO {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageAltText?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
}

export interface ProjectMedia {
  thumbnail?: string;
  videoUrl?: string;
  thumbnailAlt?: string;
  videoType?: string;
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
  // Rich Project Fields
  projectOverview?: string;
  creativeConcept?: string;
  videoHighlights?: ProjectVideoHighlight[];
  creativeProcess?: ProjectCreativeProcessStep[];
  finalResult?: string;
  applications?: string[];
  callToAction?: ProjectCallToAction;
  seo?: ProjectSEO;
  media?: ProjectMedia;
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
  whatIsVibeCoding?: {
    heading: string;
    description: string;
    body: string;
    workflow: string[];
  };
  whatIsBrandIdentity?: {
    heading: string;
    description: string;
    body: string;
    elements: string[];
  };
  whatIsAIvideoCreation?: {
    heading: string;
    description: string;
    body: string;
    workflow: string[];
  };
  whatIsDigitalVisualArt?: {
    heading: string;
    description: string;
    body: string;
    elements: string[];
  };
  whatIsThumbnailPackaging?: {
    heading: string;
    description: string;
    body: string;
    elements: string[];
  };
  whatIsSocialMediaPostDesign?: {
    heading: string;
    description: string;
    body: string;
    elements: string[];
  };
  brandElements?: {
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  creativeCapabilities?: {
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  videoTypes?: {
    heading: string;
    description: string;
    items: string[];
    highlight?: string;
  };
  visualTypes?: {
    heading: string;
    description: string;
    items: string[];
    highlight?: string;
  };
  thumbnailTypes?: {
    heading: string;
    description: string;
    items: string[];
    highlight?: string;
  };
  postTypes?: {
    heading: string;
    description: string;
    items: string[];
    highlight?: string;
  };
  formats?: {
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    technicalNote?: string;
  };
  designSystem?: {
    heading: string;
    description: string;
    items: string[];
    highlight?: string;
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
  traditionalVsVibeCoding?: {
    heading: string;
    traditionalDevelopment: {
      title: string;
      features: string[];
    };
    vibeCoding: {
      title: string;
      features: string[];
    };
    conclusion?: string;
  };
  brandVsRandomDesign?: {
    heading: string;
    randomDesign: {
      title: string;
      features: string[];
    };
    strategicBrandSystem: {
      title: string;
      features: string[];
    };
    conclusion?: string;
  };
  traditionalVsAI?: {
    heading: string;
    traditionalProduction?: {
      title: string;
      features: string[];
    };
    traditionalDesign?: {
      title: string;
      features: string[];
    };
    aiVideoCreation?: {
      title: string;
      features: string[];
    };
    aiVisualCreation?: {
      title: string;
      features: string[];
    };
    conclusion?: string;
  };
  genericVsStrategic?: {
    heading: string;
    genericDesign: {
      title: string;
      features: string[];
    };
    strategicDesign: {
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
  technology?: {
    heading: string;
    description: string;
    areas: string[];
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
