import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const TAP_THRESHOLD = 8; // px — movimiento menor = tap

export function useBetGesture(
  onTap: () => void,
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  onSwipeDown: () => void,
  onSwipeUp: () => void,
) {
  const start = useRef({ x: 0, y: 0 });

  return {
    onPointerDown: (e: ReactPointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    onPointerUp: (e: ReactPointerEvent) => {
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);

      if (adx < TAP_THRESHOLD && ady < TAP_THRESHOLD) {
        onTap();
      } else if (adx >= ady) {
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      } else if (dy > 0) {
        onSwipeDown();
      } else {
        onSwipeUp();
      }
    },
    onPointerCancel: () => {},
  };
}
