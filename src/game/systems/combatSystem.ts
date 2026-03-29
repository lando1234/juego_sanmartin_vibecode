import type {
  ActiveEnemyAttackState,
  EnemyState,
  Facing,
  GameState,
  HitboxState,
  ProjectileState,
} from "@/game/types/gameTypes";

import { clampXToArena, clampYToArena } from "./arenaBounds";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

let projectileSeed = 0;

function intersects(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function getBodyRect(x: number, y: number, width: number, depth: number): Rect {
  return { x, y, width, height: depth };
}

function getAttackRect(
  ownerX: number,
  ownerY: number,
  ownerWidth: number,
  ownerDepth: number,
  facing: Facing,
  hitbox: HitboxState,
): Rect {
  const direction = facing === "right" ? 1 : -1;
  const x =
    facing === "right"
      ? ownerX + ownerWidth / 2 + hitbox.offsetX
      : ownerX + ownerWidth / 2 - hitbox.offsetX - hitbox.width;

  return {
    x: x + direction * 6,
    y: ownerY + ownerDepth / 2 - hitbox.height / 2 + hitbox.offsetY,
    width: hitbox.width,
    height: hitbox.height,
  };
}

function applyDamageToEnemy(
  state: GameState,
  playerX: number,
  enemy: EnemyState,
  damage: number,
) {
  enemy.hp = Math.max(0, enemy.hp - damage);
  enemy.hurtCooldownMs = 220;
  enemy.state = enemy.hp === 0 ? "defeated" : "hurt";
  enemy.x += playerX < enemy.x ? 24 : -24;
  enemy.x = clampXToArena(state, enemy.x, enemy.width);
  enemy.y = clampYToArena(state, enemy.y, enemy.depth);
}

function applyDamageToPlayer(state: GameState, damage: number, knockback = 0, sourceFacing: Facing) {
  if (state.player.hurtCooldownMs > 0) {
    return;
  }

  const incomingDamage =
    state.player.shieldMs > 0 ? Math.ceil(damage * 0.55) : damage;
  state.player.hp = Math.max(0, state.player.hp - incomingDamage);
  state.player.hurtCooldownMs = 380;
  state.player.x += sourceFacing === "right" ? knockback : -knockback;
  state.player.x = clampXToArena(state, state.player.x, state.player.width);
  state.player.y = clampYToArena(state, state.player.y, state.player.depth);

  if (state.player.hp === 0) {
    state.phase = "game_over";
  }
}

function applyPlayerStatusEffect(
  state: GameState,
  effect: ProjectileState["effect"],
  durationMs: number | null,
) {
  if (!effect || !durationMs) {
    return;
  }

  if (effect === "blind") {
    state.player.blindMs = Math.max(state.player.blindMs, durationMs);
  }

  if (effect === "invert_controls") {
    state.player.invertControlsMs = Math.max(state.player.invertControlsMs, durationMs);
  }
}

function spawnEnemyProjectile(
  state: GameState,
  enemy: EnemyState,
  attack: ActiveEnemyAttackState,
) {
  projectileSeed += 1;
  const direction = enemy.facing === "right" ? 1 : -1;
  const playerCenterY = state.player.y + state.player.depth / 2;
  const enemyCenterY = enemy.y + enemy.depth / 2;
  const verticalDirection = playerCenterY === enemyCenterY ? 0 : playerCenterY > enemyCenterY ? 1 : -1;

  state.projectiles.push({
    id: `projectile-${projectileSeed}`,
    ownerId: enemy.id,
    source: "enemy",
    x: enemy.x + enemy.width / 2 + direction * 28,
    y: enemy.y + enemy.depth / 2 - 10,
    vx: direction * attack.projectileSpeed,
    vy: verticalDirection * attack.projectileSpeed * 0.18,
    width: 22,
    height: 20,
    damage: attack.damage,
    lifetimeMs: 1500,
    facing: enemy.facing,
    effect: attack.effect,
    radius: attack.radius ?? 0,
    color: attack.effect === "blind" ? "#d0d8da" : "#d96b2e",
  });
}

function updateEnemyAttack(state: GameState, enemy: EnemyState, dtMs: number) {
  const attack = enemy.activeAttack;

  if (!attack) {
    return;
  }

  attack.timerMs = Math.max(0, attack.timerMs - dtMs);
  const elapsedMs =
    attack.startupMs + attack.activeMs + attack.recoveryMs - attack.timerMs;
  const isActive =
    elapsedMs >= attack.startupMs &&
    elapsedMs <= attack.startupMs + attack.activeMs;

  if (isActive && attack.projectile && !attack.projectileSpawned) {
    spawnEnemyProjectile(state, enemy, attack);
    attack.projectileSpawned = true;
  }

  if (isActive && !attack.projectile && !attack.damageApplied) {
    if (attack.aoe) {
      const enemyCenterX = enemy.x + enemy.width / 2;
      const enemyCenterY = enemy.y + enemy.depth / 2;
      const playerCenterX = state.player.x + state.player.width / 2;
      const playerCenterY = state.player.y + state.player.depth / 2;
      const inRange =
        Math.hypot(playerCenterX - enemyCenterX, playerCenterY - enemyCenterY) <=
        (attack.radius ?? 0) + 24;

      if (inRange) {
        applyDamageToPlayer(
          state,
          attack.damage * attack.hits,
          attack.knockback,
          enemy.facing,
        );
        applyPlayerStatusEffect(state, attack.effect, attack.durationMs);
      }
    } else {
      const attackRect = getAttackRect(
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.depth,
        enemy.facing,
        attack.hitbox,
      );
      const playerRect = getBodyRect(
        state.player.x,
        state.player.y,
        state.player.width,
        state.player.depth,
      );

      if (intersects(attackRect, playerRect)) {
        applyDamageToPlayer(
          state,
          attack.damage * attack.hits,
          attack.knockback,
          enemy.facing,
        );
        applyPlayerStatusEffect(state, attack.effect, attack.durationMs);
      }
    }

    attack.damageApplied = true;
  }

  if (attack.timerMs === 0) {
    const aggression = enemy.modifiers.aggression ?? 1;
    const cooldownMultiplier = aggression >= 1 ? Math.max(0.58, 1 - (aggression - 1) * 0.18) : 1;
    enemy.attackCooldownMs = Math.round(enemy.attackIntervalMs * cooldownMultiplier);
    enemy.activeAttack = null;
    enemy.state = "recover";
  }
}

function updateEnemyProjectiles(state: GameState, dtMs: number) {
  const dt = dtMs / 1000;
  const playerRect = getBodyRect(
    state.player.x,
    state.player.y,
    state.player.width,
    state.player.depth,
  );

  state.projectiles = state.projectiles.filter((projectile) => {
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    projectile.lifetimeMs = Math.max(0, projectile.lifetimeMs - dtMs);

    if (projectile.source === "enemy") {
      const projectileRect = getBodyRect(
        projectile.x,
        projectile.y,
        projectile.width,
        projectile.height,
      );

      if (intersects(projectileRect, playerRect)) {
        applyDamageToPlayer(state, projectile.damage, 10, projectile.facing);
        applyPlayerStatusEffect(state, projectile.effect, 2000);
        return false;
      }
    }

    return (
      projectile.lifetimeMs > 0 &&
      projectile.x > -80 &&
      projectile.x < state.levelBounds.width + 80
    );
  });
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
  state.player.blindMs = Math.max(0, state.player.blindMs - dtMs);
  state.player.invertControlsMs = Math.max(0, state.player.invertControlsMs - dtMs);

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
    state.player.attack.struckEnemyIds = [];
  }

  if (state.phase === "playing" && state.player.attack.activeMs > 0) {
    const playerAttackRect = getAttackRect(
      state.player.x,
      state.player.y,
      state.player.width,
      state.player.depth,
      state.player.facing,
      state.player.attack.hitbox,
    );

    for (const enemy of state.enemies) {
      if (
        enemy.hp <= 0 ||
        enemy.hurtCooldownMs > 0 ||
        state.player.attack.struckEnemyIds.includes(enemy.id)
      ) {
        continue;
      }

      const enemyRect = getBodyRect(enemy.x, enemy.y, enemy.width, enemy.depth);

      if (intersects(playerAttackRect, enemyRect)) {
        applyDamageToEnemy(state, state.player.x, enemy, attackDamage);
        state.player.attack.struckEnemyIds.push(enemy.id);
      }
    }
  }

  for (const enemy of state.enemies) {
    updateEnemyAttack(state, enemy, dtMs);
  }

  updateEnemyProjectiles(state, dtMs);
}
