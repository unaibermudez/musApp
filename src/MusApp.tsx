import { s } from "./styles.ts";
import { useMus } from "./hooks/useMus.ts";
import { MAX_TOTAL } from "./constants.ts";
import PanelEquipo from "./components/PanelEquipo.tsx";
import CentroApuestas from "./components/CentroApuestas.tsx";
import GanadorModal from "./components/GanadorModal.tsx";

export default function MusApp() {
  const {
    nombres,
    estado,
    flash,
    ganadorModal,
    setNombre,
    cambiarTotal,
    cambiarApuesta,
    nuevaPartida,
  } = useMus();

  return (
    <div style={s.root}>
      <div style={s.layout}>
        <PanelEquipo
          nombre={nombres[0]}
          total={estado.total[0]}
          ganador={estado.total[0] === MAX_TOTAL}
          flash={flash[0]}
          onNombre={(v) => setNombre(0, v)}
          onDelta={(d) => cambiarTotal(0, d)}
        />

        <CentroApuestas
          apuestas={estado.apuestas}
          onChange={cambiarApuesta}
          onCommit={(idx, value) => cambiarTotal(idx, value)}
        />

        <PanelEquipo
          nombre={nombres[1]}
          total={estado.total[1]}
          ganador={estado.total[1] === MAX_TOTAL}
          flash={flash[1]}
          onNombre={(v) => setNombre(1, v)}
          onDelta={(d) => cambiarTotal(1, d)}
        />
      </div>

      <GanadorModal
        ganadorIdx={ganadorModal}
        nombres={nombres}
        onNuevaPartida={nuevaPartida}
      />
    </div>
  );
}
