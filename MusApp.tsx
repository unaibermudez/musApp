import { useState, useCallback, useEffect } from "react";
import type { CSSProperties } from "react";

/* ─── Constantes ─────────────────────────────────────── */
const MAX_TOTAL = 40;
const APUESTAS = ["pequeñas", "grandes", "pares", "juego"] as const;
type ApuestaNombre = (typeof APUESTAS)[number];

const LABEL: Record<ApuestaNombre, string> = {
  pequeñas: "PEQUEÑAS",
  grandes:  "GRANDES",
  pares:    "PARES",
  juego:    "JUEGO",
};

interface Apuestas {
  pequeñas: [number, number];
  grandes:  [number, number];
  pares:    [number, number];
  juego:    [number, number];
}

interface EstadoMus {
  total: [number, number];
  apuestas: Apuestas;
}

const initialState = (): EstadoMus => ({
  total: [0, 0],
  apuestas: {
    pequeñas: [0, 0],
    grandes:  [0, 0],
    pares:    [0, 0],
    juego:    [0, 0],
  },
});

/* ─── Estilos (inline, Capacitor-friendly) ───────────── */
type StyleMap = Record<string, CSSProperties | ((...args: never[]) => CSSProperties)>;

const s = {
  root: {
    position: "fixed",
    inset: 0,
    background: "#0d0d0d",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "'Georgia', serif",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  noise: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 15% 50%, rgba(180,140,60,0.07) 0%, transparent 55%)," +
      "radial-gradient(ellipse at 85% 50%, rgba(180,140,60,0.07) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  layout: {
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 210px 1fr",
    gap: 8,
    padding: "10px 12px 6px",
    minHeight: 0,
  },
  panel: (ganador: boolean): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px 10px",
    background: ganador ? "rgba(180,140,60,0.1)" : "rgba(255,255,255,0.02)",
    borderRadius: 14,
    border: ganador
      ? "1px solid rgba(180,140,60,0.55)"
      : "1px solid rgba(255,255,255,0.07)",
    transition: "all 0.35s",
  }),
  nombreInput: {
    background: "transparent",
    border: "none",
    borderBottom: "1px dashed rgba(180,140,60,0.35)",
    color: "#e8d5a0",
    fontSize: "0.9rem",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textAlign: "center",
    outline: "none",
    width: "100%",
    maxWidth: 170,
    padding: "2px 4px",
  },
  marcador: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.07)",
    minHeight: 0,
  },
  totalNum: (ganador: boolean, flash: boolean): CSSProperties => ({
    fontSize: "clamp(3rem, 9vw, 6.5rem)",
    fontWeight: "bold",
    color: ganador ? "#c9a84c" : flash ? "#ffffff" : "#f0f0f0",
    textShadow: ganador ? "0 0 28px rgba(201,168,76,0.65)" : "0 2px 10px rgba(0,0,0,0.5)",
    lineHeight: 1,
    transform: flash ? "scale(1.1)" : "scale(1)",
    transition: "color 0.15s, transform 0.12s",
  }),
  btnRow: {
    display: "flex",
    gap: 7,
    width: "100%",
    justifyContent: "center",
  },
  btnMain: (tipo: "plus5" | "plus1" | "minus"): CSSProperties => ({
    flex: tipo === "minus" ? 0.8 : 1,
    height: 42,
    border: "none",
    borderRadius: 9,
    fontSize: tipo === "plus5" ? "1rem" : "0.95rem",
    fontWeight: "bold",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      tipo === "minus"
        ? "linear-gradient(160deg, #4a1010, #280606)"
        : tipo === "plus1"
        ? "linear-gradient(160deg, #163320, #0b1f12)"
        : "linear-gradient(160deg, #1c4225, #0f2416)",
    color: tipo === "minus" ? "#ff8888" : "#6ddb8c",
    boxShadow:
      tipo === "minus"
        ? "0 3px 8px rgba(180,20,20,0.35), inset 0 1px rgba(255,255,255,0.06)"
        : "0 3px 8px rgba(20,110,50,0.3), inset 0 1px rgba(255,255,255,0.06)",
    WebkitTapHighlightColor: "transparent",
    letterSpacing: "0.04em",
    transition: "opacity 0.08s",
  }),

  /* ─── Centro ─── */
  centro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 2,
    padding: "8px 6px",
  },
  apuestaBloque: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    width: "100%",
  },
  apuestaLabel: {
    fontSize: "0.52rem",
    letterSpacing: "0.22em",
    color: "rgba(180,140,60,0.65)",
    textTransform: "uppercase",
  },
  apuestaControls: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: "100%",
  },
  apuestaDisplay: {
    flex: 1,
    height: 34,
    background: "rgba(0,0,0,0.55)",
    border: "1px solid rgba(180,140,60,0.2)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  scoreTeam: (idx: number): CSSProperties => ({
    color: idx === 0 ? "#88ccff" : "#ffaa66",
    fontSize: "0.88rem",
    fontWeight: "bold",
    minWidth: 18,
    textAlign: "center",
  }),
  scoreDot: {
    color: "rgba(180,140,60,0.35)",
    fontSize: "0.7rem",
  },
  btnAp: {
    width: 26,
    height: 34,
    border: "1px solid rgba(180,140,60,0.18)",
    borderRadius: 7,
    background: "rgba(180,140,60,0.07)",
    color: "rgba(180,140,60,0.75)",
    fontSize: "0.82rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    WebkitTapHighlightColor: "transparent",
    fontFamily: "'Georgia', serif",
  },
  divider: {
    width: "85%",
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(180,140,60,0.22), transparent)",
  },
  leyenda: {
    display: "flex",
    gap: 12,
    marginTop: 4,
  },
  leyendaItem: (color: string): CSSProperties => ({
    fontSize: "0.5rem",
    color,
    letterSpacing: "0.08em",
  }),

  /* ─── Footer ─── */
  footer: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 10,
    padding: "5px 12px 10px",
    borderTop: "1px solid rgba(180,140,60,0.1)",
  },
  btnFooter: (danger: boolean): CSSProperties => ({
    padding: "6px 22px",
    border: `1px solid ${danger ? "rgba(180,60,60,0.35)" : "rgba(180,140,60,0.3)"}`,
    borderRadius: 20,
    background: danger ? "rgba(100,15,15,0.2)" : "rgba(180,140,60,0.07)",
    color: danger ? "#e07070" : "#c9a84c",
    fontSize: "0.78rem",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.07em",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  }),

  /* ─── Modal ─── */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "linear-gradient(135deg, #111, #1c1c1c)",
    border: "1px solid rgba(201,168,76,0.5)",
    borderRadius: 18,
    padding: "30px 44px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.85)",
  },
  modalTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.9rem",
    color: "#c9a84c",
    marginBottom: 8,
  },
  modalText: {
    color: "#e8d5a0",
    fontSize: "1.05rem",
    marginBottom: 22,
    fontFamily: "'Georgia', serif",
  },
  btnNueva: {
    padding: "10px 30px",
    background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
    border: "none",
    borderRadius: 22,
    color: "#1a0e00",
    fontFamily: "'Georgia', serif",
    fontSize: "0.95rem",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "0.06em",
  },
} satisfies StyleMap;

