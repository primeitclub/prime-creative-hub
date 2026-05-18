# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

Two independent sibling projects, no root workspace config — treat each as its own install/build target:

- `web/` — Next.js 16 (App Router) + React 19 + Tailwind v4 frontend. Public site at `https://creativehub.primeitclub.com`.
- `studio/` — Sanity Studio v5 CMS that backs `web/`. Shared project: `projectId: uuv2orbt`, `dataset: production` (hardcoded in `studio/sanity.config.ts` and `studio/sanity.cli.ts`).

There is a separate `pch-api/` Express backend in the parent `pch-website/` repo — it is **not** part of this project and is unrelated to the Sanity-backed flow used here.

## Commands

### web/
```bash
npm install
npm run dev        # next dev
npm run build      # next build
npm run start      # next start
npm run lint       # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

Requires `.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN` (see `web/.env.example`). The Sanity client is configured with `useCdn: false` and every query passes `{ cache: 'no-store' }`, so all reads are uncached at runtime.

### studio/
```bash
npm install
npm run dev              # sanity dev (local studio)
npm run build            # sanity build
npm run deploy           # sanity deploy (hosted studio)
npm run deploy-graphql   # sanity graphql deploy
```

No test runner is configured in either project.

## Architecture

### Content flow

Sanity Studio is the source of truth for `post`, `project`, and `teamMember` content. The Next.js app fetches via GROQ in `web/lib/sanity.ts`:

- `getProjects()` / `getProjectBySlug(slug)` → `project`
- `getPosts()` / `getPostBySlug(slug)` → `post`
- `getTeamMembers()` → `teamMember` (ordered by `order asc`)

Schema definitions live in `studio/schemaTypes/{post,project,teamMember}.ts`, registered through `studio/schemaTypes/index.ts`. When you change a schema field, update the matching GROQ projection in `web/lib/sanity.ts` and any consumers.

`web/lib/data.ts` contains hardcoded fallback/demo arrays (`teamMembers`, `projects`, `blogs`, `services`) and the TypeScript interfaces for them. These are legacy seed data — prefer the Sanity-backed flow for anything user-visible.

Images from Sanity go through `urlFor()` (exported from `web/lib/sanity.ts`); external image hosts must be added to `next.config.ts` `images.remotePatterns` (currently `api.dicebear.com`, `placehold.co`).

### App Router structure

- `web/app/layout.tsx` — root layout, fonts (Space Grotesk body, DM Sans as Mona Sans substitute via CSS vars), global SEO metadata, Organization JSON-LD, Navbar wrapper.
- `web/app/page.tsx` — home, composes `HeroSection`, `WhatWeDo`, `ProjectShowcase`, `BlogsSection`, `TeamSection`, `Footer` and injects FAQ JSON-LD.
- `web/app/{blogs,projects,team}/[slug]/page.tsx` — dynamic detail routes.
- `web/app/sitemap.ts`, `web/app/robots.ts` — SEO endpoints. The site has heavy SEO/AEO/GEO work (recent merged PR `feat/SEO`); preserve existing JSON-LD blocks, `metadataBase`, `alternates.canonical`, and the `geo.*` meta tags when editing layout/page metadata.
- `@/*` path alias maps to `web/` root (see `web/tsconfig.json`).

### Conventions

- TypeScript strict in both projects.
- `studio/` Prettier: no semicolons, single quotes, no bracket spacing, print width 100 (set in `studio/package.json`).
- Components are colocated under `web/components/{hero,sections,blogs,projects,team,ui}/`.

<!-- dgc-policy-v11 -->
# Dual-Graph Context Policy

This project uses a local dual-graph MCP server for efficient context retrieval.

## MANDATORY: Always follow this order

1. **Call `graph_continue` first** — before any file exploration, grep, or code reading.

2. **If `graph_continue` returns `needs_project=true`**: call `graph_scan` with the
   current project directory (`pwd`). Do NOT ask the user.

3. **If `graph_continue` returns `skip=true`**: project has fewer than 5 files.
   Do NOT do broad or recursive exploration. Read only specific files if their names
   are mentioned, or ask the user what to work on.

4. **Read `recommended_files`** using `graph_read` — **one call per file**.
   - `graph_read` accepts a single `file` parameter (string). Call it separately for each
     recommended file. Do NOT pass an array or batch multiple files into one call.
   - `recommended_files` may contain `file::symbol` entries (e.g. `src/auth.ts::handleLogin`).
     Pass them verbatim to `graph_read(file: "src/auth.ts::handleLogin")` — it reads only
     that symbol's lines, not the full file.
   - Example: if `recommended_files` is `["src/auth.ts::handleLogin", "src/db.ts"]`,
     call `graph_read(file: "src/auth.ts::handleLogin")` and `graph_read(file: "src/db.ts")`
     as two separate calls (they can be parallel).

5. **Check `confidence` and obey the caps strictly:**
   - `confidence=high` -> Stop. Do NOT grep or explore further.
   - `confidence=medium` -> If recommended files are insufficient, call `fallback_rg`
     at most `max_supplementary_greps` time(s) with specific terms, then `graph_read`
     at most `max_supplementary_files` additional file(s). Then stop.
   - `confidence=low` -> Call `fallback_rg` at most `max_supplementary_greps` time(s),
     then `graph_read` at most `max_supplementary_files` file(s). Then stop.

## Token Usage

A `token-counter` MCP is available for tracking live token usage.

- To check how many tokens a large file or text will cost **before** reading it:
  `count_tokens({text: "<content>"})`
- To log actual usage after a task completes (if the user asks):
  `log_usage({input_tokens: <est>, output_tokens: <est>, description: "<task>"})`
- To show the user their running session cost:
  `get_session_stats()`

Live dashboard URL is printed at startup next to "Token usage".

## Rules

- Do NOT use `rg`, `grep`, or bash file exploration before calling `graph_continue`.
- Do NOT do broad/recursive exploration at any confidence level.
- `max_supplementary_greps` and `max_supplementary_files` are hard caps - never exceed them.
- Do NOT dump full chat history.
- Do NOT call `graph_retrieve` more than once per turn.
- After edits, call `graph_register_edit` with the changed files. Use `file::symbol` notation (e.g. `src/auth.ts::handleLogin`) when the edit targets a specific function, class, or hook.

## Context Store

Whenever you make a decision, identify a task, note a next step, fact, or blocker during a conversation, call `graph_add_memory`.

**To add an entry:**
```
graph_add_memory(type="decision|task|next|fact|blocker", content="one sentence max 15 words", tags=["topic"], files=["relevant/file.ts"])
```

**Do NOT write context-store.json directly** — always use `graph_add_memory`. It applies pruning and keeps the store healthy.

**Rules:**
- Only log things worth remembering across sessions (not every minor detail)
- `content` must be under 15 words
- `files` lists the files this decision/task relates to (can be empty)
- Log immediately when the item arises — not at session end

## Session End

When the user signals they are done (e.g. "bye", "done", "wrap up", "end session"), proactively update `CONTEXT.md` in the project root with:
- **Current Task**: one sentence on what was being worked on
- **Key Decisions**: bullet list, max 3 items
- **Next Steps**: bullet list, max 3 items

Keep `CONTEXT.md` under 20 lines total. Do NOT summarize the full conversation — only what's needed to resume next session.
