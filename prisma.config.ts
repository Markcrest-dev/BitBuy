// prisma.config.ts
import { defineConfig } from '@prisma/config'

export default defineConfig({
  client: {
    pool: {
      connectionLimit: 1,
    },
  },
  envFile: '.env',
})
