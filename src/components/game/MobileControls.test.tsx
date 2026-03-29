import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MobileControls } from "@/components/game/MobileControls";

afterEach(() => {
  cleanup();
});

describe("MobileControls", () => {
  it("maps pointer events to input changes", () => {
    const onInput = vi.fn();
    render(<MobileControls onInput={onInput} />);

    const rightButton = screen.getByRole("button", { name: "Mover derecha" });
    fireEvent.pointerDown(rightButton);
    fireEvent.pointerUp(rightButton);

    expect(onInput).toHaveBeenNthCalledWith(1, { right: true });
    expect(onInput).toHaveBeenNthCalledWith(2, { right: false });
  });

  it("keeps input mapping in overlay mode", () => {
    const onInput = vi.fn();
    render(<MobileControls variant="overlay" onInput={onInput} />);

    const attackButton = screen.getByRole("button", { name: "Golpear" });
    fireEvent.pointerDown(attackButton);
    fireEvent.pointerUp(attackButton);

    expect(onInput).toHaveBeenNthCalledWith(1, { attack: true });
    expect(onInput).toHaveBeenNthCalledWith(2, { attack: false });
  });

  it("renders a special control and maps its pointer events", () => {
    const onInput = vi.fn();
    render(<MobileControls variant="overlay" onInput={onInput} />);

    const specialButton = screen.getByRole("button", { name: "Especial" });
    fireEvent.pointerDown(specialButton);
    fireEvent.pointerUp(specialButton);

    expect(onInput).toHaveBeenNthCalledWith(1, { special: true });
    expect(onInput).toHaveBeenNthCalledWith(2, { special: false });
  });

  it("renders a block control and maps its pointer events", () => {
    const onInput = vi.fn();
    render(<MobileControls variant="overlay" onInput={onInput} />);

    const blockButton = screen.getByRole("button", { name: "Bloquear" });
    fireEvent.pointerDown(blockButton);
    fireEvent.pointerUp(blockButton);

    expect(onInput).toHaveBeenNthCalledWith(1, { block: true });
    expect(onInput).toHaveBeenNthCalledWith(2, { block: false });
  });

  it("keeps the mobile overlay focused on three core actions", () => {
    const onInput = vi.fn();
    render(<MobileControls variant="overlay" onInput={onInput} />);

    expect(screen.queryByRole("button", { name: "Esquivar" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Agarrar" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Saltar" })).not.toBeInTheDocument();
  });
});
