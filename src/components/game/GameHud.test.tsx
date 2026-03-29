import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GameHud } from "@/components/game/GameHud";
import { createInitialGameState } from "@/game/state/createInitialGameState";

describe("GameHud", () => {
  it("renders a boss hp bar when a boss is active", () => {
    const snapshot = createInitialGameState();
    snapshot.enemies = [
      {
        id: "boss-1",
        kind: "capo_pasillo",
        name: "El Capo del Pasillo",
        x: 2200,
        y: 140,
        z: 0,
        vx: 0,
        vy: 0,
        width: 96,
        depth: 42,
        speed: 170,
        hp: 120,
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

    render(<GameHud snapshot={snapshot} />);

    expect(screen.getByText("El Capo del Pasillo")).toBeInTheDocument();
    expect(screen.getByText("120 HP")).toBeInTheDocument();
  });

  it("shows active buffs and pickup feedback", () => {
    const snapshot = createInitialGameState();
    snapshot.player.speedBoostMs = 4000;
    snapshot.player.attackBoostMs = 3000;
    snapshot.hud.pickupMessage = "Mate listo: Ricky acelera el paso.";

    render(<GameHud snapshot={snapshot} />);

    expect(screen.getByText(/Mate 4s/i)).toBeInTheDocument();
    expect(screen.getByText(/SUBE 3s/i)).toBeInTheDocument();
    expect(screen.getByText(/Ricky acelera el paso/i)).toBeInTheDocument();
  });
});
