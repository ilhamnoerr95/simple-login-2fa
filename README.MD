### HOW TO INSTALL FOR SPECIFIC PROJECT

```bash
EX: FOR BACKEND
pnpm add prisma @prisma/client -w apps/backend/commerce
pnpm add prisma @prisma/client -w apps/backend/profile
# 👉 -w = workspace

# ex: for frontend
pnpm add dayjs -w apps/frontend
```

# PRISMA RULE

prisma schema running for each services

### HO TO RUNNING PRISMA CLI FROM ROOT

```bash
# run per service
npm run db:migrate --workspace=commerce

# run per service with forward argumen
# -- for forward argument to prisma, --name= go to prisma cli
# --workspace for choose services
pnpm run db:migrate --workspace=apps/backend/commerce -- --name=add_table

# or run from root, this running script in all services that have db:migrate
pnpm run db:migrate

```
