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
});
