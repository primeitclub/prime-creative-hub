import { supa, sanity } from './clients'
import { uploadAssetFromUrl } from './uploadAsset'
import { slugify } from './slugify'

type TeamRow = {
  id: string
  name: string
  designation: string | null
  role: string | null
  img_url: string | null
  is_lead: boolean | null
  starting_year: number
  ending_year: number | null
  github_url: string | null
  linkedin_url: string | null
  instagram_url: string | null
}

function cohortId(start: number, end: number | null): string {
  return end ? `cohort-${start}-${end}` : `cohort-${start}`
}

function cohortLabel(start: number, end: number | null): string {
  return end ? `${start}-${end}` : `${start}`
}

export async function migrateTeam() {
  const { data, error } = await supa
    .from('team')
    .select('*')
    .order('starting_year', { ascending: false })
  if (error) throw error
  const rows = (data ?? []) as TeamRow[]
  console.log(`team: ${rows.length} rows`)

  // 1) Cohorts (unique by start+end)
  const cohortMap = new Map<string, { start: number; end: number | null }>()
  for (const r of rows) {
    const id = cohortId(r.starting_year, r.ending_year)
    if (!cohortMap.has(id)) cohortMap.set(id, { start: r.starting_year, end: r.ending_year })
  }
  const latestStart = Math.max(...rows.map((r) => r.starting_year))

  for (const [id, c] of cohortMap) {
    await sanity.createOrReplace({
      _id: id,
      _type: 'teamCohort',
      label: cohortLabel(c.start, c.end),
      startYear: c.start,
      endYear: c.end ?? undefined,
      isCurrent: c.start === latestStart,
    })
  }
  console.log(`  ✓ ${cohortMap.size} cohorts`)

  // 2) Members
  const slugSeen = new Map<string, number>()
  for (const r of rows) {
    const photoAssetId = r.img_url ? await uploadAssetFromUrl(r.img_url) : undefined
    let slug = slugify(r.name)
    const seen = slugSeen.get(slug) ?? 0
    slugSeen.set(slug, seen + 1)
    if (seen > 0) slug = `${slug}-${r.starting_year}`

    await sanity.createOrReplace({
      _id: `team-${r.id}`,
      _type: 'teamMember',
      name: r.name,
      slug: { _type: 'slug', current: slug },
      role: r.designation ?? undefined,
      domain: r.role ?? undefined,
      photo: photoAssetId
        ? { _type: 'image', asset: { _type: 'reference', _ref: photoAssetId } }
        : undefined,
      cohort: {
        _type: 'reference',
        _ref: cohortId(r.starting_year, r.ending_year),
      },
      isLead: !!r.is_lead,
      displayOrder: r.is_lead ? 0 : 100,
      instagram: r.instagram_url ?? undefined,
      github: r.github_url ?? undefined,
      linkedin: r.linkedin_url ?? undefined,
    })
    console.log(`  ✓ ${r.name} (${r.designation ?? '-'})`)
  }
}
