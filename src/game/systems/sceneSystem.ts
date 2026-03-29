import { getCampaignLevel } from "@/game/data/campaignLevels";
import { createEnemy } from "@/game/entities/createEnemy";
import type { EnemyKind, GameState } from "@/game/types/gameTypes";

const SURVIVAL_MINIBOSS_CADENCE = 5;
const SURVIVAL_COMMON_POOL: EnemyKind[] = [
  "colado",
  "durmiente",
  "mochilero",
  "vendedor_competencia",
  "senora_bolsos",
  "fisura",
];

function computeStationResult(state: GameState) {
  const scoreDelta = Math.max(0, state.runStats.score - state.runStats.stationScoreStart);
  const timeMs = Math.max(1000, state.hud.elapsedMs - state.runStats.stationStartElapsedMs);
  const actionVarietyCount = [
    state.runStats.stationBasicAttacksUsed > 0,
    state.runStats.stationSpecialsUsed > 0,
    state.runStats.stationThrowsUsed > 0,
    state.runStats.stationGrabsUsed > 0,
    state.runStats.stationDashesUsed > 0,
    state.runStats.stationHazardKills > 0,
  ].filter(Boolean).length;
  const varietyScore = actionVarietyCount * 22;
  const timeBonus = Math.max(0, 160 - Math.floor(timeMs / 1000) * 3);
  const comboBonus = state.runStats.comboBest * 18;
  const damagePenalty = state.runStats.stationDamageTaken * 4;
  const hazardPenalty = state.runStats.stationHazardHitsTaken * 14;
  const spamPenalty = Math.max(
    0,
    state.runStats.stationBasicAttacksUsed - (actionVarietyCount * 3 + 7),
  ) * 6;
  const scoreForRank =
    scoreDelta +
    varietyScore +
    timeBonus +
    comboBonus -
    damagePenalty -
    hazardPenalty -
    spamPenalty;

  const rank =
    scoreForRank >= 430
      ? "S"
      : scoreForRank >= 300
        ? "A"
        : scoreForRank >= 180
          ? "B"
          : "C";

  return {
    rank,
    scoreDelta,
    timeMs,
    damageTaken: state.runStats.stationDamageTaken,
    comboBest: state.runStats.comboBest,
    varietyScore,
    spamPenalty,
    hazardHitsTaken: state.runStats.stationHazardHitsTaken,
    hazardKills: state.runStats.stationHazardKills,
  } as const;
}

function formatStationSummary(state: GameState) {
  const result = computeStationResult(state);
  state.hud.stationResult = { ...result };
  state.hud.completionSummary = [
    `${state.hud.completionSummary ?? ""}`.trim(),
    `Rango ${result.rank} · Puntaje ${result.scoreDelta} · Combo x${result.comboBest || 1}.`,
    `Daño recibido ${result.damageTaken} · Variedad +${result.varietyScore}${result.spamPenalty > 0 ? ` · Spam -${result.spamPenalty}` : ""}.`,
  ]
    .filter(Boolean)
    .join(" ");
}

function isSurvivalMinibossWave(waveNumber: number) {
  return waveNumber > 0 && waveNumber % SURVIVAL_MINIBOSS_CADENCE === 0;
}

function getSurvivalSpawnSeeds(state: GameState) {
  const seeds = [...state.levelLayout.wave1Spawns, ...state.levelLayout.wave2Spawns];

  if (seeds.length > 0) {
    return seeds;
  }

  return [
    { kind: "colado" as const, x: state.levelLayout.wave1TriggerX + 120, y: 104 },
    { kind: "durmiente" as const, x: state.levelLayout.wave1TriggerX + 240, y: 144 },
    { kind: "mochilero" as const, x: state.levelLayout.wave1TriggerX + 360, y: 188 },
  ];
}

function spawnSurvivalWave(state: GameState, waveNumber: number) {
  const seeds = getSurvivalSpawnSeeds(state);
  const minibossWave = isSurvivalMinibossWave(waveNumber);
  const commonCount = minibossWave
    ? 2 + Math.min(2, Math.floor(waveNumber / SURVIVAL_MINIBOSS_CADENCE))
    : 3 + Math.min(3, Math.floor((waveNumber - 1) / 3));
  const baseIndex = waveNumber - 1;
  const spawnKind = (index: number): EnemyKind =>
    SURVIVAL_COMMON_POOL[(baseIndex + index) % SURVIVAL_COMMON_POOL.length];

  const spawns = Array.from({ length: commonCount }, (_, index) => {
    const seed = seeds[(baseIndex + index) % seeds.length];

    return {
      kind: spawnKind(index),
      x: seed.x + (index % 3 - 1) * 22,
      y: seed.y,
    };
  });

  if (minibossWave) {
    const centerSeed = seeds[Math.floor(seeds.length / 2)] ?? seeds[0];

    spawns.unshift({
      kind: "borracho",
      x: centerSeed.x,
      y: centerSeed.y,
    });
  }

  state.survivalWave = waveNumber;
  state.currentLevelIndex = waveNumber - 1;
  state.totalLevels = waveNumber;
  state.scene.waveIndex = waveNumber;
  state.scene.waveTriggered = true;
  state.scene.secondWaveTriggered = true;
  state.scene.bossTriggered = minibossWave;
  state.scene.victoryWalkTriggered = false;
  state.scene.gateClosed = false;
  state.scene.gateRightX = null;
  state.scene.type = minibossWave ? "boss_combat" : "carriage_combat";
  state.enemies = spawns.map((spawn) => createEnemy(spawn.kind, spawn.x, spawn.y));
  state.hud.levelName = `Supervivencia · Oleada ${waveNumber}`;
  state.hud.objective = minibossWave
    ? `Supervivencia · miniboss de la oleada ${waveNumber}`
    : `Supervivencia · oleada ${waveNumber}`;
}

