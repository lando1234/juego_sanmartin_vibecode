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

type PlayerCombatActionName = "attack_1" | "attack_2" | "attack_3" | "special";

type PlayerAttackDefinition = {
  name: PlayerCombatActionName;
  startupMs: number;
  activeMs: number;
  recoveryMs: number;
  damage: number;
  knockback: number;
  comboWindowStartMs: number;
  comboWindowEndMs: number;
  hitbox: HitboxState;
};

const SPECIAL_HP_COST = 12;

const playerAttackDefinitions: Record<PlayerCombatActionName, PlayerAttackDefinition> = {
  attack_1: {
    name: "attack_1",
    startupMs: 50,
    activeMs: 75,
    recoveryMs: 150,
    damage: 22,
    knockback: 24,
    comboWindowStartMs: 85,
    comboWindowEndMs: 220,
    hitbox: {
      shape: "rectangle",
      width: 88,
      height: 36,
      offsetX: 18,
      offsetY: 6,
      activeFrames: [2, 3],
    },
  },
  attack_2: {
    name: "attack_2",
    startupMs: 60,
    activeMs: 85,
    recoveryMs: 165,
    damage: 26,
    knockback: 30,
    comboWindowStartMs: 95,
    comboWindowEndMs: 235,
    hitbox: {
      shape: "rectangle",
      width: 94,
      height: 38,
      offsetX: 20,
      offsetY: 4,
      activeFrames: [2, 3],
    },
  },
  attack_3: {
    name: "attack_3",
    startupMs: 80,
    activeMs: 95,
    recoveryMs: 220,
    damage: 34,
    knockback: 44,
    comboWindowStartMs: 0,
    comboWindowEndMs: 0,
    hitbox: {
      shape: "rectangle",
      width: 108,
      height: 40,
      offsetX: 24,
      offsetY: 2,
      activeFrames: [2, 3],
    },
  },
  special: {
    name: "special",
    startupMs: 90,
    activeMs: 110,
    recoveryMs: 280,
    damage: 24,
    knockback: 56,
    comboWindowStartMs: 0,
    comboWindowEndMs: 0,
    hitbox: {
      shape: "rectangle",
      width: 138,
      height: 46,
      offsetX: 24,
      offsetY: 0,
      activeFrames: [2, 3],
    },
  },
};

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
  knockback: number,
  actionName: PlayerCombatActionName | "throw" = "attack_1",
) {
  if (state.player.recoverableHp > 0) {
    const recovered = Math.min(
      state.player.recoverableHp,
      Math.max(1, Math.ceil(damage * 0.5)),
    );
    state.player.recoverableHp -= recovered;
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + recovered);
  }

  const isHeavyPlayerAction =
    actionName === "special" || actionName === "attack_3" || actionName === "throw";
  const frontalHit =
    (playerX < enemy.x && enemy.facing === "left") ||
    (playerX >= enemy.x && enemy.facing === "right");
  const canGuard =
    !isHeavyPlayerAction &&
    frontalHit &&
    (enemy.state === "idle" || enemy.state === "circle") &&
    (enemy.modifiers.guardChance ?? 0) > 0;
  if (canGuard) {
    const guardRoll = ((state.hud.elapsedMs / 16 + enemy.x) % 10) / 10;

    if (guardRoll < (enemy.modifiers.guardChance ?? 0)) {
      enemy.x += playerX < enemy.x ? 12 : -12;
      enemy.state = "recover";
      enemy.intent = "hold";
      enemy.x = clampXToArena(state, enemy.x, enemy.width);
      enemy.y = clampYToArena(state, enemy.y, enemy.depth);
      return;
    }
  }

  if (!isHeavyPlayerAction && enemy.poiseHp > 0) {
    enemy.poiseHp = Math.max(0, enemy.poiseHp - 1);
    enemy.x += playerX < enemy.x ? Math.max(8, Math.round(knockback * 0.25)) : -Math.max(8, Math.round(knockback * 0.25));
    enemy.x = clampXToArena(state, enemy.x, enemy.width);
    enemy.y = clampYToArena(state, enemy.y, enemy.depth);
    return;
  }

  const hasAttackPoise =
    enemy.activeAttack !== null &&
    enemy.activeAttack.timerMs > enemy.activeAttack.recoveryMs;

  enemy.hp = Math.max(0, enemy.hp - damage);

  if (enemy.hp === 0) {
    enemy.hurtCooldownMs = 220;
    enemy.state = "defeated";
    enemy.x += playerX < enemy.x ? knockback : -knockback;
    enemy.x = clampXToArena(state, enemy.x, enemy.width);
    enemy.y = clampYToArena(state, enemy.y, enemy.depth);
    return;
  }

  if (hasAttackPoise) {
    const poiseKnockback =
      enemy.role === "boss" ? 0 : enemy.role === "mini_boss" ? 4 : Math.max(10, Math.round(knockback * 0.4));
    enemy.x += playerX < enemy.x ? poiseKnockback : -poiseKnockback;
    enemy.hurtCooldownMs = 0;
    return;
  }

  enemy.hurtCooldownMs = 220;
  enemy.state = "hurt";
  enemy.poiseHp = enemy.modifiers.poiseHits ?? 0;
  enemy.x += playerX < enemy.x ? knockback : -knockback;
  enemy.x = clampXToArena(state, enemy.x, enemy.width);
  enemy.y = clampYToArena(state, enemy.y, enemy.depth);
}

