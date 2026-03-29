import type { EnemyState, PlayerState } from "@/game/types/gameTypes";

export type SpriteAnimationState =
  | "idle"
  | "walk"
  | "block"
  | "attack"
  | "attack_telegraph"
  | "attack_2"
  | "attack_3"
  | "special"
  | "dash"
  | "grab"
  | "throw"
  | "guard"
  | "grabbed"
  | "stagger_heavy"
  | "hurt"
  | "defeated";

export type SpriteFrameSet = {
  idle: string[];
  walk: string[];
  block?: string[];
  attack: string[];
  attack_telegraph?: string[];
  attack_2?: string[];
  attack_3?: string[];
  special?: string[];
  dash?: string[];
  grab?: string[];
  throw?: string[];
  guard?: string[];
  grabbed?: string[];
  stagger_heavy?: string[];
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

  if (player.actionState === "attack_3") {
    return "attack_3";
  }

  if (player.actionState === "block") {
    return "block";
  }

  if (player.actionState === "attack_2") {
    return "attack_2";
  }

  if (player.actionState === "special") {
    return "special";
  }

  if (player.actionState === "dash") {
    return "dash";
  }

  if (player.actionState === "grab" || player.grabTargetId !== null) {
    return "grab";
  }

  if (player.actionState === "throw") {
    return "throw";
  }

  if (player.actionState === "attack_1" || player.attack.activeMs > 0) {
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

  if (
    enemy.activeAttack &&
    enemy.isBoss &&
    enemy.activeAttack.timerMs >
      enemy.activeAttack.activeMs + enemy.activeAttack.recoveryMs
  ) {
    return "attack_telegraph";
  }

  if (enemy.state === "grabbed") {
    return "grabbed";
  }

  if (
    enemy.state === "recover" &&
    enemy.intent === "hold" &&
    (enemy.modifiers.guardChance ?? 0) > 0
  ) {
    return "guard";
  }

  if (enemy.state === "attack") {
    return "attack";
  }

  if (enemy.state === "hurt") {
    if (
      enemy.isBoss ||
      enemy.role === "mini_boss" ||
      (enemy.modifiers.poiseHits ?? 0) >= 3
    ) {
      return "stagger_heavy";
    }

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
      state === "walk"
        ? 120
        : state === "block"
          ? 120
        : state === "attack" ||
            state === "attack_telegraph" ||
            state === "attack_2" ||
            state === "attack_3"
          ? 80
        : state === "dash"
            ? 70
            : state === "grab" ||
                state === "throw" ||
                state === "special" ||
                state === "guard" ||
                state === "grabbed" ||
                state === "stagger_heavy"
              ? 100
              : state === "hurt"
                ? 140
                : 220;
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
    case "block":
      transform.x += 6;
      transform.y += 6;
      transform.width *= 0.96;
      transform.height *= 0.97;
      transform.rotation = -0.02;
      break;
    case "attack":
      transform.x += 14;
      transform.y -= 4;
      transform.width *= 1.08;
      transform.height *= 1.04;
      transform.rotation = 0.08 + Math.sin(timeMs / 70) * 0.02;
      break;
    case "attack_telegraph":
      transform.x += 8;
      transform.y -= 6;
      transform.width *= 1.12;
      transform.height *= 1.06;
      transform.rotation = -0.08 + Math.sin(timeMs / 120) * 0.02;
      break;
    case "attack_2":
      transform.x += 18;
      transform.y -= 5;
      transform.width *= 1.1;
      transform.height *= 1.05;
      transform.rotation = 0.1 + Math.sin(timeMs / 65) * 0.025;
      break;
    case "attack_3":
      transform.x += 22;
      transform.y -= 8;
      transform.width *= 1.14;
      transform.height *= 1.08;
      transform.rotation = 0.14 + Math.sin(timeMs / 55) * 0.03;
      break;
    case "special":
      transform.x += 24;
      transform.y -= 10;
      transform.width *= 1.18;
      transform.height *= 1.12;
      transform.rotation = 0.16;
      break;
    case "dash":
      transform.x += Math.sin(timeMs / 45) * 3 + 10;
      transform.y -= 3;
      transform.width *= 1.06;
      transform.rotation = 0.04;
      transform.alpha = 0.94;
      break;
    case "grab":
      transform.x += 10;
      transform.y -= 4;
      transform.width *= 1.06;
      transform.height *= 1.02;
      transform.rotation = 0.05;
      break;
    case "throw":
      transform.x += 20;
      transform.y -= 6;
      transform.width *= 1.12;
      transform.height *= 1.06;
      transform.rotation = 0.12;
      break;
    case "guard":
      transform.y -= 2;
      transform.width *= 1.02;
      transform.rotation = -0.04;
      break;
    case "grabbed":
      transform.x -= 6;
      transform.y += 3;
      transform.width *= 0.98;
      transform.rotation = -0.08;
      break;
    case "stagger_heavy":
      transform.x -= 18;
      transform.y += 4;
      transform.width *= 1.04;
      transform.rotation = -0.18;
      transform.alpha = 0.88;
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
