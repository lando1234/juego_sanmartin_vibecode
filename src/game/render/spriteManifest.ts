import type { SpriteAnimationState, SpriteAnimationCache, SpriteFrameSet } from "./spriteAnimation";

type SpriteManifestEntry = {
  id: string;
  role: "player" | "enemy" | "boss";
  notes: string;
  frames: SpriteFrameSet;
};

export const spriteManifest = {
  ricky: {
    id: "ricky",
    role: "player",
    notes: "Laburante común con mochila y camisa celeste.",
    frames: {
      idle: [
        "/sprites/characters/ricky/idle-01.png",
        "/sprites/characters/ricky/idle-02.png",
      ],
      walk: [
        "/sprites/characters/ricky/walk-01.png",
        "/sprites/characters/ricky/walk-02.png",
      ],
      attack: [
        "/sprites/characters/ricky/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/ricky/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/ricky/defeated-01.png",
      ],
    },
  },
  colado: {
    id: "colado",
    role: "enemy",
    notes: "Colado rápido, hombros tensos y actitud de choque.",
    frames: {
      idle: [
        "/sprites/characters/colado/idle-01.png",
        "/sprites/characters/colado/idle-02.png",
      ],
      walk: [
        "/sprites/characters/colado/walk-01.png",
        "/sprites/characters/colado/walk-02.png",
      ],
      attack: [
        "/sprites/characters/colado/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/colado/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/colado/defeated-01.png",
      ],
    },
  },
  durmiente: {
    id: "durmiente",
    role: "enemy",
    notes: "Durmiente torpe y pesado, medio caído sobre el pasillo.",
    frames: {
      idle: [
        "/sprites/characters/durmiente/idle-01.png",
        "/sprites/characters/durmiente/idle-02.png",
      ],
      walk: [
        "/sprites/characters/durmiente/walk-01.png",
        "/sprites/characters/durmiente/walk-02.png",
      ],
      attack: [
        "/sprites/characters/durmiente/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/durmiente/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/durmiente/defeated-01.png",
      ],
    },
  },
  mochilero: {
    id: "mochilero",
    role: "enemy",
    notes: "Mochilero ancho, toma espacio y gira con peso.",
    frames: {
      idle: [
        "/sprites/characters/mochilero/idle-01.png",
        "/sprites/characters/mochilero/idle-02.png",
      ],
      walk: [
        "/sprites/characters/mochilero/walk-01.png",
        "/sprites/characters/mochilero/walk-02.png",
      ],
      attack: [
        "/sprites/characters/mochilero/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/mochilero/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/mochilero/defeated-01.png",
      ],
    },
  },
  vendedorCompetencia: {
    id: "vendedor_competencia",
    role: "enemy",
    notes: "Vendedor rival, rápido y con ataque híbrido.",
    frames: {
      idle: [
        "/sprites/characters/vendedor_competencia/idle-01.png",
        "/sprites/characters/vendedor_competencia/idle-02.png",
      ],
      walk: [
        "/sprites/characters/vendedor_competencia/walk-01.png",
        "/sprites/characters/vendedor_competencia/walk-02.png",
      ],
      attack: [
        "/sprites/characters/vendedor_competencia/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/vendedor_competencia/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/vendedor_competencia/defeated-01.png",
      ],
    },
  },
  senoraBolsos: {
    id: "senora_bolsos",
    role: "enemy",
    notes: "Señora de bolsos pesados, controla zona alrededor.",
    frames: {
      idle: [
        "/sprites/characters/senora_bolsos/idle-01.png",
        "/sprites/characters/senora_bolsos/idle-02.png",
      ],
      walk: [
        "/sprites/characters/senora_bolsos/walk-01.png",
        "/sprites/characters/senora_bolsos/walk-02.png",
      ],
      attack: [
        "/sprites/characters/senora_bolsos/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/senora_bolsos/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/senora_bolsos/defeated-01.png",
      ],
    },
  },
  fisura: {
    id: "fisura",
    role: "enemy",
    notes: "Fisura errático, zigzaguea y cambia el ritmo.",
    frames: {
      idle: [
        "/sprites/characters/fisura/idle-01.png",
        "/sprites/characters/fisura/idle-02.png",
      ],
      walk: [
        "/sprites/characters/fisura/walk-01.png",
        "/sprites/characters/fisura/walk-02.png",
      ],
      attack: [
        "/sprites/characters/fisura/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/fisura/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/fisura/defeated-01.png",
      ],
    },
  },
  borracho: {
    id: "borracho",
    role: "boss",
    notes: "Mini boss de estación, pesado y caótico.",
    frames: {
      idle: [
        "/sprites/characters/borracho/idle-01.png",
        "/sprites/characters/borracho/idle-02.png",
      ],
      walk: [
        "/sprites/characters/borracho/walk-01.png",
        "/sprites/characters/borracho/walk-02.png",
      ],
      attack: [
        "/sprites/characters/borracho/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/borracho/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/borracho/defeated-01.png",
      ],
    },
  },
  bossFisuraBici: {
    id: "boss_fisura_bici",
    role: "boss",
    notes: "Boss final multi fase, mezcla bici, humo y furia.",
    frames: {
      idle: [
        "/sprites/characters/boss_fisura_bici/idle-01.png",
        "/sprites/characters/boss_fisura_bici/idle-02.png",
      ],
      walk: [
        "/sprites/characters/boss_fisura_bici/walk-01.png",
        "/sprites/characters/boss_fisura_bici/walk-02.png",
      ],
      attack: [
        "/sprites/characters/boss_fisura_bici/attack-01.png",
      ],
      hurt: [
        "/sprites/characters/boss_fisura_bici/hurt-01.png",
      ],
      defeated: [
        "/sprites/characters/boss_fisura_bici/defeated-01.png",
      ],
    },
  },
} satisfies Record<string, SpriteManifestEntry>;

export type SpriteAssetKey = keyof typeof spriteManifest;
export type SpriteCache = SpriteAnimationCache;

export function getSpriteFramesByCharacterId(characterId: string) {
  return Object.values(spriteManifest).find((asset) => asset.id === characterId)?.frames;
}

export function getSpriteFramePaths(characterId: string, state: SpriteAnimationState) {
  return getSpriteFramesByCharacterId(characterId)?.[state] ?? [];
}
