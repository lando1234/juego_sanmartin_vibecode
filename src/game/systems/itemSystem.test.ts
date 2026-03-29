import { describe, expect, it } from "vitest";

import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateItems } from "@/game/systems/itemSystem";

describe("itemSystem", () => {
  it("collects a mate when the player gets near it", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const item = state.items.find((entry) => entry.kind === "mate_listo");

    expect(item).toBeTruthy();

    state.player.x = (item?.x ?? 0) - 36;
    state.player.y = (item?.y ?? 0) - 2;

    updateItems(state, 16);

    expect(item?.collected).toBe(true);
    expect(state.player.speedBoostMs).toBeGreaterThan(0);
    expect(state.hud.pickupMessage).toMatch(/Mate listo/i);
  });

  it("pulls items toward the player before collecting them", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const item = state.items.find((entry) => entry.kind === "sube_cargada");

    expect(item).toBeTruthy();

    state.player.x = (item?.x ?? 0) - 92;
    state.player.y = (item?.y ?? 0) + 6;

    const beforeX = item?.x ?? 0;
    updateItems(state, 16);

    expect(item?.collected).toBe(false);
    expect(item?.x).toBeLessThan(beforeX);
  });

  it("collects a tortita negra and restores hp", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.hp = 60;
    const item = state.items.find((entry) => entry.kind === "tortita_negra");

    expect(item).toBeTruthy();

    state.player.x = (item?.x ?? 0) - 28;
    state.player.y = (item?.y ?? 0) + 1;

    updateItems(state, 16);

    expect(item?.collected).toBe(true);
    expect(state.player.hp).toBeGreaterThan(60);
  });
});
