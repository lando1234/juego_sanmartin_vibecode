import {
  applyLevelToState,
  campaignLevels,
  getCampaignLevel,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/game/data/campaignLevels";
import { enemyHitboxTemplate } from "@/game/data/enemyCatalog";
import { resetEnemySeed } from "@/game/entities/createEnemy";
import type { GameState } from "@/game/types/gameTypes";

const baseHints = [
  "Moverse: WASD o flechas",
  "Saltar: espacio",
  "Pausa: P",
];

export function createInitialGameState(): GameState {
  resetEnemySeed();
  const firstLevel = getCampaignLevel(0);

  const state: GameState = {
    phase: "title",
    currentLevelIndex: 0,
    totalLevels: campaignLevels.length,
    scene: {
      type: "carriage_intro",
      gateClosed: false,
      gateRightX: null,
      waveIndex: 0,
      waveTriggered: false,
      secondWaveTriggered: false,
      bossTriggered: false,
      victoryWalkTriggered: false,
    },
    player: {
      id: "ricky",
      name: "Ricky Ferreyra",
      x: firstLevel.layout.entryX,
      y: firstLevel.entryY,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      width: 68,
      depth: 34,
      speed: 420,
      jumpStrength: 720,
      gravity: 1800,
      hp: 100,
      maxHp: 100,
      onGround: true,
      facing: "right",
      isMoving: false,
      attack: {
        activeMs: 0,
        cooldownMs: 0,
        damage: 22,
        range: 108,
        width: 88,
        hitbox: {
          ...enemyHitboxTemplate,
          width: 88,
          height: 36,
          offsetX: 18,
          offsetY: 6,
        },
        struckEnemyIds: [],
      },
      hurtCooldownMs: 0,
      speedBoostMs: 0,
      attackBoostMs: 0,
      shieldMs: 0,
      blindMs: 0,
      invertControlsMs: 0,
    },
    enemies: [],
    projectiles: [],
    items: [],
    camera: {
      x: 0,
      viewportWidth: VIEWPORT_WIDTH,
      viewportHeight: VIEWPORT_HEIGHT,
    },
    input: {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      pause: false,
    },
    levelBounds: firstLevel.bounds,
    levelLayout: firstLevel.layout,
    lastDtMs: 0,
    startedAtMs: null,
    updatedAtMs: null,
    hud: {
      levelName: firstLevel.name,
      elapsedMs: 0,
      hints: baseHints,
      enemyCount: 0,
      objective: firstLevel.openingObjective,
      completionTitle: null,
      completionSummary: null,
      pickupMessage: null,
      activePickup: null,
    },
  };

  applyLevelToState(state, 0, false);
  return state;
}
