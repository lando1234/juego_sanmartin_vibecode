import { describe, expect, it, vi } from "vitest";

import { attachKeyboardInput } from "@/game/input/keyboardInput";

describe("attachKeyboardInput", () => {
  it("maps keydown and keyup to the expected input flags", () => {
    const onInput = vi.fn();
    const detach = attachKeyboardInput(window, onInput);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));

    expect(onInput).toHaveBeenNthCalledWith(1, { right: true });
    expect(onInput).toHaveBeenNthCalledWith(2, { right: false });

    detach();
  });

  it("clears input state on blur and cleanup", () => {
    const onInput = vi.fn();
    const detach = attachKeyboardInput(window, onInput);

    window.dispatchEvent(new Event("blur"));
    detach();

    expect(onInput).toHaveBeenNthCalledWith(1, {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      pause: false,
    });
    expect(onInput).toHaveBeenNthCalledWith(2, {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      pause: false,
    });
  });
});
