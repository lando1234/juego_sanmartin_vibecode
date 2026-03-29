export type GamePhase = "title" | "playing" | "paused" | "victory" | "game_over";

export type SceneType =
  | "carriage_intro"
  | "carriage_combat"
  | "boss_intro"
  | "boss_combat";

export type Facing = "left" | "right";
export type EnemyKind =
  | "bloqueador_puerta"
  | "empujador_hora_pico"
  | "vendedor_relampago"
  | "capo_pasillo";

export type InputState = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  attack: boolean;
  pause: boolean;
};

export type LevelBounds = {
  width: number;
  depth: number;
};

export type AttackState = {
  activeMs: number;
  cooldownMs: number;
  damage: number;
  range: number;
  width: number;
};

export type PlayerState = {
  id: "ricky";
  name: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  width: number;
  depth: number;
  speed: number;
  jumpStrength: number;
  gravity: number;
  hp: number;
  maxHp: number;
  onGround: boolean;
  facing: Facing;
  isMoving: boolean;
  attack: AttackState;
  hurtCooldownMs: number;
};

export type CameraState = {
  x: number;
  viewportWidth: number;
  viewportHeight: number;
};

export type SceneState = {
  type: SceneType;
  gateClosed: boolean;
  gateRightX: number | null;
  waveIndex: number;
  waveTriggered: boolean;
  secondWaveTriggered: boolean;
  bossTriggered: boolean;
  victoryWalkTriggered: boolean;
};

export type HudState = {
  levelName: string;
  elapsedMs: number;
  hints: string[];
  enemyCount: number;
  objective: string;
};

export type EnemyState = {
  id: string;
  kind: EnemyKind;
  name: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  width: number;
  depth: number;
  speed: number;
  hp: number;
  maxHp: number;
  damage: number;
  attackRange: number;
  attackIntervalMs: number;
  attackCooldownMs: number;
  hurtCooldownMs: number;
  facing: Facing;
  state: "idle" | "advance" | "attack" | "hurt" | "defeated";
  isBoss: boolean;
};

export type LevelLayout = {
  entryX: number;
  wave1TriggerX: number;
  gate1StartX: number;
  gate1EndX: number;
  wave2TriggerX: number;
  gate2StartX: number;
  gate2EndX: number;
  bossTriggerX: number;
  bossGateStartX: number;
  bossGateEndX: number;
  exitTriggerX: number;
  exitX: number;
  wave1Spawns: Array<{
    kind: EnemyKind;
    x: number;
    y: number;
  }>;
  wave2Spawns: Array<{
    kind: EnemyKind;
    x: number;
    y: number;
  }>;
  bossSpawn: {
    kind: EnemyKind;
    x: number;
    y: number;
  };
};

export type GameState = {
  phase: GamePhase;
  scene: SceneState;
  player: PlayerState;
  enemies: EnemyState[];
  camera: CameraState;
  input: InputState;
  levelBounds: LevelBounds;
  levelLayout: LevelLayout;
  lastDtMs: number;
  startedAtMs: number | null;
  updatedAtMs: number | null;
  hud: HudState;
};

export type GameSnapshot = Readonly<GameState>;

export type GameCommand =
  | { type: "start" }
  | { type: "pause-toggle" }
  | { type: "reset" }
  | { type: "input"; payload: Partial<InputState> }
  | { type: "debug-set-player-position"; payload: { x: number; y?: number } }
  | { type: "debug-defeat-enemies" };

export type GameSubscriber = (snapshot: GameSnapshot) => void;
