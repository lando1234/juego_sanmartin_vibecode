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

  it("lets you switch to survival mode from the title overlay", async () => {
    const user = userEvent.setup();
    render(<GameShell />);

    await user.click(screen.getByRole("button", { name: "Supervivencia" }));
    await user.click(
      screen.getByRole("button", { name: "Empezar supervivencia" }),
    );

    expect(screen.getAllByText(/Fase: playing/i)).toHaveLength(2);
  });

  it("shows the block control hint once the run starts", async () => {
    const user = userEvent.setup();
    render(<GameShell />);

    await user.click(screen.getByRole("button", { name: "Empezar partida" }));

    expect(
      screen.getAllByText(/Bloquear: I de frente al golpe/i).length,
    ).toBeGreaterThan(0);
  });

  it("uses a full-screen stage frame on mobile browsers", async () => {
    const user = userEvent.setup();
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(max-width: 820px)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as typeof window.matchMedia;

    render(<GameShell />);
    await user.click(screen.getByRole("button", { name: "Empezar partida" }));

    const stage = screen.getAllByTestId("game-stage-frame").at(-1)!;
    expect(stage.className).toContain("h-full");
    expect(stage.className).not.toContain("aspect-video");

    window.matchMedia = originalMatchMedia;
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
