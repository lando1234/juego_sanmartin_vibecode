# Especificacion Runtime: Prototipo Furgon Final

Fecha: 2026-03-27

## 1. Objetivo

Definir el contrato tecnico minimo del runtime para el vertical slice de `Furgon Final`.

Este documento fija:

- ownership del estado;
- entidades minimas;
- sistema de coordenadas;
- loop principal;
- escenas;
- eventos;
- integracion con React;
- limites del primer corte.

No busca resolver el juego completo. Busca evitar ambiguedad tecnica en el primer prototipo.

## 2. Principios de arquitectura

### 2.1 React no gobierna el frame

React se usa para:

- montar la pagina;
- crear el shell de la app;
- renderizar HUD, overlays y menus;
- conectar controles mobile;
- disparar inicio, pausa y reinicio.

El runtime del juego vive fuera de React y se actualiza en su propio loop con `requestAnimationFrame`.

### 2.2 El engine del prototipo es chico

No vamos a construir un motor generico. Solo un runtime suficiente para:

- 1 jugador;
- 1 nivel;
- 3 enemigos comunes;
- 1 boss;
- 1 arena de vagon;
- colisiones simples;
- combate legible.

### 2.3 Data-driven, pero sin sobreingenieria

Conviene separar:

- datos de personajes;
- datos de ataques;
- datos del nivel;
- logica del loop.

Pero no hace falta un sistema de scripting complejo ni ECS en esta etapa.

## 3. Ownership del estado

## 3.1 Estado que vive en el runtime

Todo lo que cambia frame a frame vive en el runtime:

- posicion y velocidad;
- input normalizado;
- vida;
- timers;
- estado de ataques;
- estado de AI;
- colisiones;
- estado de escena;
- oleadas;
- camara;
- hit effects temporales.

## 3.2 Estado que puede vivir en React

React solo necesita estado de alto nivel:

- `booting`;
- `title`;
- `playing`;
- `paused`;
- `victory`;
- `gameOver`;
- snapshots livianos para HUD;
- configuracion de input;
- preferencia de sonido si despues existe.

## 3.3 Regla de integracion

React no muta directamente entidades del runtime.

React:

- envia comandos;
- recibe snapshots;
- muestra UI.

El runtime:

- procesa input;
- actualiza mundo;
- emite estado observable.

## 4. Modelo de coordenadas

## 4.1 Espacio jugable

El prototipo usa un espacio 2.5D de beat'em up:

- `x`: avance horizontal del vagon;
- `y`: profundidad del pasillo;
- `z`: altura visual de salto.

No hay fisica 3D real. `z` solo afecta:

- arco de salto;
- si el personaje esta en el aire;
- sombras o offsets de render.

## 4.2 Escala recomendada

Para el prototipo:

- arena total del nivel: `2400` unidades de ancho;
- pasillo jugable: `320` unidades de profundidad;
- viewport logico de referencia: `1280 x 720`.

La camara sigue al jugador en X y mantiene Y dentro de una zona fija.

## 4.3 Convenciones

- origen del mundo: esquina superior izquierda del nivel.
- `x` crece hacia la derecha.
- `y` crece hacia abajo.
- `z = 0` significa en el piso.

## 4.4 Bounds

Bounds principales:

- `levelBounds`: limite absoluto del nivel;
- `walkArea`: area donde entidades pueden moverse;
- `combatGate`: zona que se cierra hasta limpiar oleada;
- `bossArena`: zona final del jefe.

## 5. Escenas y flujo

## 5.1 Escenas del prototipo

Solo hace falta este set:

- `title`
- `carriage_intro`
- `carriage_combat`
- `boss_intro`
- `boss_combat`
- `victory`
- `game_over`

## 5.2 Flujo

1. `title`
2. `carriage_intro`
3. `carriage_combat`
4. trigger de boss
5. `boss_intro`
6. `boss_combat`
7. `victory` o `game_over`

## 5.3 Regla de transicion

Las transiciones de escena no recrean toda la app React. El runtime cambia `scene.type` y React solo actualiza overlays o HUD segun snapshot.

## 6. GameState minimo

Shape conceptual:

```ts
type GamePhase =
  | "title"
  | "playing"
  | "paused"
  | "victory"
  | "game_over";

type SceneType =
  | "carriage_intro"
  | "carriage_combat"
  | "boss_intro"
  | "boss_combat";

type GameState = {
  phase: GamePhase;
  scene: SceneState;
  level: LevelState;
  player: PlayerEntity;
  enemies: EnemyEntity[];
  boss: BossEntity | null;
  effects: EffectEntity[];
  camera: CameraState;
  input: InputFrameState;
  hud: HudState;
  timers: RuntimeTimers;
  result: RunResult | null;
};
```

## 6.1 SceneState

```ts
type SceneState = {
  type: SceneType;
  startedAtMs: number;
  gateClosed: boolean;
  waveIndex: number;
};
```

