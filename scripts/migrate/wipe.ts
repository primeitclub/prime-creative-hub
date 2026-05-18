import readline from 'node:readline/promises'
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
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const answer = await rl.question(
    `\n⚠️  Will DELETE ALL documents in Sanity project "${env.SANITY_PROJECT_ID}" dataset "${env.SANITY_DATASET}".\nMake sure you ran "pnpm export" first.\nType WIPE to confirm: `,
  )
  await rl.close()
  if (answer !== 'WIPE') {
    console.log('Aborted.')
    process.exit(1)
  }

  for (const t of TYPES) {
    const ids = await sanity.fetch<string[]>(`*[_type == $t]._id`, { t })
    if (!ids.length) {
      console.log(`- ${t}: 0 docs`)
      continue
    }
    console.log(`- ${t}: deleting ${ids.length} docs`)
    const tx = sanity.transaction()
    for (const id of ids) tx.delete(id)
    await tx.commit({ visibility: 'async' })
  }
  console.log('\nWipe complete.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
