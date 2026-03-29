# Furgon Final

Estado del proyecto al `2026-03-27`.

## Resumen

Juego web en `Next.js 16` + `React 19` + `TypeScript` con render en `Canvas 2D`.

La run actual recorre la linea `San Martin` desde `Dr. Cabred` hasta `Retiro`, con:

- `18` niveles/estaciones;
- dificultad progresiva;
- enemigos comunes y boss por tramo;
- items tematicos con buffs;
- HUD, overlays, controles desktop/mobile;
- deploy funcionando en `Vercel`.

## Estado actual

Ya implementado:

- campaña completa `Dr. Cabred -> Retiro`;
- lore propio por estacion;
- progresion de dificultad por cantidad y variedad de enemigos;
- items:
  - `Mate listo`: velocidad;
  - `Tortita negra`: cura;
  - `SUBE cargada`: mejora de dano;
  - `Paraguas de fierro`: reduce dano;
- pickups mejorados con radio mas generoso, magnetismo corto y feedback visual;
- controles de teclado mas robustos:
  - usa `event.code`;
  - ignora `keydown` repetidos;
  - limpia estado en `blur` y `visibilitychange`;
- controles mobile mas tactiles:
  - `pointer capture`;
  - `touch-action: none`;
  - mejor feedback visual;
- UI mas profunda que el prototipo base;
- build de produccion ok;
- suite de tests ok.

## Estructura importante

- [`src/game/data/campaignLevels.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/data/campaignLevels.ts)
  define estaciones, lore, layout, dificultad e items.
- [`src/game/core/createGameEngine.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/core/createGameEngine.ts)
  engine principal del juego.
- [`src/game/systems/sceneSystem.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/systems/sceneSystem.ts)
  progresion de oleadas, boss y avance de nivel.
- [`src/game/systems/itemSystem.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/systems/itemSystem.ts)
  logica de pickups y buffs.
- [`src/game/input/keyboardInput.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/input/keyboardInput.ts)
  input desktop.
- [`src/components/game/MobileControls.tsx`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/components/game/MobileControls.tsx)
  input mobile.
- [`src/game/render/renderFrame.ts`](/Users/matiaslandal/Desktop/Personal/codex/juego_sanmartin_vibecode/src/game/render/renderFrame.ts)
  render del vagon, personajes e items.

## Comandos utiles

```bash
npm run dev
npm run test:run
npm run build
npx vercel --prod
```

## Ultima validacion

Verificado hoy:

- `npm run test:run`
- `npm run build`

## Pendientes sugeridos para manana

- pulir mas el feel del combate;
- agregar mas feedback audiovisual;
- balancear dificultad por estacion;
- sumar contenido extra:
  - gamepad;
  - remapeo;
  - mas tipos de items;
  - eventos por estacion;
- redeploy a `Vercel` con la ultima version.
