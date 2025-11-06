// lib/prisma-env.ts
export function getDatabaseUrl() {
  if (process.env.VERCEL) {
    // We're on Vercel (Production)
    return process.env.PRODUCTION_DATABASE_URL
  } else {
    // Local development
    return process.env.LOCAL_DATABASE_URL
  }
}
