# Plan Inicial de Prototipo: Furgon Final

Fecha: 2026-03-27

## 1. Objetivo del prototipo

Construir un `vertical slice` web que pruebe la fantasia central del juego:

- beat'em up arcade;
- protagonista comun;
- desplazamiento por un vagon del San Martin;
- combate simple y responsivo;
- primer boss memorable;
- ejecucion jugable tanto en desktop como en mobile.

No buscamos todavia un juego completo. El prototipo tiene que responder una sola pregunta:

`Se siente divertido avanzar y pelear dentro de un vagon del San Martin con tono satirico arcade?`

## 2. Stack tecnico propuesto

### 2.1 Framework

- `Next.js` con `App Router`
- `React`
- despliegue en `Vercel`

### 2.2 Lenguaje y herramientas

- `TypeScript`
- `ESLint`
- CSS simple al inicio, idealmente con variables globales y modulos CSS o una capa minima de estilos co-localizados

### 2.3 Motor de juego para el primer corte

Recomendacion:

- `Canvas 2D` dentro de React, sin meter todavia un engine pesado

Razon:

- el primer slice necesita validar movimiento, hitboxes, scroll y sensacion arcade;
- meter Phaser o Pixi demasiado pronto agrega costo estructural;
- si el prototipo confirma la direccion, despues podemos decidir si seguir con Canvas puro o migrar una parte del runtime a una libreria especializada.

## 3. Base tecnica validada con documentacion oficial

### 3.1 Next.js

El prototipo deberia arrancar con `create-next-app` y estructura de `App Router`, porque es la base recomendada en la documentacion oficial actual de Next.js para nuevas aplicaciones. La documentacion tambien mantiene convenciones claras para `app/`, layouts, paginas, assets estaticos y rutas.

### 3.2 React

React sigue siendo la base correcta para la UI periferica del juego:

- HUD;
- menu principal;
- pausa;
- overlays;
- selector de controles;
- pantalla final.

La parte que corre frame a frame no deberia depender del ciclo de render comun de React. Conviene encapsular el runtime del juego y usar React para montar, configurar y mostrar estado de alto nivel.

### 3.3 Vercel

Vercel sigue siendo la opcion natural para deploy de un proyecto Next.js:

- integracion directa;
- builds y previews por branch;
- hosting simple del frontend;
- flujo rapido para prototipo.

## 4. Aclaracion sobre Context7

Pediste usar `Context7` para documentacion actualizada. En este entorno no tengo una herramienta directa de Context7 disponible. Para no inventar compatibilidades, la mejor aproximacion confiable aca es basar el plan en documentacion oficial actual:

- `nextjs.org/docs`
- `react.dev`
- `vercel.com/docs`

Cuando empecemos la implementacion puedo seguir chequeando estos docs oficiales en cada decision tecnica que dependa de version o API.

## 5. Alcance del vertical slice

El primer prototipo deberia incluir solo esto:

- pantalla de titulo;
- inicio de partida;
- un unico nivel jugable dentro de un vagon;
- protagonista controlable;
- 3 tipos de enemigos;
- 1 boss;
- HUD de vida;
- victoria y reinicio;
- controles desktop;
- controles mobile tactiles minimos.

No incluir todavia:

- multiples niveles;
- coop real;
- sistema de progresion largo;
- guardado;
- audio complejo;
- narrativa extensa;
- backend.

## 6. Slice recomendado

La mejor porcion para construir primero es:

`Nivel 2: La Cofradia del Pasillo`

Motivo:

- tiene identidad local inmediata;
- da pie a enemigos legibles;
- permite objetos simples del entorno;
- el boss `El Capo del Pasillo` ya tiene personalidad;
- el vagon no necesita layouts extremadamente complejos.

## 7. Arquitectura del prototipo

## 7.1 Capas

- `UI de aplicacion`: menus, HUD, overlays, estados de carga.
- `Runtime del juego`: loop, input, fisicas simplificadas, entidades.
- `Presentacion`: canvas, sprites temporales, fondos, efectos.
- `Datos`: personajes, stats, ataques, layout del nivel.

### 7.2 Estructura tentativa

```text
src/
  app/
    layout.tsx
    page.tsx
  components/
    game/
      GameCanvas.tsx
      GameShell.tsx
      HUD.tsx
      MobileControls.tsx
  game/
    core/
      engine.ts
      loop.ts
      input.ts
      collision.ts
    entities/
      player.ts
      enemy.ts
      boss.ts
    data/
      characters.ts
      levels.ts
      attacks.ts
    scenes/
      introScene.ts
      carriageScene.ts
      bossScene.ts
    render/
      drawSprites.ts
      drawBackground.ts
      drawEffects.ts
  styles/
```

### 7.3 Regla importante

React no deberia manejar cada frame del combate. El loop del juego debe vivir en un modulo propio y solo exponer snapshots de estado necesarios para UI y debugging.

## 8. Sistemas minimos a implementar

### 8.1 Movimiento

- izquierda;
- derecha;
- arriba y abajo en pseudo-profundiad de beat'em up;
- salto corto.

