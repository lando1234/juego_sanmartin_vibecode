import type { GameState, ItemState } from "@/game/types/gameTypes";

const PICKUP_RANGE_X = 48;
const PICKUP_RANGE_Y = 44;
const EFFECT_DURATION_MS = 5000;

function canCollect(playerX: number, playerY: number, item: ItemState) {
  return (
    Math.abs(playerX + 18 - (item.x + item.width / 2)) <= PICKUP_RANGE_X &&
    Math.abs(playerY + 18 - (item.y + item.depth / 2)) <= PICKUP_RANGE_Y
  );
}

export function updateItems(state: GameState, dtMs: number) {
  state.player.speedBoostMs = Math.max(0, state.player.speedBoostMs - dtMs);
  state.player.attackBoostMs = Math.max(0, state.player.attackBoostMs - dtMs);
  state.player.shieldMs = Math.max(0, state.player.shieldMs - dtMs);

  if (state.phase !== "playing") {
    return;
  }

  for (const item of state.items) {
    if (item.collected || !canCollect(state.player.x, state.player.y, item)) {
      continue;
    }

    item.collected = true;

    switch (item.kind) {
      case "mate_listo":
        state.player.speedBoostMs = EFFECT_DURATION_MS;
        state.hud.pickupMessage = "Mate listo: Ricky acelera el paso.";
        break;
      case "tortita_negra":
        state.player.hp = Math.min(state.player.maxHp, state.player.hp + 24);
        state.hud.pickupMessage = "Tortita negra: recuperaste algo de aire.";
        break;
      case "sube_cargada":
        state.player.attackBoostMs = EFFECT_DURATION_MS;
        state.hud.pickupMessage = "SUBE cargada: los golpes pegan más fuerte.";
        break;
      case "paraguas_fierro":
        state.player.shieldMs = EFFECT_DURATION_MS;
        state.hud.pickupMessage = "Paraguas de fierro: aguantás mejor los choques.";
        break;
    }
  }
}
