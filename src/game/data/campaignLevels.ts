import type {
  EnemyKind,
  GameState,
  LevelBounds,
  LevelLayout,
  SceneState,
} from "@/game/types/gameTypes";

export const VIEWPORT_WIDTH = 1280;
export const VIEWPORT_HEIGHT = 720;

type Spawn = {
  kind: EnemyKind;
  x: number;
  y: number;
};

export type CampaignLevel = {
  id: string;
  name: string;
  intro: string;
  bounds: LevelBounds;
  layout: LevelLayout;
  entryY: number;
  openingObjective: string;
  firstWaveObjective: string;
  firstWaveClearedObjective: string;
  secondWaveObjective: string;
  secondWaveClearedObjective: string;
  bossObjective: string;
  victoryObjective: string;
  exitObjective: string;
  completionTitle: string;
  completionSummary: string;
};

const baseBounds: LevelBounds = {
  width: 2400,
  depth: 320,
};

const baseScene = (): SceneState => ({
  type: "carriage_intro",
  gateClosed: false,
  gateRightX: null,
  waveIndex: 0,
  waveTriggered: false,
  secondWaveTriggered: false,
  bossTriggered: false,
  victoryWalkTriggered: false,
});

function createLayout(
  shiftX: number,
  wave1Spawns: Spawn[],
  wave2Spawns: Spawn[],
  bossSpawn: Spawn,
): LevelLayout {
  return {
    entryX: 180,
    wave1TriggerX: 760 + shiftX,
    gate1StartX: 820 + shiftX,
    gate1EndX: 1420 + shiftX,
    wave2TriggerX: 1550 + shiftX,
    gate2StartX: 1610 + shiftX,
    gate2EndX: 2050 + shiftX,
    bossTriggerX: 2110 + shiftX,
    bossGateStartX: 2160 + shiftX,
    bossGateEndX: 2310 + shiftX,
    exitTriggerX: 2080 + shiftX,
    exitX: 2260 + shiftX,
    wave1Spawns,
    wave2Spawns,
    bossSpawn,
  };
}

function createShiftedSpawns(
  shiftX: number,
  spawns: Array<[EnemyKind, number, number]>,
): Spawn[] {
  return spawns.map(([kind, x, y]) => ({
    kind,
    x: x + shiftX,
    y,
  }));
}

function createLevel(
  index: number,
  name: string,
  intro: string,
  objectiveBase: string,
  firstWave: Array<[EnemyKind, number, number]>,
  secondWave: Array<[EnemyKind, number, number]>,
  boss: [EnemyKind, number, number],
): CampaignLevel {
  const shiftX = index * 18;
  const wave1Spawns = createShiftedSpawns(shiftX, firstWave);
  const wave2Spawns = createShiftedSpawns(shiftX, secondWave);
  const [bossKind, bossX, bossY] = boss;

  return {
    id: `nivel-${index + 1}`,
    name,
    intro,
    bounds: baseBounds,
    layout: createLayout(shiftX, wave1Spawns, wave2Spawns, {
      kind: bossKind,
      x: bossX + shiftX,
      y: bossY,
    }),
    entryY: 158,
    openingObjective: `${objectiveBase} Superá la primera presión del vagón.`,
    firstWaveObjective: "Se cerró el paso. Limpiá la primera oleada.",
    firstWaveClearedObjective: "Primer tramo liberado. Avanzá al siguiente cuello de botella.",
    secondWaveObjective: "La segunda manga empuja más fuerte. Sostené la línea.",
    secondWaveClearedObjective: "Queda el fondo del vagón. Preparáte para el jefe.",
    bossObjective: "Entró el capo del sector. Ganá el mano a mano.",
    victoryObjective: "El jefe cayó. Caminá hasta la salida del vagón.",
    exitObjective: intro,
    completionTitle: `${name} despejado`,
    completionSummary: `Ricky recuperó terreno en ${name.toLowerCase()} y todavía faltan más vagones por limpiar.`,
  };
}

