import { describe, expect, it } from "vitest";

import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateItems } from "@/game/systems/itemSystem";

describe("itemSystem", () => {
  it("collects a mate and grants a speed boost", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const item = state.items.find((entry) => entry.kind === "mate_listo");

    expect(item).toBeTruthy();

    state.player.x = (item?.x ?? 0) - 10;
    state.player.y = item?.y ?? 0;

    updateItems(state, 16);

    expect(item?.collected).toBe(true);
    expect(state.player.speedBoostMs).toBeGreaterThan(0);
    expect(state.hud.pickupMessage).toMatch(/Mate listo/i);
  });

  it("collects a tortita negra and restores hp", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.hp = 60;
    const item = state.items.find((entry) => entry.kind === "tortita_negra");

    expect(item).toBeTruthy();

    state.player.x = (item?.x ?? 0) - 8;
    state.player.y = item?.y ?? 0;

    updateItems(state, 16);

    expect(item?.collected).toBe(true);
    expect(state.player.hp).toBeGreaterThan(60);
  });
});
