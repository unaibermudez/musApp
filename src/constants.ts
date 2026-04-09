export const MAX_TOTAL = 40;

export const APUESTAS = ["pequeñas", "grandes", "pares", "juego"] as const;
export type ApuestaNombre = (typeof APUESTAS)[number];

export const LABEL: Record<ApuestaNombre, string> = {
  pequeñas: "PEQUEÑAS",
  grandes:  "GRANDES",
  pares:    "PARES",
  juego:    "JUEGO",
};

export type Apuestas = Record<ApuestaNombre, number>;

export interface EstadoMus {
  total: [number, number];
  apuestas: Apuestas;
}

export const initialState = (): EstadoMus => ({
  total: [0, 0],
  apuestas: {
    pequeñas: 0,
    grandes:  0,
    pares:    0,
    juego:    0,
  },
});
