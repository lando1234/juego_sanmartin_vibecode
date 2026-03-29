import { describe, expect, it } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";

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
    expect(engine.getSnapshot().enemies[0].kind).toBe("capo_pasillo");
    expect(engine.getSnapshot().enemies[0].isBoss).toBe(true);
  });
});
