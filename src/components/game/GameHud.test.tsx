import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GameHud } from "@/components/game/GameHud";
import { createEnemy } from "@/game/entities/createEnemy";
import { createInitialGameState } from "@/game/state/createInitialGameState";

describe("GameHud", () => {
  it("renders a boss hp bar when a boss is active", () => {
    const snapshot = createInitialGameState();
    const boss = createEnemy("boss_fisura_bici", 2200, 140);
    boss.hp = 120;
    boss.state = "attack";
    snapshot.enemies = [boss];

    render(<GameHud snapshot={snapshot} />);

    expect(screen.getByText("Boss Fisura Bici")).toBeInTheDocument();
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
