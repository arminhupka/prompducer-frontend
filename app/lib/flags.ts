/**
 * Pre-launch gate.
 *
 * While `COMING_SOON` is true, the plugin download and all payments (plan
 * subscriptions + credit top-ups) are hidden behind a "Coming soon" state.
 * Everything else (browsing, sign-up, the marketing pages) stays live.
 *
 * To open downloads + payments for launch: set this to `false` and rebuild.
 */
export const COMING_SOON = true;