export const campaignLevels: CampaignLevel[] = [
  createLevel(
    0,
    "Nivel 1 · La Cofradia del Pasillo",
    "Primer vagón limpio. Queda margen para seguir empujando.",
    "Subite al vagón y abrí paso entre empujones.",
    [
      ["bloqueador_puerta", 980, 64],
      ["empujador_hora_pico", 1180, 210],
      ["vendedor_relampago", 1320, 138],
    ],
    [
      ["empujador_hora_pico", 1700, 84],
      ["vendedor_relampago", 1840, 192],
      ["bloqueador_puerta", 1960, 132],
    ],
    ["capo_pasillo", 2220, 130],
  ),
  createLevel(
    1,
    "Nivel 2 · Puertas Trabadas",
    "Segundo vagón superado. El tren sigue áspero.",
    "Metete en la zona de puertas y no cedas espacio.",
    [
      ["bloqueador_puerta", 1010, 88],
      ["bloqueador_puerta", 1160, 182],
      ["vendedor_relampago", 1310, 134],
    ],
    [
      ["empujador_hora_pico", 1700, 96],
      ["vendedor_relampago", 1810, 214],
      ["empujador_hora_pico", 1940, 142],
    ],
    ["capo_pasillo", 2230, 124],
  ),
  createLevel(
    2,
    "Nivel 3 · Pasillo Apretado",
    "Tercer vagón tomado. El pasillo ya te conoce.",
    "Agarrá ritmo y bancate el embudo del centro.",
    [
      ["empujador_hora_pico", 980, 70],
      ["vendedor_relampago", 1110, 184],
      ["empujador_hora_pico", 1320, 126],
    ],
    [
      ["bloqueador_puerta", 1710, 88],
      ["vendedor_relampago", 1850, 198],
      ["bloqueador_puerta", 1980, 144],
    ],
    ["capo_pasillo", 2220, 136],
  ),
  createLevel(
    3,
    "Nivel 4 · Hora Pico Pesada",
    "Cuarto vagón dominado. La hora pico no afloja.",
    "Levantá el ritmo antes de que te encajonen.",
    [
      ["vendedor_relampago", 980, 80],
      ["empujador_hora_pico", 1140, 204],
      ["vendedor_relampago", 1290, 126],
    ],
    [
      ["empujador_hora_pico", 1700, 82],
      ["bloqueador_puerta", 1830, 188],
      ["empujador_hora_pico", 1980, 136],
    ],
    ["capo_pasillo", 2235, 132],
  ),
  createLevel(
    4,
    "Nivel 5 · Vendedores al Acecho",
    "Mitad de campaña. El tren sigue en disputa.",
    "Cruzá el vagón de los vendedores sin perder la mochila.",
    [
      ["vendedor_relampago", 980, 64],
      ["vendedor_relampago", 1150, 202],
      ["empujador_hora_pico", 1320, 138],
    ],
    [
      ["bloqueador_puerta", 1710, 98],
      ["vendedor_relampago", 1830, 196],
      ["empujador_hora_pico", 1970, 128],
    ],
    ["capo_pasillo", 2230, 128],
  ),
  createLevel(
    5,
    "Nivel 6 · Codo a Codo",
    "Sexto vagón despejado. El fondo del tren aparece cerca.",
    "Mantené la postura y no te saquen del eje.",
    [
      ["bloqueador_puerta", 990, 78],
      ["empujador_hora_pico", 1160, 188],
      ["bloqueador_puerta", 1330, 132],
    ],
    [
      ["vendedor_relampago", 1700, 94],
      ["empujador_hora_pico", 1840, 204],
      ["vendedor_relampago", 1980, 144],
    ],
    ["capo_pasillo", 2235, 126],
  ),
  createLevel(
    6,
    "Nivel 7 · Vagón Caliente",
    "Séptimo vagón controlado. Ya se siente el furgón.",
    "Cruzá el calor del vagón sin perder tempo.",
    [
      ["empujador_hora_pico", 980, 74],
      ["bloqueador_puerta", 1140, 196],
      ["vendedor_relampago", 1310, 126],
    ],
    [
      ["vendedor_relampago", 1710, 90],
      ["bloqueador_puerta", 1840, 186],
      ["empujador_hora_pico", 1970, 138],
    ],
    ["capo_pasillo", 2230, 130],
  ),
  createLevel(
    7,
    "Nivel 8 · Tirón Final",
    "Octavo vagón superado. El cierre ya está cerca.",
    "Acelerá y cortá las últimas formaciones duras.",
    [
      ["vendedor_relampago", 990, 84],
      ["empujador_hora_pico", 1160, 204],
      ["vendedor_relampago", 1330, 142],
    ],
    [
      ["bloqueador_puerta", 1710, 92],
      ["empujador_hora_pico", 1840, 198],
      ["bloqueador_puerta", 1970, 146],
    ],
    ["capo_pasillo", 2235, 130],
  ),
  createLevel(
    8,
    "Nivel 9 · Antesala del Furgón",
    "Noveno vagón dominado. El furgón ya se ve.",
    "Defendé el avance y metete en la última antesala.",
    [
      ["bloqueador_puerta", 1000, 88],
      ["vendedor_relampago", 1160, 194],
      ["empujador_hora_pico", 1320, 136],
    ],
    [
      ["empujador_hora_pico", 1710, 86],
      ["vendedor_relampago", 1840, 202],
      ["bloqueador_puerta", 1985, 148],
    ],
    ["capo_pasillo", 2235, 126],
  ),
  createLevel(
    9,
    "Nivel 10 · Furgón Final",
    "Ricky se quedó con el tren entero.",
    "Entrá al furgón final y bancate la última escalada.",
    [
      ["empujador_hora_pico", 995, 72],
      ["bloqueador_puerta", 1165, 196],
      ["vendedor_relampago", 1335, 132],
    ],
    [
      ["bloqueador_puerta", 1715, 92],
      ["empujador_hora_pico", 1845, 210],
      ["vendedor_relampago", 1985, 144],
    ],
    ["capo_pasillo", 2240, 128],
  ),
];

