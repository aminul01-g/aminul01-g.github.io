import sanityClient from '../sanity';
import { SanityClient } from '@sanity/client';

declare module '@sanity/client' {
  interface SanityClient {
    fetch<R = unknown>(query: string, params?: Record<string, unknown>): Promise<R>;
  }
}

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  // Sanity is disabled - return mock data
  if (!sanityClient) {
    // Return empty array for blog posts
    return [] as T;
  }
  return (sanityClient as SanityClient).fetch<T>(query, params);
}
