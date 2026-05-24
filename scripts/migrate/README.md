# Migration scripts

One-shot migration from Supabase (pch-api) → Sanity (prime-creative-hub).

## Prereqs

- Node 20+
- `pnpm install` (or `npm install`) inside this folder
- A Sanity API token with **Editor** role
  - Manage → API → Tokens → Add token
- Supabase Service Role (secret) key (same one used by pch-api)

## Setup

```bash
cd scripts/migrate
cp .env.example .env
# fill in:
#   SUPABASE_URL=
#   SUPABASE_SECRET_KEY=
#   SANITY_WRITE_TOKEN=
pnpm install
```

## Run order

```bash
# 1. Back up existing Sanity production dataset to ./backups/
pnpm export

# 2. Wipe Sanity production dataset (interactive: type WIPE)
pnpm wipe

# 3. Reseed from Supabase
pnpm migrate

# Single step (re-runs are idempotent — createOrReplace)
pnpm migrate:team
pnpm migrate:history
pnpm migrate:faq
```

## Idempotency

Every migrated doc uses a stable `_id` derived from the source row UUID:
- `history-<uuid>`
- `team-<uuid>`
- `cohort-<startYear>-<endYear>`
- `faq-<question-slug>`

Re-running upserts via `createOrReplace`. Asset uploads are cached in-process; re-runs re-upload (Sanity dedupes by hash so cost is negligible, but you may want to wipe assets manually if storage grows).

## Source data

| Source | Destination | Notes |
|---|---|---|
| Supabase `history` table | `historyEvent` docs | drop `ending_year = starting_year+1` constraint; keep optional |
| Supabase `team` table | `teamCohort` + `teamMember` docs | derives cohort; uploads img_url to Sanity assets; slug collisions resolved with year suffix |
| `data/faqs.json` | `faq` docs | hand-edit JSON before running; plain text → portable text blocks |

## Future content

`project` and `post` are seeded fresh in Studio — no migration source. Use Studio to create them.
