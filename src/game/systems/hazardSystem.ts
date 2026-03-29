import type { GameState, HazardState } from "@/game/types/gameTypes";

import { clampXToArena, clampYToArena } from "./arenaBounds";

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

  const dt = dtMs / 1000;

  for (const hazard of state.scene.activeHazards) {
    if (!hazard.active) {
      continue;
    }

    if (hazard.type === "door_slam") {
      const playerInside =
        state.player.x < hazard.x + hazard.width &&
        state.player.x + state.player.width > hazard.x &&
        state.player.y < hazard.y + hazard.depth &&
        state.player.y + state.player.depth > hazard.y;

      if (playerInside && state.player.hurtCooldownMs === 0) {
        state.player.hp = Math.max(0, state.player.hp - (hazard.damage ?? 6));
        state.runStats.stationDamageTaken += hazard.damage ?? 6;
        state.runStats.stationHazardHitsTaken += 1;
        state.player.hurtCooldownMs = 320;
        state.player.x += hazard.strength ?? -20;
        state.player.x = clampXToArena(state, state.player.x, state.player.width);

        if (state.player.hp === 0) {
          state.phase = "game_over";
        }
      }

      for (const enemy of state.enemies) {
        if (enemy.hp <= 0 || enemy.hurtCooldownMs > 0) {
          continue;
        }

        const enemyInside =
          enemy.x < hazard.x + hazard.width &&
          enemy.x + enemy.width > hazard.x &&
          enemy.y < hazard.y + hazard.depth &&
          enemy.y + enemy.depth > hazard.y;

        if (!enemyInside) {
          continue;
        }

        enemy.hp = Math.max(0, enemy.hp - (hazard.damage ?? 6));
        enemy.hurtCooldownMs = 260;
        enemy.state = enemy.hp === 0 ? "defeated" : "hurt";
        if (enemy.hp === 0) {
          state.runStats.stationHazardKills += 1;
          state.runStats.score += 30;
        }
        enemy.x += hazard.strength ?? -20;
        enemy.x = clampXToArena(state, enemy.x, enemy.width);
        enemy.y = clampYToArena(state, enemy.y, enemy.depth);
      }
    }

    if (hazard.type === "sudden_brake") {
      state.player.x += (hazard.strength ?? -120) * dt;
      state.player.x = clampXToArena(state, state.player.x, state.player.width);

      for (const enemy of state.enemies) {
        if (enemy.hp <= 0) {
          continue;
        }

        enemy.x += (hazard.strength ?? -120) * dt * 0.8;
        enemy.x = clampXToArena(state, enemy.x, enemy.width);
      }
    }

    if (hazard.type === "passenger_push") {
      const playerInside =
        state.player.x < hazard.x + hazard.width &&
        state.player.x + state.player.width > hazard.x &&
        state.player.y < hazard.y + hazard.depth &&
        state.player.y + state.player.depth > hazard.y;

      if (playerInside) {
        state.player.x += (hazard.strength ?? 140) * dt;
        state.player.x = clampXToArena(state, state.player.x, state.player.width);
      }

      for (const enemy of state.enemies) {
        if (enemy.hp <= 0) {
          continue;
        }

        const enemyInside =
          enemy.x < hazard.x + hazard.width &&
          enemy.x + enemy.width > hazard.x &&
          enemy.y < hazard.y + hazard.depth &&
          enemy.y + enemy.depth > hazard.y;

        if (!enemyInside) {
          continue;
        }

        enemy.x += (hazard.strength ?? 140) * dt * 0.85;
        enemy.x = clampXToArena(state, enemy.x, enemy.width);
      }
    }
  }
}
