import { describe, expect, it } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";

describe("movementSystem", () => {
  it("moves Ricky to the right when the right input is active", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });
    engine.step(16);

    expect(engine.getSnapshot().player.x).toBeGreaterThan(180);
  });

  it("keeps the player within level bounds", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });

    for (let index = 0; index < 300; index += 1) {
      engine.sendInput({ left: true, right: false });
      engine.step(16);
    }

    expect(engine.getSnapshot().player.x).toBe(0);
  });

  it("applies a single jump arc and returns to the floor", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ jump: true });
    engine.step(16);

    const airborneSnapshot = engine.getSnapshot();
    expect(airborneSnapshot.player.z).toBeGreaterThan(0);
    expect(airborneSnapshot.player.onGround).toBe(false);

    engine.sendInput({ jump: false });

    for (let index = 0; index < 60; index += 1) {
      engine.step(16);
    }

    const landedSnapshot = engine.getSnapshot();
    expect(landedSnapshot.player.z).toBe(0);
    expect(landedSnapshot.player.onGround).toBe(true);
  });

  it("clamps large dt values to keep movement stable", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });
    engine.step(200);

    expect(engine.getSnapshot().lastDtMs).toBe(33);
  });

  it("freezes motion while paused", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });
    engine.sendCommand({ type: "pause-toggle" });
    engine.step(16);

    expect(engine.getSnapshot().player.x).toBe(180);
    expect(engine.getSnapshot().phase).toBe("paused");
  });

  it("slows Ricky sharply while he is committed to an attack", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ attack: true, right: true });
    engine.step(16);

    expect(engine.getSnapshot().player.x).toBeLessThan(182);
  });

  it("starts a dash and moves Ricky quickly in the facing direction", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ dash: true });
    engine.step(16);

    expect(engine.getSnapshot().player.actionState).toBe("dash");
    expect(engine.getSnapshot().player.x).toBeGreaterThan(198);
  });

  it("lets Ricky enter a blocking stance and stop moving", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true, block: true });
    engine.step(16);

    expect(engine.getSnapshot().player.actionState).toBe("block");
    expect(engine.getSnapshot().player.isMoving).toBe(false);
  });

  it("blocks progress past the combat gate while the wave is active", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });

    for (let index = 0; index < 260; index += 1) {
      engine.step(16);
    }

    const snapshot = engine.getSnapshot();
    expect(snapshot.scene.gateClosed).toBe(true);
    expect(snapshot.player.x).toBeLessThanOrEqual(
      snapshot.levelLayout.gate1EndX - snapshot.player.width,
    );
  });
});
