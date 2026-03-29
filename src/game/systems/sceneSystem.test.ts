import { describe, expect, it } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";
import { campaignLevels } from "@/game/data/campaignLevels";

function runUntil(
  engine: ReturnType<typeof createGameEngine>,
  predicate: () => boolean,
  limit = 1200,
) {
  for (let index = 0; index < limit; index += 1) {
    if (predicate()) {
      return;
    }
    engine.step(16);
  }

  throw new Error("Condition not reached in test");
}
describe("sceneSystem", () => {
  it("uses the same arena width for the boss as the standard combat area", () => {
    const layout = campaignLevels[0].layout;

    expect(layout.bossGateEndX - layout.bossGateStartX).toBe(
      layout.gate2EndX - layout.gate2StartX,
    );
  });

  it("triggers the second wave after advancing past the first arena", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });

    runUntil(engine, () => engine.getSnapshot().scene.waveTriggered);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave2TriggerX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().scene.secondWaveTriggered);

    expect(engine.getSnapshot().scene.waveIndex).toBe(2);
    expect(engine.getSnapshot().enemies).toHaveLength(3);
  });

  it("spawns the boss after the second wave is cleared", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendInput({ right: true });

    runUntil(engine, () => engine.getSnapshot().scene.waveTriggered);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave2TriggerX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().scene.secondWaveTriggered);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.bossTriggerX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().scene.bossTriggered);

    expect(engine.getSnapshot().scene.type).toBe("boss_combat");
    expect(engine.getSnapshot().enemies[0].kind).toBe("borracho");
    expect(engine.getSnapshot().enemies[0].role).toBe("mini_boss");
  });

  it("completes a level and advances to the next one", () => {
    const engine = createGameEngine({ now: () => 1000 });
    engine.sendCommand({ type: "start" });
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave1TriggerX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().scene.waveTriggered);

    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave2TriggerX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().scene.secondWaveTriggered);

    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.bossTriggerX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().scene.bossTriggered);

    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.exitX + 8 },
    });
    runUntil(engine, () => engine.getSnapshot().phase === "victory");

    expect(engine.getSnapshot().hud.completionTitle).toBeTruthy();
    expect(engine.getSnapshot().hud.stationResult).toBeTruthy();
    expect(engine.getSnapshot().hud.stationResult?.rank).toMatch(/[CSAB]/);

    engine.sendCommand({ type: "next-level" });

    expect(engine.getSnapshot().phase).toBe("station_intro");
    expect(engine.getSnapshot().currentLevelIndex).toBe(1);
    expect(engine.getSnapshot().hud.levelName).toBe(campaignLevels[1].name);
  });

  it("advances endless survival waves and inserts a miniboss cadence", () => {
    const engine = createGameEngine({ now: () => 1000 });

    engine.sendCommand({ type: "set-mode", payload: { mode: "survival" } });
    engine.sendCommand({ type: "start" });

    runUntil(engine, () => engine.getSnapshot().survivalWave === 1);
    expect(engine.getSnapshot().hud.levelName).toContain("Supervivencia");

    for (let wave = 1; wave < 5; wave += 1) {
      engine.sendCommand({ type: "debug-defeat-enemies" });
      engine.step(16);
      runUntil(engine, () => engine.getSnapshot().survivalWave === wave + 1);
    }

    expect(engine.getSnapshot().scene.type).toBe("boss_combat");
    expect(engine.getSnapshot().enemies.some((enemy) => enemy.kind === "borracho")).toBe(true);
    expect(engine.getSnapshot().survivalWavesCleared).toBe(4);
    expect(engine.getSnapshot().survivalMinibossesCleared).toBe(0);
  });
});