/* ─── ApuestaRow ──────────────────────────────────────── */
interface ApuestaRowProps {
  nombre: ApuestaNombre;
  valores: [number, number];
  onChange: (valores: [number, number]) => void;
}

function ApuestaRow({ nombre, valores, onChange }: ApuestaRowProps) {
  const handle = (eqIdx: 0 | 1, delta: number) => {
    const next = [...valores] as [number, number];
    next[eqIdx] = Math.max(0, next[eqIdx] + delta);
    onChange(next);
  };
  return (
    <div style={s.apuestaBloque}>
      <span style={s.apuestaLabel}>{LABEL[nombre]}</span>
      <div style={s.apuestaControls}>
        <button style={s.btnAp} onPointerDown={() => handle(0, -1)}>‹</button>
        <div style={s.apuestaDisplay}>
          <span style={s.scoreTeam(0)}>{valores[0]}</span>
          <span style={s.scoreDot}>·</span>
          <span style={s.scoreTeam(1)}>{valores[1]}</span>
        </div>
        <button style={s.btnAp} onPointerDown={() => handle(1, +1)}>›</button>
      </div>
    </div>
  );
}

/* ─── PanelEquipo ─────────────────────────────────────── */
interface PanelEquipoProps {
  nombre: string;
  total: number;
  ganador: boolean;
  flash: boolean;
  onNombre: (val: string) => void;
  onDelta: (delta: number) => void;
}

