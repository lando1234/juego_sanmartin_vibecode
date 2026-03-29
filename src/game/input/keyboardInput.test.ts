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

  it("ignores repeated keydown events until keyup", () => {
    const onInput = vi.fn();
    const detach = attachKeyboardInput(window, onInput);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "p", code: "KeyP" }));
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "p", code: "KeyP", repeat: true }),
    );
    window.dispatchEvent(new KeyboardEvent("keyup", { key: "p", code: "KeyP" }));

    expect(onInput).toHaveBeenNthCalledWith(1, { pause: true });
    expect(onInput).toHaveBeenNthCalledWith(2, { pause: false });
    expect(onInput).toHaveBeenCalledTimes(2);

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
      special: false,
      grab: false,
      dash: false,
      pause: false,
    });
    expect(onInput).toHaveBeenNthCalledWith(2, {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      special: false,
      grab: false,
      dash: false,
      pause: false,
    });
  });

  it("clears input state when the document becomes hidden", () => {
    const onInput = vi.fn();
    const detach = attachKeyboardInput(window, onInput);

    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    document.dispatchEvent(new Event("visibilitychange"));

    expect(onInput).toHaveBeenCalledWith({
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      special: false,
      grab: false,
      dash: false,
      pause: false,
    });

    detach();
  });
});
