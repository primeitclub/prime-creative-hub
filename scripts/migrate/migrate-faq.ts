import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { sanity } from './clients'
import { slugify } from './slugify'

type FaqInput = {
  question: string
  answer: string
  category?: string
  order?: number
}

function plainTextToBlocks(text: string) {
  return text
    .split(/\n{2,}/)
    .map((para) => ({
      _type: 'block',
      _key: Math.random().toString(36).slice(2, 10),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).slice(2, 10),
          text: para.trim(),
          marks: [],
        },
      ],
    }))
}

export async function migrateFaq() {
  const file = path.resolve(import.meta.dirname ?? '.', 'data/faqs.json')
  let raw: string
  try {
    raw = await readFile(file, 'utf8')
  } catch {
    console.log(`faq: no source file at ${file} — skipping`)
    return
  }
  const items = JSON.parse(raw) as FaqInput[]
  console.log(`faq: ${items.length} items`)

  let order = 0
  for (const f of items) {
    const _id = `faq-${slugify(f.question)}`
    await sanity.createOrReplace({
      _id,
      _type: 'faq',
      question: f.question,
      answer: plainTextToBlocks(f.answer),
      category: f.category,
      order: f.order ?? order++,
    })
    console.log(`  ✓ ${f.question}`)
  }
}
