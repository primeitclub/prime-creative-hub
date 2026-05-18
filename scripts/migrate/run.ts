import { migrateHistory } from './migrate-history'
import { migrateTeam } from './migrate-team'
import { migrateFaq } from './migrate-faq'

type Step = { name: string; run: () => Promise<void> }

const steps: Step[] = [
  { name: 'team', run: migrateTeam },
  { name: 'history', run: migrateHistory },
  { name: 'faq', run: migrateFaq },
]

function parseOnly(argv: string[]): string | null {
  const m = argv.find((a) => a.startsWith('--only='))
  return m ? m.split('=')[1] : null
}

async function main() {
  const only = parseOnly(process.argv.slice(2))
  const selected = only ? steps.filter((s) => s.name === only) : steps
  if (selected.length === 0) {
    console.error(`Unknown step "${only}". Valid: ${steps.map((s) => s.name).join(', ')}`)
    process.exit(1)
  }
  for (const s of selected) {
    console.log(`\n=== ${s.name} ===`)
    await s.run()
  }
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
