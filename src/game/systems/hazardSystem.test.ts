import { describe, expect, it } from "vitest";

import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateHazards } from "@/game/systems/hazardSystem";

describe("hazardSystem", () => {
  it("hydrates active hazards from the level layout when hazards exist", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.levelLayout.hazards = [
      {
        id: "test-door",
        type: "door_slam",
        x: 220,
        y: 100,
        width: 48,
        depth: 80,
        activeMs: 600,
        cooldownMs: 400,
      },
    ];

    updateHazards(state, 16);

    expect(state.scene.activeHazards).toHaveLength(1);
    expect(state.scene.activeHazards[0].id).toBe("test-door");
  });

  it("damages the player when an active door slam hazard closes on him", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.levelLayout.hazards = [
      {
        id: "test-door",
        type: "door_slam",
        x: state.player.x,
        y: state.player.y,
        width: 54,
        depth: 90,
        damage: 8,
      },
    ];

    updateHazards(state, 16);

    expect(state.player.hp).toBeLessThan(state.player.maxHp);
    expect(state.player.hurtCooldownMs).toBeGreaterThan(0);
  });

  it("pushes the player during a sudden brake hazard", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.levelLayout.hazards = [
      {
        id: "test-brake",
        type: "sudden_brake",
        x: 0,
        y: 0,
        width: state.levelBounds.width,
        depth: state.levelBounds.depth,
        strength: -180,
      },
    ];
    const startX = state.player.x;

    updateHazards(state, 16);

    expect(state.player.x).toBeLessThan(startX);
  });
});
