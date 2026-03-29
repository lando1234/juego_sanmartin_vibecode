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
    attackRange: template.attackRange,
    attackIntervalMs: template.attackCooldownMs,
    attackCooldownMs: 0,
    hurtCooldownMs: 0,
    facing: "left",
    state: "idle",
    isBoss: kind === "capo_pasillo",
  };
}
