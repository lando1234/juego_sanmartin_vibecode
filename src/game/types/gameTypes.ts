export type GamePhase =
  | "title"
  | "station_intro"
  | "playing"
  | "paused"
  | "victory"
  | "game_over";

export type SceneType =
  | "carriage_intro"
  | "carriage_combat"
  | "boss_intro"
  | "boss_combat";

export type HazardType =
  | "seat_block"
  | "door_slam"
  | "sudden_brake"
  | "passenger_push"
  | "floor_clutter";

export type GameMode = "campaign" | "survival";
export type StationRank = "C" | "B" | "A" | "S";

export type Facing = "left" | "right";
export type EnemyKind =
  | "colado"
  | "durmiente"
  | "mochilero"
  | "vendedor_competencia"
  | "senora_bolsos"
  | "fisura"
  | "borracho"
  | "boss_fisura_bici";
export type EnemyRole = "common" | "special" | "mini_boss" | "boss";
export type CombatStyle = "melee" | "ranged" | "hybrid";
export type EnemyPattern =
  | "rush"
  | "idle_block"
  | "tank_push"
  | "hybrid"
  | "zone_control"
  | "erratic"
  | "chaotic"
  | "multi_phase";
export type EnemyAiState =
  | "idle"
  | "approach"
  | "circle"
  | "attack"
  | "recover"
  | "grabbed"
  | "thrown"
  | "hurt"
  | "defeated";
export type ItemKind =
  | "mate_listo"
  | "tortita_negra"
  | "sube_cargada"
  | "paraguas_fierro";

export type InputState = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  attack: boolean;
  special: boolean;
  grab: boolean;
  dash: boolean;
  block: boolean;
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
  currentAction:
    | "attack_1"
    | "attack_2"
    | "attack_3"
    | "special"
    | "grab"
    | "throw"
    | null;
  queuedAction: "attack" | "special" | "grab" | null;
  actionTimerMs: number;
  actionRecoveryMs: number;
  attackChainIndex: 0 | 1 | 2 | 3;
  attackWindowMs: number;
  hitbox: HitboxState;
  struckEnemyIds: string[];
};

export type PlayerActionState =
  | "idle"
  | "walk"
  | "block"
  | "attack_1"
  | "attack_2"
  | "attack_3"
  | "special"
  | "grab"
  | "throw"
  | "dash"
  | "hurt"
  | "defeated";

export type HitboxState = {
  shape: "rectangle";
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  activeFrames: number[];
};

export type EnemyAttackDefinition = {
  name: string;
  damage: number;
  knockback?: number;
  startupMs: number;
  activeMs: number;
  recoveryMs: number;
  aoe?: boolean;
  radius?: number;
  projectile?: boolean;
  speed?: number;
  arc?: number;
  durationMs?: number;
  hits?: number;
  effect?: "blind" | "invert_controls";
};

export type EnemyBehaviorDefinition = {
  aggroRange: number;
  attackRange: number;
  pattern: EnemyPattern;
  cooldownMs: number;
};

export type EnemyModifiers = {
  zigzagMovement?: boolean;
  randomSpeed?: boolean;
  aggression?: number;
  speedMultiplier?: number;
  damageMultiplier?: number;
  antiSpamBias?: number;
  preferredLaneOffset?: number;
  guardChance?: number;
  poiseHits?: number;
  canGrabPlayer?: boolean;
};

export type EnemyIntent = "hold" | "pressure" | "punish" | "flank" | "kite";

export type EnemyPhaseDefinition = {
  name: string;
  triggerHpRatio?: number;
  buff?: {
    speedMultiplier?: number;
    damageMultiplier?: number;
  };
  attacks?: EnemyAttackDefinition[];
  modifiers?: EnemyModifiers;
};

export type ActiveEnemyAttackState = {
  name: string;
  timerMs: number;
  startupMs: number;
  activeMs: number;
  recoveryMs: number;
  damage: number;
  knockback: number;
  range: number;
  hitbox: HitboxState;
  projectile: boolean;
  projectileSpeed: number;
  aoe: boolean;
  radius: number | null;
  effect: EnemyAttackDefinition["effect"] | null;
  durationMs: number | null;
  hits: number;
  damageApplied: boolean;
  projectileSpawned: boolean;
};

