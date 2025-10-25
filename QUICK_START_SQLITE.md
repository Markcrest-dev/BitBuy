# Quick Start with SQLite (No PostgreSQL Required)

If you want to get started immediately without installing PostgreSQL, you can use SQLite for local development. SQLite is a file-based database that requires no installation or setup.

## Switch to SQLite

### Step 1: Update Prisma Schema

Edit `prisma/schema.prisma` and change the datasource:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

**Important**: You'll also need to modify the schema slightly for SQLite compatibility:

1. Remove `@db.Text` attributes (SQLite doesn't need them)
2. Change `String @id @default(cuid())` to `String @id @default(uuid())`

### Step 2: Update .env

```env
DATABASE_URL="file:./dev.db"
```

### Step 3: Run Migration

```bash
npx prisma migrate dev --name init
```

This will create a `dev.db` file in your `prisma` directory.

### Step 4: Seed the Database

```bash
npm run db:seed
```

### Step 5: View Data

```bash
npm run db:studio
```

---

## Full SQLite-Compatible Schema

I can help you convert the schema to SQLite if you'd like to use this approach!

**Pros of SQLite:**
- ✅ No installation required
- ✅ Instant setup
- ✅ Perfect for development
- ✅ Easy to reset (just delete the .db file)

**Cons of SQLite:**
- ❌ Not suitable for production
- ❌ Limited concurrent connections
- ❌ Some PostgreSQL features not available

---

## When to Use What

- **Development/Testing**: SQLite is great!
- **Production**: Use PostgreSQL (via Neon, Supabase, or Railway)

Would you like me to convert the schema to SQLite for quick local testing?
