import { clamp } from "@/lib/utils/clamp";
import type { GameState } from "@/game/types/gameTypes";

function getArenaLeftX(state: GameState) {
  if (!state.scene.gateClosed) {
    return 0;
  }

  if (state.scene.type === "boss_combat") {
    return state.levelLayout.bossGateStartX;
  }

  if (state.scene.waveIndex === 2) {
    return state.levelLayout.gate2StartX;
  }

  return state.levelLayout.gate1StartX;
}

function getArenaRightX(state: GameState, entityWidth: number) {
  const maxRight = state.levelBounds.width - entityWidth;

  if (!state.scene.gateClosed || state.scene.gateRightX === null) {
    return maxRight;
  }

  return Math.min(maxRight, state.scene.gateRightX - entityWidth);
}

export function clampXToArena(state: GameState, x: number, entityWidth: number) {
  const left = getArenaLeftX(state);
  const right = Math.max(left, getArenaRightX(state, entityWidth));
  return clamp(x, left, right);
}

export function clampYToArena(state: GameState, y: number, entityDepth: number) {
  return clamp(y, 0, state.levelBounds.depth - entityDepth);
}
