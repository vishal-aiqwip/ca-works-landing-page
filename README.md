# 🚀 CA Works

The AI client communication layer for chartered accountants across Email & WhatsApp.

## 🧬 Clone the repository:
```bash
git clone <repo-url> .
```

## 📦 Install all dependencies:
```bash
bun install
```

## 🔐 Setup environment variables

Copy `.env.local` and set the required variables:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Public base URL of the app (e.g. `http://localhost:3000`) |
| `API_URL` | No | Backend API URL, if used |

## 🛠️ Start the development server:
```bash
bun dev
```

## 🏗️ Build the application for production:
```bash
bun run build
bun start
```

## 🧹 Perform a deep clean (remove node_modules and .next dir):
```bash
bun run cls       # remove .next
bun run cls:all   # remove node_modules and .next
```

## 🔍 Lint & format:
```bash
bun run lint
bun run format
```

### Checkout the development server:
```bash
http://localhost:3000
```

## 🚀 Used Technologies:

- ``Next.js 16``: React framework (App Router, Turbopack, Cache Components).
- ``React 19``: Library for building user interfaces.
- ``Tailwind CSS 4``: Utility-first CSS framework.
- ``shadcn/ui``: Customizable component primitives built on Radix UI.
- ``Lucide React``: Icon set used across the app.
- ``React Hook Form``: Form state and validation handling.
- ``Zod``: Schema declaration and validation.
- ``Vercel AI SDK``: Streaming AI chat/completions (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`).
- ``GSAP`` / ``Motion``: Animation libraries.
- ``TanStack Table``: Headless table/data-grid logic.
- ``Recharts``: Charting library.
- ``Biome``: Linting and formatting.

## 📚 Resources
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com)
- [Biome](https://biomejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Lucide icons](https://lucide.dev/icons/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
