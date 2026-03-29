import type { GameState, HazardState } from "@/game/types/gameTypes";

function cloneHazard(hazard: GameState["levelLayout"]["hazards"][number]): HazardState {
  return {
    ...hazard,
    timerMs: hazard.activeMs ?? 0,
    cooldownRemainingMs: 0,
    active: false,
  };
}

export function updateHazards(state: GameState, dtMs: number) {
  if (state.phase !== "playing") {
    return;
  }

  if (state.scene.activeHazards.length === 0 && state.levelLayout.hazards.length > 0) {
    state.scene.activeHazards = state.levelLayout.hazards.map(cloneHazard);
  }

  for (const hazard of state.scene.activeHazards) {
    if (hazard.cooldownRemainingMs > 0) {
      hazard.cooldownRemainingMs = Math.max(0, hazard.cooldownRemainingMs - dtMs);
      if (hazard.cooldownRemainingMs === 0) {
        hazard.active = true;
        hazard.timerMs = hazard.activeMs ?? 0;
      }
      continue;
    }

    if (!hazard.active) {
      hazard.active = true;
      hazard.timerMs = hazard.activeMs ?? 0;
    }

    if (hazard.active && (hazard.activeMs ?? 0) > 0) {
      hazard.timerMs = Math.max(0, hazard.timerMs - dtMs);

      if (hazard.timerMs === 0 && (hazard.cooldownMs ?? 0) > 0) {
        hazard.active = false;
        hazard.cooldownRemainingMs = hazard.cooldownMs ?? 0;
      }
    }
  }
}
