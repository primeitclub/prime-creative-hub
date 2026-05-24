import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient as createSanityClient } from '@sanity/client'
import { env } from './env'

export const supa = createSupabaseClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

export const sanity = createSanityClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  apiVersion: env.SANITY_API_VERSION,
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
})
