import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const SWIPE_THRESHOLD = 28;

export function useGesture(onTap: () => void, onSwipeDown: () => void) {
  const startY = useRef(0);
  const fired = useRef(false);

  return {
    onPointerDown: (e: ReactPointerEvent) => {
      startY.current = e.clientY;
      fired.current = false;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: ReactPointerEvent) => {
      if (!fired.current && e.clientY - startY.current > SWIPE_THRESHOLD) {
        fired.current = true;
        onSwipeDown();
      }
    },
    onPointerUp: () => {
      if (!fired.current) onTap();
      fired.current = true;
    },
    onPointerCancel: () => {
      fired.current = true;
    },
  };
}
