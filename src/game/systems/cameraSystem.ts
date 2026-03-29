import { clamp } from "@/lib/utils/clamp";
import type { GameState } from "@/game/types/gameTypes";

export function updateCamera(state: GameState) {
  const desiredX =
    state.player.x + state.player.width / 2 - state.camera.viewportWidth / 2;

  state.camera.x = clamp(
    desiredX,
    0,
    Math.max(0, state.levelBounds.width - state.camera.viewportWidth),
  );
}
