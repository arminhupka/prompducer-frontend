# CLAUDE.md — SUMMONIC / Prompducer Frontend

Context for Claude Code working in this repo. Read this first, every session.

## What this is

The web client for **SUMMONIC** — a credit-based text-to-audio SaaS. Users register,
subscribe (Stripe), spend credits to generate audio from a text prompt, and play back
the generated clips. Codebase name **Prompducer**. Talks to the NestJS API in
`../prompducer-api-main` (prod: `https://api-summonic.producersources.com`).

Owner: Amine (Producersources.com / LBandya Records). Honest engineering, complete
paste-ready code, additive changes.

## Stack

React 19 · **React Router 7** (framework mode, SSR) · Vite · TypeScript · Tailwind CSS
v4 (`@tailwindcss/vite`) · shadcn/ui + Radix (`components/ui/*`) · **TanStack Query**
(server state) · **Zustand** (auth store) · React Hook Form + Zod (`@hookform/resolvers`,
`@netri0t/rhfz`) · axios · sonner (toasts) · luxon. Biome for lint/format.

## Build / run

```bash
npm install
npm run dev        # React Router dev server + HMR on http://localhost:5173
npm run build      # -> build/{client,server}
npm run start      # serve the production build (react-router-serve)
npm run typecheck  # react-router typegen && tsc
```

Set `VITE_API_URL` to the API base URL (e.g. `http://localhost:3000`) — see apiClient.

## API types are generated — do not hand-edit `api/api-types.ts`

```bash
npm run swagger    # regenerates ./api/api-types.ts from the live Swagger JSON
# -> swagger-typescript-api generate -p https://api-summonic.producersources.com/api-json
```

`api/api-types.ts` is generated from the API's OpenAPI doc. When the API DTOs change,
rerun `npm run swagger` rather than editing types by hand. (Requires the API's `/api-json`
to be reachable.)

## Layout

```
app/
  root.tsx                 Root document + providers
  routes.ts                Route table (see below)
  app.css                  Tailwind entry
  providers/GlobalAudioProvider.tsx   App-wide audio playback state
  layouts/AppLayout.tsx    Shell wrapping all routes (header, etc.)
  routes/                  home, login, register, reset-password, account
  pages/                   Page bodies (LoginPage, RegisterPage, AccountPage, ResetPasswordPage)
  components/
    ui/                    shadcn/Radix primitives (button, card, input, form, ...)
    Forms/                 Login / CreateUser / ResetPassword (Provider + Content + wrapper each)
    molecules/             AppHeader, PlanInfo, Coupon, PromptItem
    atoms/                 AudioPlayer, form inputs
  queries/                 TanStack Query hooks: auth, plans, prompts, coupons
  stores/authStore.ts      Zustand: current user (setUser/clearUser)
  lib/
    apiClient.ts           axios instance; injects Bearer token from localStorage
    routeGuards.ts         redirectAuthenticated / redirectUnauthenticatedUser (loaders)
    queryClient.ts, getApiErrorMessage.ts, utils.ts
api/api-types.ts           GENERATED — see above
```

## Routes (`app/routes.ts`)

All under `layouts/AppLayout.tsx`: `/` (`home`, index), `/login`, `/register`,
`/reset-password`, `/account`.

## Auth model (know this before touching auth)

- **JWT stored in `localStorage` under `token`.** `apiClient` (`lib/apiClient.ts`) reads it
  on every request and sets `Authorization: Bearer <token>`.
- Route protection is done in **loaders** via `lib/routeGuards.ts`: `hasValidSession()`
  calls `GET /auth/me`; `redirectUnauthenticatedUser` → `/login`,
  `redirectAuthenticatedUser` → `/account`. Wire these as route `loader`s.
- `stores/authStore.ts` holds the current `MeResponseDto` in Zustand (`setUser`/`clearUser`)
  for UI; it is not the source of truth for session validity — the API is.
- Caveat: this is SSR (React Router framework mode), but the token lives in `localStorage`,
  which is **client-only**. Guard loaders that run on the server can't read it directly —
  they rely on `GET /auth/me`. Keep auth checks going through the API, not `localStorage`,
  in any code that may run server-side.

## Core user flow

Register/login → subscribe to a plan (Stripe, `queries/plans.ts` + `PlanInfo`, optional
`Coupon`) → on the home view submit a prompt → poll the generation job → `PromptItem`
lists results → `atoms/AudioPlayer` + `GlobalAudioProvider` play the returned clips.
Credits/subscription state is shown on `/account`.

## Conventions

- Forms follow a **Provider + Content + wrapper** triad (see `components/Forms/*`): RHF +
  Zod schema in the Provider, fields in the Content, composed in the wrapper. Match it.
- Server state → TanStack Query (`queries/*`); ephemeral UI/auth → Zustand. Don't fetch
  in components directly with axios when a query hook exists.
- UI primitives come from `components/ui` (shadcn). Prefer them over ad-hoc markup.
- `README.md` is the stock React Router template — this file is the real handoff.
