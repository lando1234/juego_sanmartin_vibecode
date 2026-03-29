import { clamp } from "@/lib/utils/clamp";
import type { EnemyState, GameState } from "@/game/types/gameTypes";

function distanceToPlayer(enemy: EnemyState, state: GameState) {
  return {
    x:
      state.player.x +
      state.player.width / 2 -
      (enemy.x + enemy.width / 2),
    y:
      state.player.y + state.player.depth / 2 - (enemy.y + enemy.depth / 2),
  };
}

export function updateEnemies(state: GameState, dtMs: number) {
  if (state.phase !== "playing") {
    return;
  }

  const dt = dtMs / 1000;

  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "defeated";
      continue;
    }

    const { x, y } = distanceToPlayer(enemy, state);
    enemy.facing = x >= 0 ? "right" : "left";

    if (enemy.hurtCooldownMs > 0) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "hurt";
      continue;
    }

    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX <= enemy.attackRange && absY <= 48) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "attack";

      if (enemy.attackCooldownMs === 0 && state.player.hurtCooldownMs === 0) {
        const incomingDamage =
          state.player.shieldMs > 0 ? Math.ceil(enemy.damage * 0.55) : enemy.damage;
        state.player.hp = Math.max(0, state.player.hp - incomingDamage);
        state.player.hurtCooldownMs = 380;
        enemy.attackCooldownMs = enemy.attackIntervalMs;
      }
    } else {
      enemy.state = "advance";
      enemy.vx = clamp(x, -1, 1) * enemy.speed;
      enemy.vy = clamp(y, -1, 1) * enemy.speed * 0.55;

      enemy.x += enemy.vx * dt;
      enemy.y += enemy.vy * dt;
      enemy.x = clamp(enemy.x, 0, state.levelBounds.width - enemy.width);
      enemy.y = clamp(enemy.y, 0, state.levelBounds.depth - enemy.depth);
    }
  }

  if (state.player.hp === 0) {
    state.phase = "game_over";
  }
}