export type ProjectileState = {
  id: string;
  ownerId: string;
  source: "player" | "enemy";
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  damage: number;
  lifetimeMs: number;
  facing: Facing;
  effect: EnemyAttackDefinition["effect"] | null;
  radius: number;
  color: string;
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
  actionState: PlayerActionState;
  attack: AttackState;
  queuedAction: "attack" | "special" | "grab" | null;
  actionTimerMs: number;
  actionRecoveryMs: number;
  grabTargetId: string | null;
  recoverableHp: number;
  dashVectorX: number;
  dashVectorY: number;
  dashInvulnerableMs: number;
  hurtCooldownMs: number;
  speedBoostMs: number;
  attackBoostMs: number;
  shieldMs: number;
  blindMs: number;
  invertControlsMs: number;
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
  activeHazards: HazardState[];
};

export type HazardSpawn = {
  id: string;
  type: HazardType;
  x: number;
  y: number;
  width: number;
  depth: number;
  damage?: number;
  activeMs?: number;
  cooldownMs?: number;
  strength?: number;
};

export type HazardState = HazardSpawn & {
  timerMs: number;
  cooldownRemainingMs: number;
  active: boolean;
};

export type HudState = {
  levelName: string;
  elapsedMs: number;
  hints: string[];
  enemyCount: number;
  objective: string;
  completionTitle: string | null;
  completionSummary: string | null;
  pickupMessage: string | null;
  activePickup: {
    name: string;
    effect: string;
    remainingMs: number | null;
  } | null;
  stationResult: StationResult | null;
};

export type StationResult = {
  rank: StationRank;
  scoreDelta: number;
  timeMs: number;
  damageTaken: number;
  comboBest: number;
  varietyScore: number;
  spamPenalty: number;
  hazardHitsTaken: number;
  hazardKills: number;
};

export type RunStatsState = {
  score: number;
  stationScoreStart: number;
  stationStartElapsedMs: number;
  comboCurrent: number;
  comboBest: number;
  comboTimerMs: number;
  stationDamageTaken: number;
  stationSpecialsUsed: number;
  stationThrowsUsed: number;
  stationGrabsUsed: number;
  stationDashesUsed: number;
  stationBasicAttacksUsed: number;
  stationHazardHitsTaken: number;
  stationHazardKills: number;
  stationKills: number;
};

export type ItemState = {
  id: string;
  kind: ItemKind;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  depth: number;
  collected: boolean;
};

export type EnemyState = {
  id: string;
  kind: EnemyKind;
  role: EnemyRole;
  combatStyle: CombatStyle;
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
  aggroRange: number;
  attackRange: number;
  attackIntervalMs: number;
  attackCooldownMs: number;
  hurtCooldownMs: number;
  facing: Facing;
  state: EnemyAiState;
  behavior: EnemyBehaviorDefinition;
  attacks: EnemyAttackDefinition[];
  modifiers: EnemyModifiers;
  phases: EnemyPhaseDefinition[];
  phaseIndex: number;
  engagementSlot: "front" | "back" | null;
  intent: EnemyIntent;
  lastPlayerActionSeen: PlayerActionState | null;
  lastPlayerActionSeenMs: number;
  poiseHp: number;
  activeAttack: ActiveEnemyAttackState | null;
  thrownTimerMs: number;
  thrownVx: number;
  thrownVy: number;
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
  hazards: HazardSpawn[];
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
  mode: GameMode;
  phase: GamePhase;
  currentLevelIndex: number;
  totalLevels: number;
  survivalWave: number;
  survivalWavesCleared: number;
  survivalMinibossesCleared: number;
  scene: SceneState;
  player: PlayerState;
  enemies: EnemyState[];
  projectiles: ProjectileState[];
  items: ItemState[];
  camera: CameraState;
  input: InputState;
  levelBounds: LevelBounds;
  levelLayout: LevelLayout;
  lastDtMs: number;
  startedAtMs: number | null;
  updatedAtMs: number | null;
  hud: HudState;
  runStats: RunStatsState;
};

export type GameSnapshot = Readonly<GameState>;

export type GameCommand =
  | { type: "start" }
  | { type: "set-mode"; payload: { mode: GameMode } }
  | { type: "pause-toggle" }
  | { type: "next-level" }
  | { type: "reset" }
  | { type: "input"; payload: Partial<InputState> }
  | { type: "debug-set-player-position"; payload: { x: number; y?: number } }
  | { type: "debug-defeat-enemies" };

export type GameSubscriber = (snapshot: GameSnapshot) => void;
