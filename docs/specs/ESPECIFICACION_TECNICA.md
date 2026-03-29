# Especificacion Tecnica

Fecha base: `2026-03-27`

## 1. Stack actual

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Canvas 2D`
- `Vitest`
- deploy en `Vercel`

## 2. Arquitectura general

La app monta un shell React, pero el juego corre sobre un engine propio con estado mutable y actualizacion por frame.

Separacion actual:

- `React`:
  - shell;
  - overlays;
  - HUD;
  - controles mobile;
  - canvas host;
- `engine`:
  - estado del juego;
  - loop;
  - input;
  - movimiento;
  - combate;
  - enemigos;
  - escena;
  - items;
  - camara;
  - HUD data;
  - snapshots para render/UI.

## 3. Archivos clave

- [`src/game/core/createGameEngine.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/core/createGameEngine.ts)
  engine principal y comando de control.
- [`src/game/types/gameTypes.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/types/gameTypes.ts)
  contratos base del runtime.
- [`src/game/state/createInitialGameState.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/state/createInitialGameState.ts)
  estado inicial y bootstrap.
- [`src/game/data/campaignLevels.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/data/campaignLevels.ts)
  campana, estaciones, layouts, lore e items.
- [`src/game/systems/*.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/systems)
  sistemas por responsabilidad.
- [`src/game/render/renderFrame.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/render/renderFrame.ts)
  render de escena completa.

## 4. Modelo de estado

El `GameState` actual incluye, entre otros:

- fase global;
- indice de nivel actual y total de niveles;
- escena;
- jugador;
- enemigos;
- items;
- camara;
- input;
- bounds y layout del nivel;
- timestamps del loop;
- HUD.

El flujo React consume `GameSnapshot`, que es una copia segura del estado interno del engine.

## 5. Loop de juego

El loop corre con `requestAnimationFrame`.

Orden actual de actualizacion por tick:

1. `updateMovement`
2. `updateScene`
3. `updateCombat`
4. `updateEnemies`
5. `updateItems`
6. `updateCamera`
7. `updateHud`
8. `emit` de snapshot

Observacion:

- el engine soporta `start`, `stop`, `reset`, `next-level`, `pause-toggle` e input parcial.

## 6. Campana

La campana se genera desde `stationConfigs` en [`campaignLevels.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/data/campaignLevels.ts).

Cada nivel define:

- nombre;
- lore;
- bounds;
- layout;
- objetivos por fase;
- texto de cierre;
- items;
- configuracion derivada de dificultad.

La dificultad escala por indice de nivel:

- cantidad de enemigos por oleada;
- combinacion de arquetipos;
- tono del contenido.

## 7. Input

Desktop:

- `attachKeyboardInput(window, onInput)`
- usa `event.code` y `event.key`
- evita repetir `keydown`
- limpia input en `blur` y `visibilitychange`

Mobile:

- botones con `pointer events`
- `pointer capture` cuando esta disponible
- `touch-action: none`

## 8. Render

El render es immediate mode sobre `CanvasRenderingContext2D`.

Capas actuales:

- fondo del vagon;
- puertas/bench/windows;
- gate de combate;
- items;
- enemigos;
- jugador;
- efectos de dano/ataque;
- texto base del nivel.

Sprites:

- el sistema intenta usar sprites cargados;
- si no estan listos, hace fallback a render vectorial/manual.

## 9. Items

Sistema actual en [`itemSystem.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/systems/itemSystem.ts):

- timers de buff en jugador;
- pickup por radio;
- magnetismo corto;
- aplicacion de efecto por tipo;
- mensaje transitorio en HUD.

## 10. Testing

Herramientas:

- `Vitest`
- `@testing-library/react`
- `jsdom`

Cobertura actual:

- engine;
- scene system;
- movement;
- combat;
- render;
- input;
- mobile controls;
- HUD;
- item system.

Comandos validos:

```bash
npm run test:run
npm run build
```

## 11. Riesgos tecnicos / deuda actual

- el boss base todavia se reutiliza entre estaciones;
- la diferenciacion por estacion es mas fuerte en lore que en mecanicas unicas;
- no hay audio ni gamepad;
- el render de escenario sigue siendo mayormente parametrico y no por tiles/escenas especificas;
- no existe sistema de guardado/progreso persistente;
- no hay editor/data pipeline para campana, todo vive en codigo;
- faltan hooks claros para efectos audiovisuales mas avanzados.

## 12. Proximas extensiones recomendadas

- bosses especificos por estacion;
- eventos o hazards por tramo;
- gamepad;
- remapeo de input;
- capa de sonido/musica;
- particulas y hit feedback;
- sistema de balance/data tuning separado del codigo;
- persistencia local de progreso.
