import { describe, expect, it } from "vitest";

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
    snapshot.player.hurtCooldownMs = 180;
    expect(resolvePlayerSpriteState(snapshot.player)).toBe("hurt");
  });

  it("resolves enemy states from ai state", () => {
    const snapshot = createInitialGameState();
    const enemy = {
      id: "enemy-1",
      kind: "bloqueador_puerta",
      name: "Bloqueador",
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      width: 72,
      depth: 32,
      speed: 120,
      hp: 40,
      maxHp: 40,
      damage: 10,
      attackRange: 90,
      attackIntervalMs: 900,
      attackCooldownMs: 0,
      hurtCooldownMs: 0,
      facing: "left" as const,
      state: "advance" as const,
      isBoss: false,
    };

    expect(resolveEnemySpriteState(enemy)).toBe("walk");

    enemy.state = "attack";
    expect(resolveEnemySpriteState(enemy)).toBe("attack");

    enemy.state = "hurt";
    expect(resolveEnemySpriteState(enemy)).toBe("hurt");

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
    const defeated = getSpriteTransform("defeated", 0, 10, 20, 100, 180);

    expect(attack.x).toBeGreaterThan(10);
    expect(attack.width).toBeGreaterThan(100);
    expect(defeated.rotation).toBeGreaterThan(1);
    expect(defeated.height).toBeLessThan(180);
  });
});
