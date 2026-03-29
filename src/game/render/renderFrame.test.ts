import { describe, expect, it, vi } from "vitest";

import { createEnemy } from "@/game/entities/createEnemy";
import { createInitialGameState } from "@/game/state/createInitialGameState";
import { renderFrame } from "@/game/render/renderFrame";

function createMockContext() {
  return {
    canvas: {
      width: 1280,
      height: 720,
    },
    clearRect: vi.fn(),
    createLinearGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    ellipse: vi.fn(),
    fill: vi.fn(),
    fillText: vi.fn(),
    arc: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    drawImage: vi.fn(),
    roundRect: vi.fn(),
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
    lineCap: "round" as CanvasLineCap,
    font: "",
    globalAlpha: 1,
  } as unknown as CanvasRenderingContext2D;
}

describe("renderFrame", () => {
  it("renders the richer character shapes without crashing", () => {
    const context = createMockContext();
    const snapshot = createInitialGameState();
    snapshot.phase = "playing";
    snapshot.scene.waveTriggered = true;
    snapshot.scene.gateClosed = true;
    snapshot.scene.gateRightX = snapshot.levelLayout.gate1EndX;
    snapshot.scene.waveIndex = 1;
    const enemy = createEnemy("mochilero", 940, 120);
    enemy.state = "approach";
    snapshot.enemies = [enemy];

    expect(() => renderFrame(context, snapshot)).not.toThrow();
    expect(context.arc).toHaveBeenCalled();
    expect(context.roundRect).toHaveBeenCalled();
    expect(context.stroke).toHaveBeenCalled();
  });

  it("uses loaded sprites when they are available", () => {
    const context = createMockContext();
    const snapshot = createInitialGameState();
    snapshot.phase = "playing";
    const boss = createEnemy("boss_fisura_bici", 2160, 120);
    boss.state = "attack";
    snapshot.enemies = [boss];

    renderFrame(context, snapshot, {
      ricky: {
        idle: [{} as CanvasImageSource],
      },
      boss_fisura_bici: {
        attack: [{} as CanvasImageSource],
      },
    });

    expect(context.drawImage).toHaveBeenCalled();
  });

  it("uses the boss telegraph sprite during startup windows", () => {
    const context = createMockContext();
    const snapshot = createInitialGameState();
    snapshot.phase = "playing";
    const boss = createEnemy("boss_fisura_bici", 2160, 120);
    boss.activeAttack = {
      name: "drive_by",
      timerMs: 520,
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
    snapshot.enemies = [boss];

    const telegraphFrame = {} as CanvasImageSource;
    renderFrame(context, snapshot, {
      ricky: {
        idle: [{} as CanvasImageSource],
      },
      boss_fisura_bici: {
        idle: [{} as CanvasImageSource],
        attack_telegraph: [telegraphFrame],
        attack: [{} as CanvasImageSource],
        hurt: [{} as CanvasImageSource],
        defeated: [{} as CanvasImageSource],
        walk: [{} as CanvasImageSource],
      },
    }, {
      background: null,
      items: {},
      hazards: {},
      ui: {
        danger_telegraph: telegraphFrame as HTMLImageElement,
      },
    });

    expect(context.drawImage).toHaveBeenCalledWith(
      telegraphFrame,
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
    );
  });

  it("uses hazard sprites when they are available", () => {
    const context = createMockContext();
    const snapshot = createInitialGameState();
    snapshot.phase = "playing";
    snapshot.scene.activeHazards = [
      {
        id: "hazard-seat",
        type: "seat_block",
        x: 420,
        y: 160,
        width: 140,
        depth: 90,
        activeMs: 0,
        cooldownMs: 0,
        strength: 0,
        timerMs: 0,
        cooldownRemainingMs: 0,
        active: true,
      },
    ];

    renderFrame(context, snapshot, {}, {
      background: null,
      items: {},
      hazards: {
        seat_block: {} as CanvasImageSource,
      },
      ui: {},
    });

    expect(context.drawImage).toHaveBeenCalled();
  });

  it("does not apply a full-screen white flash when the player attacks", () => {
    const context = createMockContext();
    const snapshot = createInitialGameState();
    snapshot.phase = "playing";
    snapshot.player.attack.activeMs = 120;
    snapshot.player.actionState = "attack_1";

    renderFrame(context, snapshot);

    expect(context.fillStyle).not.toMatch(/rgba\(255, 228, 180/i);
  });
});