function updateSurvivalScene(state: GameState) {
  if (state.survivalWave === 0 && state.enemies.length === 0) {
    spawnSurvivalWave(state, 1);
    return;
  }

  const waveCleared = state.survivalWave > 0 && state.enemies.every((enemy) => enemy.hp <= 0);

  if (!waveCleared) {
    return;
  }

  if (isSurvivalMinibossWave(state.survivalWave)) {
    state.survivalMinibossesCleared += 1;
  }

  state.survivalWavesCleared += 1;
  spawnSurvivalWave(state, state.survivalWave + 1);
}

export function updateScene(state: GameState) {
  if (state.phase !== "playing") {
    return;
  }

  if (state.mode === "survival") {
    updateSurvivalScene(state);
    return;
  }

  const currentLevel = getCampaignLevel(state.currentLevelIndex);

  if (
    !state.scene.waveTriggered &&
    state.player.x >= state.levelLayout.wave1TriggerX
  ) {
    state.scene.waveTriggered = true;
    state.scene.gateClosed = true;
    state.scene.waveIndex = 1;
    state.scene.gateRightX = state.levelLayout.gate1EndX;
    state.scene.type = "carriage_combat";
    state.enemies = state.levelLayout.wave1Spawns.map((spawn) =>
      createEnemy(spawn.kind, spawn.x, spawn.y),
    );
    state.hud.objective = currentLevel.firstWaveObjective;
  }

  if (
    state.scene.gateClosed &&
    state.scene.waveIndex === 1 &&
    state.enemies.every((enemy) => enemy.hp <= 0)
  ) {
    state.scene.gateClosed = false;
    state.scene.gateRightX = null;
    state.hud.objective = currentLevel.firstWaveClearedObjective;
  }

  if (
    state.scene.waveTriggered &&
    !state.scene.secondWaveTriggered &&
    state.player.x >= state.levelLayout.wave2TriggerX
  ) {
    state.scene.secondWaveTriggered = true;
    state.scene.gateClosed = true;
    state.scene.gateRightX = state.levelLayout.gate2EndX;
    state.scene.waveIndex = 2;
    state.scene.type = "carriage_combat";
    state.enemies = state.levelLayout.wave2Spawns.map((spawn) =>
      createEnemy(spawn.kind, spawn.x, spawn.y),
    );
    state.hud.objective = currentLevel.secondWaveObjective;
  }

  if (
    state.scene.gateClosed &&
    state.scene.waveIndex === 2 &&
    !state.scene.bossTriggered &&
    state.enemies.every((enemy) => enemy.hp <= 0)
  ) {
    state.scene.gateClosed = false;
    state.scene.gateRightX = null;
    state.hud.objective = currentLevel.secondWaveClearedObjective;
  }

  if (
    state.scene.secondWaveTriggered &&
    !state.scene.bossTriggered &&
    state.player.x >= state.levelLayout.bossTriggerX
  ) {
    state.scene.bossTriggered = true;
    state.scene.gateClosed = true;
    state.scene.gateRightX = state.levelLayout.bossGateEndX;
    state.scene.waveIndex = 3;
    state.scene.type = "boss_combat";
    state.enemies = [
      createEnemy(
        state.levelLayout.bossSpawn.kind,
        state.levelLayout.bossSpawn.x,
        state.levelLayout.bossSpawn.y,
      ),
    ];
    state.hud.objective = currentLevel.bossObjective;
  }

  if (
    state.scene.bossTriggered &&
    state.scene.gateClosed &&
    state.enemies.every((enemy) => enemy.hp <= 0)
  ) {
    state.scene.gateClosed = false;
    state.scene.gateRightX = null;
    state.scene.victoryWalkTriggered = true;
    state.hud.objective = currentLevel.victoryObjective;
  }

  if (
    state.scene.victoryWalkTriggered &&
    state.player.x >= state.levelLayout.exitTriggerX
  ) {
    state.hud.objective = currentLevel.exitObjective;
  }

  if (
    state.scene.victoryWalkTriggered &&
    state.player.x >= state.levelLayout.exitX
  ) {
    state.phase = "victory";
    state.hud.completionTitle = currentLevel.completionTitle;
    state.hud.completionSummary = currentLevel.completionSummary;
    formatStationSummary(state);
  }
}
