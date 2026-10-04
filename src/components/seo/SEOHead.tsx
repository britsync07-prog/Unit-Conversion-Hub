import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  type?: 'website' | 'article';
}

export default function SEOHead({
  title,
  description,
  canonicalPath,
  breadcrumbs,
  faqs,
  type = 'website',
}: SEOHeadProps) {
  const location = useLocation();
  const domain = 'https://unitconversionhub.com';
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${domain}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard and Social Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 3. Canonical URL tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Structured Data (JSON-LD)
    const schemaScripts: HTMLElement[] = [];

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${domain}${item.url}`,
        })),
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-schema-breadcrumbs';
      script.text = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
      schemaScripts.push(script);
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-schema-faq';
      script.text = JSON.stringify(faqSchema);
      document.head.appendChild(script);
      schemaScripts.push(script);
    }

    return () => {
      // Clean up injected schema scripts on unmount / route transition
      schemaScripts.forEach((s) => s.parentNode?.removeChild(s));
      const oldBreadcrumbs = document.getElementById('seo-schema-breadcrumbs');
      if (oldBreadcrumbs) oldBreadcrumbs.parentNode?.removeChild(oldBreadcrumbs);
      const oldFaq = document.getElementById('seo-schema-faq');
      if (oldFaq) oldFaq.parentNode?.removeChild(oldFaq);
    };
  }, [title, description, canonicalUrl, breadcrumbs, faqs, type]);

  return null;
}
