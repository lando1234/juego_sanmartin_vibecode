import { describe, expect, it, vi } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";
import { campaignLevels } from "@/game/data/campaignLevels";

describe("createGameEngine", () => {
  it("boots with the expected initial snapshot", () => {
    const engine = createGameEngine({ now: () => 1000 });
    const snapshot = engine.getSnapshot();

    expect(snapshot.phase).toBe("title");
    expect(snapshot.mode).toBe("campaign");
    expect(snapshot.scene.type).toBe("carriage_intro");
    expect(snapshot.player.name).toBe("Ricky Ferreyra");
    expect(snapshot.camera.x).toBe(0);
    expect(snapshot.enemies).toHaveLength(0);
    expect(snapshot.scene.secondWaveTriggered).toBe(false);
    expect(snapshot.totalLevels).toBe(campaignLevels.length);
    expect(snapshot.currentLevelIndex).toBe(0);
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

  it("keeps the selected mode when resetting from the title screen", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "set-mode", payload: { mode: "survival" } });
    engine.reset();

    expect(engine.getSnapshot().phase).toBe("title");
    expect(engine.getSnapshot().mode).toBe("survival");
    expect(engine.getSnapshot().survivalWave).toBe(0);
  });

  it("starts survival mode with the first wave and survival labels", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "set-mode", payload: { mode: "survival" } });
    engine.sendCommand({ type: "start" });
    engine.step(16);

    expect(engine.getSnapshot().mode).toBe("survival");
    expect(engine.getSnapshot().phase).toBe("playing");
    expect(engine.getSnapshot().survivalWave).toBe(1);
    expect(engine.getSnapshot().hud.levelName).toMatch(/Supervivencia · Oleada 1/i);
    expect(engine.getSnapshot().enemies.length).toBeGreaterThan(0);
  });

  it("ignores next-level outside victory", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "next-level" });

    expect(engine.getSnapshot().phase).toBe("title");
    expect(engine.getSnapshot().currentLevelIndex).toBe(0);
    expect(engine.getSnapshot().hud.levelName).toBe(campaignLevels[0].name);
  });

  it("moves to a station intro screen after finishing a level", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "start" });
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave1TriggerX + 8 },
    });
    engine.step(16);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave2TriggerX + 8 },
    });
    engine.step(16);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.bossTriggerX + 8 },
    });
    engine.step(16);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.exitX + 8 },
    });
    engine.step(16);

    expect(engine.getSnapshot().phase).toBe("victory");

    engine.sendCommand({ type: "next-level" });

    expect(engine.getSnapshot().phase).toBe("station_intro");
    expect(engine.getSnapshot().scene.type).toBe("carriage_intro");
    expect(engine.getSnapshot().currentLevelIndex).toBe(1);
    expect(engine.getSnapshot().hud.levelName).toBe(campaignLevels[1].name);
  });

  it("keeps dash latched across a quick tap until movement consumes it", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "start" });
    engine.sendInput({ dash: true });
    engine.sendInput({ dash: false });
    engine.step(16);

    expect(engine.getSnapshot().player.actionState).toBe("dash");
  });
});
