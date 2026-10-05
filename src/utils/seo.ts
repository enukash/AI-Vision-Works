import { PageRoute } from '../types';
import { CMS_PROJECTS } from '../data/cmsProjects';
import { CMS_SERVICES } from '../data/cmsServices';
import { CMS_BLOGS } from '../data/cmsBlogs';

export interface MetaTagOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string[];
  jsonLd?: Record<string, unknown>;
}

export const SITE_NAME = 'AI Vision Works';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
export const BASE_URL = 'https://aivisionworks.com';

/**
 * Safely creates or updates a meta tag in document.head
 */
export function setOrUpdateMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attributeName}="${attributeValue}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Safely creates or updates a link tag (e.g. canonical) in document.head
 */
export function setOrUpdateLinkTag(rel: string, href: string): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

/**
 * Injects or updates dynamic Schema.org JSON-LD structured data in document.head
 */
export function setOrUpdateJsonLd(data?: Record<string, unknown>): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'dynamic-seo-jsonld';
  let element = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (!data) {
    if (element) element.remove();
    return;
  }

  if (!element) {
    element = document.createElement('script');
    element.id = SCRIPT_ID;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

/**
 * Generates tailored, production-grade metadata options for any given page and slug
 */
export function resolvePageMetadata(page: PageRoute, slug?: string): MetaTagOptions {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;

  switch (page) {
    case 'home':
      return {
        title: 'AI Vision Works | Real-World AI Solutions & Digital Products',
        description: 'Turn business ideas into production software, autonomous agents, and brand systems. Delivered fast by Renuka Sharma at AI Vision Works.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/home`,
        keywords: [
          'AI Vision Works',
          'Autonomous AI Agents',
          'Prompt Engineering',
          'Vibe Coding',
          'Full-Stack Web MVP',
          'Generative Branding',
          'AI Solutions Architect',
          'Renuka Sharma'
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: currentOrigin,
          description: 'Real-world AI solutions across autonomous agents, rapid web MVPs, prompt engineering, branding, and video creation.',
          founder: {
            '@type': 'Person',
            name: 'Renuka Sharma',
            jobTitle: 'Founder & Systems Architect, AI Vision Works'
          }
        }
      };

    case 'about':
      return {
        title: 'About Renuka Sharma | AI Vision Works Lead Builder',
        description: 'Meet Renuka Sharma, Founder of AI Vision Works. Learn how full-stack AI execution merges engineering, design, and autonomous systems into one seamless workflow.',
        image: '/assets/images/WhatsApp Image 2026-09-14 at 9.45.15 PM.jpeg',
        ogType: 'profile',
        url: `${currentOrigin}/#/about`,
        keywords: [
          'About Renuka Sharma',
          'AI Vision Works Founder',
          'Full-Stack AI Builder',
          'Autonomous Systems Architect',
          'AI Philosophy'
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Renuka Sharma - AI Vision Works',
          mainEntity: {
            '@type': 'Person',
            name: 'Renuka Sharma',
            jobTitle: 'Founder & Lead Builder',
            worksFor: {
              '@type': 'Organization',
              name: SITE_NAME
            },
            email: 'renukash2490@gmail.com'
          }
        }
      };

    case 'services':
      return {
        title: 'AI Services & Capabilities | AI Vision Works',
        description: 'Explore comprehensive AI services: autonomous multi-agent development, enterprise prompt design, vibe coding web MVPs, and generative branding.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/services`,
        keywords: [
          'AI Services',
          'Autonomous Agents Development',
          'Prompt Architecture',
          'Rapid Prototyping',
          'Generative Design Systems',
          'AI Consulting'
        ]
      };

    case 'service-slug': {
      const service = (slug ? CMS_SERVICES.find((s) => s.slug === slug) : null) || CMS_SERVICES[0];
      if (service) {
        const seoData = service.richContent?.seo;
        const pageTitle = seoData?.title || `${service.title} | AI Vision Works`;
        const pageDesc = (seoData?.metaDescription || `${service.tagline} ${service.businessImpact}`).substring(0, 160);
        const keywordsList = seoData
          ? [seoData.primaryKeyword, ...seoData.secondaryKeywords, 'AI Vision Works']
          : [service.category, service.title, 'AI Vision Works', ...service.toolsUsed];

        return {
          title: pageTitle,
          description: pageDesc,
          image: service.coverImage || DEFAULT_OG_IMAGE,
          ogType: 'website',
          url: `${currentOrigin}/#/service/${service.slug}`,
          keywords: keywordsList,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            provider: {
              '@type': 'Organization',
              name: SITE_NAME
            },
            description: service.description,
            serviceType: service.category,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: service.typicalDuration
            }
          }
        };
      }
      return {
        title: 'Service Details | AI Vision Works',
        description: 'Discover tailored AI development, architecture, and design services built for modern business workflows.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/services`
      };
    }

    case 'projects':
      return {
        title: 'Case Studies & AI Client Work | AI Vision Works',
        description: 'Browse production-grade case studies and client applications delivered across finance analytics, enterprise agents, branding, and keynote visuals.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/projects`,
        keywords: [
          'AI Case Studies',
          'Portfolio',
          'FinPulse Dashboard',
          'Autonomous Agent Case Study',
          'AI Vision Works Projects'
        ]
      };

    case 'project-slug': {
      const project = (slug ? CMS_PROJECTS.find((p) => p.slug === slug) : null) || CMS_PROJECTS[0];
      if (project) {
        return {
          title: `${project.title} | Case Study | AI Vision Works`,
          description: project.summary.substring(0, 160),
          image: project.coverImage || project.secondaryImage || DEFAULT_OG_IMAGE,
          ogType: 'website',
          url: `${currentOrigin}/#/project/${project.slug}`,
          keywords: [project.category, project.client, 'Case Study', 'AI Vision Works', ...project.techStack],
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            creator: {
              '@type': 'Person',
              name: 'Renuka Sharma'
            },
            headline: project.subtitle,
            description: project.summary,
            image: project.coverImage,
            dateCreated: project.year,
            genre: project.category
          }
        };
      }
      return {
        title: 'Project Case Study | AI Vision Works',
        description: 'Deep dive into an AI client project, system architecture, challenge resolution, and measurable business outcomes.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/projects`
      };
    }

    case 'blog':
      return {
        title: 'AI Insights & Research Guides | AI Vision Works Blog',
        description: 'Practical, hype-free articles on moving beyond chatbots, prompt engineering architecture, vibe coding, and multi-agent development.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/blog`,
        keywords: [
          'AI Blog',
          'Enterprise Generative AI',
          'Prompt Engineering Guide',
          'Vibe Coding Manifesto',
          'AI Agents'
        ]
      };

    case 'blog-slug': {
      const blog = (slug ? CMS_BLOGS.find((b) => b.slug === slug) : null) || CMS_BLOGS[0];
      if (blog) {
        return {
          title: `${blog.title} | AI Vision Works`,
          description: blog.excerpt.substring(0, 160),
          image: blog.coverImage || DEFAULT_OG_IMAGE,
          ogType: 'article',
          url: `${currentOrigin}/#/blog/${blog.slug}`,
          keywords: [...blog.tags, blog.category, 'AI Vision Works'],
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: blog.excerpt,
            image: blog.coverImage,
            datePublished: blog.publishedDate,
            author: {
              '@type': 'Person',
              name: blog.author.name,
              jobTitle: blog.author.role
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME
            }
          }
        };
      }
      return {
        title: 'Article | AI Vision Works Blog',
        description: 'Read the latest technical analysis and practical blueprints for building with generative AI.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'article',
        url: `${currentOrigin}/#/blog`
      };
    }

    case 'contact':
      return {
        title: 'Schedule a Consultation | AI Vision Works',
        description: 'Book a free 30-minute discovery call to discuss your AI agent project, web MVP timeline, or creative deliverables with AI Vision Works.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/contact`,
        keywords: [
          'Contact AI Vision Works',
          'Book AI Consultation',
          'Discovery Call',
          'Hire AI Generalist',
          'Renuka Sharma Contact'
        ]
      };

    default:
      return {
        title: 'AI Vision Works | Real-World AI Solutions',
        description: 'Turn business ideas into production software, autonomous agents, and brand systems.',
        image: DEFAULT_OG_IMAGE,
        ogType: 'website',
        url: `${currentOrigin}/#/${page}`
      };
  }
}

