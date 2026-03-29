import type { EnemyState, GameState } from "@/game/types/gameTypes";

function areInSameLane(
  attackerY: number,
  attackerDepth: number,
  targetY: number,
  targetDepth: number,
) {
  const attackerCenter = attackerY + attackerDepth / 2;
  const targetCenter = targetY + targetDepth / 2;

  return Math.abs(attackerCenter - targetCenter) <= 84;
}

function getHorizontalDistance(attackerX: number, attackerWidth: number, targetX: number) {
  return targetX - (attackerX + attackerWidth / 2);
}

function damageEnemy(playerX: number, playerWidth: number, enemy: EnemyState, damage: number) {
  enemy.hp = Math.max(0, enemy.hp - damage);
  enemy.hurtCooldownMs = 220;
  enemy.state = enemy.hp === 0 ? "defeated" : "hurt";
  enemy.x += playerX < enemy.x ? 24 : -24;
}

export function updateCombat(state: GameState, dtMs: number) {
  const attackDamage =
    state.player.attack.damage + (state.player.attackBoostMs > 0 ? 10 : 0);

  state.player.attack.activeMs = Math.max(0, state.player.attack.activeMs - dtMs);
  state.player.attack.cooldownMs = Math.max(
    0,
    state.player.attack.cooldownMs - dtMs,
  );
  state.player.hurtCooldownMs = Math.max(0, state.player.hurtCooldownMs - dtMs);

  for (const enemy of state.enemies) {
    enemy.attackCooldownMs = Math.max(0, enemy.attackCooldownMs - dtMs);
    enemy.hurtCooldownMs = Math.max(0, enemy.hurtCooldownMs - dtMs);
  }

  if (
    state.phase === "playing" &&
    state.input.attack &&
    state.player.attack.cooldownMs === 0
  ) {
    state.player.attack.activeMs = 120;
    state.player.attack.cooldownMs = 320;
  }

  if (state.phase !== "playing" || state.player.attack.activeMs <= 0) {
    return;
  }

  for (const enemy of state.enemies) {
    if (enemy.hp <= 0 || enemy.hurtCooldownMs > 0) {
      continue;
    }

    const distanceX = getHorizontalDistance(
      state.player.x,
      state.player.width,
      enemy.x,
    );
    const inFront =
      state.player.facing === "right"
        ? distanceX >= -36 && distanceX <= state.player.attack.range
        : distanceX <= 36 && distanceX >= -state.player.attack.range;

    if (
      inFront &&
      areInSameLane(state.player.y, state.player.depth, enemy.y, enemy.depth)
    ) {
      damageEnemy(state.player.x, state.player.width, enemy, attackDamage);
    }
  }
}
