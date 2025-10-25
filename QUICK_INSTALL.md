# Quick Installation Guide - Run These Commands

Since I can't run sudo commands directly, please copy and paste these commands into your terminal:

## Option 1: One-Line Install (Recommended)

```bash
bash INSTALL_NOW.sh
```

Enter your password when prompted. This will install everything automatically.

---

## Option 2: Step-by-Step Install

If you prefer to see each step:

### Step 1: Install Docker (via snap - easier)
```bash
sudo snap install docker
```

### Step 2: Start PostgreSQL Container
```bash
docker compose up -d
```

### Step 3: Wait for Database
```bash
sleep 5
```

### Step 4: Generate Prisma Client
```bash
npx prisma generate
```

### Step 5: Run Migrations
```bash
npx prisma migrate dev --name init
```

Press Enter when asked for migration name.

### Step 6: Seed Database
```bash
npm run db:seed
```

### Step 7: Verify Setup
```bash
npm run db:studio
```

---

## After Installation

Once complete, tell me and I'll verify:
- Database is running
- Tables are created
- Data is seeded
- Everything is working correctly

---

## Quick Verification Commands

```bash
# Check Docker is installed
docker --version

# Check PostgreSQL is running
docker compose ps

# Open database GUI
npm run db:studio
```

---

**Ready?** Just run: `bash INSTALL_NOW.sh`

Then let me know when it's done!
