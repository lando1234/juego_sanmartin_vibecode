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
        "/sprites/characters/ricky/idle-01.svg",
        "/sprites/characters/ricky/idle-02.svg",
      ],
      walk: [
        "/sprites/characters/ricky/walk-01.svg",
        "/sprites/characters/ricky/walk-02.svg",
      ],
      attack: [
        "/sprites/characters/ricky/attack-01.svg",
      ],
      hurt: [
        "/sprites/characters/ricky/hurt-01.svg",
      ],
      defeated: [
        "/sprites/characters/ricky/defeated-01.svg",
      ],
    },
  },
  colado: {
    id: "colado",
    role: "enemy",
    notes: "Colado rápido, hombros tensos y actitud de choque.",
    frames: {
      idle: [
        "/sprites/characters/bloqueador-puerta/idle-01.svg",
        "/sprites/characters/bloqueador-puerta/idle-02.svg",
      ],
      walk: [
        "/sprites/characters/bloqueador-puerta/walk-01.svg",
        "/sprites/characters/bloqueador-puerta/walk-02.svg",
      ],
      attack: [
        "/sprites/characters/bloqueador-puerta/attack-01.svg",
      ],
      hurt: [
        "/sprites/characters/bloqueador-puerta/hurt-01.svg",
      ],
      defeated: [
        "/sprites/characters/bloqueador-puerta/defeated-01.svg",
      ],
    },
  },
  durmiente: {
    id: "durmiente",
    role: "enemy",
    notes: "Durmiente torpe y pesado, medio caído sobre el pasillo.",
    frames: {
      idle: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      walk: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      attack: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      hurt: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      defeated: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
    },
  },
  mochilero: {
    id: "mochilero",
    role: "enemy",
    notes: "Mochilero ancho, toma espacio y gira con peso.",
    frames: {
      idle: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      walk: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      attack: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      hurt: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      defeated: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
    },
  },
  vendedorCompetencia: {
    id: "vendedor_competencia",
    role: "enemy",
    notes: "Vendedor rival, rápido y con ataque híbrido.",
    frames: {
      idle: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      walk: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      attack: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      hurt: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
      defeated: [
        "/sprites/characters/vendedor-relampago.svg",
      ],
    },
  },
  senoraBolsos: {
    id: "senora_bolsos",
    role: "enemy",
    notes: "Señora de bolsos pesados, controla zona alrededor.",
    frames: {
      idle: [
        "/sprites/characters/bloqueador-puerta/idle-01.svg",
        "/sprites/characters/bloqueador-puerta/idle-02.svg",
      ],
      walk: [
        "/sprites/characters/bloqueador-puerta/walk-01.svg",
        "/sprites/characters/bloqueador-puerta/walk-02.svg",
      ],
      attack: [
        "/sprites/characters/bloqueador-puerta/attack-01.svg",
      ],
      hurt: [
        "/sprites/characters/bloqueador-puerta/hurt-01.svg",
      ],
      defeated: [
        "/sprites/characters/bloqueador-puerta/defeated-01.svg",
      ],
    },
  },
  fisura: {
    id: "fisura",
    role: "enemy",
    notes: "Fisura errático, zigzaguea y cambia el ritmo.",
    frames: {
      idle: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      walk: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      attack: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      hurt: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
      defeated: [
        "/sprites/characters/empujador-hora-pico.svg",
      ],
    },
  },
  borracho: {
    id: "borracho",
    role: "boss",
    notes: "Mini boss de estación, pesado y caótico.",
    frames: {
      idle: [
        "/sprites/characters/capo-del-pasillo/idle-01.svg",
        "/sprites/characters/capo-del-pasillo/idle-02.svg",
      ],
      walk: [
        "/sprites/characters/capo-del-pasillo/walk-01.svg",
        "/sprites/characters/capo-del-pasillo/walk-02.svg",
      ],
      attack: [
        "/sprites/characters/capo-del-pasillo/attack-01.svg",
      ],
      hurt: [
        "/sprites/characters/capo-del-pasillo/hurt-01.svg",
      ],
      defeated: [
        "/sprites/characters/capo-del-pasillo/defeated-01.svg",
      ],
    },
  },
  bossFisuraBici: {
    id: "boss_fisura_bici",
    role: "boss",
    notes: "Boss final multi fase, mezcla bici, humo y furia.",
    frames: {
      idle: [
        "/sprites/characters/capo-del-pasillo/idle-01.svg",
        "/sprites/characters/capo-del-pasillo/idle-02.svg",
      ],
      walk: [
        "/sprites/characters/capo-del-pasillo/walk-01.svg",
        "/sprites/characters/capo-del-pasillo/walk-02.svg",
      ],
      attack: [
        "/sprites/characters/capo-del-pasillo/attack-01.svg",
      ],
      hurt: [
        "/sprites/characters/capo-del-pasillo/hurt-01.svg",
      ],
      defeated: [
        "/sprites/characters/capo-del-pasillo/defeated-01.svg",
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
