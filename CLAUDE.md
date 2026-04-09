# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Stack

Vite + React 19 + TypeScript (strict). All styles are inline objects (Capacitor/mobile-friendly, no CSS files).

## Architecture

```
src/
  constants.ts          # MAX_TOTAL, APUESTAS tuple, types (ApuestaNombre, EstadoMus, Apuestas)
  styles.ts             # all inline styles; functions where style depends on props
  hooks/
    useMus.ts           # all game state + localStorage persistence + undo history
  components/
    PanelEquipo.tsx     # one team's panel: name input, score display, +5/+1/−1 buttons
    ApuestaRow.tsx      # one betting round row with per-team counters (‹ · ›)
    CentroApuestas.tsx  # center column: maps APUESTAS → ApuestaRow + legend
    GanadorModal.tsx    # win overlay (renders null when ganadorIdx === null)
  MusApp.tsx            # root component: uses useMus(), composes the three columns
  main.tsx              # ReactDOM.createRoot entry point
```

**State shape** (owned by `useMus`):
```ts
{ total: [number, number], apuestas: Record<ApuestaNombre, [number, number]> }
```

**Persistence:** `localStorage` keys `mus-nombres` and `mus-estado`. Loaded on mount, saved on every mutation.

**Undo:** last 30 states kept in `historial` array inside `useMus`.

**Win condition:** `MAX_TOTAL = 40`. Reaching it triggers `setGanadorModal(idx)` after 280 ms.

## Conventions

- Always TypeScript — no `.js`/`.jsx` files in `src/`.
- Style functions in `styles.ts` are typed with explicit `CSSProperties` return type.
- Tuple types (`[number, number]`, `[string, string]`) are used throughout instead of `number[]`.
