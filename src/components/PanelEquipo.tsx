import { useState } from "react";
import { s } from "../styles.ts";
import { useGesture } from "../hooks/useGesture.ts";
import NombreModal from "./NombreModal.tsx";

interface Props {
  nombre: string;
  total: number;
  ganador: boolean;
  flash: boolean;
  onNombre: (val: string) => void;
  onDelta: (delta: number) => void;
}

export default function PanelEquipo({ nombre, total, ganador, flash, onNombre, onDelta }: Props) {
  const [editando, setEditando] = useState(false);

  const gesture = useGesture(
    () => onDelta(+1),
    () => onDelta(-1),
  );

  return (
    <div style={s.panel(ganador)}>
      <div style={s.nombreDisplay} onPointerDown={() => setEditando(true)}>
        {nombre}
      </div>
      <div style={s.marcador(ganador, flash)} {...gesture}>
        <span style={s.totalNum(ganador)}>{total}</span>
      </div>
      <div style={s.btnRow}>
        <button style={s.btnPanel("plus5")} onPointerDown={() => onDelta(+5)}>+5</button>
        <button style={s.btnPanel("plus1")} onPointerDown={() => onDelta(+1)}>+1</button>
        <button style={s.btnPanel("minus")} onPointerDown={() => onDelta(-1)}>−1</button>
      </div>
      {editando && (
        <NombreModal
          nombre={nombre}
          onConfirmar={onNombre}
          onCerrar={() => setEditando(false)}
        />
      )}
    </div>
  );
}