function PanelEquipo({ nombre, total, ganador, flash, onNombre, onDelta }: PanelEquipoProps) {
  return (
    <div style={s.panel(ganador)}>
      <input
        style={s.nombreInput}
        value={nombre}
        onChange={(e) => onNombre(e.target.value)}
        maxLength={12}
      />
      <div style={s.marcador}>
        <span style={s.totalNum(ganador, flash)}>{total}</span>
      </div>
      <div style={s.btnRow}>
        <button style={s.btnMain("plus5")} onPointerDown={() => onDelta(+5)}>+5</button>
        <button style={s.btnMain("plus1")} onPointerDown={() => onDelta(+1)}>+1</button>
        <button style={s.btnMain("minus")} onPointerDown={() => onDelta(-1)}>−1</button>
      </div>
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────── */
export default function MusApp() {
  const [nombres, setNombres] = useState<[string, string]>(["Nosotros", "Ellos"]);
  const [estado, setEstado] = useState<EstadoMus>(initialState);
  const [historial, setHistorial] = useState<EstadoMus[]>([]);
  const [flash, setFlash] = useState<[boolean, boolean]>([false, false]);
  const [ganadorModal, setGanadorModal] = useState<0 | 1 | null>(null);

  useEffect(() => {
    try {
      const n = localStorage.getItem("mus-nombres");
      const e = localStorage.getItem("mus-estado");
      if (n) setNombres(JSON.parse(n) as [string, string]);
      if (e) setEstado(JSON.parse(e) as EstadoMus);
    } catch {}
  }, []);

  const guardar = useCallback((n: [string, string], e: EstadoMus) => {
    try {
      localStorage.setItem("mus-nombres", JSON.stringify(n));
      localStorage.setItem("mus-estado", JSON.stringify(e));
    } catch {}
  }, []);

  const cambiarTotal = (idx: 0 | 1, delta: number) => {
    setHistorial((h) => [...h.slice(-29), JSON.parse(JSON.stringify(estado)) as EstadoMus]);
    setEstado((prev) => {
      const next: EstadoMus = { ...prev, total: [...prev.total] as [number, number] };
      next.total[idx] = Math.min(MAX_TOTAL, Math.max(0, next.total[idx] + delta));
      guardar(nombres, next);
      if (next.total[idx] === MAX_TOTAL) setTimeout(() => setGanadorModal(idx), 280);
      return next;
    });
    setFlash((f) => { const nf = [...f] as [boolean, boolean]; nf[idx] = true; return nf; });
    setTimeout(() => setFlash((f) => { const nf = [...f] as [boolean, boolean]; nf[idx] = false; return nf; }), 170);
  };

  const cambiarApuesta = (nombre: ApuestaNombre, valores: [number, number]) => {
    setHistorial((h) => [...h.slice(-29), JSON.parse(JSON.stringify(estado)) as EstadoMus]);
    setEstado((prev) => {
      const next: EstadoMus = { ...prev, apuestas: { ...prev.apuestas, [nombre]: valores } };
      guardar(nombres, next);
      return next;
    });
  };

  const setNombre = (idx: 0 | 1, val: string) => {
    const next = [...nombres] as [string, string];
    next[idx] = val;
    setNombres(next);
    guardar(next, estado);
  };

  const deshacer = () => {
    if (!historial.length) return;
    const prev = historial[historial.length - 1];
    setHistorial((h) => h.slice(0, -1));
    setEstado(prev);
    guardar(nombres, prev);
  };

  const nuevaPartida = () => {
    const fresh = initialState();
    setEstado(fresh);
    setHistorial([]);
    setGanadorModal(null);
    guardar(nombres, fresh);
  };

  const confirmarReset = () => {
    if (window.confirm("¿Reiniciar la partida?")) nuevaPartida();
  };

  return (
    <div style={s.root}>
      <div style={s.noise} />

      <div style={s.layout}>
        <PanelEquipo
          nombre={nombres[0]}
          total={estado.total[0]}
          ganador={estado.total[0] === MAX_TOTAL}
          flash={flash[0]}
          onNombre={(v) => setNombre(0, v)}
          onDelta={(d) => cambiarTotal(0, d)}
        />

        <div style={s.centro}>
          {APUESTAS.map((ap, i) => (
            <div key={ap} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              {i > 0 && <div style={s.divider} />}
              <ApuestaRow
                nombre={ap}
                valores={estado.apuestas[ap]}
                onChange={(v) => cambiarApuesta(ap, v)}
              />
            </div>
          ))}
          <div style={s.leyenda}>
            <span style={s.leyendaItem("#88ccff")}>◀ {nombres[0].slice(0, 7)}</span>
            <span style={s.leyendaItem("#ffaa66")}>{nombres[1].slice(0, 7)} ▶</span>
          </div>
        </div>

        <PanelEquipo
          nombre={nombres[1]}
          total={estado.total[1]}
          ganador={estado.total[1] === MAX_TOTAL}
          flash={flash[1]}
          onNombre={(v) => setNombre(1, v)}
          onDelta={(d) => cambiarTotal(1, d)}
        />
      </div>

      <div style={s.footer}>
        <button style={s.btnFooter(false)} onPointerDown={deshacer}>↩ Deshacer</button>
        <button style={s.btnFooter(true)} onPointerDown={confirmarReset}>Reiniciar</button>
      </div>

      {ganadorModal !== null && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={s.modalTitle}>🏆 ¡Mus!</div>
            <div style={s.modalText}>
              <strong style={{ color: "#c9a84c" }}>{nombres[ganadorModal]}</strong> han llegado a 40
            </div>
            <button style={s.btnNueva} onPointerDown={nuevaPartida}>Nueva partida</button>
          </div>
        </div>
      )}
    </div>
  );
}
