import { describe, expect, it } from "vitest";

import { getSpriteFramePaths, spriteManifest } from "@/game/render/spriteManifest";

describe("spriteManifest", () => {
  it("uses multi-frame sequences for the main converted characters", () => {
    expect(spriteManifest.ricky.frames.idle).toHaveLength(2);
    expect(spriteManifest.ricky.frames.walk).toHaveLength(2);
    expect(spriteManifest.colado.frames.walk).toHaveLength(2);
    expect(spriteManifest.durmiente.frames.idle).toHaveLength(2);
    expect(spriteManifest.senoraBolsos.frames.walk).toHaveLength(2);
    expect(spriteManifest.bossFisuraBici.frames.idle).toHaveLength(2);
  });

  it("resolves the paths for a given state", () => {
    expect(getSpriteFramePaths("ricky", "idle")).toEqual([
      "/sprites/characters/ricky/idle-01.png",
      "/sprites/characters/ricky/idle-02.png",
    ]);

    expect(getSpriteFramePaths("boss_fisura_bici", "attack")).toEqual([
      "/sprites/characters/boss_fisura_bici/attack-01.png",
    ]);

    expect(getSpriteFramePaths("borracho", "hurt")).toEqual([
      "/sprites/characters/borracho/hurt-01.png",
    ]);
  });
});