export function getCampaignLevel(index: number): CampaignLevel {
  return campaignLevels[index] ?? campaignLevels[0];
}

export function applyLevelToState(
  state: GameState,
  levelIndex: number,
  preserveElapsedRun = true,
) {
  const level = getCampaignLevel(levelIndex);

  state.currentLevelIndex = levelIndex;
  state.totalLevels = campaignLevels.length;
  state.scene = baseScene();
  state.enemies = [];
  state.levelBounds = { ...level.bounds };
  state.levelLayout = {
    ...level.layout,
    wave1Spawns: [...level.layout.wave1Spawns],
    wave2Spawns: [...level.layout.wave2Spawns],
    bossSpawn: { ...level.layout.bossSpawn },
  };
  state.player.x = level.layout.entryX;
  state.player.y = level.entryY;
  state.player.z = 0;
  state.player.vx = 0;
  state.player.vy = 0;
  state.player.vz = 0;
  state.player.hp = state.player.maxHp;
  state.player.onGround = true;
  state.player.facing = "right";
  state.player.isMoving = false;
  state.player.attack.activeMs = 0;
  state.player.attack.cooldownMs = 0;
  state.player.hurtCooldownMs = 0;
  state.camera.x = 0;
  state.input = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    attack: false,
    pause: false,
  };
  state.hud.levelName = level.name;
  state.hud.hints = [
    "Moverse: WASD o flechas",
    "Saltar: espacio",
    "Pausa: P",
  ];
  state.hud.enemyCount = 0;
  state.hud.objective = level.openingObjective;
  if (!preserveElapsedRun) {
    state.hud.elapsedMs = 0;
  }
}
