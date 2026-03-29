import type { InputState } from "@/game/types/gameTypes";

const keyMap: Record<string, keyof InputState> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  KeyA: "left",
  KeyD: "right",
  KeyW: "up",
  KeyS: "down",
  Space: "jump",
  KeyJ: "attack",
  KeyK: "special",
  KeyL: "grab",
  ShiftLeft: "dash",
  ShiftRight: "dash",
  KeyI: "block",
  KeyP: "pause",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
  " ": "jump",
  Spacebar: "jump",
  j: "attack",
  k: "special",
  l: "grab",
  i: "block",
  p: "pause",
};

const clearState: InputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  jump: false,
  attack: false,
  special: false,
  grab: false,
  dash: false,
  block: false,
  pause: false,
};

export function attachKeyboardInput(
  target: Window,
  onInput: (input: Partial<InputState>) => void,
) {
  const activeKeys = new Set<string>();

  const resolveKey = (event: KeyboardEvent) =>
    keyMap[event.code] ?? keyMap[event.key];

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = resolveKey(event);

    if (!key || event.repeat || activeKeys.has(event.code || event.key)) {
      return;
    }

    activeKeys.add(event.code || event.key);
    event.preventDefault();
    onInput({ [key]: true });
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = resolveKey(event);
    const identity = event.code || event.key;

    if (!key) {
      return;
    }

    activeKeys.delete(identity);
    event.preventDefault();
    onInput({ [key]: false });
  };

  const clearInput = () => {
    activeKeys.clear();
    onInput(clearState);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      clearInput();
    }
  };

  target.addEventListener("keydown", handleKeyDown);
  target.addEventListener("keyup", handleKeyUp);
  target.addEventListener("blur", clearInput);
  target.document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    target.removeEventListener("keydown", handleKeyDown);
    target.removeEventListener("keyup", handleKeyUp);
    target.removeEventListener("blur", clearInput);
    target.document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );
    clearInput();
  };
}
