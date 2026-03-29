import { clamp } from "@/lib/utils/clamp";
import type { GameState } from "@/game/types/gameTypes";

import { clampXToArena, clampYToArena } from "./arenaBounds";

const MIN_DT_MS = 0;
const MAX_DT_MS = 33;

export function clampDeltaTime(dtMs: number) {
  return clamp(dtMs, MIN_DT_MS, MAX_DT_MS);
}

export function updateMovement(state: GameState, dtMs: number) {
  const dt = clampDeltaTime(dtMs) / 1000;
  const clampedDtMs = clampDeltaTime(dtMs);
  state.lastDtMs = clampedDtMs;

  if (state.phase !== "playing") {
    state.player.vx = 0;
    state.player.vy = 0;
    state.player.isMoving = false;
    return;
  }

  const speedMultiplier = state.player.speedBoostMs > 0 ? 1.22 : 1;
  const isStartingAttack =
    state.input.attack &&
    state.player.attack.cooldownMs === 0 &&
    state.player.hurtCooldownMs === 0;
  const attackMoveMultiplier =
    isStartingAttack || state.player.attack.activeMs > 0
      ? 0.14
      : state.player.attack.cooldownMs > 180
        ? 0.48
        : 1;
  const inputInvertMultiplier = state.player.invertControlsMs > 0 ? -1 : 1;
  const horizontalIntent =
    (Number(state.input.right) - Number(state.input.left)) * inputInvertMultiplier;
  const verticalIntent =
    (Number(state.input.down) - Number(state.input.up)) * inputInvertMultiplier;
  const normalizedIntent =
    horizontalIntent !== 0 && verticalIntent !== 0 ? Math.SQRT1_2 : 1;

  state.player.vx =
    horizontalIntent *
    state.player.speed *
    speedMultiplier *
    attackMoveMultiplier *
    normalizedIntent;
  state.player.vy =
    verticalIntent *
    state.player.speed *
    speedMultiplier *
    attackMoveMultiplier *
    normalizedIntent;
  state.player.isMoving = horizontalIntent !== 0 || verticalIntent !== 0;

  if (horizontalIntent < 0) {
    state.player.facing = "left";
  } else if (horizontalIntent > 0) {
    state.player.facing = "right";
  }

  if (state.input.jump && state.player.onGround) {
    state.player.onGround = false;
    state.player.vz = state.player.jumpStrength;
  }

  state.player.x += state.player.vx * dt;
  state.player.y += state.player.vy * dt;

  if (!state.player.onGround) {
    state.player.z += state.player.vz * dt;
    state.player.vz -= state.player.gravity * dt;

    if (state.player.z <= 0) {
      state.player.z = 0;
      state.player.vz = 0;
      state.player.onGround = true;
    }
  }

  state.player.x = clampXToArena(state, state.player.x, state.player.width);
  state.player.y = clampYToArena(state, state.player.y, state.player.depth);
}
