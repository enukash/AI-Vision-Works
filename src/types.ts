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
