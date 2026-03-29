import type { GameState, ItemState } from "@/game/types/gameTypes";

const PICKUP_RADIUS = 74;
const PICKUP_RADIUS_SQUARED = PICKUP_RADIUS * PICKUP_RADIUS;
const MAGNET_RADIUS = 132;
const MAGNET_RADIUS_SQUARED = MAGNET_RADIUS * MAGNET_RADIUS;
const PLAYER_CENTER_OFFSET_X = 18;
const PLAYER_CENTER_OFFSET_Y = 18;
const EFFECT_DURATION_MS = 5000;

function getCenters(playerX: number, playerY: number, item: ItemState) {
  return {
    playerCenterX: playerX + PLAYER_CENTER_OFFSET_X,
    playerCenterY: playerY + PLAYER_CENTER_OFFSET_Y,
    itemCenterX: item.x + item.width / 2,
    itemCenterY: item.y + item.depth / 2,
  };
}

function getDistanceSquared(
  playerX: number,
  playerY: number,
  item: ItemState,
) {
  const centers = getCenters(playerX, playerY, item);
  const dx = centers.playerCenterX - centers.itemCenterX;
  const dy = centers.playerCenterY - centers.itemCenterY;

  return dx * dx + dy * dy;
}

function canCollect(playerX: number, playerY: number, item: ItemState) {
  return getDistanceSquared(playerX, playerY, item) <= PICKUP_RADIUS_SQUARED;
}

function isInMagnetRange(playerX: number, playerY: number, item: ItemState) {
  return getDistanceSquared(playerX, playerY, item) <= MAGNET_RADIUS_SQUARED;
}

function applyPickupEffect(state: GameState, item: ItemState) {
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

export function updateItems(state: GameState, dtMs: number) {
  state.player.speedBoostMs = Math.max(0, state.player.speedBoostMs - dtMs);
  state.player.attackBoostMs = Math.max(0, state.player.attackBoostMs - dtMs);
  state.player.shieldMs = Math.max(0, state.player.shieldMs - dtMs);

  if (state.phase !== "playing") {
    return;
  }

  for (const item of state.items) {
    if (item.collected) {
      continue;
    }

    if (canCollect(state.player.x, state.player.y, item)) {
      item.collected = true;
      applyPickupEffect(state, item);
      continue;
    }

    if (isInMagnetRange(state.player.x, state.player.y, item)) {
      const centers = getCenters(state.player.x, state.player.y, item);
      const dx = centers.playerCenterX - centers.itemCenterX;
      const dy = centers.playerCenterY - centers.itemCenterY;
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const pull = Math.min(1, dtMs / 120);

      item.x += dx / distance * 2.2 * pull;
      item.y += dy / distance * 1.6 * pull;

      if (distance <= PICKUP_RADIUS * 0.82) {
        item.collected = true;
        applyPickupEffect(state, item);
      }
    }
  }
}
