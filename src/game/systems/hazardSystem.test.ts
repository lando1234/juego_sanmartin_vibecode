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
});
