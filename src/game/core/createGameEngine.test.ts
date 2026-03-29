import { describe, expect, it, vi } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";

describe("createGameEngine", () => {
  it("boots with the expected initial snapshot", () => {
    const engine = createGameEngine({ now: () => 1000 });
    const snapshot = engine.getSnapshot();

    expect(snapshot.phase).toBe("title");
    expect(snapshot.scene.type).toBe("carriage_intro");
    expect(snapshot.player.name).toBe("Ricky Ferreyra");
    expect(snapshot.camera.x).toBe(0);
    expect(snapshot.enemies).toHaveLength(0);
    expect(snapshot.scene.secondWaveTriggered).toBe(false);
  });

  it("starts only once and stops cleanly", () => {
    const raf = vi.fn(() => 42);
    const caf = vi.fn();
    const engine = createGameEngine({
      requestAnimationFrame: raf,
      cancelAnimationFrame: caf,
    });

    engine.start();
    engine.start();
    engine.stop();

    expect(raf).toHaveBeenCalledTimes(1);
    expect(engine.isRunning()).toBe(false);
    expect(caf).toHaveBeenCalledWith(42);
  });

  it("resets to the initial state after changes", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });
    engine.step(16);
    expect(engine.getSnapshot().player.x).toBeGreaterThan(180);

    engine.reset();

    expect(engine.getSnapshot().phase).toBe("title");
    expect(engine.getSnapshot().player.x).toBe(180);
    expect(engine.getSnapshot().startedAtMs).toBeNull();
  });
});
