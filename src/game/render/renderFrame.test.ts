import { describe, expect, it, vi } from "vitest";

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
    snapshot.enemies = [
      {
        id: "enemy-1",
        kind: "bloqueador_puerta",
        name: "Bloqueador de Puerta",
        x: 940,
        y: 120,
        z: 0,
        vx: 0,
        vy: 0,
        width: 72,
        depth: 34,
        speed: 150,
        hp: 45,
        maxHp: 45,
        damage: 12,
        attackRange: 92,
        attackIntervalMs: 850,
        attackCooldownMs: 0,
        hurtCooldownMs: 0,
        facing: "left",
        state: "advance",
        isBoss: false,
      },
    ];

    expect(() => renderFrame(context, snapshot)).not.toThrow();
    expect(context.arc).toHaveBeenCalled();
    expect(context.roundRect).toHaveBeenCalled();
    expect(context.stroke).toHaveBeenCalled();
  });

  it("uses loaded sprites when they are available", () => {
    const context = createMockContext();
    const snapshot = createInitialGameState();
    snapshot.phase = "playing";
    snapshot.enemies = [
      {
        id: "enemy-1",
        kind: "capo_pasillo",
        name: "El Capo del Pasillo",
        x: 2160,
        y: 120,
        z: 0,
        vx: 0,
        vy: 0,
        width: 96,
        depth: 42,
        speed: 170,
        hp: 180,
        maxHp: 180,
        damage: 18,
        attackRange: 108,
        attackIntervalMs: 780,
        attackCooldownMs: 0,
        hurtCooldownMs: 0,
        facing: "left",
        state: "attack",
        isBoss: true,
      },
    ];

    renderFrame(context, snapshot, {
      ricky: {
        idle: [{} as CanvasImageSource],
      },
      capo_pasillo: {
        attack: [{} as CanvasImageSource],
      },
    });

    expect(context.drawImage).toHaveBeenCalled();
  });
});
