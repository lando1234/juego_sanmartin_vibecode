import type { GameSnapshot } from "@/game/types/gameTypes";

import { drawEnemyCharacter, drawPlayerCharacter } from "./characterRenderer";
import type { SpriteCache } from "./spriteManifest";
import {
  getAnimatedSpriteFrame,
  getSpriteTransform,
  resolveEnemySpriteState,
  resolvePlayerSpriteState,
} from "./spriteAnimation";

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

  if (facing === "left") {
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

export function renderFrame(
  context: CanvasRenderingContext2D,
  snapshot: GameSnapshot,
  sprites: SpriteCache = {},
) {
  const { canvas } = context;
  const timeMs = snapshot.hud.elapsedMs;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const background = context.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, "#b47a3a");
  background.addColorStop(0.45, "#8a6242");
  background.addColorStop(1, "#4d3b35");
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const vignette = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0.14)");
  vignette.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.22)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#2b3138";
  context.fillRect(0, canvas.height - 84, canvas.width, 84);

  context.fillStyle = "#bea282";
  context.fillRect(48, 88, canvas.width - 96, canvas.height - 184);

  context.fillStyle = "#59646e";
  context.fillRect(86, 120, canvas.width - 172, 44);

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

  context.fillStyle = "rgba(49, 41, 34, 0.18)";
  for (let index = 0; index < 6; index += 1) {
    context.fillRect(104 + index * 186, 120, 10, canvas.height - 206);
  }

  context.fillStyle = "#8d5a31";
  for (let index = 0; index < 4; index += 1) {
    const benchX = 138 + index * 255;
    context.beginPath();
    context.roundRect(benchX, canvas.height - 170, 168, 38, 12);
    context.fill();
  }

  context.strokeStyle = "rgba(53, 58, 64, 0.45)";
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

  for (const item of snapshot.items) {
    if (item.collected) {
      continue;
    }

    const itemX = item.x - snapshot.camera.x;
    const itemY = 152 + item.y;
    const playerCenterX = snapshot.player.x + snapshot.player.width / 2 - snapshot.camera.x;
    const playerCenterY = 152 + snapshot.player.y + snapshot.player.depth / 2;
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

    if (item.kind === "mate_listo") {
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

  const gateStartSource = snapshot.scene.type === "boss_combat"
    ? snapshot.levelLayout.bossGateStartX
    : snapshot.scene.waveIndex === 2
      ? snapshot.levelLayout.gate2StartX
      : snapshot.levelLayout.gate1StartX;
  const gateEndSource = snapshot.scene.gateRightX ?? gateStartSource;
  const gateStart = gateStartSource - snapshot.camera.x;
  const gateEnd = gateEndSource - snapshot.camera.x;

  if (snapshot.scene.gateClosed && gateEnd > gateStart) {
    context.fillStyle = "rgba(122, 30, 16, 0.55)";
    context.fillRect(gateStart, 108, gateEnd - gateStart, canvas.height - 210);
  }

  const floorY = canvas.height - 112;
  for (const enemy of snapshot.enemies) {
    if (enemy.hp <= 0) {
      continue;
    }

    const enemyVisibleX = enemy.x - snapshot.camera.x;
    const enemyVisibleY = 140 + enemy.y;

    context.fillStyle = "rgba(20, 17, 10, 0.25)";
    context.beginPath();
    context.ellipse(
      enemyVisibleX + enemy.width / 2,
      floorY + enemy.depth / 2,
      enemy.width / 2,
      enemy.depth / 2.3,
      0,
      0,
      Math.PI * 2,
    );
    context.fill();

    const enemySpriteState = resolveEnemySpriteState(enemy);
    const enemyTransform = getSpriteTransform(
      enemySpriteState,
      timeMs + enemy.x,
      enemyVisibleX - (enemy.isBoss ? 24 : 18),
      enemyVisibleY - (enemy.isBoss ? 70 : 58),
      enemy.isBoss ? 160 : 124,
      enemy.isBoss ? 214 : 178,
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

    if (enemy.hurtCooldownMs > 0) {
      context.fillStyle = "rgba(255, 235, 145, 0.4)";
      context.beginPath();
      context.ellipse(
        enemyVisibleX + enemy.width / 2,
        enemyVisibleY + 26,
        enemy.width * 0.8,
        enemy.isBoss ? 78 : 62,
        0,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
  }

  const visibleX = snapshot.player.x - snapshot.camera.x;
  const visibleY = 140 + snapshot.player.y;
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
    visibleX + snapshot.player.width / 2,
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

  if (snapshot.player.hurtCooldownMs > 0) {
    context.fillStyle = "rgba(255, 152, 94, 0.28)";
    context.beginPath();
    context.ellipse(
      visibleX + snapshot.player.width / 2,
      visibleY + 18,
      snapshot.player.width * 0.9,
      68,
      0,
      0,
      Math.PI * 2,
    );
    context.fill();
  }

  if (snapshot.player.attack.activeMs > 0) {
    context.fillStyle = "rgba(255, 203, 94, 0.55)";
    const attackOffset = snapshot.player.facing === "right" ? snapshot.player.width : -snapshot.player.attack.width;
    context.fillRect(
      visibleX + attackOffset,
      visibleY - snapshot.player.z + 14,
      snapshot.player.attack.width,
      36,
    );
    context.fillStyle = "rgba(255, 243, 181, 0.72)";
    context.beginPath();
    context.ellipse(
      visibleX + attackOffset + snapshot.player.attack.width / 2,
      visibleY + 30,
      snapshot.player.attack.width * 0.36,
      24,
      0,
      0,
      Math.PI * 2,
    );
    context.fill();
  }

  context.fillStyle = "#ffffff";
  context.font = "600 24px sans-serif";
  context.fillText(snapshot.hud.levelName, 48, 48);
}
