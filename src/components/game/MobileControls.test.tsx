import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MobileControls } from "@/components/game/MobileControls";

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
});
