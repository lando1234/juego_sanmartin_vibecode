import type { LevelBounds, LevelLayout } from "@/game/types/gameTypes";

export const VIEWPORT_WIDTH = 1280;
export const VIEWPORT_HEIGHT = 720;

export const levelCofradiaPasillo: LevelBounds = {
  width: 2400,
  depth: 320,
};

export const levelLayoutCofradiaPasillo: LevelLayout = {
  entryX: 180,
  wave1TriggerX: 760,
  gate1StartX: 820,
  gate1EndX: 1420,
  wave2TriggerX: 1550,
  gate2StartX: 1610,
  gate2EndX: 2050,
  bossTriggerX: 2110,
  bossGateStartX: 2160,
  bossGateEndX: 2310,
  exitTriggerX: 2080,
  exitX: 2260,
  wave1Spawns: [
    {
      kind: "bloqueador_puerta",
      x: 980,
      y: 64,
    },
    {
      kind: "empujador_hora_pico",
      x: 1180,
      y: 210,
    },
    {
      kind: "vendedor_relampago",
      x: 1320,
      y: 138,
    },
  ],
  wave2Spawns: [
    {
      kind: "empujador_hora_pico",
      x: 1700,
      y: 84,
    },
    {
      kind: "vendedor_relampago",
      x: 1840,
      y: 192,
    },
    {
      kind: "bloqueador_puerta",
      x: 1960,
      y: 132,
    },
  ],
  bossSpawn: {
    kind: "capo_pasillo",
    x: 2220,
    y: 130,
  },
};
