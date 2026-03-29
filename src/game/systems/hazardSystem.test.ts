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
    expect(state.runStats.stationHazardHitsTaken).toBe(1);
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

  it("slows the player inside floor clutter", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.x = 260;
    state.player.y = 170;
    state.player.vx = 180;
    state.player.vy = 90;
    state.levelLayout.hazards = [
      {
        id: "test-clutter",
        type: "floor_clutter",
        x: 240,
        y: 150,
        width: 120,
        depth: 90,
        strength: 0.4,
      },
    ];

    updateHazards(state, 16);

    expect(state.player.vx).toBeLessThan(180);
    expect(state.player.vy).toBeLessThan(90);
  });

  it("pushes the player out of a seat block obstacle", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.x = 300;
    state.player.y = 160;
    state.levelLayout.hazards = [
      {
        id: "test-seat",
        type: "seat_block",
        x: 280,
        y: 140,
        width: 120,
        depth: 110,
      },
    ];

    updateHazards(state, 16);

    expect(state.player.x).not.toBe(300);
  });
});
