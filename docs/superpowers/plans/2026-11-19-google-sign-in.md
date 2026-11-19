# Google Sign-In (Web) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users sign in / sign up on the website with Google, so accounts created by Google in the plugin (no password) can buy credits and manage plans.

**Architecture:** The API owns the whole OAuth exchange. The site only links to `${VITE_API_URL}/auth/google?machineId=…` and adds a callback route that reads the web JWT from the URL fragment, stores it exactly like `useLogin` does, loads `/auth/me` into the auth store and goes to `/account`.

**Tech Stack:** React 19, React Router 7 (framework mode), TanStack Query, Zustand, sonner, Tailwind v4.

**Spec:** `../prompducer-api/docs/superpowers/specs/2026-11-19-plugin-account-design.md` (section „Google na stronie www”). Depends on the API plan `../prompducer-api/docs/superpowers/plans/2026-11-19-plugin-account-api.md` Task 6 being deployed (locally: API on `VITE_API_URL`).

**Branch:** `feature/google-sign-in` from `master`.

## Global Constraints

- Token arrives only in the fragment: `/auth/google/callback#token=<jwt>`; it is stored with `localStorage.setItem("token", token)` (same key as `useLogin`) and the fragment is removed with `history.replaceState` before navigating.
- Start URL: `${import.meta.env.VITE_API_URL}/auth/google?machineId=<encodeURIComponent(await getMachineId())>`.
- API error redirect: `/login?error=<code>`; codes and copy: `access_denied` → "Google sign-in was cancelled.", `google_email_unverified` → "Your Google email is not verified.", `state_mismatch` → "Sign-in expired. Please try again.", anything else → "Google sign-in failed. Please try again."
- No hand edits to `api/api-types.ts`.
- The repo has no unit-test runner; verification is `npm run typecheck` plus the manual checks below (adding a test framework is out of scope).

## Review Focus

- Callback opened without a fragment or with an empty token → toast "Google sign-in failed. Please try again." and redirect to `/login`, nothing written to `localStorage`; manual check in Task 2.
- Token valid but `/auth/me` fails → token removed, user to `/login` with the generic error; manual check in Task 2.
- Callback route hit during SSR (no `window`) → must not crash; all fragment handling happens in `clientLoader`/effect only; manual check (hard reload of the callback URL) in Task 2.
- `/login?error=…` toast must fire once, not on every re-render; manual check in Task 1.
- Already-signed-in user clicking Google → still works (new token replaces old); manual check in Task 2.

---

### Task 1: "Continue with Google" button + error toast on login/register

**Files:**
- Create: `app/components/molecules/GoogleSignInButton.tsx`
- Create: `app/lib/googleAuth.ts`
- Modify: `app/components/Forms/LoginForm/LoginFormContent.tsx` (button above the e-mail fields, divider "or")
- Modify: `app/components/Forms/CreateUserForm/` content component (same placement)
- Modify: `app/pages/LoginPage/LoginPage.tsx` (read `?error=` once, toast)

**Interfaces:**
- Produces:
  - `googleSignInUrl(): Promise<string>` in `app/lib/googleAuth.ts`.
  - `googleErrorMessage(code: string | null): string | null` in `app/lib/googleAuth.ts` (copy from Global Constraints; `null` for `null`).
  - `<GoogleSignInButton label="Continue with Google" />` — on click: disables itself, `window.location.assign(await googleSignInUrl())`. Styled with existing `vst-button` classes plus the Google "G" mark (inline SVG).

- [ ] **Step 1: Implement** `googleAuth.ts`, the button, and place it in both forms.
- [ ] **Step 2: Implement** the error toast in `LoginPage`: `useSearchParams`, `useEffect` keyed on the `error` value, `toast.error(googleErrorMessage(error))`, then `setSearchParams({}, { replace: true })` so it fires once.
- [ ] **Step 3: Run** `npm run typecheck` — Expected: no errors.
- [ ] **Step 4: Manual check:** `npm run dev`; `/login` and `/register` show the button; clicking navigates to `<API>/auth/google?machineId=…`; open `/login?error=access_denied` → one toast "Google sign-in was cancelled.", URL becomes `/login`.
- [ ] **Step 5: Commit** `git commit -m "auth: Continue with Google on login and register"`

### Task 2: Callback route

**Files:**
- Create: `app/routes/auth-google-callback.tsx`
- Modify: `app/routes.ts` (add `route("/auth/google/callback", "routes/auth-google-callback.tsx")` inside the layout)
- Modify: `app/lib/googleAuth.ts`

**Interfaces:**
- Consumes: `googleErrorMessage` (Task 1), `getMe` (`app/queries/auth.ts`), `setUser` (`app/stores/authStore.ts`).
- Produces:
  - `readTokenFromHash(hash: string): string | null` in `googleAuth.ts` — parses `#token=…` with `URLSearchParams`, returns `null` for missing/empty.
  - Route module with `meta` (`seo({ title: "Signing in", path: "/auth/google/callback", noindex: true })`) and a `clientLoader` that: reads the hash; on `null` → `toast.error(generic)` and `redirect("/login")`; otherwise `localStorage.setItem("token", token)`, `history.replaceState(null, "", "/auth/google/callback")`, `const me = await getMe()`, `setUser(me)`, `trackSignup()` is **not** called (we can't tell signup from login), `redirect("/account")`; if `getMe` throws → `localStorage.removeItem("token")`, `clearUser()`, `redirect("/login?error=failed")`. Default component renders a small "Signing you in…" spinner (shown only while the loader runs; `HydrateFallback` same).

- [ ] **Step 1: Implement** `readTokenFromHash` and the route.
- [ ] **Step 2: Run** `npm run typecheck` — Expected: no errors.
- [ ] **Step 3: Manual checks** (API running with Google configured):
  - Google sign-in from `/login` with an existing Google-linked account → lands on `/account` signed in; URL bar never keeps `#token`.
  - Brand-new Google account → account created, `/account` shows free credits.
  - Open `/auth/google/callback` with no hash → toast + `/login` (Review Focus).
  - Open `/auth/google/callback#token=garbage` → `/login` with "Google sign-in failed. Please try again.", `localStorage.token` absent (Review Focus).
  - Hard reload of `/auth/google/callback#token=…` (SSR path) → no server error (Review Focus).
  - While signed in, click Google again → still ends on `/account` (Review Focus).
- [ ] **Step 4: Commit** `git commit -m "auth: Google sign-in callback route"`
