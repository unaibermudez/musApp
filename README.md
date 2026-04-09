# Mus — Marcador para móvil

Aplicación de marcador para el juego de cartas **Mus**, diseñada para móvil en orientación landscape. Construida con React + TypeScript + Vite, empaquetada como app nativa con Capacitor.

---

## Tecnologías

- **React 19** + **TypeScript** (strict)
- **Vite 6** — bundler y dev server
- **Capacitor 8** — wrapper nativo para Android e iOS
- Estilos 100% inline (sin CSS externo, compatible con Capacitor)

---

## Estructura del proyecto

```
src/
  MusApp.tsx                 # Componente raíz — composición de la UI
  constants.ts               # MAX_TOTAL, tipos (EstadoMus, Apuestas, ApuestaNombre)
  styles.ts                  # Todos los estilos inline tipados con CSSProperties
  hooks/
    useMus.ts                # Estado del juego, persistencia y lógica de negocio
    useGesture.ts            # Tap / swipe-down para los marcadores de puntuación
    useBetGesture.ts         # Tap / swipe izquierda-derecha-abajo para apuestas
  components/
    PanelEquipo.tsx          # Panel de equipo: nombre, puntuación, botones
    CentroApuestas.tsx       # Columna central con las 4 rondas
    ApuestaRow.tsx           # Fila de una ronda de apuesta (cuadro gesturable)
    GanadorModal.tsx         # Modal de victoria

android/                     # Proyecto nativo Android (generado por Capacitor)
MusApp.tsx                   # Componente standalone original (sin Vite)
```

---

## Lógica del juego

**Objetivo:** primer equipo en llegar a **40 piedras** gana.

**Marcadores laterales** (un panel por equipo):
- Tap en el cuadro grande → +1
- Deslizar abajo en el cuadro → −1
- Botones: `+5` / `+1` / `−1`

**Cuadros centrales** (4 rondas: Pequeñas, Grandes, Pares, Juego):
- Tap → primer toque pone **2**, cada toque siguiente +1
- Deslizar abajo → −1
- Deslizar a la izquierda → suma el valor al equipo izquierdo y resetea a 0
- Deslizar a la derecha → suma el valor al equipo derecho y resetea a 0

**Historial:** se guardan los últimos 30 estados. El botón *Deshacer* revierte el último cambio.

**Persistencia:** el estado y los nombres de equipo se guardan automáticamente en `localStorage` entre sesiones.

---

## Comandos de desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo web
npm run dev

# Build de producción
npm run build

# Sincronizar build con plataformas nativas
npm run sync

# Abrir Android Studio (requiere build previo)
npm run android

# Abrir Xcode — solo macOS (requiere build previo)
npm run ios
```

---

## Compilar para Android

### Requisitos
- [Android Studio](https://developer.android.com/studio)
- Android SDK (API 22+)
- JDK 17+

### Pasos

```bash
npm run build
npx cap sync android
```

Luego abre Android Studio manualmente y selecciona la carpeta `android/`, o ejecuta `npm run android` desde PowerShell/CMD.

Para generar el APK: `Build → Build Bundle(s)/APK(s) → Build APK(s)`

> **Nota:** `npm run android` debe ejecutarse desde PowerShell o CMD, no desde Git Bash, para que Capacitor pueda lanzar Android Studio correctamente.

### Orientación landscape

La app fuerza landscape a nivel nativo en `android/app/src/main/AndroidManifest.xml`:
```xml
android:screenOrientation="landscape"
```

---

## Compilar para iOS

### Requisitos
- macOS con Xcode 14+
- CocoaPods

```bash
npx cap add ios
npm run ios
```

La orientación landscape se configura en Xcode bajo `Deployment Info → Device Orientation`.

---

## Diseño

La interfaz sigue una estética de **papel impreso analógico**, evocando una servilleta de bar español:

- **Paleta:** crema `#f7f2e8`, azul tinta `#2e5fa3`, tinta oscura `#1a1208`
- **Tipografía:** *Playfair Display* italic para números y títulos; *Crimson Text* para el resto
- **Textura de fondo:** cuadrícula de gradientes CSS superpuestos (sin imágenes)
- **Bordes:** rectos (`border-radius: 0`), doble borde en paneles principales
- Sin sombras, sin rellenos de color sólido en botones, sin fuentes sans-serif
