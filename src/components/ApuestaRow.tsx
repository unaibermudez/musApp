import { s } from "../styles.ts";
import { LABEL, type ApuestaNombre } from "../constants.ts";
import { useBetGesture } from "../hooks/useBetGesture.ts";

interface Props {
  nombre: ApuestaNombre;
  valor: number;
  onChange: (valor: number) => void;
  onCommit: (equipoIdx: 0 | 1, value: number) => void;
}

function nextBetValue(current: number) {
  return current === 0 ? 2 : current + 1;
}

export default function ApuestaRow({ nombre, valor, onChange, onCommit }: Props) {
  const active = valor > 0;

  const commit = (idx: 0 | 1) => {
    if (valor === 0) return;
    onCommit(idx, valor);
    onChange(0);
  };

  const gesture = useBetGesture(
    () => onChange(nextBetValue(valor)),
    () => commit(0),
    () => commit(1),
    () => onChange(Math.max(0, valor - 1)),
    () => onChange(nextBetValue(valor)),
  );

  return (
    <div style={s.apuestaBloque}>
      <span style={s.apuestaLabel}>{LABEL[nombre]}</span>
      <div style={s.apuestaSquare(active)} {...gesture}>
        <span
          style={s.apuestaArrow(active)}
          onPointerDown={(e) => { e.stopPropagation(); commit(0); }}
        >‹</span>
        <span style={s.apuestaValue(active)}>{active ? valor : "·"}</span>
        <span
          style={s.apuestaArrow(active)}
          onPointerDown={(e) => { e.stopPropagation(); commit(1); }}
        >›</span>
      </div>
    </div>
  );
}
