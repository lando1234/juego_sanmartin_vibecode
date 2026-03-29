import type { GameState } from "@/game/types/gameTypes";

export function updateHud(state: GameState, nowMs: number) {
  state.updatedAtMs = nowMs;

  if (state.phase === "playing" && state.startedAtMs !== null) {
    state.hud.elapsedMs = nowMs - state.startedAtMs;
  }

  state.hud.enemyCount = state.enemies.filter((enemy) => enemy.hp > 0).length;
}
