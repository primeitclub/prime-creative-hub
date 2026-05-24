import "dotenv/config";

function required(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing env: ${name}`);
  return v;
}

export const env = {
  SUPABASE_URL: required("SUPABASE_URL"),
  SUPABASE_SECRET_KEY: required("SUPABASE_SECRET_KEY"),
  SANITY_PROJECT_ID: required("SANITY_PROJECT_ID"),
  SANITY_DATASET: required("SANITY_DATASET"),
  SANITY_API_VERSION: process.env.SANITY_API_VERSION ?? "2024-10-01",
  SANITY_WRITE_TOKEN: required("SANITY_WRITE_TOKEN"),
  BACKUP_DIR: process.env.BACKUP_DIR ?? "./backups",
};
