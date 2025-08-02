// Sanity fetcher using mock data (Sanity client removed)
export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  // Return mock data since Sanity is disabled
  // Return empty array for blog posts
  return [] as T;
}
