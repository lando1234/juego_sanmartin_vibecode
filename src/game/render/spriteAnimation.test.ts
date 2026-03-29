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
    const attack3 = getSpriteTransform("attack_3", 0, 10, 20, 100, 180);
    const special = getSpriteTransform("special", 0, 10, 20, 100, 180);
    const defeated = getSpriteTransform("defeated", 0, 10, 20, 100, 180);

    expect(attack.x).toBeGreaterThan(10);
    expect(attack.width).toBeGreaterThan(100);
    expect(attack3.width).toBeGreaterThan(attack.width);
    expect(special.height).toBeGreaterThan(attack.height);
    expect(defeated.rotation).toBeGreaterThan(1);
    expect(defeated.height).toBeLessThan(180);
  });
});
