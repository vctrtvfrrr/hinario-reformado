FROM node:20-slim as base
WORKDIR /app

FROM base as build
COPY --link package*.json ./
RUN npm ci
COPY --link . .
RUN npm run build

FROM base as production
COPY --from=build --link /app/.output /app/.output
USER node
EXPOSE 3000/tcp
CMD [ "node", ".output/server/index.mjs" ]

FROM base as development
USER node
EXPOSE 3000/tcp
VOLUME [ "/app" ]
CMD [ "/bin/bash", "-c", "npm install ; npm run dev" ]
