import { supa, sanity } from './clients'

type HistoryRow = {
  id: string
  title: string
  description: string
  starting_year: number
  ending_year: number | null
}

export async function migrateHistory() {
  const { data, error } = await supa.from('history').select('*')
  if (error) throw error
  const rows = (data ?? []) as HistoryRow[]
  console.log(`history: ${rows.length} rows`)

  let order = 0
  for (const r of rows) {
    const _id = `history-${r.id}`
    await sanity.createOrReplace({
      _id,
      _type: 'historyEvent',
      title: r.title,
      description: r.description,
      startYear: r.starting_year,
      endYear: r.ending_year ?? undefined,
      order: order++,
    })
    console.log(`  ✓ ${r.title} (${r.starting_year})`)
  }
}
