# Code Standards

## General

- Keep modules small, focused, and single-purpose.
- Prefer simple and explicit solutions over clever abstractions.
- Fix root causes instead of layering temporary workarounds.
- Do not mix unrelated concerns in the same component, route, or module.
- Every feature must have a clear ownership boundary.
- Business logic must never live inside UI components.
- Shared logic used more than twice should be extracted into reusable utilities or services.
- Prefer composition over deeply nested inheritance or overly generic abstractions.
- Optimize for maintainability and readability first.
- Remove dead code, unused files, and stale abstractions promptly.
- Complex logic should include concise comments explaining why, not what.
- Refactors must preserve behavior unless behavior changes are explicitly planned.
- The main branch must always remain deployable.

### TypeScript

- TypeScript strict mode is required throughout the project.
- Avoid any unless absolutely unavoidable and documented.
- Prefer explicit interfaces, schemas, and domain types.
- Validate unknown external input at system boundaries before trusting it.
- Shared domain models must live in centralized type definitions.
- Prefer discriminated unions over loosely typed conditionals.
- Avoid type assertions unless runtime guarantees already exist.
- Function return types should be explicit for shared/public APIs.
- Prefer readonly data structures where mutation is unnecessary.
- Utility functions should remain pure whenever possible.
- Database types should stay aligned with the schema and migrations.

### Next.js

- Default to Server Components.
- Add "use client" only when browser interactivity is required.
- Keep route handlers focused on a single responsibility.
- Data fetching should happen on the server whenever possible.
- Client components must never contain secrets or sensitive business logic.
- Large file transfers must bypass the Next.js server whenever possible.
- Server Actions should handle trusted mutations only.
- Loading, empty, and error states must always be implemented explicitly.
- Avoid unnecessary client-side state when server state is sufficient.
- Pages must remain functional even when opened directly outside Telegram flows.
- API routes must remain thin and delegate logic to domain services or data layers.
- Components should remain presentation-focused and reusable.
- Prefer controlled components for forms with validation.
- Avoid deeply nested prop drilling; extract context only when justified.
- Hooks must encapsulate reusable stateful behavior only.
- Avoid side effects during rendering.
- Memoization should only be used when measurable performance benefits exist.
- UI state and server state should remain clearly separated.
- Prefer declarative rendering patterns over imperative DOM manipulation.

### Styling

- Use Tailwind utility classes consistently.
- Use design tokens and CSS variables instead of hardcoded values.
- Avoid hardcoded hex colors unless defining tokens centrally.
- Follow the shared spacing, radius, and typography scales.
- Shared UI patterns should use shadcn/ui components whenever possible.
- Styling should prioritize clarity, accessibility, and mobile usability.
- The UI must remain responsive on low-end mobile devices.
- Avoid excessive animations or visual complexity.
- Maintain consistent spacing and layout patterns across screens.
- Dark mode compatibility should be considered from the beginning.

### API Routes

- Validate and parse request input before executing business logic.
- Enforce authentication and ownership checks before any mutation.
- Telegram initData must always be verified server-side.
- Return predictable and consistent response shapes.
- Route handlers must not directly contain database logic.
- Database access must flow through the data access layer.
- Avoid long-running operations inside request handlers.
- Never trust client-provided authorization state.
- File upload endpoints must validate file type and size constraints.
- Errors must be sanitized before returning responses to clients.

### Database & Storage

- Exam metadata belongs in the database.
- Exam files belong in object/blob storage.
- Do not store large binary content directly in PostgreSQL.
- Database access must only happen through the data layer.
- Data mutations must only happen through Server Actions or API routes.
- Supabase RLS must remain enabled in production.
- Raw SQL must never use unsafe string interpolation.
- Migrations must be versioned and committed to the repository.
- Production schema changes must never be applied manually.
- Files and metadata must never become orphaned.
- Deleted exams must clean up associated storage assets.
- Published exams must always contain complete required metadata.
- Duplicate uploads should be detected whenever reasonably possible.

### Telegram Bot Standards

- The bot is responsible only for messaging and file intake.
- Browsing and discovery belong exclusively to the Mini App.
- Bot handlers must remain isolated inside lib/bot.
- Telegram webhook handlers must not directly contain business or database logic.
- Upload flows must be optimized for mobile-first Telegram environments.
- User identity must only come from verified Telegram data.
- Deep-link flows between bot and Mini App must remain stable and predictable.

### Performance

- Expensive queries must always be paginated.
- Search endpoints must fetch only required fields.
- File delivery should use direct storage/CDN delivery whenever possible.
- Images and previews must be optimized before delivery.
- Avoid unnecessary client-side hydration.
- Avoid unnecessary re-renders in frequently updated UI.
- Network requests should be minimized and cached appropriately.
- The application must remain usable on poor mobile connections.

### Security

- Secrets and API keys must never be exposed to the client.
- Environment variables must never be hardcoded.
- Sensitive operations must always run server-side.
- Access control must be enforced server-side even if hidden in the UI.
- Storage access must always go through backend-controlled policies or signed URLs.
- File download URLs should not expose unnecessary internal storage structure.
- User-generated metadata must always be sanitized and validated.

### File Organization

- app/ — Next.js routes, layouts, pages, and API handlers.
- app/api/ — Thin API route handlers and webhook endpoints.
- components/ — Reusable presentation components.
- components/ui/ — Shared shadcn/ui components only.
- context/ — Global React context providers and shared client state.
- hooks/ — Reusable custom React hooks.
- lib/actions.ts — Server Actions and trusted mutations.
- lib/data.ts — Data access layer and database queries.
- lib/utils.ts — Shared utility helpers and pure functions.
- lib/bot/ — Telegram bot configuration and handlers.
- lib/supabase/ — Supabase client wrappers and integrations.
- types/ — Shared TypeScript domain models and schemas.
- supabase/ — Database migrations, RLS policies, and Supabase configuration.

### Generated & Protected Files

- Do not modify generated shadcn/ui files unless explicitly required.
- Do not manually edit generated migration history after deployment.
- Avoid modifying deployment or infrastructure configuration without explicit need.
- Generated types should be regenerated from source schemas instead of manually edited.

### Workflow Standards

- Build features incrementally in small mergeable units.
- Avoid speculative abstractions for future features.
- Keep implementation aligned with architecture and documentation.
- Documentation must stay synchronized with implementation changes.
- Large features should be split into independently testable steps.
- Temporary hacks must include clear TODOs and cleanup plans.
- Code reviews should prioritize maintainability, correctness, and clarity over cleverness.