## 6.2 LevelState

```ts
type LevelState = {
  id: "cofradia_pasillo";
  width: number;
  height: number;
  floorY: number;
  waveTriggers: WaveTrigger[];
  bossTriggerX: number;
  cleared: boolean;
};
```

## 6.3 HudState

```ts
type HudState = {
  playerHealth: number;
  playerMaxHealth: number;
  bossHealth: number | null;
  bossMaxHealth: number | null;
  message: string | null;
};
```

## 7. Entidades minimas

## 7.1 BaseEntity

Toda entidad viva en el mundo comparte:

```ts
type EntityId = string;

type Vec2 = {
  x: number;
  y: number;
};

type BaseEntity = {
  id: EntityId;
  kind: "player" | "enemy" | "boss" | "effect";
  position: Vec2;
  velocity: Vec2;
  z: number;
  zVelocity: number;
  facing: 1 | -1;
  width: number;
  depth: number;
  health: number;
  maxHealth: number;
  state: string;
  stateTimeMs: number;
  invulnerableUntilMs: number;
  hitbox: Hitbox;
  hurtbox: Hurtbox;
  alive: boolean;
};
```

## 7.2 PlayerEntity

```ts
type PlayerEntity = BaseEntity & {
  kind: "player";
  name: "ricky";
  moveSpeed: number;
  jumpSpeed: number;
  attackCooldownMs: number;
  comboStep: number;
  comboWindowMs: number;
  currentAttack: AttackInstance | null;
  stunUntilMs: number;
};
```

## 7.3 EnemyEntity

```ts
type EnemyArchetype =
  | "door_blocker"
  | "crowd_pusher"
  | "flash_vendor";

type EnemyEntity = BaseEntity & {
  kind: "enemy";
  archetype: EnemyArchetype;
  aiState: EnemyAiState;
  aggroRange: number;
  attackRange: number;
  currentAttack: AttackInstance | null;
  stunUntilMs: number;
};
```

## 7.4 BossEntity

```ts
type BossEntity = BaseEntity & {
  kind: "boss";
  archetype: "pasillo_boss";
  phase: 1 | 2;
  aiState: EnemyAiState;
  introPlayed: boolean;
  currentAttack: AttackInstance | null;
  stunUntilMs: number;
};
```

## 7.5 EffectEntity

```ts
type EffectEntity = {
  id: EntityId;
  kind: "effect";
  type: "hit_spark" | "dust" | "text_burst";
  position: Vec2;
  ttlMs: number;
};
```

## 8. Input model

## 8.1 InputState normalizado

Desktop y mobile deben converger a la misma shape:

```ts
type InputFrameState = {
  moveX: number;
  moveY: number;
  jumpPressed: boolean;
  lightAttackPressed: boolean;
  heavyAttackPressed: boolean;
  pausePressed: boolean;
};
```

Reglas:

- `moveX` y `moveY` van de `-1` a `1`;
- botones usan edge detection para acciones de un frame;
- la capa de input traduce teclado o touch a esta shape.

## 8.2 Prioridades

- si hay stun, no se procesa ataque nuevo;
- si hay ataque activo no cancelable, el movimiento se limita;
- si esta en el aire, algunas acciones se bloquean en el primer slice.

## 9. Combate

## 9.1 AttackDefinition

```ts
type AttackDefinition = {
  id: string;
  ownerKind: "player" | "enemy" | "boss";
  startupMs: number;
  activeMs: number;
  recoveryMs: number;
  damage: number;
  knockbackX: number;
  knockbackY: number;
  hitStunMs: number;
  rangeX: number;
  rangeY: number;
};
```

## 9.2 AttackInstance

```ts
type AttackInstance = {
  definitionId: string;
  startedAtMs: number;
  phase: "startup" | "active" | "recovery";
  hasHitEntityIds: EntityId[];
};
```

## 9.3 Reglas del primer slice

- un ataque no golpea multiples veces a la misma entidad en la misma ejecucion;
- no hay bloqueo;
- no hay agarre todavia, salvo que despues quede casi gratis;
- el player arranca con:
  - golpe rapido
  - golpe fuerte
  - empujon simple opcional

## 10. Colisiones

## 10.1 Tipos de colision

Solo hacen falta tres:

- overlap de hurtbox contra attack box;
- solapamiento corporal simple entre entidades;
- choque contra bounds del nivel.

## 10.2 Simplificacion

No hace falta colision poligonal. Para el prototipo alcanzan cajas axis-aligned simplificadas.

## 10.3 Regla de beat'em up

Dos entidades solo pueden golpearse si:

- estan lo bastante cerca en `x`;
- su diferencia en `y` entra en tolerancia;
- el atacante esta en fase `active`.

## 11. AI minima

## 11.1 EnemyAiState

```ts
type EnemyAiState =
  | "idle"
  | "approach"
  | "align"
  | "attack"
  | "recover"
  | "stunned";
```

