import { enemyCatalog } from "@/game/data/enemyCatalog";
import type { EnemyKind, EnemyState } from "@/game/types/gameTypes";

let enemySeed = 0;

export function resetEnemySeed() {
  enemySeed = 0;
}

export function createEnemy(kind: EnemyKind, x: number, y: number): EnemyState {
  enemySeed += 1;
  const template = enemyCatalog[kind];

  return {
    id: `enemy-${enemySeed}`,
    kind,
    role: template.role,
    combatStyle: template.combatStyle,
    name: template.name,
    x,
    y,
    z: 0,
    vx: 0,
    vy: 0,
    width: template.width,
    depth: template.depth,
    speed: template.speed,
    hp: template.hp,
    maxHp: template.hp,
    damage: template.damage,
    aggroRange: template.behavior.aggroRange,
    attackRange: template.behavior.attackRange,
    attackIntervalMs: template.behavior.cooldownMs,
    attackCooldownMs: 0,
    hurtCooldownMs: 0,
    facing: "left",
    state: "idle",
    behavior: template.behavior,
    attacks: template.attacks,
    modifiers: template.modifiers ?? {},
    phases: template.phases ?? [],
    phaseIndex: 0,
    engagementSlot: null,
    intent: "hold",
    lastPlayerActionSeen: null,
    lastPlayerActionSeenMs: 0,
    activeAttack: null,
    thrownTimerMs: 0,
    thrownVx: 0,
    thrownVy: 0,
    isBoss: template.role === "boss",
  };
}
