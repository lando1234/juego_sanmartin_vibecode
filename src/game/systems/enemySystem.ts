import { enemyAiRules, enemyHitboxTemplate } from "@/game/data/enemyCatalog";
import { clamp } from "@/lib/utils/clamp";
import type {
  ActiveEnemyAttackState,
  EnemyAttackDefinition,
  EnemyState,
  GameState,
} from "@/game/types/gameTypes";

function distanceToPlayer(enemy: EnemyState, state: GameState) {
  const playerCenterX = state.player.x + state.player.width / 2;
  const playerCenterY = state.player.y + state.player.depth / 2;
  const enemyCenterX = enemy.x + enemy.width / 2;
  const enemyCenterY = enemy.y + enemy.depth / 2;

  return {
    x: playerCenterX - enemyCenterX,
    y: playerCenterY - enemyCenterY,
    absoluteX: Math.abs(playerCenterX - enemyCenterX),
    absoluteY: Math.abs(playerCenterY - enemyCenterY),
    total: Math.hypot(playerCenterX - enemyCenterX, playerCenterY - enemyCenterY),
  };
}

function resolveSpeedMultiplier(enemy: EnemyState) {
  return enemy.modifiers.speedMultiplier ?? 1;
}

function applyEnemyPhases(enemy: EnemyState) {
  for (let index = enemy.phases.length - 1; index >= 0; index -= 1) {
    const phase = enemy.phases[index];
    if (
      typeof phase.triggerHpRatio === "number" &&
      enemy.hp / enemy.maxHp <= phase.triggerHpRatio &&
      enemy.phaseIndex < index
    ) {
      enemy.phaseIndex = index;
      enemy.modifiers = {
        ...enemy.modifiers,
        ...phase.modifiers,
        speedMultiplier:
          phase.buff?.speedMultiplier ?? phase.modifiers?.speedMultiplier ?? enemy.modifiers.speedMultiplier,
        damageMultiplier:
          phase.buff?.damageMultiplier ?? phase.modifiers?.damageMultiplier ?? enemy.modifiers.damageMultiplier,
      };
      return;
    }
  }
}

function getAvailableAttacks(enemy: EnemyState) {
  const phaseAttacks = enemy.phases[enemy.phaseIndex]?.attacks;
  return phaseAttacks && phaseAttacks.length > 0 ? phaseAttacks : enemy.attacks;
}

function chooseAttack(enemy: EnemyState, distanceX: number): EnemyAttackDefinition {
  const attacks = getAvailableAttacks(enemy);
  const closeRangeThreshold = Math.max(34, enemy.attackRange * 0.55);

  if (enemy.combatStyle === "melee") {
    return attacks.find((attack) => !attack.projectile) ?? attacks[0];
  }

  if (enemy.combatStyle === "ranged") {
    return attacks.find((attack) => attack.projectile) ?? attacks[0];
  }

  if (distanceX > closeRangeThreshold) {
    return attacks.find((attack) => attack.projectile) ?? attacks[0];
  }

  return attacks.find((attack) => !attack.projectile) ?? attacks[0];
}

function createEnemyAttackState(enemy: EnemyState, attack: EnemyAttackDefinition): ActiveEnemyAttackState {
  return {
    name: attack.name,
    timerMs: attack.startupMs + attack.activeMs + attack.recoveryMs,
    startupMs: attack.startupMs,
    activeMs: attack.activeMs,
    recoveryMs: attack.recoveryMs,
    damage: Math.round(attack.damage * (enemy.modifiers.damageMultiplier ?? 1)),
    knockback: attack.knockback ?? 0,
    range: Math.max(enemy.attackRange, attack.radius ?? 0),
    hitbox: {
      ...enemyHitboxTemplate,
      width: attack.aoe ? (attack.radius ?? 30) * 2 : enemyHitboxTemplate.width,
      height: attack.aoe ? (attack.radius ?? 30) * 1.8 : enemyHitboxTemplate.height,
    },
    projectile: attack.projectile ?? false,
    projectileSpeed: attack.speed ?? 0,
    aoe: attack.aoe ?? false,
    radius: attack.radius ?? null,
    effect: attack.effect ?? null,
    durationMs: attack.durationMs ?? null,
    hits: attack.hits ?? 1,
    damageApplied: false,
    projectileSpawned: false,
  };
}