function startPlayerAttack(state: GameState, action: PlayerCombatActionName) {
  const definition = playerAttackDefinitions[action];
  const totalMs =
    definition.startupMs + definition.activeMs + definition.recoveryMs;

  state.player.actionState = action;
  state.player.queuedAction = null;
  state.player.actionTimerMs = totalMs;
  state.player.actionRecoveryMs = definition.recoveryMs;
  state.player.attack.activeMs = 0;
  state.player.attack.cooldownMs = totalMs;
  state.player.attack.currentAction = action;
  state.player.attack.queuedAction = null;
  state.player.attack.actionTimerMs = totalMs;
  state.player.attack.actionRecoveryMs = definition.recoveryMs;
  state.player.attack.attackChainIndex =
    action === "attack_1" ? 1 : action === "attack_2" ? 2 : action === "attack_3" ? 3 : 0;
  state.player.attack.attackWindowMs =
    definition.comboWindowEndMs > 0
      ? definition.comboWindowEndMs - definition.comboWindowStartMs
      : 0;
  state.player.attack.hitbox = { ...definition.hitbox };
  state.player.attack.damage = definition.damage;
  state.player.attack.width = definition.hitbox.width;
  state.player.attack.range = definition.hitbox.width + definition.hitbox.offsetX;
  state.player.attack.struckEnemyIds = [];
}

function startPlayerSpecial(state: GameState) {
  if (state.player.hp <= SPECIAL_HP_COST) {
    return false;
  }

  state.player.hp -= SPECIAL_HP_COST;
  state.player.recoverableHp = Math.min(
    state.player.maxHp,
    state.player.recoverableHp + SPECIAL_HP_COST,
  );
  startPlayerAttack(state, "special");
  return true;
}

function tryStartGrab(state: GameState) {
  const grabRangeX = 48;
  const grabRangeY = 28;
  const playerCenterX = state.player.x + state.player.width / 2;
  const playerCenterY = state.player.y + state.player.depth / 2;
  const candidate = state.enemies
    .filter((enemy) => enemy.hp > 0 && enemy.state !== "defeated")
    .find((enemy) => {
      const enemyCenterX = enemy.x + enemy.width / 2;
      const enemyCenterY = enemy.y + enemy.depth / 2;
      return (
        Math.abs(enemyCenterX - playerCenterX) <= grabRangeX &&
        Math.abs(enemyCenterY - playerCenterY) <= grabRangeY
      );
    });

  if (!candidate) {
    state.player.actionRecoveryMs = Math.max(state.player.actionRecoveryMs, 110);
    return;
  }

  if (candidate.role === "boss") {
    state.player.actionRecoveryMs = Math.max(state.player.actionRecoveryMs, 90);
    return;
  }

  if (candidate.role === "mini_boss") {
    applyDamageToEnemy(state, state.player.x, candidate, 10, 18, "throw");
    state.player.actionRecoveryMs = Math.max(state.player.actionRecoveryMs, 120);
    return;
  }

  candidate.state = "grabbed";
  candidate.vx = 0;
  candidate.vy = 0;
  candidate.activeAttack = null;
  state.player.grabTargetId = candidate.id;
  state.player.actionState = "grab";
  state.player.actionTimerMs = 0;
  state.player.actionRecoveryMs = 0;
}

