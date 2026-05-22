# Unit 01: Project Foundation & Deployment Skeleton

## Goal

Establish a clean, buildable, deployment-ready Next.js project with the correct design system tokens, folder structure, Supabase client wrappers, and a working Telegram bot — so that every subsequent unit builds on a verified, consistent foundation.

## Design

### Font & Typography

Replace the default Geist fonts with **Inter** (from `next/font/google`). Configure the CSS variable `--font-sans` to resolve to Inter. Remove all Geist font references from `layout.tsx`.

The typography scale from [DESIGN.md](file:///home/panda/projects/gibi-exams/DESIGN.md) does **not** need to be implemented as Tailwind utilities in this unit — only the font family setup matters here.

### Color Tokens

Replace the default shadcn neutral palette in `globals.css` with tokens derived from [DESIGN.md](file:///home/panda/projects/gibi-exams/DESIGN.md). Map the Material-style tokens to shadcn CSS variable conventions:

| shadcn variable       | DESIGN.md source            | Value                |
| --------------------- | --------------------------- | -------------------- |
| `--background`        | `background`                | `#f7f9fc`            |
| `--foreground`        | `on-background`             | `#191c1e`            |
| `--card`              | `surface-container-lowest`  | `#ffffff`            |
| `--card-foreground`   | `on-surface`                | `#191c1e`            |
| `--popover`           | `surface-container-lowest`  | `#ffffff`            |
| `--popover-foreground`| `on-surface`                | `#191c1e`            |
| `--primary`           | `primary`                   | `#005f9e`            |
| `--primary-foreground`| `on-primary`                | `#ffffff`            |
| `--secondary`         | `secondary-container`       | `#67b6ff`            |
| `--secondary-foreground`| `on-secondary-container`  | `#004673`            |
| `--muted`             | `surface-container`         | `#eceef1`            |
| `--muted-foreground`  | `on-surface-variant`        | `#404751`            |
| `--accent`            | `surface-container-high`    | `#e6e8eb`            |
| `--accent-foreground` | `on-surface`                | `#191c1e`            |
| `--destructive`       | `error`                     | `#ba1a1a`            |
| `--border`            | `outline-variant`           | `#c0c7d3`            |
| `--input`             | `outline-variant`           | `#c0c7d3`            |
| `--ring`              | `primary`                   | `#005f9e`            |

Convert hex values to `oklch()` for consistency with Tailwind v4's expectations. Dark mode tokens are **not** required in this unit — defer to a later unit. Remove or comment out the existing `.dark` block in `globals.css` to avoid stale values.

### Border Radius

Update the `--radius` base token to match DESIGN.md: `0.5rem` (8px, currently `0.625rem`).

### Spacing & Layout

No global spacing utilities need to be added. The DESIGN.md spacing tokens (`xs`, `sm`, `md`, `lg`, `xl`, `container-margin`, `gutter`) will be applied directly in components via Tailwind classes as needed in future units.

## Implementation

### 1. Font Setup (`app/layout.tsx`)

- Remove `Geist` and `Geist_Mono` imports.
- Import `Inter` from `next/font/google`.
- Configure Inter with `subsets: ["latin"]` and `variable: "--font-sans"`.
- Apply the `inter.variable` class to the `<html>` element.
- Keep the existing `h-full antialiased` classes.
- Update `metadata` to reflect the project:
  - `title`: `"Gibi Exams"`
  - `description`: `"Discover and share past exam papers — Telegram Mini App for Ethiopian university students"`

### 2. Design Token Alignment (`app/globals.css`)

- Replace all `:root` CSS variable values with the mapped tokens from the Design section above.
- Convert all hex color values to `oklch()` format.
- Update `--radius` to `0.5rem`.
- Comment out or remove the `.dark` block (stale defaults).
- Keep the `@import` statements for Tailwind, tw-animate-css, and shadcn.
- Keep the `@theme inline` block — update any references if variable names changed.
- Keep the `@layer base` block with `border-border`, `outline-ring/50`, `bg-background`, `text-foreground`, and `font-sans`.

### 3. Supabase Client Wrappers (`lib/supabase/`)

Create the Supabase client setup following the [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) pattern for Next.js App Router.

#### `lib/supabase/server.ts`

- Export a `createServerClient()` function that creates a Supabase client for Server Components, Server Actions, and Route Handlers.
- Use `@supabase/ssr`'s `createServerClient` with cookie-based session handling.
- Read cookies from `next/headers` using `await cookies()`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` environment variables.

#### `lib/supabase/client.ts`

- Export a `createBrowserClient()` function for Client Components.
- Use `@supabase/ssr`'s `createBrowserClient`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` environment variables.

#### `lib/supabase/proxy.ts`

- Export a `updateSession()` function for refreshing auth sessions in the proxy.
- This function takes a `NextRequest`, creates a Supabase client with cookie handling, calls `getUser()` to refresh the session, and returns the response with updated cookies.

### 4. Proxy (`proxy.ts`)

Next.js 16 renamed `middleware.ts` to `proxy.ts`. The exported function must be named `proxy` (not `middleware`).

- Create a root-level `proxy.ts` that calls `updateSession()` from `lib/supabase/proxy.ts`.
- Export the function as `export async function proxy(request: NextRequest)`.
- Configure the matcher to exclude static files, images, and favicon:
  ```ts
  export const config = {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
  };
  ```

### 5. Bot Restructuring (`lib/bot/`)

Restructure the existing `lib/bot.ts` into the architecture's folder convention.

#### `lib/bot/index.ts`

- Move the bot instance creation here.
- Export `const bot = new Bot(...)` with the `TELEGRAM_BOT_TOKEN` env check.
- Import and register command handlers.

#### `lib/bot/handlers/start.ts`

- Export a composer or handler function for the `/start` command.
- Reply with a welcome message, e.g.: `"👋 Welcome to Gibi Exams! Send me an exam file to get started."`.

#### Delete `lib/bot.ts`

- Remove the old flat file after migration.

#### Update import in `app/api/webhook/[secret]/route.ts`

- Change `import { bot } from "@/lib/bot"` — should resolve to `lib/bot/index.ts` automatically.

### 6. Environment Configuration

#### `.env.local` — existing file, no changes needed

The file already contains the required variables. Verify these are present:
- `TELEGRAM_BOT_TOKEN`
- `WEBHOOK_SECRET_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

#### `.env.example` — create new

Create a `.env.example` with placeholder values for documentation:

```env
# Telegram
TELEGRAM_BOT_TOKEN="your-bot-token"
WEBHOOK_SECRET_TOKEN="your-webhook-secret"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
```

### 7. Next.js Configuration (`next.config.ts`)

- Keep the existing `serverComponentsExternalPackages: ["grammy"]` setting.
- No other changes needed at this stage.

### 8. Home Page Placeholder (`app/page.tsx`)

Replace the default Next.js template page with a minimal branded placeholder that confirms the design tokens are working:

- Show the project name "Gibi Exams" using the primary color.
- Show a brief subtitle: "Exam sharing for Ethiopian university students".
- Use a centered layout with proper font and colors from the design system.
- Keep it simple — this page will be completely replaced in Unit 7 (Exams Feed).

### 9. TypeScript Configuration

- Verify `tsconfig.json` has `"strict": true` (already set).
- No other changes needed.

## Dependencies

- `@supabase/supabase-js` (Supabase JavaScript client)
- `@supabase/ssr` (Supabase SSR helpers for cookie-based auth in Next.js)

## Verify when done

- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors when running `npm run dev`
- [ ] Inter font renders correctly on the home page (inspect `<html>` element — should have Inter font family)
- [ ] Primary color (`#005f9e` / blue) is visible on the home page placeholder
- [ ] Background color is the soft grey-blue from DESIGN.md (`#f7f9fc`), not the default white
- [ ] `--radius` computes to `0.5rem` (inspect any element using the CSS variable)
- [ ] `lib/supabase/server.ts` exports `createServerClient` without import errors
- [ ] `lib/supabase/client.ts` exports `createBrowserClient` without import errors
- [ ] `lib/supabase/proxy.ts` exports `updateSession` without import errors
- [ ] `proxy.ts` exists at project root, exports `proxy` function, and imports from `lib/supabase/proxy`
- [ ] Bot instance is created from `lib/bot/index.ts` (not `lib/bot.ts`)
- [ ] `/start` command handler lives in `lib/bot/handlers/start.ts`
- [ ] Webhook route at `app/api/webhook/[secret]/route.ts` imports from `@/lib/bot` and compiles
- [ ] `.env.example` exists with all required variable placeholders
- [ ] No `.dark` block with stale default color values in `globals.css`
- [ ] Responsive at mobile (320px) and desktop (1024px) — placeholder page centers correctly
- [ ] Project structure matches architecture.md folder ownership rules
