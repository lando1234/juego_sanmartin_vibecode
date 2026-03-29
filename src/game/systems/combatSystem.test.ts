import { describe, expect, it } from "vitest";

import { createGameEngine } from "@/game/core/createGameEngine";
import { createEnemy } from "@/game/entities/createEnemy";
import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateCombat } from "@/game/systems/combatSystem";

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
    const targetX = enemy.x - 18;

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
    const state = createInitialGameState();
    state.phase = "playing";
    state.input.attack = true;
    const enemy = createEnemy("durmiente", 236, state.player.y);
    state.enemies = [enemy];

    updateCombat(state, 16);
    updateCombat(state, 60);

    expect(state.enemies[0].hp).toBeLessThan(state.enemies[0].maxHp);
  });

  it("chains into the second and third combo hit when the input is timed inside the window", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.input.attack = true;
    state.enemies = [createEnemy("durmiente", 236, state.player.y)];

    updateCombat(state, 16);
    expect(state.player.actionState).toBe("attack_1");

    state.input.attack = false;
    updateCombat(state, 120);
    state.input.attack = true;
    updateCombat(state, 16);
    state.input.attack = false;

    updateCombat(state, 140);
    expect(state.player.actionState).toBe("attack_2");

    updateCombat(state, 120);
    state.input.attack = true;
    updateCombat(state, 16);
    state.input.attack = false;

    updateCombat(state, 180);
    expect(state.player.actionState).toBe("attack_3");
    expect(state.runStats.stationBasicAttacksUsed).toBeGreaterThan(0);
  });

  it("tracks score and combo progression when Ricky lands hits", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.input.attack = true;
    state.enemies = [createEnemy("colado", 236, state.player.y)];

    updateCombat(state, 16);
    updateCombat(state, 60);

    expect(state.runStats.score).toBeGreaterThan(0);
    expect(state.runStats.comboCurrent).toBeGreaterThan(0);
    expect(state.runStats.comboBest).toBeGreaterThan(0);
  });

  it("lets enemies damage Ricky and can reach game over", () => {
    const engine = createGameEngine({ now: () => 1000 });
    spawnWave(engine);

    engine.sendInput({ right: false });

    for (let index = 0; index < 2200; index += 1) {
      engine.step(16);
      if (engine.getSnapshot().phase === "game_over") {
        break;
      }
    }

    expect(engine.getSnapshot().player.hp).toBeLessThan(100);
    expect(["playing", "game_over"]).toContain(engine.getSnapshot().phase);
  });

  it("does not cancel an enemy attack just because Ricky lands a hit", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const enemy = createEnemy("colado", 236, state.player.y);
    enemy.activeAttack = {
      name: "push",
      timerMs: 220,
      startupMs: 80,
      activeMs: 80,
      recoveryMs: 60,
      damage: 8,
      knockback: 10,
      range: 28,
      hitbox: {
        shape: "rectangle",
        width: 40,
        height: 30,
        offsetX: 20,
        offsetY: 10,
        activeFrames: [2, 3],
      },
      projectile: false,
      projectileSpeed: 0,
      aoe: false,
      radius: null,
      effect: null,
      durationMs: null,
      hits: 1,
      damageApplied: false,
      projectileSpawned: false,
    };
    state.enemies = [enemy];
    state.input.attack = true;

    updateCombat(state, 16);
    updateCombat(state, 60);

    expect(state.enemies[0].hp).toBeLessThan(state.enemies[0].maxHp);
    expect(state.enemies[0].activeAttack).not.toBeNull();
    expect(state.enemies[0].hurtCooldownMs).toBe(0);
  });

  it("lets Ricky dash through a melee hit without taking damage", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.actionState = "dash";
    state.player.dashInvulnerableMs = 80;
    const enemy = createEnemy("colado", 236, state.player.y);
    enemy.facing = "right";
    enemy.activeAttack = {
      name: "push",
      timerMs: 80,
      startupMs: 0,
      activeMs: 80,
      recoveryMs: 0,
      damage: 8,
      knockback: 10,
      range: 28,
      hitbox: {
        shape: "rectangle",
        width: 40,
        height: 30,
        offsetX: 20,
        offsetY: 10,
        activeFrames: [2, 3],
      },
      projectile: false,
      projectileSpeed: 0,
      aoe: false,
      radius: null,
      effect: null,
      durationMs: null,
      hits: 1,
      damageApplied: false,
      projectileSpawned: false,
    };
    state.enemies = [enemy];

    updateCombat(state, 16);

    expect(state.player.hp).toBe(state.player.maxHp);
  });

  it("grabs a common enemy and throws it on the next grab input", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.enemies = [createEnemy("colado", 228, state.player.y)];
    state.input.grab = true;

    updateCombat(state, 16);
    expect(state.player.grabTargetId).toBe(state.enemies[0].id);
    expect(state.enemies[0].state).toBe("grabbed");

    state.input.grab = true;
    updateCombat(state, 16);

    expect(state.player.grabTargetId).toBeNull();
    expect(state.player.actionState).toBe("throw");
    expect(state.enemies[0].state).toBe("thrown");
  });

  it("turns a grab on a mini boss into a shove instead of a hold", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.enemies = [createEnemy("borracho", 192, state.player.y)];
    state.input.grab = true;

    updateCombat(state, 16);

    expect(state.player.grabTargetId).toBeNull();
    expect(state.enemies[0].state).not.toBe("grabbed");
    expect(state.enemies[0].hp).toBeLessThan(state.enemies[0].maxHp);
  });

  it("lets a thrown enemy damage another enemy on collision", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const grabbed = createEnemy("colado", 228, state.player.y);
    const target = createEnemy("durmiente", 238, state.player.y);
    state.enemies = [grabbed, target];
    state.input.grab = true;

    updateCombat(state, 16);
    state.input.grab = true;
    updateCombat(state, 16);

    expect(target.hp).toBeLessThan(target.maxHp);
  });

  it("spends recoverable health on special and restores it on hit", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.enemies = [createEnemy("durmiente", 230, state.player.y)];
    const startingHp = state.player.hp;
    state.input.special = true;

    updateCombat(state, 16);

    expect(state.player.actionState).toBe("special");
    expect(state.player.hp).toBeLessThan(startingHp);
    expect(state.player.recoverableHp).toBeGreaterThan(0);

    updateCombat(state, 120);

    expect(state.player.hp).toBe(startingHp);
    expect(state.player.recoverableHp).toBe(0);
  });

  it("lets guarding enemies block frontal light attacks", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const enemy = createEnemy("durmiente", 230, state.player.y);
    enemy.facing = "left";
    enemy.modifiers.guardChance = 1;
    state.enemies = [enemy];
    state.input.attack = true;

    updateCombat(state, 16);
    updateCombat(state, 60);

    expect(state.enemies[0].hp).toBe(state.enemies[0].maxHp);
    expect(state.enemies[0].state).toBe("recover");
  });

  it("lets poise enemies absorb a light hit without staggering", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    const enemy = createEnemy("mochilero", 232, state.player.y);
    enemy.poiseHp = 1;
    state.enemies = [enemy];
    state.input.attack = true;

    updateCombat(state, 16);
    updateCombat(state, 60);

    expect(state.enemies[0].hp).toBe(state.enemies[0].maxHp);
    expect(state.enemies[0].hurtCooldownMs).toBe(0);
    expect(state.enemies[0].poiseHp).toBe(0);
  });

  it("reduces frontal damage when Ricky is blocking", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.actionState = "block";
    state.player.facing = "left";
    state.input.block = true;
    const enemy = createEnemy("colado", 236, state.player.y);
    enemy.facing = "right";
    enemy.activeAttack = {
      name: "push",
      timerMs: 80,
      startupMs: 0,
      activeMs: 80,
      recoveryMs: 0,
      damage: 12,
      knockback: 20,
      range: 40,
      hitbox: {
        shape: "rectangle",
        width: 40,
        height: 30,
        offsetX: 20,
        offsetY: 10,
        activeFrames: [2, 3],
      },
      projectile: false,
      projectileSpeed: 0,
      aoe: false,
      radius: null,
      effect: null,
      durationMs: null,
      hits: 1,
      damageApplied: false,
      projectileSpawned: false,
    };
    state.enemies = [enemy];

    updateCombat(state, 16);

    expect(state.player.hp).toBeGreaterThan(90);
    expect(state.player.actionState).toBe("block");
    expect(state.player.hurtCooldownMs).toBeLessThan(380);
  });

  it("loses recoverable health if Ricky gets hit before cashing it back", () => {
    const state = createInitialGameState();
    state.phase = "playing";
    state.player.recoverableHp = 12;
    const enemy = createEnemy("colado", 236, state.player.y);
    enemy.facing = "left";
    enemy.activeAttack = {
      name: "push",
      timerMs: 80,
      startupMs: 0,
      activeMs: 80,
      recoveryMs: 0,
      damage: 8,
      knockback: 10,
      range: 28,
      hitbox: {
        shape: "rectangle",
        width: 40,
        height: 30,
        offsetX: 20,
        offsetY: 10,
        activeFrames: [2, 3],
      },
      projectile: false,
      projectileSpeed: 0,
      aoe: false,
      radius: null,
      effect: null,
      durationMs: null,
      hits: 1,
      damageApplied: false,
      projectileSpawned: false,
    };
    state.enemies = [enemy];

    updateCombat(state, 16);

    expect(state.player.recoverableHp).toBe(0);
  });

  it("keeps enemies inside the closed combat arena after knockback", () => {
    const engine = createGameEngine({ now: () => 1000 });
    spawnWave(engine);
    const snapshot = engine.getSnapshot();
    const enemy = snapshot.enemies[0];

    engine.sendCommand({
      type: "debug-set-player-position",
      payload: { x: snapshot.levelLayout.gate1StartX + 8, y: enemy.y },
    });

    enemy.x = snapshot.levelLayout.gate1StartX + 2;
    engine.sendInput({ attack: true });
    engine.step(16);

    expect(engine.getSnapshot().enemies[0].x).toBeGreaterThanOrEqual(
      engine.getSnapshot().levelLayout.gate1StartX,
    );
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
