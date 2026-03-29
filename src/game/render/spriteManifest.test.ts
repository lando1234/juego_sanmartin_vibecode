import { describe, expect, it } from "vitest";

import { getSpriteFramePaths, spriteManifest } from "@/game/render/spriteManifest";

describe("spriteManifest", () => {
  it("uses multi-frame sequences for the main converted characters", () => {
    expect(spriteManifest.ricky.frames.idle).toHaveLength(2);
    expect(spriteManifest.ricky.frames.walk).toHaveLength(2);
    expect(spriteManifest.ricky.frames.block).toEqual([
      "/sprites/characters/ricky/block-01.png",
    ]);
    expect(spriteManifest.ricky.frames.attack_2).toEqual([
      "/sprites/characters/ricky/attack-02.png",
    ]);
    expect(spriteManifest.ricky.frames.attack_3).toEqual([
      "/sprites/characters/ricky/attack-03.png",
    ]);
    expect(spriteManifest.colado.frames.walk).toHaveLength(2);
    expect(spriteManifest.durmiente.frames.idle).toHaveLength(2);
    expect(spriteManifest.durmiente.frames.guard).toEqual([
      "/sprites/characters/durmiente/guard-01.png",
    ]);
    expect(spriteManifest.mochilero.frames.stagger_heavy).toEqual([
      "/sprites/characters/mochilero/stagger-heavy-01.png",
    ]);
    expect(spriteManifest.senoraBolsos.frames.walk).toHaveLength(2);
    expect(spriteManifest.senoraBolsos.frames.grabbed).toEqual([
      "/sprites/characters/senora_bolsos/grabbed-01.png",
    ]);
    expect(spriteManifest.bossFisuraBici.frames.idle).toHaveLength(2);
    expect(spriteManifest.bossFisuraBici.frames.attack_telegraph).toEqual([
      "/sprites/characters/boss_fisura_bici/attack-telegraph-01.png",
    ]);
  });

  it("resolves the paths for a given state", () => {
    expect(getSpriteFramePaths("ricky", "idle")).toEqual([
      "/sprites/characters/ricky/idle-01.png",
      "/sprites/characters/ricky/idle-02.png",
    ]);
    expect(getSpriteFramePaths("ricky", "special")).toEqual([
      "/sprites/characters/ricky/special-01.png",
    ]);
    expect(getSpriteFramePaths("ricky", "dash")).toEqual([
      "/sprites/characters/ricky/dash-01.png",
    ]);
    expect(getSpriteFramePaths("ricky", "block")).toEqual([
      "/sprites/characters/ricky/block-01.png",
    ]);
    expect(getSpriteFramePaths("ricky", "throw")).toEqual([
      "/sprites/characters/ricky/throw-01.png",
    ]);

    expect(getSpriteFramePaths("boss_fisura_bici", "attack")).toEqual([
      "/sprites/characters/boss_fisura_bici/attack-01.png",
    ]);
    expect(getSpriteFramePaths("boss_fisura_bici", "attack_telegraph")).toEqual([
      "/sprites/characters/boss_fisura_bici/attack-telegraph-01.png",
    ]);
    expect(getSpriteFramePaths("colado", "special")).toEqual([
      "/sprites/characters/colado/attack-01.png",
    ]);
    expect(getSpriteFramePaths("senora_bolsos", "grabbed")).toEqual([
      "/sprites/characters/senora_bolsos/grabbed-01.png",
    ]);
    expect(getSpriteFramePaths("durmiente", "guard")).toEqual([
      "/sprites/characters/durmiente/guard-01.png",
    ]);
    expect(getSpriteFramePaths("borracho", "stagger_heavy")).toEqual([
      "/sprites/characters/borracho/stagger-heavy-01.png",
    ]);

    expect(getSpriteFramePaths("borracho", "hurt")).toEqual([
      "/sprites/characters/borracho/hurt-01.png",
    ]);
  });
});
