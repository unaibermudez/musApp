import { s } from "../styles.ts";
import { useGesture } from "../hooks/useGesture.ts";

interface Props {
  nombre: string;
  total: number;
  ganador: boolean;
  flash: boolean;
  onNombre: (val: string) => void;
  onDelta: (delta: number) => void;
}

export default function PanelEquipo({ nombre, total, ganador, flash, onNombre, onDelta }: Props) {
  const gesture = useGesture(
    () => onDelta(+1),
    () => onDelta(-1),
  );

  return (
    <div style={s.panel(ganador)}>
      <input
        style={s.nombreInput}
        value={nombre}
        onChange={(e) => onNombre(e.target.value)}
        maxLength={12}
      />
      <div style={s.marcador(ganador, flash)} {...gesture}>
        <span style={s.totalNum(ganador)}>{total}</span>
      </div>
      <div style={s.btnRow}>
        <button style={s.btnPanel("plus5")} onPointerDown={() => onDelta(+5)}>+5</button>
        <button style={s.btnPanel("plus1")} onPointerDown={() => onDelta(+1)}>+1</button>
        <button style={s.btnPanel("minus")} onPointerDown={() => onDelta(-1)}>−1</button>
      </div>
    </div>
  );
}