### 8.2 Combate

- golpe rapido;
- golpe fuerte;
- agarre simple opcional;
- hit stun;
- knockback corto;
- barra de vida.

### 8.3 Enemigos del primer slice

- `Bloqueador de Puerta`
- `Empujador de Hora Pico`
- `Vendedor Relampago`
- boss: `El Capo del Pasillo`

### 8.4 Entorno

- scroll lateral corto;
- obstaculos simples;
- puertas que bloquean avance;
- objetos decorativos que den identidad de tren.

### 8.5 UI

- vida del jugador;
- vida del boss;
- mensaje de inicio;
- pantalla de game over;
- boton de reinicio.

## 9. Inputs desktop y mobile

### 9.1 Desktop

- `WASD` o flechas para mover
- `J` golpe rapido
- `K` golpe fuerte
- `L` salto

### 9.2 Mobile

- stick virtual izquierdo
- 3 botones grandes a la derecha
- layout responsive horizontal

Principio:

- la version mobile no debe ser un parche posterior;
- desde el primer slice hay que validar tamanos tactiles y legibilidad.

## 10. Estrategia visual del prototipo

En el primer corte no hace falta pixel art final. Lo correcto es:

- shapes limpias o placeholders estilizados;
- fondo con lectura clara de interior de vagon;
- colores diferenciados por clase de enemigo;
- boss con silueta grande y muy reconocible.

Objetivo:

- probar jugabilidad primero;
- no trabar el prototipo por pipeline artistico.

## 11. Roadmap por fases

### Fase 1: Fundacion

- crear app Next.js;
- definir estructura del proyecto;
- montar canvas base;
- crear game loop;
- cablear input desktop.

### Fase 2: Core jugable

- mover protagonista;
- colisiones;
- ataques;
- dano;
- enemigos basicos.

### Fase 3: Nivel y boss

- layout del vagon;
- oleadas;
- bloqueo y liberacion de avance;
- boss del primer slice.

### Fase 4: Mobile y pulido minimo

- controles tactiles;
- HUD responsive;
- feedback visual de impactos;
- pantalla final e inicio.

### Fase 5: Deploy y validacion

- despliegue en Vercel;
- probar en desktop y mobile reales;
- medir sensacion de control, legibilidad y dificultad.

## 12. Riesgos tecnicos principales

- intentar hacer demasiada UI en React por frame;
- sobredisenar arquitectura antes de validar el combate;
- meter assets finales demasiado pronto;
- subestimar mobile;
- agregar demasiados enemigos antes de cerrar un buen feel de golpe.

## 13. Plan para trabajo en paralelo con multiples agentes

Esto si vale la pena repartirlo por ownership clara. La separacion recomendada es por areas con write set distinto.

### Agente 1: Fundacion web

Responsabilidad:

- bootstrap de Next.js;
- layout de app;
- shell principal;
- integracion inicial para Vercel.

Archivos esperados:

- `src/app/*`
- `src/components/game/GameShell.tsx`
- configuraciones base

### Agente 2: Runtime del juego

Responsabilidad:

- loop;
- input;
- colisiones;
- sistema de entidades base.

Archivos esperados:

- `src/game/core/*`
- `src/game/entities/*`

### Agente 3: Nivel y datos

Responsabilidad:

- data de personajes;
- ataques;
- layout del primer nivel;
- scripting del boss.

Archivos esperados:

- `src/game/data/*`
- `src/game/scenes/*`

### Agente 4: UI y controles mobile

Responsabilidad:

- HUD;
- overlays;
- botones tactiles;
- responsive.

Archivos esperados:

- `src/components/game/HUD.tsx`
- `src/components/game/MobileControls.tsx`
- estilos relacionados

### Integracion local principal

Mi rol principal al coordinar agentes seria:

- definir contratos entre modulos;
- evitar que React y runtime se mezclen mal;
- revisar colisiones y estado compartido;
- unir el slice final;
- correr pruebas manuales y deploy.

## 14. Orden recomendado de ejecucion

Si decidimos lanzar agentes en paralelo, el orden correcto es:

1. cerrar contratos tecnicos localmente;
2. repartir ownership de archivos;
3. correr en paralelo `Fundacion web`, `Runtime`, `Datos/Nivel`, `UI mobile`;
4. integrar;
5. pulir input y combate;
6. desplegar a Vercel.

No conviene delegar antes de definir:

- coordenadas del mundo;
- modelo de entidad;
- contrato entre loop y render;
- estructura minima de datos del jugador y enemigos.

## 15. Entregables de la siguiente etapa

Antes de codear, conviene dejar por escrito tres piezas chicas:

1. `Especificacion tecnica del runtime`
2. `Layout del primer nivel`
3. `Contrato de datos de player/enemy/boss`

Con eso, ya quedamos listos para abrir implementacion real con mucho menos riesgo.

## 16. Fuentes oficiales consultadas

- Next.js docs, seccion Getting Started y App Router: https://nextjs.org/docs
- React docs, referencia oficial y guias: https://react.dev
- Vercel docs, despliegue y framework support para Next.js: https://vercel.com/docs
