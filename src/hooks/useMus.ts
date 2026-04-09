import { useState, useCallback, useEffect } from "react";
import { initialState, MAX_TOTAL, type ApuestaNombre, type EstadoMus } from "../constants.ts";

const LS_NOMBRES = "mus-nombres";
const LS_ESTADO  = "mus-estado";

export function useMus() {
  const [nombres, setNombres] = useState<[string, string]>(["Nosotros", "Ellos"]);
  const [estado, setEstado]   = useState<EstadoMus>(initialState);
  const [flash, setFlash]     = useState<[boolean, boolean]>([false, false]);
  const [ganadorModal, setGanadorModal] = useState<0 | 1 | null>(null);

  useEffect(() => {
    try {
      const n = localStorage.getItem(LS_NOMBRES);
      const e = localStorage.getItem(LS_ESTADO);
      if (n) setNombres(JSON.parse(n) as [string, string]);
      if (e) setEstado(JSON.parse(e) as EstadoMus);
    } catch {}
  }, []);

  const guardar = useCallback((n: [string, string], e: EstadoMus) => {
    try {
      localStorage.setItem(LS_NOMBRES, JSON.stringify(n));
      localStorage.setItem(LS_ESTADO,  JSON.stringify(e));
    } catch {}
  }, []);

  const cambiarTotal = (idx: 0 | 1, delta: number) => {
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

  const cambiarApuesta = (nombre: ApuestaNombre, valor: number) => {
    setEstado((prev) => {
      const next: EstadoMus = { ...prev, apuestas: { ...prev.apuestas, [nombre]: valor } };
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

  const nuevaPartida = () => {
    const fresh = initialState();
    setEstado(fresh);
    setGanadorModal(null);
    guardar(nombres, fresh);
  };

  return {
    nombres,
    estado,
    flash,
    ganadorModal,
    setNombre,
    cambiarTotal,
    cambiarApuesta,
    nuevaPartida,
  };
}
