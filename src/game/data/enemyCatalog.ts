import type { EnemyKind } from "@/game/types/gameTypes";

export const enemyCatalog: Record<
  EnemyKind,
  {
    name: string;
    width: number;
    depth: number;
    speed: number;
    hp: number;
    damage: number;
    attackRange: number;
    attackCooldownMs: number;
  }
> = {
  bloqueador_puerta: {
    name: "Bloqueador de Puerta",
    width: 72,
    depth: 34,
    speed: 150,
    hp: 50,
    damage: 12,
    attackRange: 92,
    attackCooldownMs: 850,
  },
  empujador_hora_pico: {
    name: "Empujador de Hora Pico",
    width: 68,
    depth: 34,
    speed: 210,
    hp: 42,
    damage: 10,
    attackRange: 84,
    attackCooldownMs: 700,
  },
  vendedor_relampago: {
    name: "Vendedor Relampago",
    width: 64,
    depth: 30,
    speed: 240,
    hp: 36,
    damage: 8,
    attackRange: 76,
    attackCooldownMs: 620,
  },
  capo_pasillo: {
    name: "El Capo del Pasillo",
    width: 96,
    depth: 42,
    speed: 170,
    hp: 180,
    damage: 18,
    attackRange: 108,
    attackCooldownMs: 780,
  },
};
