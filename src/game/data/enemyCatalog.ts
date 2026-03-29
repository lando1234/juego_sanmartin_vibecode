import type {
  CombatStyle,
  EnemyAttackDefinition,
  EnemyBehaviorDefinition,
  EnemyKind,
  EnemyModifiers,
  EnemyPhaseDefinition,
  EnemyRole,
  HitboxState,
} from "@/game/types/gameTypes";

type EnemyDefinition = {
  name: string;
  role: EnemyRole;
  combatStyle: CombatStyle;
  width: number;
  depth: number;
  speed: number;
  hp: number;
  damage: number;
  behavior: EnemyBehaviorDefinition;
  attacks: EnemyAttackDefinition[];
  modifiers?: EnemyModifiers;
  phases?: EnemyPhaseDefinition[];
};

const FRAME_MS = 100;

function createAttack(
  definition: Omit<EnemyAttackDefinition, "startupMs" | "activeMs" | "recoveryMs"> & {
    startup?: number;
    active?: number;
    recovery?: number;
  },
): EnemyAttackDefinition {
  return {
    ...definition,
    startupMs: Math.round((definition.startup ?? 0.2) * 1000),
    activeMs: Math.round((definition.active ?? 0.3) * 1000),
    recoveryMs: Math.round((definition.recovery ?? 0.5) * 1000),
    durationMs: definition.durationMs
      ? Math.round(definition.durationMs * 1000)
      : undefined,
  };
}

export const enemyHitboxTemplate: HitboxState = {
  shape: "rectangle",
  width: 40,
  height: 30,
  offsetX: 20,
  offsetY: 10,
  activeFrames: [2, 3],
};

export const enemyAiRules = {
  engagement: {
    maxAttackers: 3,
    maxAttackersWhenPlayerCommitted: 4,
    flankPositions: ["front", "back"] as const,
  },
  distanceLogic: {
    far: 132,
    close: 52,
  },
  behaviorSwitch: {
    far: "approach",
    mid: "circle",
    close: "attack",
  },
};

