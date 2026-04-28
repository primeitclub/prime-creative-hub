import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

const NO_CACHE = { cache: 'no-store' } as const

// Queries
export async function getProjects() {
    return client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        shortDescription,
        thumbnail,
        techStack,
        githubUrl,
        liveUrl,
        author
      }
    `, {}, NO_CACHE)
  }

  export async function getProjectBySlug(slug: string) {
    return client.fetch(`
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        shortDescription,
        thumbnail,
        techStack,
        githubUrl,
        liveUrl,
        author
      }
    `, { slug }, NO_CACHE)
  }

  export async function getPosts() {
    return client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        thumbnail,
        author,
        publishedAt,
        body
      }
    `, {}, NO_CACHE)
  }

  export async function getPostBySlug(slug: string) {
    return client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        thumbnail,
        author,
        publishedAt,
        body
      }
    `, { slug }, NO_CACHE)
  }

  export async function getTeamMembers() {
    return client.fetch(`
      *[_type == "teamMember"] | order(order asc) {
        _id,
        name,
        role,
        domain,
        photo,
        instagram,
        github,
        linkedin,
        personalSite
      }
    `, {}, NO_CACHE)
  }