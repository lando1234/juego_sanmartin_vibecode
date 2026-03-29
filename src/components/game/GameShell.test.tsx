import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GameShell } from "@/components/game/GameShell";

describe("GameShell", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the title overlay and starts the game from the button", async () => {
    const user = userEvent.setup();
    render(<GameShell />);

    expect(
      screen.getByRole("button", { name: "Empezar partida" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Empezar partida" }));

    expect(screen.getByText(/Fase: playing/i)).toBeInTheDocument();
    expect(screen.getByText(/En vagón: 0 rivales/i)).toBeInTheDocument();
  });

  it("cleans up engine listeners on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<GameShell />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keyup",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "blur",
      expect.any(Function),
    );
  });

});
