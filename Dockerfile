FROM oven/bun:latest as base
WORKDIR /app

FROM node:20-slim as build
RUN apt update && apt install -y curl unzip
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH=${PATH}:/root/.bun/bin
WORKDIR /app
COPY --link package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY --link . .
RUN bun --bun run build

FROM base as production
COPY --from=build --link /app/.output /app/.output
USER bun
EXPOSE 3000/tcp
VOLUME [ "/app/server/database/db.sqlite" ]
CMD [ "bun", "run", ".output/server/index.mjs" ]

FROM base as development
USER bun
EXPOSE 3000/tcp
VOLUME [ "/app" ]
CMD [ "./start-container.sh" ]