/**
 * Directly updates all standard meta tags, OpenGraph cards, Twitter cards, canonical link, and JSON-LD
 */
export function updateDocumentMetadata(options: MetaTagOptions): void {
  if (typeof document === 'undefined') return;

  // 1. Primary Page Title
  document.title = options.title;

  // 2. Primary Meta Description
  setOrUpdateMetaTag('name', 'description', options.description);

  // 3. Keywords (if specified)
  if (options.keywords && options.keywords.length > 0) {
    setOrUpdateMetaTag('name', 'keywords', options.keywords.join(', '));
  }

  // 4. OpenGraph Metadata
  setOrUpdateMetaTag('property', 'og:title', options.title);
  setOrUpdateMetaTag('property', 'og:description', options.description);
  setOrUpdateMetaTag('property', 'og:type', options.ogType || 'website');
  setOrUpdateMetaTag('property', 'og:site_name', SITE_NAME);

  if (options.url) {
    setOrUpdateMetaTag('property', 'og:url', options.url);
    setOrUpdateLinkTag('canonical', options.url);
  }

  const imageToUse = options.image || DEFAULT_OG_IMAGE;
  setOrUpdateMetaTag('property', 'og:image', imageToUse);

  // 5. Twitter / X Card Metadata
  setOrUpdateMetaTag('name', 'twitter:card', 'summary_large_image');
  setOrUpdateMetaTag('name', 'twitter:title', options.title);
  setOrUpdateMetaTag('name', 'twitter:description', options.description);
  setOrUpdateMetaTag('name', 'twitter:image', imageToUse);

  // 6. Schema.org JSON-LD Structured Data
  setOrUpdateJsonLd(options.jsonLd);
}
