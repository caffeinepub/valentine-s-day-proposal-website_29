# Specification

## Summary
**Goal:** Fix the proposal/home screen so assets load correctly (including a new kitty illustration), the “No” button stays persistently visible on mobile, teasing messages spawn and float on each “No” click, and the Valentine background looks more classy.

**Planned changes:**
- Generate and add a new cartoon kitty illustration (with a clear love/heart element) based on the uploaded reference image, and replace the current proposal/home screen kitty asset reference so it no longer points to a missing/incorrect filename.
- Audit and correct proposal/home screen static asset references so all `/assets/generated/*` files used by the UI exist under `frontend/public/assets/generated` (no broken images on load across desktop/mobile).
- Update the “No” button evasive behavior to work across mouse and touch input while ensuring the button never disappears off-screen or becomes non-interactable (especially on mobile).
- Change teasing message behavior so every “No” click spawns a new random message at a random position, with a visible drifting/hovering animation and timed disappearance, without blocking interaction with the “No” button.
- Refine the proposal/home screen background styling to be more premium/classy while keeping a Valentine theme and maintaining good readability/contrast on mobile.

**User-visible outcome:** The home/proposal screen shows the new kitty illustration reliably, has no broken background/image assets, the “No” button always remains visible and evasive on all devices, each “No” click creates a floating teasing popup, and the background looks more polished and aesthetic.
