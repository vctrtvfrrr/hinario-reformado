Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";

// import .css files directly and it works
import './index.css';

import { createRoot } from "react-dom/client";

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.

---

## Project: lecionario-reformado

This is a full-stack Bun + React SPA template. The sections below document the current codebase state.

### Directory Structure

```
/
├── .claude/CLAUDE.md           # This file
├── src/
│   ├── index.ts                # Bun server entry point
│   ├── index.html              # HTML shell (imports frontend.tsx)
│   ├── frontend.tsx            # React root (HMR-aware)
│   ├── App.tsx                 # Main React component
│   ├── APITester.tsx           # API testing UI component
│   ├── index.css               # Component-level CSS
│   ├── logo.svg                # Bun logo asset
│   ├── react.svg               # React logo asset
│   ├── components/ui/          # Shadcn-style UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   └── lib/
│       └── utils.ts            # cn() Tailwind merge utility
├── styles/
│   └── globals.css             # Global Tailwind + CSS custom properties
├── build.ts                    # Production build script
├── bunfig.toml                 # Bun config (Tailwind plugin, public env vars)
├── components.json             # Shadcn CLI config
├── package.json
├── tsconfig.json
└── bun.lock
```

### Development Workflow

```sh
bun install          # Install dependencies
bun dev              # Start dev server with HMR (http://localhost:3000)
bun start            # Start production server
bun run build.ts     # Build for production (outputs to dist/)
bun test             # Run tests
```

### Server & API Routes

Defined in `src/index.ts`:

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Serves `index.html` (SPA entry) |
| `/api/hello` | GET | Returns `{ message: "Hello, world!", method: "GET" }` |
| `/api/hello` | PUT | Returns `{ message: "Hello, world!", method: "PUT" }` |
| `/api/hello/:name` | GET | Returns `{ message: "Hello, {name}!" }` |
| `/*` | * | SPA fallback to `index.html` |

HMR and console forwarding are enabled in development via `development: { hmr: true, console: true }`.

### Environment Variables

- Bun loads `.env` automatically — do not use `dotenv`.
- Only variables prefixed with `BUN_PUBLIC_` are exposed to the frontend (configured in `bunfig.toml`).

### UI Component Library

Components live in `src/components/ui/` and follow the [shadcn/ui](https://ui.shadcn.com/) pattern (new-york style, neutral base color):

- **Button** — variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; sizes: `default`, `sm`, `lg`, `icon`
- **Card** — sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Input** — standard text input with validation styling
- **Label** — accessible form label using Radix UI
- **Select** — dropdown built on `@radix-ui/react-select`
- **Textarea** — multi-line text input

Use the `cn()` helper from `src/lib/utils.ts` to merge Tailwind classes:

```ts
import { cn } from "@/lib/utils";
cn("base-class", conditionalClass && "extra-class")
```

The `@/*` path alias maps to `./src/*` (configured in `tsconfig.json`).

### Styling Conventions

- **Tailwind CSS v4** via `bun-plugin-tailwind`
- Global theme in `styles/globals.css` using CSS custom properties with `oklch` color space
- Dark mode supported via `.dark` class selector
- Respects `prefers-reduced-motion` media query for animations
- Component variants managed with `class-variance-authority` (CVA)
- Class merging with `tailwind-merge` + `clsx` (via `cn()`)

### TypeScript Configuration

- `strict: true`
- `moduleResolution: "bundler"` (Bun-native resolution)
- `target: "ESNext"`
- SVG imports typed via `bun-env.d.ts`
- Path alias `@/*` → `./src/*`

### React Conventions

- Functional components only
- HMR-aware root in `frontend.tsx` using `import.meta.hot`
- `React.StrictMode` wraps the app in development
- Icons via `lucide-react`

### Adding New API Routes

Add routes directly to the `routes` object in `src/index.ts`:

```ts
"/api/resource/:id": {
  GET: (req) => new Response(JSON.stringify({ id: req.params.id })),
  POST: async (req) => {
    const body = await req.json();
    return new Response(JSON.stringify(body), { status: 201 });
  },
},
```

### Adding New UI Components

Follow the existing shadcn pattern:
1. Create `src/components/ui/<component>.tsx`
2. Use Radix UI primitives where available
3. Apply variants with CVA
4. Use `data-slot` attributes for composable styling hooks
5. Export the component and any sub-components
