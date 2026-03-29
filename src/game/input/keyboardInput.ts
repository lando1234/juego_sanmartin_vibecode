import type { InputState } from "@/game/types/gameTypes";

const keyMap: Record<string, keyof InputState> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
  " ": "jump",
  Spacebar: "jump",
  j: "attack",
  p: "pause",
};

export function attachKeyboardInput(
  target: Window,
  onInput: (input: Partial<InputState>) => void,
) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = keyMap[event.key];

    if (!key) {
      return;
    }

    event.preventDefault();
    onInput({ [key]: true });
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = keyMap[event.key];

    if (!key) {
      return;
    }

    event.preventDefault();
    onInput({ [key]: false });
  };

  const clearInput = () => {
    onInput({
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      pause: false,
    });
  };

  target.addEventListener("keydown", handleKeyDown);
  target.addEventListener("keyup", handleKeyUp);
  target.addEventListener("blur", clearInput);

  return () => {
    target.removeEventListener("keydown", handleKeyDown);
    target.removeEventListener("keyup", handleKeyUp);
    target.removeEventListener("blur", clearInput);
    clearInput();
  };
}
