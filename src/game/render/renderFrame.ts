import type { GameSnapshot } from "@/game/types/gameTypes";

import { drawEnemyCharacter, drawPlayerCharacter } from "./characterRenderer";
import type { SceneArtCache } from "./loadSceneArt";
import type { SpriteCache } from "./spriteManifest";
import {
  getAnimatedSpriteFrame,
  getSpriteTransform,
  resolveEnemySpriteState,
  resolvePlayerSpriteState,
} from "./spriteAnimation";

const LANE_TOP_Y = 168;
const LANE_DEPTH_SCALE = 0.8;

function toScreenDepth(worldY: number) {
  return LANE_TOP_Y + worldY * LANE_DEPTH_SCALE;
}

function getEnemySpriteMetrics(enemy: GameSnapshot["enemies"][number]) {
  switch (enemy.kind) {
    case "durmiente":
      return { offsetX: -24, offsetY: -66, width: 144, height: 204 };
    case "mochilero":
      return { offsetX: -30, offsetY: -74, width: 154, height: 216 };
    case "vendedor_competencia":
      return { offsetX: -20, offsetY: -68, width: 136, height: 192 };
    case "senora_bolsos":
      return { offsetX: -28, offsetY: -72, width: 150, height: 214 };
    case "fisura":
      return { offsetX: -18, offsetY: -64, width: 130, height: 188 };
    case "borracho":
      return { offsetX: -34, offsetY: -84, width: 182, height: 244 };
    case "boss_fisura_bici":
      return { offsetX: -48, offsetY: -102, width: 228, height: 292 };
    default:
      return enemy.isBoss
        ? { offsetX: -34, offsetY: -86, width: 176, height: 238 }
        : { offsetX: -22, offsetY: -68, width: 138, height: 196 };
  }
}

function drawSprite(
  context: CanvasRenderingContext2D,
  sprite: CanvasImageSource | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
  facing: "left" | "right",
  rotation = 0,
  alpha = 1,
) {
  if (!sprite) {
    return false;
  }

  context.save();
  context.globalAlpha = alpha;

  if (facing === "right") {
    context.translate(x + width / 2, y + height / 2);
    context.scale(-1, 1);
    context.rotate(rotation);
    context.drawImage(sprite, -width / 2, -height / 2, width, height);
  } else {
    context.translate(x + width / 2, y + height / 2);
    context.rotate(rotation);
    context.drawImage(sprite, -width / 2, -height / 2, width, height);
  }

  context.restore();
  return true;
}

function createGradientOrFallback(
  context: CanvasRenderingContext2D,
  kind: "linear" | "radial",
  args: number[],
  fallback: string,
) {
  if (kind === "radial" && typeof context.createRadialGradient === "function") {
    return context.createRadialGradient(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
    );
  }

  if (typeof context.createLinearGradient === "function") {
    return context.createLinearGradient(args[0], args[1], args[2], args[3]);
  }

  return {
    addColorStop: () => undefined,
    fallback,
  } as unknown as CanvasGradient;
}

