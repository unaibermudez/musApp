import { useState } from "react";
import { s } from "../styles.ts";

interface Props {
  nombre: string;
  onConfirmar: (val: string) => void;
  onCerrar: () => void;
}

export default function NombreModal({ nombre, onConfirmar, onCerrar }: Props) {
  const [valor, setValor] = useState(nombre);

  const confirmar = () => {
    const trimmed = valor.trim();
    if (trimmed) onConfirmar(trimmed);
    onCerrar();
  };

  return (
    <div style={s.overlay} onPointerDown={onCerrar}>
      <div style={s.modal} onPointerDown={(e) => e.stopPropagation()}>
        <div style={s.modalTitle}>Equipo</div>
        <input
          style={s.modalInput}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          maxLength={12}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmar();
            if (e.key === "Escape") onCerrar();
          }}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <button style={s.btnNueva} onPointerDown={onCerrar}>Cancelar</button>
          <button style={s.btnNueva} onPointerDown={confirmar}>Aceptar</button>
        </div>
      </div>
    </div>
  );
}
