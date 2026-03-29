import { clamp } from "@/lib/utils/clamp";
import type { GameState } from "@/game/types/gameTypes";

import { clampXToArena, clampYToArena } from "./arenaBounds";

const MIN_DT_MS = 0;
const MAX_DT_MS = 33;
const DASH_DURATION_MS = 170;
const DASH_RECOVERY_MS = 90;
const DASH_INVULNERABLE_MS = 95;
const DASH_SPEED = 980;

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
  const playerIsCommittedToAction =
    state.player.actionState === "attack_1" ||
    state.player.actionState === "attack_2" ||
    state.player.actionState === "attack_3" ||
    state.player.actionState === "special" ||
    state.player.actionState === "grab" ||
    state.player.actionState === "throw";
  const isStartingAttack =
    state.input.attack &&
    state.player.attack.currentAction === null &&
    state.player.hurtCooldownMs === 0;
  const isBusyForDash =
    playerIsCommittedToAction ||
    state.player.actionState === "dash" ||
    state.player.hurtCooldownMs > 0 ||
    state.player.grabTargetId !== null;
  const canStartDash = state.input.dash && !isBusyForDash;
  const attackMoveMultiplier =
    isStartingAttack || playerIsCommittedToAction
      ? 0.14
      : state.player.actionRecoveryMs > 0
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

  if (!playerIsCommittedToAction && state.player.hurtCooldownMs === 0) {
    state.player.actionState = state.player.isMoving ? "walk" : "idle";
  }

  if (canStartDash) {
    const dashHorizontal =
      horizontalIntent !== 0
        ? horizontalIntent
        : state.player.facing === "right"
          ? 1
          : -1;
    const dashVertical = horizontalIntent === 0 ? verticalIntent : 0;
    const dashMagnitude =
      dashHorizontal !== 0 && dashVertical !== 0 ? Math.SQRT1_2 : 1;

    state.player.actionState = "dash";
    state.player.actionTimerMs = DASH_DURATION_MS;
    state.player.actionRecoveryMs = 0;
    state.player.dashInvulnerableMs = DASH_INVULNERABLE_MS;
    state.player.dashVectorX = dashHorizontal * dashMagnitude;
    state.player.dashVectorY = dashVertical * dashMagnitude;
    state.player.queuedAction = null;
    state.input.dash = false;
  }

  if (state.player.actionState === "dash") {
    state.player.actionTimerMs = Math.max(0, state.player.actionTimerMs - clampedDtMs);
    state.player.dashInvulnerableMs = Math.max(
      0,
      state.player.dashInvulnerableMs - clampedDtMs,
    );
    state.player.vx = state.player.dashVectorX * DASH_SPEED;
    state.player.vy = state.player.dashVectorY * DASH_SPEED;
    state.player.isMoving = true;
    state.player.x += state.player.vx * dt;
    state.player.y += state.player.vy * dt;

    if (state.player.actionTimerMs === 0) {
      state.player.actionState = "idle";
      state.player.actionRecoveryMs = DASH_RECOVERY_MS;
      state.player.dashVectorX = 0;
      state.player.dashVectorY = 0;
    }
  } else if (state.player.actionState === "throw" && state.player.actionTimerMs > 0) {
    state.player.actionTimerMs = Math.max(0, state.player.actionTimerMs - clampedDtMs);
    state.player.vx = 0;
    state.player.vy = 0;

    if (state.player.actionTimerMs === 0) {
      state.player.actionState = "idle";
      state.player.actionRecoveryMs = Math.max(state.player.actionRecoveryMs, 140);
    }
  } else if (state.player.actionRecoveryMs > 0 && state.player.attack.currentAction === null) {
    state.player.actionRecoveryMs = Math.max(0, state.player.actionRecoveryMs - clampedDtMs);
  }

  if (horizontalIntent < 0) {
    state.player.facing = "left";
  } else if (horizontalIntent > 0) {
    state.player.facing = "right";
  }

  if (state.input.jump && state.player.onGround) {
    state.player.onGround = false;
    state.player.vz = state.player.jumpStrength;
  }

  if (state.player.actionState !== "dash") {
    state.player.x += state.player.vx * dt;
    state.player.y += state.player.vy * dt;
  }

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
