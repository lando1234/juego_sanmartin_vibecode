import {
  levelCofradiaPasillo,
  levelLayoutCofradiaPasillo,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/game/data/levelCofradiaPasillo";
import { resetEnemySeed } from "@/game/entities/createEnemy";
import type { GameState } from "@/game/types/gameTypes";

const baseHints = [
  "Moverse: WASD o flechas",
  "Saltar: espacio",
  "Pausa: P",
];

export function createInitialGameState(): GameState {
  resetEnemySeed();

  return {
    phase: "title",
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
      x: levelLayoutCofradiaPasillo.entryX,
      y: 158,
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
      },
      hurtCooldownMs: 0,
    },
    enemies: [],
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
    levelBounds: levelCofradiaPasillo,
    levelLayout: levelLayoutCofradiaPasillo,
    lastDtMs: 0,
    startedAtMs: null,
    updatedAtMs: null,
    hud: {
      levelName: "La Cofradia del Pasillo",
      elapsedMs: 0,
      hints: baseHints,
      enemyCount: 0,
      objective: "Subite al vagon y abrí paso entre dos oleadas hasta el furgon.",
    },
  };
}
