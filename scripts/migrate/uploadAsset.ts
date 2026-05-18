import { sanity } from './clients'
import mime from 'mime-types'

type Cache = Map<string, string>
const cache: Cache = new Map()

export async function uploadAssetFromUrl(url: string): Promise<string | undefined> {
  if (!url) return undefined
  if (cache.has(url)) return cache.get(url)

  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`  ! asset fetch failed (${res.status}): ${url}`)
    return undefined
  }
  const contentType = res.headers.get('content-type') ?? 'application/octet-stream'
  const ext = mime.extension(contentType) || 'bin'
  const filename = url.split('/').pop()?.split('?')[0] ?? `asset.${ext}`
  const buffer = Buffer.from(await res.arrayBuffer())

  const asset = await sanity.assets.upload('image', buffer, {
    filename,
    contentType,
  })
  cache.set(url, asset._id)
  return asset._id
}
