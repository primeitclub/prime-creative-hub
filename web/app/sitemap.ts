import type { MetadataRoute } from 'next'
import { getProjects, getPosts } from '@/lib/sanity'

const BASE = 'https://creativehub.primeitclub.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p: any) => p.slug?.current)
    .map((project: any) => ({
      url: `${BASE}/projects/${project.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p: any) => p.slug?.current)
    .map((post: any) => ({
      url: `${BASE}/blogs/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
