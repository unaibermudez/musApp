import { s } from "../styles.ts";
import { APUESTAS, type ApuestaNombre, type Apuestas } from "../constants.ts";
import ApuestaRow from "./ApuestaRow.tsx";

interface Props {
  apuestas: Apuestas;
  onChange: (nombre: ApuestaNombre, valor: number) => void;
  onCommit: (equipoIdx: 0 | 1, value: number) => void;
}

export default function CentroApuestas({ apuestas, onChange, onCommit }: Props) {
  return (
    <div style={s.centro}>
      {APUESTAS.map((ap, i) => (
        <div
          key={ap}
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
        >
          {i > 0 && <div style={s.divider} />}
          <ApuestaRow
            nombre={ap}
            valor={apuestas[ap]}
            onChange={(v) => onChange(ap, v)}
            onCommit={onCommit}
          />
        </div>
      ))}
    </div>
  );
}
