# CLAUDE.md

Hinário Reformado — Nuxt 3 app deployed as a `codelab-stack`. Canonical platform contract (networks, middlewares, deploy action, stack template) lives in [codelab-infra](https://git.codelab.tec.br/codelab/infra) and [deploy-stack](https://git.codelab.tec.br/codelab/deploy-stack) — read these when in doubt.

## Platform contract

- The deploy step's `uses:` must be a full Gitea URL — Gitea doesn't resolve short action refs.
- `traefik-public` is external and platform-owned: never define a new network; a stack-local one can't reach Traefik.
- `.env.example` is the full env schema (every var the app reads, with a local-dev default). Keep non-secret config here, not in `compose.yml`. The production `DATABASE` path is a CI override in `deploy.yml`, never committed.
- `/opt/data/hinarioreformado` (mounted at `/data`) is persistent host SQLite state — a deploy must never touch it.
- No application secrets, so no Vault collection: `.env` is rendered in no-Vault mode.
- Keep the Gitea topic `codelab-stack` so the repo appears in the stack inventory.
