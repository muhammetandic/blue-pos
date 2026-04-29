# GEMINI.md - Project Mandates

This file contains foundational mandates for the `my-hono-app` project. These rules take precedence over general defaults.

## Project Stack
- **Runtime:** Bun
- **Framework:** Hono
- **Database:** Drizzle ORM (PostgreSQL)
- **Validation:** Zod
- **Mailing:** Resend (via Bun Workers)
- **Formatting/Linting:** Biome

## Architectural Patterns

### 1. Feature-Based Structure
New modules must be placed within `src/features/`. Each feature should follow this structure:
- `routes.ts`: Route definitions.
- `controller.ts`: Request handling logic.
- `validators.ts`: Zod schemas and TypeScript types.
- `services/`: Business logic and database interactions.

### 2. Standardized Responses
Always use the `ApiResult` utility from `src/types/result.type.ts` for API responses to ensure a consistent JSON structure.
- `ApiResult.success(data, message)`
- `ApiResult.error(error, details)`
- `ApiResult.validationError(details)`

### 3. Middleware & Security
- All routes under `/api/*` require JWT authentication.
- JWT secret and other sensitive configurations must be managed via environment variables.

### 4. Asynchronous Tasks
- Use Bun Workers for long-running or non-blocking tasks (e.g., email sending) to keep the main thread responsive.
- See `src/workers/mail.ts` for implementation reference.

## Coding Standards
- **Formatting:** Use Biome for linting and formatting. Run `bun biome check --write` before committing.
- **Type Safety:** Ensure strict TypeScript typing across the codebase. Avoid using `any`.
- **Naming:** 
    - CamelCase for variables and functions.
    - PascalCase for classes, types, and interfaces.
    - Kebab-case for file names (e.g., `user.service.ts`).

## Database Management
- Define schemas in `src/db/schema.ts`.
- Use `drizzle-kit` for migrations:
    - `bun x drizzle-kit generate` to create migrations.
    - `bun x drizzle-kit migrate` to apply them.

## Testing Strategy
- (Mandate to be updated when testing framework is established)
- All new features should include unit or integration tests in their respective feature folders.
