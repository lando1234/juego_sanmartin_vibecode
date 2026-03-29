import { describe, expect, it } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";

function spawnWave(engine: ReturnType<typeof createGameEngine>) {
  engine.sendCommand({ type: "start" });
  engine.sendInput({ right: true });

  for (let index = 0; index < 120; index += 1) {
    engine.step(16);
  }

  engine.sendInput({ right: false });
}

function alignWithEnemy(
  engine: ReturnType<typeof createGameEngine>,
  enemyIndex: number,
) {
  const enemy = engine.getSnapshot().enemies[enemyIndex];
  const playerY = engine.getSnapshot().player.y;

  if (playerY < enemy.y) {
    engine.sendInput({ down: true, up: false });
    while (engine.getSnapshot().player.y < enemy.y - 8) {
      engine.step(16);
    }
    engine.sendInput({ down: false });
  } else {
    engine.sendInput({ up: true, down: false });
    while (engine.getSnapshot().player.y > enemy.y + 8) {
      engine.step(16);
    }
    engine.sendInput({ up: false });
  }
}

function moveNextToEnemy(
  engine: ReturnType<typeof createGameEngine>,
  enemyIndex: number,
) {
  while (true) {
    const snapshot = engine.getSnapshot();
    const enemy = snapshot.enemies[enemyIndex];
    const targetX = enemy.x - 56;

    if (Math.abs(snapshot.player.x - targetX) <= 12) {
      engine.sendInput({ left: false, right: false });
      break;
    }

    if (snapshot.player.x < targetX) {
      engine.sendInput({ right: true, left: false });
    } else {
      engine.sendInput({ left: true, right: false });
    }

    engine.step(16);
  }
}

describe("combatSystem", () => {
  it("spawns the first enemy wave and closes the gate", () => {
    const engine = createGameEngine({ now: () => 1000 });
    spawnWave(engine);
    const snapshot = engine.getSnapshot();

    expect(snapshot.scene.gateClosed).toBe(true);
    expect(snapshot.enemies).toHaveLength(3);
    expect(snapshot.hud.enemyCount).toBe(3);
  });

  it("damages enemies when Ricky attacks in range", () => {
    const engine = createGameEngine({ now: () => 1000 });
    spawnWave(engine);
    alignWithEnemy(engine, 0);
    moveNextToEnemy(engine, 0);

    const firstEnemy = engine.getSnapshot().enemies[0];
    engine.sendInput({ attack: true });
    engine.step(16);

    expect(engine.getSnapshot().enemies[0].hp).toBeLessThan(firstEnemy.maxHp);
  });

  it("lets enemies damage Ricky and can reach game over", () => {
    const engine = createGameEngine({ now: () => 1000 });
    spawnWave(engine);

    engine.sendInput({ right: false });

    for (let index = 0; index < 900; index += 1) {
      engine.step(16);
      if (engine.getSnapshot().phase === "game_over") {
        break;
      }
    }

    expect(engine.getSnapshot().player.hp).toBeLessThan(100);
    expect(engine.getSnapshot().phase).toBe("game_over");
  });

  it("opens the gate after defeating the wave and reaches victory at the exit", () => {
    const engine = createGameEngine({ now: () => 1000 });
    spawnWave(engine);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    expect(engine.getSnapshot().scene.gateClosed).toBe(false);

    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.wave2TriggerX + 8 },
    });
    engine.step(16);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    expect(engine.getSnapshot().scene.gateClosed).toBe(false);

    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.bossTriggerX + 8 },
    });
    engine.step(16);
    engine.sendCommand({ type: "debug-defeat-enemies" });
    engine.step(16);
    expect(engine.getSnapshot().scene.gateClosed).toBe(false);

    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: engine.getSnapshot().levelLayout.exitX + 8 },
    });
    for (let index = 0; index < 4; index += 1) {
      engine.step(16);
    }

    expect(engine.getSnapshot().phase).toBe("victory");
  });
});
