import type {
  EnemyKind,
  EnemyState,
  Facing,
  PlayerState,
} from "@/game/types/gameTypes";

type CharacterPose = "idle" | "move" | "attack" | "hurt" | "defeated";

type CharacterPalette = {
  skin: string;
  hair: string;
  shirt: string;
  jacket: string;
  pants: string;
  shoes: string;
  accent: string;
};

type DrawCharacterOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  facing: Facing;
  pose: CharacterPose;
  palette: CharacterPalette;
  isBoss?: boolean;
  highlight?: boolean;
};

function getEnemyPalette(kind: EnemyKind): CharacterPalette {
  switch (kind) {
    case "bloqueador_puerta":
      return {
        skin: "#d6a67f",
        hair: "#2d221f",
        shirt: "#454c55",
        jacket: "#20262c",
        pants: "#6d7a88",
        shoes: "#201916",
        accent: "#d9c27d",
      };
    case "empujador_hora_pico":
      return {
        skin: "#e2b48a",
        hair: "#5f2e1f",
        shirt: "#64798b",
        jacket: "#2f3a44",
        pants: "#3f4d59",
        shoes: "#231714",
        accent: "#ec8f4f",
      };
    case "vendedor_relampago":
      return {
        skin: "#efc198",
        hair: "#332117",
        shirt: "#d45e2d",
        jacket: "#8f3716",
        pants: "#453834",
        shoes: "#241a17",
        accent: "#ffe38d",
      };
    case "capo_pasillo":
      return {
        skin: "#d4a37b",
        hair: "#151515",
        shirt: "#7d1f1f",
        jacket: "#3d0f0f",
        pants: "#221a1a",
        shoes: "#0f0b0b",
        accent: "#d3a44f",
      };
  }
}

function getPoseOffsets(pose: CharacterPose, timeMs: number) {
  const cycle = Math.sin(timeMs / 140);
  const idleCycle = Math.sin(timeMs / 280);

  switch (pose) {
    case "move":
      return {
        bodyTilt: cycle * 0.08,
        armSwing: cycle * 0.75,
        legSwing: cycle * 0.95,
        bounce: Math.abs(cycle) * 4,
      };
    case "attack":
      return {
        bodyTilt: 0.12,
        armSwing: 1.15,
        legSwing: 0.45,
        bounce: 2,
      };
    case "hurt":
      return {
        bodyTilt: -0.16,
        armSwing: 0.22,
        legSwing: 0.22,
        bounce: 1,
      };
    case "defeated":
      return {
        bodyTilt: 1.1,
        armSwing: 0,
        legSwing: 0,
        bounce: -6,
      };
    default:
      return {
        bodyTilt: idleCycle * 0.03,
        armSwing: idleCycle * 0.14,
        legSwing: idleCycle * 0.08,
        bounce: Math.abs(idleCycle) * 1.5,
      };
  }
}

