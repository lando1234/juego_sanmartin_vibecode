import { describe, expect, it } from "vitest";

import { createEnemy } from "@/game/entities/createEnemy";
import {
  getAnimatedSpriteFrame,
  getSpriteTransform,
  resolveEnemySpriteState,
  resolvePlayerSpriteState,
} from "@/game/render/spriteAnimation";
import { createInitialGameState } from "@/game/state/createInitialGameState";

describe("spriteAnimation", () => {
  it("resolves player states from gameplay state", () => {
    const snapshot = createInitialGameState();

    expect(resolvePlayerSpriteState(snapshot.player)).toBe("idle");

    snapshot.player.isMoving = true;
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("walk");

    snapshot.player.attack.activeMs = 120;
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("attack");

    snapshot.player.attack.activeMs = 0;
    snapshot.player.actionState = "attack_2";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("attack_2");

    snapshot.player.actionState = "attack_3";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("attack_3");

    snapshot.player.actionState = "special";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("special");

    snapshot.player.actionState = "dash";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("dash");

    snapshot.player.actionState = "block";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("block");

    snapshot.player.actionState = "grab";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("grab");

    snapshot.player.actionState = "throw";
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("throw");

    snapshot.player.actionState = "idle";
    snapshot.player.hurtCooldownMs = 180;
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("hurt");
  });

  it("resolves enemy states from ai state", () => {
    const snapshot = createInitialGameState();
    const enemy = createEnemy("colado", 0, 0);
    enemy.state = "approach";

    expect(resolveEnemySpriteState(enemy)).toBe("walk");

    enemy.state = "attack";
    expect(resolveEnemySpriteState(enemy)).toBe("attack");

    enemy.state = "hurt";
    expect(resolveEnemySpriteState(enemy)).toBe("hurt");

    const guardingEnemy = createEnemy("durmiente", 0, 0);
    guardingEnemy.state = "recover";
    guardingEnemy.intent = "hold";
    expect(resolveEnemySpriteState(guardingEnemy)).toBe("guard");

    const grabbedEnemy = createEnemy("senora_bolsos", 0, 0);
    grabbedEnemy.state = "grabbed";
    expect(resolveEnemySpriteState(grabbedEnemy)).toBe("grabbed");

    const staggeredBoss = createEnemy("borracho", 0, 0);
    staggeredBoss.state = "hurt";
    expect(resolveEnemySpriteState(staggeredBoss)).toBe("stagger_heavy");

    const telegraphBoss = createEnemy("boss_fisura_bici", 0, 0);
    telegraphBoss.activeAttack = {
      name: "drive_by",
      timerMs: 500,
      startupMs: 220,
      activeMs: 110,
      recoveryMs: 120,
      damage: 10,
      knockback: 0,
      range: 30,
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
    expect(resolveEnemySpriteState(telegraphBoss)).toBe("attack_telegraph");

    enemy.state = "defeated";
    expect(resolveEnemySpriteState(enemy)).toBe("defeated");

    expect(resolvePlayerSpriteState(snapshot.player)).toBe("idle");
  });

  it("selects the proper frame for an animated state", () => {
    const walkA = {} as CanvasImageSource;
    const walkB = {} as CanvasImageSource;

    const frameA = getAnimatedSpriteFrame(
      {
        ricky: {
          idle: [{} as CanvasImageSource],
          walk: [walkA, walkB],
        },
      },
      "ricky",
      "walk",
      0,
    );

    const frameB = getAnimatedSpriteFrame(
      {
        ricky: {
          idle: [{} as CanvasImageSource],
          walk: [walkA, walkB],
        },
      },
      "ricky",
      "walk",
      150,
    );

    expect(frameA).toBe(walkA);
    expect(frameB).toBe(walkB);
  });

  it("returns transformed draw data for attack and defeat states", () => {
    const attack = getSpriteTransform("attack", 0, 10, 20, 100, 180);
    const block = getSpriteTransform("block", 0, 10, 20, 100, 180);
    const telegraph = getSpriteTransform("attack_telegraph", 0, 10, 20, 100, 180);
    const attack3 = getSpriteTransform("attack_3", 0, 10, 20, 100, 180);
    const special = getSpriteTransform("special", 0, 10, 20, 100, 180);
    const stagger = getSpriteTransform("stagger_heavy", 0, 10, 20, 100, 180);
    const defeated = getSpriteTransform("defeated", 0, 10, 20, 100, 180);

    expect(attack.x).toBeGreaterThan(10);
    expect(block.width).toBeGreaterThan(100);
    expect(telegraph.width).toBeGreaterThan(100);
    expect(attack.width).toBeGreaterThan(100);
    expect(attack3.width).toBeGreaterThan(attack.width);
    expect(special.height).toBeGreaterThan(attack.height);
    expect(stagger.rotation).toBeLessThan(0);
    expect(defeated.rotation).toBeGreaterThan(1);
    expect(defeated.height).toBeLessThan(180);
  });
});
