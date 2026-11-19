# Plugin Billing — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the prompt history from the account page and show the new plugin generation registry (with the refund-cap flag) in the admin panel.

**Architecture:** Delete the prompt-history UI and its query; adapt the admin Overview cards/chart and the Generations tab to the new `/admin/overview` and `/admin/generations` shapes from the API plan.

**Tech Stack:** React 19, React Router 7, TanStack Query, Tailwind v4.

**Spec:** `../prompducer-api/docs/superpowers/specs/2026-11-19-plugin-billing-design.md`. API shapes: `../prompducer-api/docs/superpowers/plans/2026-11-19-plugin-billing-api.md` Task 5 (`GenerationRow`, overview `generations`, `generationsDaily`, `recentGenerations`).

**Branch:** `feature/plugin-billing` from `master`. Deploy together with the API (admin response shapes change).

## Global Constraints

- No hand edits to `api/api-types.ts` (types for the new admin shapes live next to the admin queries).
- No unit-test runner: verification is `npm run typecheck` plus a manual check against a local API.
- Account page keeps balance, plan, purchases; only "Prompt history" goes.

## Review Focus

- Admin Generations with `prompts` of 1–3 entries and very long prompts → the row stays one line per generation (truncate with title tooltip). Manual check in Task 2.
- `produced`/`charged` null for reserved generations → shown as "—", not "null". Manual check in Task 2.
- Empty registry (fresh deploy) → Overview shows zeros and an empty chart, no crash. Manual check in Task 2.
- Filtering by `refundCapped` resets to page 1. Manual check in Task 2.
- Account page with no history section still lays out correctly on mobile width. Manual check in Task 1.

---

### Task 1: Remove prompt history from the account page

**Files:**
- Delete: `app/components/molecules/PromptItem/` , `app/queries/prompts.ts`
- Modify: `app/pages/AccountPage/AccountPage.tsx` (remove the "Prompts / Prompt history" section, its pagination state and copy mentioning history)

- [ ] **Step 1: Edit**; `grep -rn "useGetPrompts\|PromptItem\|Prompt history" app` returns nothing.
- [ ] **Step 2: Run** `npm run typecheck` — Expected: no errors.
- [ ] **Step 3: Manual check** `npm run dev`, `/account` desktop and 375 px wide (Review Focus).
- [ ] **Step 4: Commit** `git commit -m "account: remove prompt history"`

### Task 2: Admin Overview and Generations on the new registry

**Files:**
- Modify: `app/pages/AdminPage/AdminPage.tsx` (Generations cards: total, sounds charged, credits refunded, refund-capped count; chart from `generationsDaily`; recent list from `recentGenerations`), `app/pages/AdminPage/GenerationsTab.tsx` (columns: date, user e-mail, prompt(s), sounds `produced/layers`, credits charged, refunded, flag; filter toggle "Refund limit hit only" → `refundCapped=true`), the admin query module that fetches these endpoints (types `GenerationRow`, overview `generations` as in the API plan).

- [ ] **Step 1: Edit** per the API shapes.
- [ ] **Step 2: Run** `npm run typecheck` — Expected: no errors.
- [ ] **Step 3: Manual check** against the local API from the API plan's Task 6 boot check (seed a few `plugin_generations` rows via SQL incl. a reserved one, a capped one, a 3-prompt one): all Review Focus items.
- [ ] **Step 4: Commit** `git commit -m "admin: generations from the plugin registry"`
