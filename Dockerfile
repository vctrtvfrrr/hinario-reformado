FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=build /app/.output ./.output
COPY --from=build /app/server/database/migrations ./server/database/migrations
COPY --from=build /app/drizzle.config.ts ./
ENV NODE_ENV=production \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0 \
    DATABASE=/data/db.sqlite
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1
CMD ["bun", "run", ".output/server/index.mjs"]