function drawLimb(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  width: number,
  color: string,
) {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

function drawHead(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  palette: CharacterPalette,
) {
  context.fillStyle = palette.skin;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = palette.hair;
  context.beginPath();
  context.arc(centerX, centerY - radius * 0.25, radius * 0.95, Math.PI, Math.PI * 2);
  context.fill();

  context.fillStyle = "#1c1512";
  context.beginPath();
  context.arc(centerX - radius * 0.28, centerY - radius * 0.05, radius * 0.08, 0, Math.PI * 2);
  context.arc(centerX + radius * 0.28, centerY - radius * 0.05, radius * 0.08, 0, Math.PI * 2);
  context.fill();
}

function drawTorso(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  palette: CharacterPalette,
) {
  context.fillStyle = palette.jacket;
  context.beginPath();
  context.roundRect(x, y, width, height, Math.max(8, width * 0.12));
  context.fill();

  context.fillStyle = palette.shirt;
  context.beginPath();
  context.roundRect(x + width * 0.22, y + height * 0.08, width * 0.56, height * 0.76, width * 0.1);
  context.fill();

  context.fillStyle = palette.accent;
  context.beginPath();
  context.roundRect(x + width * 0.44, y + height * 0.08, width * 0.12, height * 0.54, width * 0.08);
  context.fill();
}

function drawCharacter(
  context: CanvasRenderingContext2D,
  options: DrawCharacterOptions,
  timeMs: number,
) {
  const {
    x,
    y,
    width,
    height,
    facing,
    pose,
    palette,
    isBoss = false,
    highlight = false,
  } = options;
  const offsets = getPoseOffsets(pose, timeMs);
  const scaleX = facing === "right" ? 1 : -1;
  const centerX = x + width / 2;
  const baseY = y + height - offsets.bounce;
  const headRadius = isBoss ? width * 0.22 : width * 0.2;
  const torsoWidth = width * 0.54;
  const torsoHeight = height * (isBoss ? 0.4 : 0.37);
  const torsoX = -torsoWidth / 2;
  const torsoY = -height * (isBoss ? 0.56 : 0.5);
  const shoulderY = torsoY + torsoHeight * 0.22;
  const hipY = torsoY + torsoHeight * 0.95;
  const armReach = width * (isBoss ? 0.44 : 0.38);
  const legReach = height * (isBoss ? 0.26 : 0.24);
  const attackReachBoost = pose === "attack" ? width * 0.16 : 0;

  context.save();
  context.translate(centerX, baseY);
  context.scale(scaleX, 1);
  context.rotate(offsets.bodyTilt);

  if (highlight) {
    context.fillStyle = "rgba(255, 214, 128, 0.16)";
    context.beginPath();
    context.ellipse(0, torsoY + torsoHeight * 0.1, width * 0.52, height * 0.54, 0, 0, Math.PI * 2);
    context.fill();
  }

  drawLimb(
    context,
    -torsoWidth * 0.42,
    shoulderY,
    -armReach * 0.45,
    shoulderY + height * 0.16 + offsets.armSwing * 12,
    isBoss ? 11 : 9,
    palette.jacket,
  );
  drawLimb(
    context,
    torsoWidth * 0.42,
    shoulderY,
    armReach * 0.52 + attackReachBoost,
    shoulderY + height * 0.1 - offsets.armSwing * 6,
    isBoss ? 11 : 9,
    palette.jacket,
  );

  drawTorso(context, torsoX, torsoY, torsoWidth, torsoHeight, palette);

  drawLimb(
    context,
    -torsoWidth * 0.18,
    hipY,
    -width * 0.18,
    hipY + legReach + offsets.legSwing * 10,
    isBoss ? 12 : 10,
    palette.pants,
  );
  drawLimb(
    context,
    torsoWidth * 0.18,
    hipY,
    width * 0.16,
    hipY + legReach - offsets.legSwing * 10,
    isBoss ? 12 : 10,
    palette.pants,
  );

  context.fillStyle = palette.shoes;
  context.fillRect(-width * 0.28, hipY + legReach + offsets.legSwing * 10 - 4, width * 0.18, 8);
  context.fillRect(width * 0.08, hipY + legReach - offsets.legSwing * 10 - 4, width * 0.18, 8);

  drawHead(context, 0, torsoY - headRadius * 0.6, headRadius, palette);

  context.restore();
}

export function drawPlayerCharacter(
  context: CanvasRenderingContext2D,
  player: PlayerState,
  x: number,
  y: number,
  timeMs: number,
) {
  let pose: CharacterPose = "idle";
  if (player.attack.activeMs > 0) {
    pose = "attack";
  } else if (player.hurtCooldownMs > 0) {
    pose = "hurt";
  } else if (player.isMoving) {
    pose = "move";
  }

  drawCharacter(
    context,
    {
      x,
      y,
      width: player.width,
      height: 132,
      facing: player.facing,
      pose,
      palette: {
        skin: "#efc39d",
        hair: "#251910",
        shirt: "#d6dfeb",
        jacket: "#1f4e88",
        pants: "#344454",
        shoes: "#17110d",
        accent: "#d96b2e",
      },
      highlight: player.attack.activeMs > 0,
    },
    timeMs,
  );
}

export function drawEnemyCharacter(
  context: CanvasRenderingContext2D,
  enemy: EnemyState,
  x: number,
  y: number,
  timeMs: number,
) {
  const pose: CharacterPose =
    enemy.state === "advance"
      ? "move"
      : enemy.state === "attack"
        ? "attack"
        : enemy.state === "hurt"
          ? "hurt"
          : enemy.state === "defeated"
            ? "defeated"
            : "idle";

  drawCharacter(
    context,
    {
      x,
      y,
      width: enemy.width,
      height: enemy.isBoss ? 154 : 128,
      facing: enemy.facing,
      pose,
      palette: getEnemyPalette(enemy.kind),
      isBoss: enemy.isBoss,
      highlight: enemy.state === "attack",
    },
    timeMs + enemy.x,
  );
}
