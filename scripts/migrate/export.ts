import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { sanity } from './clients'
import { env } from './env'

const TYPES = [
  'post',
  'project',
  'teamMember',
  'teamCohort',
  'historyEvent',
  'faq',
  'category',
  'siteNavigation',
  'siteSettings',
]

async function main() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const dir = path.resolve(env.BACKUP_DIR, `sanity-${env.SANITY_DATASET}-${stamp}`)
  await mkdir(dir, { recursive: true })

  for (const t of TYPES) {
    const docs = await sanity.fetch<unknown[]>(`*[_type == $t]`, { t })
    const out = path.join(dir, `${t}.json`)
    await writeFile(out, JSON.stringify(docs, null, 2), 'utf8')
    console.log(`exported ${docs.length} ${t} → ${out}`)
  }

  const allAssets = await sanity.fetch<unknown[]>(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{_id, _type, url, originalFilename, mimeType, size}`,
  )
  await writeFile(path.join(dir, 'assets.json'), JSON.stringify(allAssets, null, 2), 'utf8')
  console.log(`exported ${allAssets.length} asset records → ${dir}/assets.json`)

  console.log(`\nBackup complete: ${dir}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