function updateApproach(enemy: EnemyState, state: GameState, dt: number, targetX: number, targetY: number) {
  const speed = enemy.speed * resolveSpeedMultiplier(enemy);
  enemy.vx = clamp(targetX, -1, 1) * speed;
  enemy.vy = clamp(targetY, -1, 1) * speed * 0.55;

  if (enemy.modifiers.zigzagMovement) {
    enemy.vy += Math.sin((state.hud.elapsedMs + enemy.x) / 120) * 70;
  }

  if (enemy.modifiers.randomSpeed) {
    enemy.vx *= 0.78 + ((Math.sin((state.hud.elapsedMs + enemy.y) / 160) + 1) / 2) * 0.5;
  }

  enemy.x += enemy.vx * dt;
  enemy.y += enemy.vy * dt;
}

function updateCircle(enemy: EnemyState, state: GameState, dt: number, targetX: number, targetY: number) {
  const slotOffset = enemy.engagementSlot === "back" ? -64 : 64;
  const desiredX = state.player.x + slotOffset - enemy.x;
  const desiredY = targetY + (enemy.engagementSlot === "back" ? 26 : -26);
  const speed = enemy.speed * resolveSpeedMultiplier(enemy) * 0.82;

  enemy.vx = clamp(desiredX, -1, 1) * speed;
  enemy.vy = clamp(desiredY, -1, 1) * speed * 0.58;
  enemy.x += enemy.vx * dt;
  enemy.y += enemy.vy * dt;
}

export function updateEnemies(state: GameState, dtMs: number) {
  if (state.phase !== "playing") {
    return;
  }

  const dt = dtMs / 1000;
  const liveEnemies = state.enemies
    .filter((enemy) => enemy.hp > 0)
    .sort(
      (left, right) =>
        distanceToPlayer(left, state).total - distanceToPlayer(right, state).total,
    );
  const engagedIds = new Set(
    liveEnemies
      .slice(0, enemyAiRules.engagement.maxAttackers)
      .map((enemy) => enemy.id),
  );

  for (const [index, enemy] of liveEnemies.entries()) {
    enemy.engagementSlot = engagedIds.has(enemy.id)
      ? enemyAiRules.engagement.flankPositions[
          index % enemyAiRules.engagement.flankPositions.length
        ]
      : null;
  }

  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "defeated";
      enemy.activeAttack = null;
      continue;
    }

    applyEnemyPhases(enemy);

    const distance = distanceToPlayer(enemy, state);
    enemy.facing = distance.x >= 0 ? "right" : "left";

    if (enemy.hurtCooldownMs > 0) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "hurt";
      continue;
    }

    if (enemy.activeAttack) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = enemy.activeAttack.timerMs > enemy.activeAttack.recoveryMs ? "attack" : "recover";
      continue;
    }

    if (distance.absoluteX > enemy.aggroRange && enemy.behavior.pattern === "idle_block") {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "idle";
      continue;
    }

    const isClose = distance.absoluteX < enemyAiRules.distanceLogic.close;
    const isFar = distance.absoluteX > enemyAiRules.distanceLogic.far;
    const inAttackLane = distance.absoluteY <= 56;
    const canAttack =
      enemy.attackCooldownMs === 0 &&
      distance.absoluteX <= enemy.attackRange &&
      inAttackLane &&
      engagedIds.has(enemy.id);

    if (canAttack) {
      enemy.activeAttack = createEnemyAttackState(
        enemy,
        chooseAttack(enemy, distance.absoluteX),
      );
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "attack";
      continue;
    }

    if (enemy.behavior.pattern === "idle_block" && !isClose) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.state = "idle";
      continue;
    }

    if (isFar || enemy.behavior.pattern === "rush" || enemy.behavior.pattern === "tank_push") {
      enemy.state = "approach";
      updateApproach(enemy, state, dt, distance.x, distance.y);
    } else if (
      !engagedIds.has(enemy.id) ||
      enemy.behavior.pattern === "zone_control" ||
      enemy.behavior.pattern === "hybrid" ||
      (!isClose && !isFar)
    ) {
      enemy.state = "circle";
      updateCircle(enemy, state, dt, distance.x, distance.y);
    } else {
      enemy.state = "approach";
      updateApproach(enemy, state, dt, distance.x, distance.y);
    }

    enemy.x = clamp(enemy.x, 0, state.levelBounds.width - enemy.width);
    enemy.y = clamp(enemy.y, 0, state.levelBounds.depth - enemy.depth);
  }
}
