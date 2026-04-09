import { s } from "../styles.ts";

interface Props {
  ganadorIdx: 0 | 1 | null;
  nombres: [string, string];
  onNuevaPartida: () => void;
}

export default function GanadorModal({ ganadorIdx, nombres, onNuevaPartida }: Props) {
  if (ganadorIdx === null) return null;

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.modalTitle}>¡Mus!</div>
        <div style={s.modalText}>
          <span style={s.modalWinner}>{nombres[ganadorIdx]}</span>
          {" "}han llegado a 40
        </div>
        <button style={s.btnNueva} onPointerDown={onNuevaPartida}>
          Nueva partida
        </button>
      </div>
    </div>
  );
}