export const enemyCatalog: Record<EnemyKind, EnemyDefinition> = {
  colado: {
    name: "Colado",
    role: "common",
    combatStyle: "melee",
    width: 68,
    depth: 30,
    speed: 240,
    hp: 64,
    damage: 9,
    behavior: {
      aggroRange: 164,
      attackRange: 30,
      pattern: "rush",
      cooldownMs: 760,
    },
    attacks: [
      createAttack({
        name: "push",
        damage: 8,
        knockback: 10,
        startup: 0.2,
        active: 0.3,
        recovery: 0.5,
      }),
    ],
    modifiers: {
      antiSpamBias: 1.2,
      preferredLaneOffset: 26,
    },
  },
  durmiente: {
    name: "Durmiente",
    role: "common",
    combatStyle: "melee",
    width: 78,
    depth: 34,
    speed: 88,
    hp: 108,
    damage: 12,
    behavior: {
      aggroRange: 104,
      attackRange: 28,
      pattern: "idle_block",
      cooldownMs: 1220,
    },
    attacks: [
      createAttack({ name: "headbutt", damage: 10, knockback: 15 }),
      createAttack({
        name: "fall",
        damage: 12,
        aoe: true,
        radius: 25,
        startup: 0.35,
        active: 0.35,
        recovery: 0.75,
      }),
    ],
    modifiers: {
      antiSpamBias: 0.95,
      preferredLaneOffset: -16,
      guardChance: 0.42,
    },
  },
  mochilero: {
    name: "Mochilero",
    role: "common",
    combatStyle: "melee",
    width: 84,
    depth: 36,
    speed: 132,
    hp: 134,
    damage: 14,
    behavior: {
      aggroRange: 136,
      attackRange: 38,
      pattern: "tank_push",
      cooldownMs: 980,
    },
    attacks: [
      createAttack({
        name: "backpack_spin",
        damage: 12,
        aoe: true,
        radius: 30,
        startup: 0.25,
        active: 0.35,
        recovery: 0.65,
      }),
    ],
    modifiers: {
      antiSpamBias: 1.22,
      preferredLaneOffset: 10,
      poiseHits: 3,
    },
  },
  vendedor_competencia: {
    name: "Vendedor de la Competencia",
    role: "special",
    combatStyle: "hybrid",
    width: 66,
    depth: 30,
    speed: 216,
    hp: 88,
    damage: 11,
    behavior: {
      aggroRange: 196,
      attackRange: 108,
      pattern: "hybrid",
      cooldownMs: 660,
    },
    attacks: [
      createAttack({
        name: "throw_item",
        damage: 8,
        projectile: true,
        speed: 6 * FRAME_MS,
        startup: 0.15,
        active: 0.2,
        recovery: 0.45,
      }),
      createAttack({
        name: "melee_combo",
        damage: 10,
        startup: 0.15,
        active: 0.2,
        recovery: 0.4,
      }),
    ],
    modifiers: {
      antiSpamBias: 1.5,
      preferredLaneOffset: 42,
    },
  },
  senora_bolsos: {
    name: "Señora de los Bolsos",
    role: "special",
    combatStyle: "hybrid",
    width: 82,
    depth: 38,
    speed: 104,
    hp: 112,
    damage: 15,
    behavior: {
      aggroRange: 142,
      attackRange: 58,
      pattern: "zone_control",
      cooldownMs: 1060,
    },
    attacks: [
      createAttack({
        name: "bag_swing",
        damage: 14,
        arc: 120,
        knockback: 14,
        startup: 0.2,
        active: 0.25,
        recovery: 0.6,
      }),
      createAttack({
        name: "drop_trap",
        damage: 6,
        aoe: true,
        radius: 58,
        durationMs: 5,
        startup: 0.35,
        active: 0.35,
        recovery: 0.8,
      }),
    ],
    modifiers: {
      antiSpamBias: 1.32,
      preferredLaneOffset: -34,
      guardChance: 0.3,
    },
  },
  fisura: {
    name: "Fisura",
    role: "special",
    combatStyle: "melee",
    width: 62,
    depth: 28,
    speed: 340,
    hp: 76,
    damage: 10,
    behavior: {
      aggroRange: 182,
      attackRange: 30,
      pattern: "erratic",
      cooldownMs: 470,
    },
    attacks: [
      createAttack({
        name: "random_hit",
        damage: 9,
        startup: 0.1,
        active: 0.2,
        recovery: 0.3,
      }),
      createAttack({
        name: "dash",
        damage: 6,
        speed: 8 * FRAME_MS,
        knockback: 8,
        startup: 0.1,
        active: 0.18,
        recovery: 0.35,
      }),
    ],
    modifiers: {
      zigzagMovement: true,
      randomSpeed: true,
      antiSpamBias: 1.6,
      preferredLaneOffset: 48,
    },
  },
  borracho: {
    name: "Borracho",
    role: "mini_boss",
    combatStyle: "melee",
    width: 96,
    depth: 44,
    speed: 176,
    hp: 230,
    damage: 20,
    behavior: {
      aggroRange: 200,
      attackRange: 46,
      pattern: "chaotic",
      cooldownMs: 620,
    },
    attacks: [
      createAttack({
        name: "heavy_swing",
        damage: 18,
        knockback: 20,
        startup: 0.25,
        active: 0.25,
        recovery: 0.6,
      }),
      createAttack({
        name: "fall_aoe",
        damage: 20,
        aoe: true,
        radius: 35,
        startup: 0.3,
        active: 0.25,
        recovery: 0.8,
      }),
    ],
    phases: [
      {
        name: "rage_drunk",
        triggerHpRatio: 0.5,
        buff: {
          speedMultiplier: 1.5,
          damageMultiplier: 1.2,
        },
        modifiers: {
          antiSpamBias: 1.45,
          poiseHits: 3,
        },
      },
    ],
    modifiers: {
      poiseHits: 3,
    },
  },
  boss_fisura_bici: {
    name: "Boss Fisura Bici",
    role: "boss",
    combatStyle: "hybrid",
    width: 112,
    depth: 50,
    speed: 252,
    hp: 560,
    damage: 22,
    behavior: {
      aggroRange: 264,
      attackRange: 84,
      pattern: "multi_phase",
      cooldownMs: 430,
    },
    attacks: [
      createAttack({
        name: "drive_by",
        damage: 15,
        projectile: true,
        speed: 7 * FRAME_MS,
        startup: 0.12,
        active: 0.16,
        recovery: 0.32,
      }),
      createAttack({
        name: "wheel_slam",
        damage: 18,
        aoe: true,
        radius: 30,
        startup: 0.22,
        active: 0.3,
        recovery: 0.6,
      }),
    ],
    phases: [
      {
        name: "bike_mode",
      },
      {
        name: "smoke_mode",
        triggerHpRatio: 0.6,
        attacks: [
          createAttack({
            name: "smoke_cloud",
            damage: 0,
            aoe: true,
            radius: 60,
            effect: "blind",
            durationMs: 3,
            startup: 0.2,
            active: 0.3,
            recovery: 0.6,
          }),
          createAttack({
            name: "confuse",
            damage: 0,
            projectile: true,
            speed: 5 * FRAME_MS,
            effect: "invert_controls",
            durationMs: 2,
            startup: 0.18,
            active: 0.2,
            recovery: 0.45,
          }),
        ],
      },
      {
        name: "rage_mode",
        triggerHpRatio: 0.3,
        attacks: [
          createAttack({
            name: "combo_fast",
            damage: 12,
            hits: 4,
            startup: 0.12,
            active: 0.2,
            recovery: 0.3,
          }),
          createAttack({
            name: "throw_object",
            damage: 10,
            projectile: true,
            speed: 6 * FRAME_MS,
            startup: 0.14,
            active: 0.18,
            recovery: 0.35,
          }),
        ],
        modifiers: {
          speedMultiplier: 1.5,
          aggression: 2.2,
          antiSpamBias: 1.7,
          poiseHits: 999,
        },
      },
    ],
    modifiers: {
      poiseHits: 999,
    },
  },
};