## 11.2 Comportamientos iniciales

`Bloqueador de Puerta`

- avanza poco;
- prioriza quedar frente al jugador;
- golpe corto frontal.

`Empujador de Hora Pico`

- busca contacto;
- avanza mas pesado;
- genera knockback mayor;
- menos frecuencia de ataque.

`Vendedor Relampago`

- se mueve mas rapido;
- cambia de eje Y con frecuencia;
- entra y sale de rango;
- castiga ventanas cortas.

`El Capo del Pasillo`

- combina approach y retirada;
- alterna ataque pesado con dash corto;
- fase 2 cuando baja de vida.

## 12. Camara

## 12.1 Reglas

- sigue al player en X;
- clamp dentro de `levelBounds`;
- no sigue salto en Y;
- profundidad del pasillo se muestra completa en viewport.

## 12.2 Objetivo

La camara debe ser aburrida y estable. El protagonismo lo tiene el combate, no la sofisticacion cinematica.

## 13. Eventos del runtime

Conviene manejar eventos internos simples:

```ts
type GameEvent =
  | { type: "wave_started"; waveIndex: number }
  | { type: "wave_cleared"; waveIndex: number }
  | { type: "boss_started" }
  | { type: "boss_defeated" }
  | { type: "player_damaged"; amount: number }
  | { type: "enemy_defeated"; enemyId: EntityId }
  | { type: "game_over" }
  | { type: "victory" };
```

Uso:

- actualizar HUD;
- disparar overlays;
- debug;
- futuras animaciones o audio.

## 14. Integracion React <-> engine

## 14.1 API minima del engine

```ts
type GameEngine = {
  start(): void;
  stop(): void;
  reset(): void;
  sendInput(input: InputFrameState): void;
  subscribe(listener: (snapshot: EngineSnapshot) => void): () => void;
  getSnapshot(): EngineSnapshot;
};
```

## 14.2 EngineSnapshot

React no necesita el estado entero con toda la mutabilidad interna. Solo un snapshot serializable y liviano:

```ts
type EngineSnapshot = {
  phase: GamePhase;
  sceneType: SceneType | null;
  player: {
    health: number;
    maxHealth: number;
    x: number;
    y: number;
    facing: 1 | -1;
    state: string;
  };
  boss: {
    active: boolean;
    health: number;
    maxHealth: number;
    name: string;
  } | null;
  uiMessage: string | null;
};
```

## 14.3 Componente puente

`GameShell`:

- crea engine;
- monta canvas;
- conecta teclado y touch;
- subscribe a snapshot;
- entrega datos a HUD y overlays.

`GameCanvas`:

- recibe referencia de canvas;
- deja que el render loop dibuje.

`HUD`:

- consume snapshot y muestra barras.

`MobileControls`:

- transforma touch a `InputFrameState`.

## 15. Render pipeline

Orden de dibujo recomendado:

1. fondo del vagon;
2. decoracion del nivel;
3. sombras;
4. entidades ordenadas por `y`;
5. efectos;
6. overlays de debug opcionales.

Ordenar por `y` ayuda a dar sensacion de profundidad sin sistema complejo.

## 16. Nivel inicial: datos minimos

El nivel `cofradia_pasillo` necesita:

- ancho total;
- bounds de caminata;
- 2 o 3 triggers de oleadas;
- lista de spawns por oleada;
- trigger del boss;
- posicion final de victoria.

Shape sugerida:

```ts
type LevelDefinition = {
  id: string;
  width: number;
  walkTop: number;
  walkBottom: number;
  playerSpawn: Vec2;
  waves: WaveDefinition[];
  bossTriggerX: number;
  bossSpawn: Vec2;
};
```

## 17. Reglas de performance

Para el primer corte:

- target `60 FPS` cuando sea posible;
- evitar rerenders React por frame;
- no crear arrays gigantes por frame si se puede reciclar;
- limitar cantidad de enemigos simultaneos a 3 o 4 comunes;
- boss sin minions infinitos.

## 18. Debug hooks minimos

Conviene prever desde el inicio:

- toggle de hitboxes;
- reinicio rapido;
- log de escena actual;
- vida infinita opcional via flag local;
- spawn de boss via flag local si hace falta.

No para produccion, si para desarrollo rapido.

## 19. Fuera de alcance

Este runtime no contempla todavia:

- coop;
- rollback;
- networking;
- audio complejo;
- guardado;
- inventario;
- combos largos;
- armas persistentes;
- fisica avanzada;
- motor reutilizable multi-juego.

## 20. Conclusiones practicas

Si esta especificacion se respeta, ya se puede repartir trabajo con menos friccion:

- fundacion web;
- runtime core;
- combate;
- datos del nivel;
- UI y mobile.

El punto mas importante es este:

`el runtime actualiza el mundo; React solo lo aloja y lo observa`

Esa decision es la que mas riesgo nos ahorra en el prototipo.
