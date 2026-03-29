import type { EnemyState, PlayerState } from "@/game/types/gameTypes";

export type SpriteAnimationState = "idle" | "walk" | "attack" | "hurt" | "defeated";

export type SpriteFrameSet = {
  idle: string[];
  walk: string[];
  attack: string[];
  hurt: string[];
  defeated: string[];
};

export type SpriteAnimationCache = Partial<
  Record<string, Partial<Record<SpriteAnimationState, CanvasImageSource[]>>>
>;

export type SpriteDrawTransform = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  alpha: number;
};

export function resolvePlayerSpriteState(player: PlayerState): SpriteAnimationState {
  if (player.hp <= 0) {
    return "defeated";
  }

  if (
    player.actionState === "attack_1" ||
    player.actionState === "attack_2" ||
    player.actionState === "attack_3" ||
    player.actionState === "special" ||
    player.actionState === "grab" ||
    player.actionState === "throw" ||
    player.attack.activeMs > 0
  ) {
    return "attack";
  }

  if (player.hurtCooldownMs > 0) {
    return "hurt";
  }

  if (player.isMoving) {
    return "walk";
  }

  return "idle";
}

export function resolveEnemySpriteState(enemy: EnemyState): SpriteAnimationState {
  if (enemy.hp <= 0 || enemy.state === "defeated") {
    return "defeated";
  }

  if (enemy.state === "attack") {
    return "attack";
  }

  if (enemy.state === "hurt") {
    return "hurt";
  }

  if (enemy.state === "approach" || enemy.state === "circle") {
    return "walk";
  }

  return "idle";
}

export function getAnimatedSpriteFrame(
  sprites: SpriteAnimationCache,
  characterId: string,
  state: SpriteAnimationState,
  timeMs: number,
) {
  const stateFrames = sprites[characterId]?.[state];

  if (stateFrames && stateFrames.length > 0) {
    const frameDurationMs =
      state === "walk" ? 120 : state === "attack" ? 80 : state === "hurt" ? 140 : 220;
    const frameIndex = Math.floor(timeMs / frameDurationMs) % stateFrames.length;

    return stateFrames[frameIndex];
  }

  return sprites[characterId]?.idle?.[0];
}

export function getSpriteTransform(
  state: SpriteAnimationState,
  timeMs: number,
  baseX: number,
  baseY: number,
  width: number,
  height: number,
) {
  const walkCycle = Math.sin(timeMs / 90);
  const idleCycle = Math.sin(timeMs / 240);

  const transform: SpriteDrawTransform = {
    x: baseX,
    y: baseY,
    width,
    height,
    rotation: 0,
    alpha: 1,
  };

  switch (state) {
    case "walk":
      transform.y += Math.abs(walkCycle) * 6 - 2;
      transform.x += walkCycle * 4;
      transform.rotation = walkCycle * 0.03;
      break;
    case "attack":
      transform.x += 14;
      transform.y -= 4;
      transform.width *= 1.08;
      transform.height *= 1.04;
      transform.rotation = 0.08 + Math.sin(timeMs / 70) * 0.02;
      break;
    case "hurt":
      transform.x -= 12;
      transform.y += 1;
      transform.width *= 0.98;
      transform.rotation = -0.12;
      transform.alpha = 0.9;
      break;
    case "defeated":
      transform.y += 22;
      transform.height *= 0.88;
      transform.rotation = 1.28;
      transform.alpha = 0.8;
      break;
    default:
      transform.y += Math.abs(idleCycle) * 3;
      transform.rotation = idleCycle * 0.015;
      break;
  }

  return transform;
}
