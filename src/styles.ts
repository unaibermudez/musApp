import type { CSSProperties } from "react";

type StyleMap = Record<string, CSSProperties | ((...args: never[]) => CSSProperties)>;

const INK       = "#1a1208";
const INK55     = "rgba(26,18,8,0.55)";
const INK35     = "rgba(26,18,8,0.35)";
const BLUE      = "#2e5fa3";
const BLUE45    = "rgba(46,95,163,0.45)";
const BLUE25    = "rgba(46,95,163,0.25)";
const BLUE15    = "rgba(46,95,163,0.15)";
const PANEL_BG  = "#ede5d0";

const TEXTURE = [
  "repeating-linear-gradient(23deg, transparent 0px, transparent 18px, rgba(160,130,80,0.06) 18px, rgba(160,130,80,0.06) 19px)",
  "repeating-linear-gradient(-67deg, transparent 0px, transparent 18px, rgba(160,130,80,0.06) 18px, rgba(160,130,80,0.06) 19px)",
  "repeating-linear-gradient(90deg, transparent 0px, transparent 7px, rgba(200,175,120,0.03) 7px, rgba(200,175,120,0.03) 8px)",
  "linear-gradient(135deg, #faf6ed, #f4eddc, #f8f3e6)",
].join(", ");

const CRIMSON  = "'Crimson Text', serif";
const PLAYFAIR = "'Playfair Display', serif";

export const s = {
  /* ─── Layout ─── */
  root: {
    position: "fixed",
    inset: 0,
    backgroundImage: TEXTURE,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: CRIMSON,
    userSelect: "none",
    WebkitUserSelect: "none",
    color: INK,
  },
  layout: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 155px 1fr",
    gap: 8,
    padding: "10px 10px 6px",
    minHeight: 0,
  },

  /* ─── Panel equipo ─── */
  panel: (ganador: boolean): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
    padding: "10px 10px",
    background: PANEL_BG,
    border: ganador ? `1.5px solid ${BLUE}` : `1.5px solid ${BLUE45}`,
    outline: ganador ? `0.5px solid rgba(46,95,163,0.5)` : `0.5px solid ${BLUE25}`,
    outlineOffset: "-5px",
    borderRadius: 0,
    transition: "border-color 0.3s ease, outline-color 0.3s ease",
  }),
  nombreInput: {
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${BLUE25}`,
    color: INK55,
    fontSize: "0.65rem",
    fontFamily: CRIMSON,
    fontWeight: 600,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    textAlign: "center",
    outline: "none",
    width: "100%",
    padding: "2px 4px",
    lineHeight: 1.8,
  },
  marcador: (ganador: boolean, flash: boolean): CSSProperties => ({
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: `1px solid ${ganador ? BLUE45 : BLUE15}`,
    borderRadius: 0,
    minHeight: 0,
    cursor: "pointer",
    touchAction: "none",
    transform: flash ? "scale(0.97)" : "scale(1)",
    transition: "transform 0.3s ease",
  }),
  totalNum: (ganador: boolean): CSSProperties => ({
    fontFamily: PLAYFAIR,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(2.6rem, 7.5vw, 5.2rem)",
    color: ganador ? BLUE : INK,
    lineHeight: 1,
    transition: "color 0.3s ease",
  }),
  btnRow: {
    display: "flex",
    gap: 4,
    width: "100%",
  },
  btnPanel: (tipo: "plus5" | "plus1" | "minus"): CSSProperties => ({
    flex: 1,
    height: 30,
    border: `1px solid ${BLUE45}`,
    borderRadius: 0,
    background: "transparent",
    color: tipo === "minus" ? INK35 : INK55,
    fontSize: "0.7rem",
    fontWeight: 600,
    fontFamily: CRIMSON,
    letterSpacing: "0.08em",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    lineHeight: 1.8,
  }),

  /* ─── Centro ─── */
  centro: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    padding: "8px 0",
  },
  apuestaBloque: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    width: "100%",
  },
  apuestaLabel: {
    fontFamily: CRIMSON,
    fontWeight: 600,
    fontSize: "0.65rem",
    letterSpacing: "0.3em",
    color: `rgba(46,95,163,0.65)`,
    textTransform: "uppercase",
    lineHeight: 1.8,
  },
  apuestaSquare: (active: boolean): CSSProperties => ({
    width: "100%",
    height: 48,
    background: active ? PANEL_BG : "transparent",
    border: active ? `1px solid ${BLUE45}` : `1px solid ${BLUE15}`,
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    cursor: "pointer",
    touchAction: "none",
    transition: "background 0.3s ease, border-color 0.3s ease",
    boxSizing: "border-box",
  }),
  apuestaArrow: (active: boolean): CSSProperties => ({
    fontFamily: CRIMSON,
    fontSize: "1rem",
    color: active ? `rgba(46,95,163,0.55)` : BLUE15,
    lineHeight: 1,
    transition: "color 0.3s ease",
  }),
  apuestaValue: (active: boolean): CSSProperties => ({
    fontFamily: PLAYFAIR,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: active ? "1.4rem" : "1rem",
    color: active ? INK : INK35,
    textAlign: "center",
    minWidth: 24,
    transition: "font-size 0.2s ease, color 0.3s ease",
    lineHeight: 1,
  }),
  divider: {
    width: "100%",
    height: 1,
    background: `linear-gradient(90deg, transparent, ${BLUE25}, transparent)`,
    margin: "1px 0",
  },

  /* ─── Footer ─── */
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    padding: "5px 12px 10px",
    borderTop: `1px solid ${BLUE15}`,
  },
  btnFooter: (danger: boolean): CSSProperties => ({
    padding: "4px 18px",
    border: `1px solid ${BLUE25}`,
    borderRadius: 0,
    background: "transparent",
    color: danger ? INK35 : INK55,
    fontSize: "0.65rem",
    fontFamily: CRIMSON,
    fontWeight: 600,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    lineHeight: 1.8,
  }),

  /* ─── Modal ─── */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(247,242,232,0.92)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: PANEL_BG,
    border: `1.5px solid ${BLUE45}`,
    outline: `0.5px solid ${BLUE25}`,
    outlineOffset: "-5px",
    borderRadius: 0,
    padding: "28px 44px",
    textAlign: "center",
  },
  modalTitle: {
    fontFamily: PLAYFAIR,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "2rem",
    color: INK,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  modalText: {
    fontFamily: CRIMSON,
    color: INK55,
    fontSize: "1rem",
    marginBottom: 22,
    lineHeight: 1.8,
  },
  modalWinner: {
    fontFamily: PLAYFAIR,
    fontStyle: "italic",
    color: BLUE,
  },
  btnNueva: {
    padding: "6px 26px",
    background: "transparent",
    border: `1px solid ${BLUE45}`,
    borderRadius: 0,
    color: INK,
    fontFamily: CRIMSON,
    fontWeight: 600,
    fontSize: "0.7rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    cursor: "pointer",
    lineHeight: 1.8,
  },
} satisfies StyleMap;
