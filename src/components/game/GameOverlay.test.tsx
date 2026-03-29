import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { createInitialGameState } from "@/game/state/createInitialGameState";
import { GameOverlay } from "@/components/game/GameOverlay";

describe("GameOverlay", () => {
  it("lets the player switch between campaign and survival on the title screen", async () => {
    const user = userEvent.setup();
    const onSelectMode = vi.fn();
    const snapshot = createInitialGameState();

    render(
      <GameOverlay
        snapshot={snapshot}
        onStart={vi.fn()}
        onSelectMode={onSelectMode}
        onPauseToggle={vi.fn()}
        onNextLevel={vi.fn()}
        onReset={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Supervivencia" }));

    expect(onSelectMode).toHaveBeenCalledWith("survival");
  });

  it("renders the survival run summary on game over", () => {
    const snapshot = createInitialGameState("survival");
    snapshot.phase = "game_over";
    snapshot.hud.completionTitle = "Supervivencia terminada";
    snapshot.hud.completionSummary =
      "Llegaste a la oleada 6. Superaste 5 oleadas, 1 miniboss y aguantaste 1m 20s.";
    snapshot.survivalWave = 6;
    snapshot.survivalWavesCleared = 5;
    snapshot.survivalMinibossesCleared = 1;

    render(
      <GameOverlay
        snapshot={snapshot}
        onStart={vi.fn()}
        onSelectMode={vi.fn()}
        onPauseToggle={vi.fn()}
        onNextLevel={vi.fn()}
        onReset={vi.fn()}
      />,
    );

    expect(screen.getByText("Supervivencia terminada")).toBeInTheDocument();
    expect(
      screen.getByText(/Llegaste a la oleada 6\. Superaste 5 oleadas/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Oleadas superadas/)).toBeInTheDocument();
  });
});
