# ---------- Build stage ----------
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies first
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application source
COPY . .

# Generate Prisma Client
RUN bun x prisma generate

# Build Nitro application
RUN bun run build


# ---------- Production stage ----------
FROM oven/bun:1 AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy the generated Nitro production output
COPY --from=builder /app/.output ./.output

# Copy Prisma runtime dependencies
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["bun", ".output/server/index.mjs"]