function throwHeldEnemy(state: GameState) {
  const target = state.enemies.find((enemy) => enemy.id === state.player.grabTargetId);

  if (!target || target.hp <= 0) {
    state.player.grabTargetId = null;
    state.player.actionState = "idle";
    return;
  }

  const throwDirection =
    state.input.left ? -1 : state.input.right ? 1 : state.player.facing === "right" ? 1 : -1;

  state.player.facing = throwDirection > 0 ? "right" : "left";
  state.player.grabTargetId = null;
  state.player.actionState = "throw";
  state.player.actionTimerMs = 180;
  state.player.actionRecoveryMs = 140;
  target.state = "thrown";
  target.hurtCooldownMs = 220;
  target.thrownTimerMs = 220;
  target.thrownVx = throwDirection * 620;
  target.thrownVy = 0;
  target.activeAttack = null;
}

function applyDamageToPlayer(
  state: GameState,
  damage: number,
  knockback = 0,
  sourceFacing: Facing,
  sourceType: "melee" | "projectile" | "aoe" | "hazard" = "melee",
) {
  if (sourceType === "melee" && state.player.actionState === "dash" && state.player.dashInvulnerableMs > 0) {
    return;
  }

  if (state.player.hurtCooldownMs > 0) {
    return;
  }

  const incomingDamage =
    state.player.shieldMs > 0 ? Math.ceil(damage * 0.55) : damage;
  state.player.hp = Math.max(0, state.player.hp - incomingDamage);
  state.player.hurtCooldownMs = 380;
  state.player.actionState = state.player.hp === 0 ? "defeated" : "hurt";
  state.player.queuedAction = null;
  state.player.actionTimerMs = 0;
  state.player.actionRecoveryMs = 0;
  state.player.recoverableHp = 0;
  state.player.attack.activeMs = 0;
  state.player.attack.currentAction = null;
  state.player.attack.queuedAction = null;
  state.player.attack.actionTimerMs = 0;
  state.player.attack.actionRecoveryMs = 0;
  state.player.attack.attackChainIndex = 0;
  state.player.attack.attackWindowMs = 0;
  state.player.attack.struckEnemyIds = [];
  state.player.grabTargetId = null;
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
          "aoe",
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
          "melee",
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
        applyDamageToPlayer(state, projectile.damage, 10, projectile.facing, "projectile");
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

function updateThrownEnemyCollisions(state: GameState) {
  for (const thrownEnemy of state.enemies) {
    if (thrownEnemy.state !== "thrown" || thrownEnemy.thrownTimerMs <= 0) {
      continue;
    }

    const thrownRect = getBodyRect(
      thrownEnemy.x,
      thrownEnemy.y,
      thrownEnemy.width,
      thrownEnemy.depth,
    );

    const collidedTarget = state.enemies.find((enemy) => {
      if (
        enemy.id === thrownEnemy.id ||
        enemy.hp <= 0 ||
        enemy.state === "grabbed" ||
        enemy.state === "defeated"
      ) {
        return false;
      }

      return intersects(
        thrownRect,
        getBodyRect(enemy.x, enemy.y, enemy.width, enemy.depth),
      );
    });

    if (!collidedTarget) {
      continue;
    }

    applyDamageToEnemy(state, thrownEnemy.x, collidedTarget, 18, 26, "throw");
    thrownEnemy.thrownTimerMs = 0;
    thrownEnemy.thrownVx = 0;
    thrownEnemy.thrownVy = 0;
    thrownEnemy.state = thrownEnemy.hp <= 0 ? "defeated" : "hurt";
  }
}

export function updateCombat(state: GameState, dtMs: number) {
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
    state.input.grab &&
    state.player.hurtCooldownMs === 0 &&
    state.player.actionState !== "dash"
  ) {
    if (state.player.grabTargetId) {
      throwHeldEnemy(state);
    } else if (state.player.attack.currentAction === null) {
      tryStartGrab(state);
    }

    state.input.grab = false;
  }

  if (
    state.phase === "playing" &&
    state.input.special &&
    state.player.attack.currentAction === null &&
    state.player.hurtCooldownMs === 0 &&
    state.player.actionState !== "dash" &&
    state.player.grabTargetId === null
  ) {
    startPlayerSpecial(state);
  }
  if (state.input.special) {
    state.input.special = false;
  }

  const currentPlayerAttack =
    state.player.attack.currentAction &&
    state.player.attack.currentAction in playerAttackDefinitions
      ? playerAttackDefinitions[
          state.player.attack.currentAction as keyof typeof playerAttackDefinitions
        ]
      : null;

  if (state.phase === "playing" && currentPlayerAttack) {
    state.player.actionTimerMs = Math.max(0, state.player.actionTimerMs - dtMs);
    state.player.attack.actionTimerMs = state.player.actionTimerMs;

    const totalMs =
      currentPlayerAttack.startupMs +
      currentPlayerAttack.activeMs +
      currentPlayerAttack.recoveryMs;
    const elapsedMs = totalMs - state.player.actionTimerMs;
    const isActive =
      elapsedMs >= currentPlayerAttack.startupMs &&
      elapsedMs <
        currentPlayerAttack.startupMs + currentPlayerAttack.activeMs;
    const recoveryRemainingMs = Math.max(
      0,
      state.player.actionTimerMs - 0,
    );
    const inRecovery =
      elapsedMs >=
      currentPlayerAttack.startupMs + currentPlayerAttack.activeMs;
    const comboWindowOpen =
      currentPlayerAttack.comboWindowEndMs > 0 &&
      elapsedMs >= currentPlayerAttack.comboWindowStartMs &&
      elapsedMs <= currentPlayerAttack.comboWindowEndMs;

    state.player.attack.activeMs = isActive
      ? currentPlayerAttack.startupMs +
          currentPlayerAttack.activeMs -
          elapsedMs
      : 0;
    state.player.actionRecoveryMs = inRecovery ? recoveryRemainingMs : 0;
    state.player.attack.actionRecoveryMs = state.player.actionRecoveryMs;
    state.player.attack.attackWindowMs = comboWindowOpen
      ? currentPlayerAttack.comboWindowEndMs - elapsedMs
      : 0;

    if (
      comboWindowOpen &&
      state.input.attack &&
      state.player.attack.attackChainIndex < 3
    ) {
      state.player.queuedAction = "attack";
      state.player.attack.queuedAction = "attack";
    }

    if (isActive) {
      const attackDamage =
        currentPlayerAttack.damage +
        (state.player.attackBoostMs > 0 ? 10 : 0);
      const playerAttackRect = getAttackRect(
        state.player.x,
        state.player.y,
        state.player.width,
        state.player.depth,
        state.player.facing,
        currentPlayerAttack.hitbox,
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
          applyDamageToEnemy(
            state,
            state.player.x,
            enemy,
            attackDamage,
            currentPlayerAttack.knockback,
            currentPlayerAttack.name,
          );
          state.player.attack.struckEnemyIds.push(enemy.id);
        }
      }
    }

    if (state.player.actionTimerMs === 0) {
      if (
        state.player.queuedAction === "attack" &&
        state.player.attack.attackChainIndex < 3
      ) {
        startPlayerAttack(
          state,
          state.player.attack.attackChainIndex === 1 ? "attack_2" : "attack_3",
        );
      } else {
        state.player.actionState = state.player.isMoving ? "walk" : "idle";
        state.player.queuedAction = null;
        state.player.actionTimerMs = 0;
        state.player.actionRecoveryMs = 0;
        state.player.attack.activeMs = 0;
        state.player.attack.currentAction = null;
        state.player.attack.queuedAction = null;
        state.player.attack.actionTimerMs = 0;
        state.player.attack.actionRecoveryMs = 0;
        state.player.attack.attackChainIndex = 0;
        state.player.attack.attackWindowMs = 0;
        state.player.attack.struckEnemyIds = [];
      }
    }
  }

  if (
    state.phase === "playing" &&
    state.input.attack &&
    state.player.attack.currentAction === null &&
    state.player.hurtCooldownMs === 0 &&
    state.player.actionState !== "dash" &&
    state.player.grabTargetId === null
  ) {
    startPlayerAttack(state, "attack_1");
  }

  for (const enemy of state.enemies) {
    updateEnemyAttack(state, enemy, dtMs);
  }

  updateEnemyProjectiles(state, dtMs);
  updateThrownEnemyCollisions(state);
}