function drawCombatBarrier(
  context: CanvasRenderingContext2D,
  x: number,
  canvasHeight: number,
  side: "left" | "right",
) {
  const barrierWidth = 28;
  const bodyX = side === "left" ? x - barrierWidth : x;
  const frameTop = 108;
  const frameHeight = canvasHeight - 210;

  const metalBody = createGradientOrFallback(
    context,
    "linear",
    [bodyX, frameTop, bodyX + barrierWidth, frameTop],
    "#5a4f4a",
  );
  metalBody.addColorStop(0, "#463a36");
  metalBody.addColorStop(0.52, "#7f6d62");
  metalBody.addColorStop(1, "#2e2826");
  context.fillStyle = metalBody;
  context.fillRect(bodyX, frameTop, barrierWidth, frameHeight);

  context.fillStyle = "rgba(255, 239, 210, 0.18)";
  context.fillRect(bodyX + (side === "left" ? 4 : 8), frameTop + 10, 4, frameHeight - 20);

  context.fillStyle = "rgba(37, 31, 28, 0.38)";
  context.fillRect(bodyX + (side === "left" ? barrierWidth - 6 : 0), frameTop, 6, frameHeight);

  context.fillStyle = "#5d4a2d";
  context.beginPath();
  context.roundRect(bodyX + 6, canvasHeight - 178, barrierWidth - 12, 42, 10);
  context.fill();

  context.strokeStyle = "rgba(255, 244, 214, 0.12)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(bodyX, 152);
  context.lineTo(bodyX + barrierWidth, 152);
  context.moveTo(bodyX, canvasHeight - 136);
  context.lineTo(bodyX + barrierWidth, canvasHeight - 136);
  context.stroke();
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drawImpactFlash(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  fill: string,
  stroke: string,
) {
  context.save();
  context.fillStyle = fill;
  context.beginPath();
  context.ellipse(centerX, centerY, radius * 1.18, radius * 0.8, 0, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = stroke;
  context.lineWidth = Math.max(2, radius * 0.12);
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function drawAttackTelegraph(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  facing: "left" | "right",
  width: number,
  height: number,
  progress: number,
  color: string,
) {
  const dir = facing === "right" ? 1 : -1;
  const reach = width * (0.5 + progress * 0.65);
  const arcHeight = height * (0.16 + progress * 0.12);
  const leadX = centerX + dir * (width * 0.24 + progress * width * 0.22);

  context.save();
  context.fillStyle = color;
  context.globalAlpha = 0.16 + progress * 0.18;
  context.beginPath();
  context.ellipse(leadX, centerY - 8, reach * 0.58, arcHeight * 1.25, 0, 0, Math.PI * 2);
  context.fill();

  context.globalAlpha = 0.42 + progress * 0.22;
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.beginPath();
  context.arc(leadX, centerY - 8, reach * 0.44, 0.92 * Math.PI, 1.95 * Math.PI);
  context.stroke();

  context.beginPath();
  context.moveTo(centerX + dir * 12, centerY + 2);
  context.lineTo(centerX + dir * (34 + progress * 24), centerY + 2);
  context.lineTo(centerX + dir * (20 + progress * 20), centerY - 12);
  context.moveTo(centerX + dir * (34 + progress * 24), centerY + 2);
  context.lineTo(centerX + dir * (20 + progress * 20), centerY + 16);
  context.stroke();
  context.restore();
}

function drawHazardTelegraph(
  context: CanvasRenderingContext2D,
  sceneArt: SceneArtCache,
  type: GameSnapshot["scene"]["activeHazards"][number]["type"],
  x: number,
  y: number,
  width: number,
  height: number,
  active: boolean,
  timeMs: number,
) {
  const hazardSprite = sceneArt.hazards[type] ?? null;
  context.save();

  if (hazardSprite) {
    const spriteY =
      type === "sudden_brake"
        ? y - 24
        : type === "seat_block" || type === "floor_clutter"
          ? y + height * 0.18
          : y - 10;
    const spriteHeight =
      type === "sudden_brake"
        ? height + 48
        : type === "seat_block" || type === "floor_clutter"
          ? Math.max(46, height * 0.84)
          : height + 20;
    context.globalAlpha = active ? 0.88 : 0.5;
    context.drawImage(hazardSprite, x, spriteY, width, spriteHeight);
    context.restore();
    return;
  }

  if (type === "door_slam") {
    const pulse = 0.5 + Math.sin(timeMs / 120) * 0.5;
    context.fillStyle = active ? "rgba(222, 78, 56, 0.2)" : "rgba(255, 206, 123, 0.12)";
    context.fillRect(x, y - 18, width, height + 36);
    context.fillStyle = active ? "rgba(255, 156, 117, 0.2)" : "rgba(255, 236, 190, 0.1)";
    for (let index = 0; index < 6; index += 1) {
      context.fillRect(x + index * (width / 6), y - 12, width / 12, height + 24);
    }
    context.strokeStyle = active ? "rgba(255, 213, 180, 0.58)" : "rgba(255, 232, 189, 0.42)";
    context.lineWidth = 3;
    context.strokeRect(x + 2, y - 10, width - 4, height + 20);
    context.beginPath();
    context.arc(x + width / 2, y + height / 2, 18 + pulse * 4, 0, Math.PI * 2);
    context.stroke();
    context.restore();
    return;
  }

  if (type === "sudden_brake") {
    context.strokeStyle = active ? "rgba(255, 241, 206, 0.24)" : "rgba(255, 235, 198, 0.14)";
    context.lineWidth = active ? 4 : 2;
    for (let index = -1; index < 6; index += 1) {
      const startX = x + index * 120 + ((timeMs / 5) % 80);
      context.beginPath();
      context.moveTo(startX, y - 10);
      context.lineTo(startX + 84, y + height + 10);
      context.stroke();
    }
    context.fillStyle = active ? "rgba(255, 173, 107, 0.08)" : "rgba(255, 223, 165, 0.06)";
    context.fillRect(x, y, width, height);
    context.restore();
    return;
  }

  if (type === "passenger_push") {
    context.fillStyle = active ? "rgba(91, 138, 202, 0.18)" : "rgba(91, 138, 202, 0.1)";
    context.fillRect(x, y, width, height);
    context.strokeStyle = "rgba(189, 224, 255, 0.32)";
    context.lineWidth = 2;
    for (let offset = 20; offset < width; offset += 72) {
      context.beginPath();
      context.moveTo(x + offset, y + height / 2);
      context.lineTo(x + offset + 22, y + height / 2);
      context.lineTo(x + offset + 12, y + height / 2 - 11);
      context.moveTo(x + offset + 22, y + height / 2);
      context.lineTo(x + offset + 12, y + height / 2 + 11);
      context.stroke();
    }
    context.beginPath();
    context.moveTo(x + 12, y + 10);
    context.lineTo(x + 34, y + 22);
    context.lineTo(x + 12, y + 34);
    context.stroke();
    context.beginPath();
    context.moveTo(x + width - 12, y + 10);
    context.lineTo(x + width - 34, y + 22);
    context.lineTo(x + width - 12, y + 34);
    context.stroke();
    context.restore();
    return;
  }

  if (type === "floor_clutter") {
    context.fillStyle = active ? "rgba(140, 117, 80, 0.12)" : "rgba(140, 117, 80, 0.08)";
    context.fillRect(x, y, width, height);
    context.strokeStyle = "rgba(255, 232, 189, 0.24)";
    context.lineWidth = 2;
    context.strokeRect(x + 4, y + 4, width - 8, height - 8);
    context.fillStyle = "rgba(255, 220, 146, 0.22)";
    for (let index = 0; index < 5; index += 1) {
      const dotX = x + 18 + index * (width / 6);
      const dotY = y + 16 + ((index % 2) * 10);
      context.beginPath();
      context.arc(dotX, dotY, 4 + (index % 3), 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
    return;
  }

  context.fillStyle = active ? "rgba(109, 91, 130, 0.12)" : "rgba(109, 91, 130, 0.08)";
  context.fillRect(x, y, width, height);
  context.strokeStyle = "rgba(228, 214, 244, 0.24)";
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(x + 6, y + height * 0.22, width - 12, height * 0.58, 10);
  context.stroke();
  context.beginPath();
  context.moveTo(x + width * 0.2, y + height * 0.2);
  context.lineTo(x + width * 0.8, y + height * 0.2);
  context.stroke();

  context.restore();
}

export function renderFrame(
  context: CanvasRenderingContext2D,
  snapshot: GameSnapshot,
  sprites: SpriteCache = {},
  sceneArt: SceneArtCache = { background: null, items: {}, hazards: {} },
) {
  const { canvas } = context;
  const timeMs = snapshot.hud.elapsedMs;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const background = context.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, "#c9934f");
  background.addColorStop(0.34, "#9a6a45");
  background.addColorStop(0.68, "#61453c");
  background.addColorStop(1, "#312722");
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const topGlow = createGradientOrFallback(
    context,
    "radial",
    [
      canvas.width * 0.55,
      canvas.height * 0.08,
      60,
      canvas.width * 0.55,
      canvas.height * 0.08,
      canvas.width * 0.82,
    ],
    "rgba(255, 207, 140, 0)",
  );
  topGlow.addColorStop(0, "rgba(255, 242, 212, 0.34)");
  topGlow.addColorStop(0.45, "rgba(255, 207, 140, 0.14)");
  topGlow.addColorStop(1, "rgba(255, 207, 140, 0)");
  context.fillStyle = topGlow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const vignette = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0.18)");
  vignette.addColorStop(0.46, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.3)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#262a31";
  context.fillRect(0, canvas.height - 88, canvas.width, 88);

  if (sceneArt.background) {
    context.drawImage(sceneArt.background, 44, 90, canvas.width - 88, canvas.height - 192);
  } else {
    const carriage = createGradientOrFallback(
      context,
      "linear",
      [0, 96, 0, canvas.height - 110],
      "#b58f69",
    );
    carriage.addColorStop(0, "#d7b38a");
    carriage.addColorStop(0.56, "#b58f69");
    carriage.addColorStop(1, "#8a6d55");
    context.fillStyle = carriage;
    context.fillRect(44, 90, canvas.width - 88, canvas.height - 192);

    context.fillStyle = "#515b66";
    context.fillRect(82, 118, canvas.width - 164, 46);

    context.strokeStyle = "rgba(255, 244, 214, 0.18)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(92, 118);
    context.lineTo(canvas.width - 92, 118);
    context.stroke();
    context.beginPath();
    context.moveTo(92, 164);
    context.lineTo(canvas.width - 92, 164);
    context.stroke();

    context.fillStyle = "rgba(255, 236, 190, 0.32)";
    for (let index = 0; index < 5; index += 1) {
      const windowX = 120 + index * 220;
      context.beginPath();
      context.roundRect(windowX, 148, 148, 88, 18);
      context.fill();

      const sceneryOffset = (snapshot.camera.x * 0.14 + index * 56) % 180;
      context.fillStyle = "rgba(84, 120, 130, 0.2)";
      context.fillRect(windowX + 18 - sceneryOffset, 164, 76, 42);
      context.fillRect(windowX + 122 - sceneryOffset, 172, 52, 28);
      context.fillStyle = "rgba(255, 236, 190, 0.32)";
    }

    context.fillStyle = "rgba(49, 41, 34, 0.22)";
    for (let index = 0; index < 6; index += 1) {
      context.fillRect(104 + index * 186, 120, 10, canvas.height - 206);
    }

    context.fillStyle = "#7c4f2a";
    for (let index = 0; index < 4; index += 1) {
      const benchX = 138 + index * 255;
      context.beginPath();
      context.roundRect(benchX, canvas.height - 170, 168, 38, 12);
      context.fill();
    }

    context.strokeStyle = "rgba(53, 58, 64, 0.55)";
    context.lineWidth = 4;
    for (let index = 0; index < 6; index += 1) {
      const handleX = 152 + index * 180;
      context.beginPath();
      context.moveTo(handleX, 72);
      context.lineTo(handleX, 134);
      context.stroke();
      context.beginPath();
      context.ellipse(handleX, 146, 14, 10, 0, 0, Math.PI * 2);
      context.stroke();
    }

    context.strokeStyle = "rgba(255, 255, 255, 0.12)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(86, canvas.height - 114);
    context.lineTo(canvas.width - 86, canvas.height - 114);
    context.stroke();
    context.beginPath();
    context.moveTo(canvas.width * 0.5, 116);
    context.lineTo(canvas.width * 0.5, canvas.height - 118);
    context.stroke();
  }

  for (const item of snapshot.items) {
    if (item.collected) {
      continue;
    }

    const itemX = item.x - snapshot.camera.x;
    const itemY = toScreenDepth(item.y) + 12;
    const playerCenterX = snapshot.player.x + snapshot.player.width / 2 - snapshot.camera.x;
    const playerCenterY =
      toScreenDepth(snapshot.player.y) + snapshot.player.depth / 2;
    const itemCenterX = itemX + item.width / 2;
    const itemCenterY = itemY + item.depth / 2;
    const dx = playerCenterX - itemCenterX;
    const dy = playerCenterY - itemCenterY;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const magnetStrength = Math.max(0, 1 - distance / 132);
    const bob = Math.sin((timeMs + item.x * 3) / 260) * 3;
    const glowColor =
      item.kind === "mate_listo"
        ? "rgba(117, 168, 96, 0.42)"
        : item.kind === "tortita_negra"
          ? "rgba(91, 54, 29, 0.38)"
          : item.kind === "sube_cargada"
            ? "rgba(88, 137, 216, 0.38)"
            : "rgba(95, 88, 110, 0.4)";

    context.fillStyle = glowColor;
    context.beginPath();
    context.ellipse(
      itemCenterX,
      itemCenterY + item.depth + 14 + bob,
      item.width * (0.68 + magnetStrength * 0.18),
      item.depth * (0.55 + magnetStrength * 0.22),
      0,
      0,
      Math.PI * 2,
    );
    context.fill();

    if (magnetStrength > 0) {
      context.strokeStyle =
        item.kind === "mate_listo"
          ? "rgba(131, 191, 98, 0.34)"
          : item.kind === "tortita_negra"
            ? "rgba(110, 76, 45, 0.3)"
            : item.kind === "sube_cargada"
              ? "rgba(104, 158, 232, 0.3)"
              : "rgba(145, 133, 174, 0.3)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(itemCenterX, itemCenterY + bob, item.width * (0.72 + magnetStrength * 0.3), 0, Math.PI * 2);
      context.stroke();
    }

    const itemSprite = sceneArt.items[item.kind];

    if (itemSprite) {
      const spriteSize = item.kind === "paraguas_fierro" ? 56 : 48;
      context.drawImage(
        itemSprite,
        itemCenterX - spriteSize / 2,
        itemY - 2 + bob,
        spriteSize,
        spriteSize,
      );
    } else if (item.kind === "mate_listo") {
      context.fillStyle = "#6d8b46";
      context.beginPath();
      context.roundRect(itemX + 8, itemY + 6 + bob, 24, 30, 10);
      context.fill();
      context.fillStyle = "#d8e3a1";
      context.fillRect(itemX + 27, itemY - 2 + bob, 4, 18);
    } else if (item.kind === "tortita_negra") {
      context.fillStyle = "#4e2f20";
      context.beginPath();
      context.roundRect(itemX + 4, itemY + 14 + bob, 34, 18, 8);
      context.fill();
      context.fillStyle = "#29170f";
      context.fillRect(itemX + 8, itemY + 10 + bob, 26, 8);
    } else if (item.kind === "sube_cargada") {
      context.fillStyle = "#2f5dab";
      context.beginPath();
      context.roundRect(itemX + 4, itemY + 10 + bob, 36, 24, 8);
      context.fill();
      context.fillStyle = "#eef4ff";
      context.fillRect(itemX + 10, itemY + 18 + bob, 20, 4);
    } else {
      context.fillStyle = "#4f465c";
      context.beginPath();
      context.roundRect(itemX + 8, itemY + 6 + bob, 16, 34, 8);
      context.fill();
      context.fillRect(itemX + 22, itemY + 6 + bob, 4, 32);
      context.fillRect(itemX + 26, itemY + 6 + bob, 6, 10);
    }
  }

  for (const hazard of snapshot.scene.activeHazards) {
    const hazardX = hazard.x - snapshot.camera.x;
    const hazardY = toScreenDepth(hazard.y);
    const hazardHeight = hazard.depth * LANE_DEPTH_SCALE;
    drawHazardTelegraph(
      context,
      sceneArt,
      hazard.type,
      hazardX,
      hazardY - 10,
      hazard.width,
      hazardHeight + 20,
      hazard.active,
      timeMs,
    );
  }

  const gateStartSource = snapshot.scene.type === "boss_combat"
    ? snapshot.levelLayout.bossGateStartX
    : snapshot.scene.waveIndex === 2
      ? snapshot.levelLayout.gate2StartX
      : snapshot.levelLayout.gate1StartX;
  const gateEndSource = snapshot.scene.gateRightX ?? gateStartSource;
  const gateStart = gateStartSource - snapshot.camera.x;
  const gateEnd = gateEndSource - snapshot.camera.x;

  if (snapshot.scene.gateClosed && gateEnd > gateStart) {
    context.fillStyle = "rgba(32, 22, 18, 0.12)";
    context.fillRect(gateStart, 108, gateEnd - gateStart, canvas.height - 210);
    drawCombatBarrier(context, gateStart, canvas.height, "left");
    drawCombatBarrier(context, gateEnd, canvas.height, "right");
  }

  const floorY = canvas.height - 112;
  context.fillStyle = "rgba(19, 20, 23, 0.22)";
  context.fillRect(52, floorY - 6, canvas.width - 104, 18);
  context.fillStyle = "rgba(255, 236, 190, 0.08)";
  context.fillRect(58, floorY - 2, canvas.width - 116, 4);

  if (snapshot.scene.activeHazards.some((hazard) => hazard.type === "sudden_brake" && hazard.active)) {
    context.strokeStyle = "rgba(255, 240, 210, 0.12)";
    context.lineWidth = 4;
    for (let index = -1; index < 6; index += 1) {
      const startX = index * 260 + ((timeMs / 6) % 90);
      context.beginPath();
      context.moveTo(startX, 104);
      context.lineTo(startX + 120, canvas.height - 124);
      context.stroke();
    }
  }

  for (const enemy of snapshot.enemies) {
    if (enemy.hp <= 0) {
      continue;
    }

    const enemyVisibleX = enemy.x - snapshot.camera.x;
    const enemyVisibleY = toScreenDepth(enemy.y);
    const enemyMetrics = getEnemySpriteMetrics(enemy);
    const enemyCenterX = enemyVisibleX + enemy.width / 2;
    const enemyCenterY = enemyVisibleY - 12 + enemy.depth / 2;

    context.fillStyle = "rgba(20, 17, 10, 0.25)";
    context.beginPath();
    context.ellipse(
      enemyCenterX,
      floorY + enemy.depth / 2,
      enemy.width / 2,
      enemy.depth / 2.3,
      0,
      0,
      Math.PI * 2,
    );
    context.fill();

    if (enemy.activeAttack) {
      const attackProgress =
        enemy.activeAttack.timerMs <= enemy.activeAttack.startupMs
          ? clamp(1 - enemy.activeAttack.timerMs / Math.max(1, enemy.activeAttack.startupMs), 0, 1)
          : 1;
      const telegraphColor =
        enemy.activeAttack.effect === "blind"
          ? "rgba(100, 198, 224, 0.85)"
          : enemy.activeAttack.effect === "invert_controls"
            ? "rgba(170, 132, 244, 0.85)"
            : enemy.isBoss
              ? "rgba(255, 180, 118, 0.9)"
              : "rgba(255, 203, 112, 0.86)";
      drawAttackTelegraph(
        context,
        enemyCenterX,
        enemyCenterY,
        enemy.facing,
        enemyMetrics.width,
        enemyMetrics.height,
        attackProgress,
        telegraphColor,
      );
      if (enemy.activeAttack.timerMs > enemy.activeAttack.startupMs) {
        drawImpactFlash(
          context,
          enemyCenterX,
          enemyCenterY,
          enemy.isBoss ? 32 : 22,
          "rgba(255, 183, 104, 0.14)",
          "rgba(255, 227, 170, 0.35)",
        );
      }
    } else if (enemy.modifiers.guardChance && enemy.state !== "hurt" && enemy.state !== "defeated") {
      drawImpactFlash(
        context,
        enemyCenterX,
        enemyCenterY,
        enemy.isBoss ? 28 : 20,
        "rgba(120, 176, 230, 0.08)",
        "rgba(182, 219, 255, 0.2)",
      );
    }

    if (enemy.hurtCooldownMs > 0) {
      drawImpactFlash(
        context,
        enemyCenterX,
        enemyCenterY,
        enemy.isBoss ? 24 : 16,
        "rgba(255, 173, 103, 0.16)",
        "rgba(255, 221, 185, 0.28)",
      );
    }

    const enemySpriteState = resolveEnemySpriteState(enemy);
    const enemyTransform = getSpriteTransform(
      enemySpriteState,
      timeMs + enemy.x,
      enemyVisibleX + enemyMetrics.offsetX,
      enemyVisibleY + enemyMetrics.offsetY,
      enemyMetrics.width,
      enemyMetrics.height,
    );

    const drewEnemySprite = drawSprite(
      context,
      getAnimatedSpriteFrame(sprites, enemy.kind, enemySpriteState, timeMs + enemy.x),
      enemyTransform.x,
      enemyTransform.y,
      enemyTransform.width,
      enemyTransform.height,
      enemy.facing,
      enemyTransform.rotation,
      enemyTransform.alpha,
    );

    if (!drewEnemySprite) {
      drawEnemyCharacter(context, enemy, enemyVisibleX, enemyVisibleY - 12, timeMs);
    }
  }

  for (const projectile of snapshot.projectiles) {
    const projectileX = projectile.x - snapshot.camera.x;
    const projectileY = toScreenDepth(projectile.y) + 4;
    context.fillStyle = projectile.color;
    context.beginPath();
    context.roundRect(projectileX, projectileY, projectile.width, projectile.height, 8);
    context.fill();
  }

  const visibleX = snapshot.player.x - snapshot.camera.x;
  const visibleY = toScreenDepth(snapshot.player.y);
  const playerCenterX = visibleX + snapshot.player.width / 2;
  const playerCenterY = visibleY - snapshot.player.z + snapshot.player.depth / 2;
  const playerSpriteState = resolvePlayerSpriteState(snapshot.player);
  const playerTransform = getSpriteTransform(
    playerSpriteState,
    timeMs,
    visibleX - 22,
    visibleY - snapshot.player.z - 68,
    132,
    194,
  );

  context.fillStyle = "rgba(20, 17, 10, 0.25)";
  context.beginPath();
  context.ellipse(
    playerCenterX,
    floorY + snapshot.player.depth / 2,
    snapshot.player.width / 2,
    snapshot.player.depth / 2.2,
    0,
    0,
    Math.PI * 2,
  );
  context.fill();

  const drewPlayerSprite = drawSprite(
    context,
    getAnimatedSpriteFrame(
      sprites,
      snapshot.player.id,
      playerSpriteState,
      timeMs,
    ),
    playerTransform.x,
    playerTransform.y,
    playerTransform.width,
    playerTransform.height,
    snapshot.player.facing,
    playerTransform.rotation,
    playerTransform.alpha,
  );

  if (!drewPlayerSprite) {
    drawPlayerCharacter(
      context,
      snapshot.player,
      visibleX,
      visibleY - snapshot.player.z - 12,
      timeMs,
    );
  }

  if (snapshot.player.attack.currentAction === "special" || snapshot.player.shieldMs > 0) {
    drawImpactFlash(
      context,
      playerCenterX,
      playerCenterY,
      snapshot.player.width * 0.5,
      snapshot.player.attack.currentAction === "special"
        ? "rgba(255, 187, 104, 0.18)"
        : "rgba(131, 190, 255, 0.14)",
      snapshot.player.attack.currentAction === "special"
        ? "rgba(255, 233, 183, 0.32)"
        : "rgba(191, 226, 255, 0.28)",
    );
  }

  if (snapshot.player.grabTargetId) {
    const grabbedEnemy = snapshot.enemies.find(
      (enemy) => enemy.id === snapshot.player.grabTargetId && enemy.hp > 0,
    );
    if (grabbedEnemy) {
      const grabbedCenterX = grabbedEnemy.x - snapshot.camera.x + grabbedEnemy.width / 2;
      const grabbedCenterY = toScreenDepth(grabbedEnemy.y) - 12 + grabbedEnemy.depth / 2;
      context.strokeStyle = "rgba(255, 211, 139, 0.46)";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(playerCenterX, playerCenterY - 8);
      context.lineTo(grabbedCenterX, grabbedCenterY - 4);
      context.stroke();
      drawImpactFlash(
        context,
        grabbedCenterX,
        grabbedCenterY,
        grabbedEnemy.isBoss ? 24 : 18,
        "rgba(255, 198, 127, 0.14)",
        "rgba(255, 239, 198, 0.32)",
      );
    }
  }

  if (snapshot.player.hurtCooldownMs > 0) {
    drawImpactFlash(
      context,
      playerCenterX,
      playerCenterY,
      snapshot.player.width * 0.44,
      "rgba(255, 106, 72, 0.12)",
      "rgba(255, 211, 195, 0.24)",
    );
  }

  const lightBand = createGradientOrFallback(
    context,
    "linear",
    [0, 0, canvas.width, 0],
    "rgba(255, 248, 228, 0.11)",
  );
  lightBand.addColorStop(0, "rgba(255, 255, 255, 0.03)");
  lightBand.addColorStop(0.5, "rgba(255, 248, 228, 0.11)");
  lightBand.addColorStop(1, "rgba(255, 255, 255, 0.03)");
  context.fillStyle = lightBand;
  context.fillRect(62, 126, canvas.width - 124, 28);

  if (snapshot.player.blindMs > 0) {
    context.fillStyle = "rgba(214, 221, 224, 0.22)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.fillStyle = "#ffffff";
  context.font = "600 24px sans-serif";
  context.fillText(snapshot.hud.levelName, 48, 48);
}
