import { useEffect } from 'react';
import { PageRoute } from '../types';
import { resolvePageMetadata, updateDocumentMetadata, MetaTagOptions } from '../utils/seo';

/**
 * Custom React hook that automatically synchronizes the document title,
 * meta description, OpenGraph tags, Twitter cards, and Schema.org JSON-LD
 * whenever the active page or slug changes.
 */
export function useDocumentMetadata(
  page: PageRoute,
  slug?: string,
  overrides?: Partial<MetaTagOptions>
): void {
  useEffect(() => {
    const baseOptions = resolvePageMetadata(page, slug);
    const finalOptions: MetaTagOptions = {
      ...baseOptions,
      ...overrides,
      // Merge keywords if both exist
      keywords: overrides?.keywords || baseOptions.keywords,
      jsonLd: overrides?.jsonLd || baseOptions.jsonLd,
    };

    updateDocumentMetadata(finalOptions);
  }, [page, slug, overrides]);
}
