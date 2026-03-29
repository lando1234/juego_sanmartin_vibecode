import { describe, expect, it } from "vitest";

import { createEnemy } from "@/game/entities/createEnemy";
import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateEnemies } from "@/game/systems/enemySystem";

describe("enemySystem", () => {
  it("assigns one more active attacker when Ricky is committed to an action", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.enemies = [
      createEnemy("colado", 250, state.player.y),
      createEnemy("colado", 264, state.player.y + 10),
      createEnemy("fisura", 280, state.player.y - 12),
      createEnemy("vendedor_competencia", 304, state.player.y + 8),
    ];

    updateEnemies(state, 16);
    const baseEngagedCount = state.enemies.filter((enemy) => enemy.engagementSlot !== null).length;

    state.player.actionState = "attack_1";
    state.player.attack.attackChainIndex = 1;
    state.input.attack = true;
    updateEnemies(state, 16);
    const committedEngagedCount = state.enemies.filter(
      (enemy) => enemy.engagementSlot !== null,
    ).length;

    expect(baseEngagedCount).toBe(3);
    expect(committedEngagedCount).toBe(4);
  });

  it("marks anti-spam enemies as punishing or flanking when Ricky is predictable", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.actionState = "attack_1";
    state.player.attack.attackChainIndex = 1;
    state.input.attack = true;
    state.enemies = [
      createEnemy("fisura", 280, state.player.y + 12),
      createEnemy("vendedor_competencia", 320, state.player.y - 18),
    ];

    updateEnemies(state, 16);

    expect(["punish", "flank", "kite"]).toContain(state.enemies[0].intent);
    expect(["punish", "flank", "kite"]).toContain(state.enemies[1].intent);
  });
});
