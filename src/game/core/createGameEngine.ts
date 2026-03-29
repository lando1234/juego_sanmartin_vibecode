import { applyLevelToState } from "@/game/data/campaignLevels";
import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateCombat } from "@/game/systems/combatSystem";
import { updateCamera } from "@/game/systems/cameraSystem";
import { updateEnemies } from "@/game/systems/enemySystem";
import { updateHud } from "@/game/systems/hudSystem";
import { updateHazards } from "@/game/systems/hazardSystem";
import { updateItems } from "@/game/systems/itemSystem";
import { updateMovement } from "@/game/systems/movementSystem";
import { updateScene } from "@/game/systems/sceneSystem";
import type {
  GameCommand,
  GameSnapshot,
  GameSubscriber,
  InputState,
} from "@/game/types/gameTypes";

type EngineOptions = {
  now?: () => number;
  requestAnimationFrame?: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame?: (handle: number) => void;
};

export type GameEngine = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  sendCommand: (command: GameCommand) => void;
  sendInput: (input: Partial<InputState>) => void;
  subscribe: (subscriber: GameSubscriber) => () => void;
  getSnapshot: () => GameSnapshot;
  step: (dtMs: number) => void;
  isRunning: () => boolean;
};

export function createGameEngine(options: EngineOptions = {}): GameEngine {
  const now = options.now ?? (() => Date.now());
  const raf =
    options.requestAnimationFrame ??
    ((callback: FrameRequestCallback) => window.requestAnimationFrame(callback));
  const caf =
    options.cancelAnimationFrame ??
    ((handle: number) => window.cancelAnimationFrame(handle));

  let state = createInitialGameState();
  const subscribers = new Set<GameSubscriber>();
  let frameHandle: number | null = null;
  let lastFrameTime = 0;
  let running = false;

  const formatElapsedRun = (elapsedMs: number) => {
    const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds}s`;
    }

    return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
  };

  const createSnapshot = (): GameSnapshot => ({
    ...state,
    scene: {
      ...state.scene,
      activeHazards: state.scene.activeHazards.map((hazard) => ({ ...hazard })),
    },
    player: {
      ...state.player,
      attack: {
        ...state.player.attack,
        hitbox: { ...state.player.attack.hitbox },
        struckEnemyIds: [...state.player.attack.struckEnemyIds],
      },
    },
    enemies: state.enemies.map((enemy) => ({
      ...enemy,
      behavior: { ...enemy.behavior },
      attacks: enemy.attacks.map((attack) => ({ ...attack })),
      modifiers: { ...enemy.modifiers },
      phases: enemy.phases.map((phase) => ({
        ...phase,
        buff: phase.buff ? { ...phase.buff } : undefined,
        attacks: phase.attacks?.map((attack) => ({ ...attack })),
        modifiers: phase.modifiers ? { ...phase.modifiers } : undefined,
      })),
      activeAttack: enemy.activeAttack
        ? {
            ...enemy.activeAttack,
            hitbox: { ...enemy.activeAttack.hitbox },
          }
        : null,
    })),
    projectiles: state.projectiles.map((projectile) => ({ ...projectile })),
    items: state.items.map((item) => ({ ...item })),
    camera: { ...state.camera },
    input: { ...state.input },
    levelBounds: { ...state.levelBounds },
    levelLayout: {
      ...state.levelLayout,
      hazards: state.levelLayout.hazards.map((hazard) => ({ ...hazard })),
      wave1Spawns: [...state.levelLayout.wave1Spawns],
      wave2Spawns: [...state.levelLayout.wave2Spawns],
      bossSpawn: { ...state.levelLayout.bossSpawn },
    },
    hud: {
      ...state.hud,
      hints: [...state.hud.hints],
      stationResult: state.hud.stationResult
        ? { ...state.hud.stationResult }
        : null,
    },
    runStats: {
      ...state.runStats,
    },
  });

  const emit = () => {
    const snapshot = createSnapshot();

    subscribers.forEach((subscriber) => subscriber(snapshot));
  };

  const loop = (timestamp: number) => {
    if (!running) {
      return;
    }

    if (lastFrameTime === 0) {
      lastFrameTime = timestamp;
    }

    const dtMs = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    tick(dtMs);
    frameHandle = raf(loop);
  };

  const tick = (dtMs: number) => {
    updateMovement(state, dtMs);
    updateScene(state);
    updateHazards(state, dtMs);
    updateCombat(state, dtMs);
    updateEnemies(state, dtMs);
    updateItems(state, dtMs);
    updateCamera(state);
    updateHud(state, now());
    if (state.phase === "game_over" && state.mode === "survival") {
      state.hud.completionTitle = state.hud.completionTitle ?? "Supervivencia terminada";
      state.hud.completionSummary =
        state.hud.completionSummary ??
        `Llegaste a la oleada ${Math.max(1, state.survivalWave)}. Superaste ${state.survivalWavesCleared} oleadas, ${state.survivalMinibossesCleared} miniboss${state.survivalMinibossesCleared === 1 ? "" : "es"} y aguantaste ${formatElapsedRun(state.hud.elapsedMs)}.`;
    }
    emit();
  };

  const startRun = () => {
    if (state.startedAtMs === null) {
      state.startedAtMs = now();
    }

    state.phase = "playing";
    state.hud.completionTitle = null;
    state.hud.completionSummary = null;

    if (state.mode === "survival") {
      state.currentLevelIndex = 0;
      state.totalLevels = 1;
      state.scene.type = "carriage_combat";
      state.scene.gateClosed = false;
      state.scene.gateRightX = null;
      state.scene.waveIndex = 0;
      state.scene.waveTriggered = false;
      state.scene.secondWaveTriggered = false;
      state.scene.bossTriggered = false;
      state.scene.victoryWalkTriggered = false;
      state.hud.levelName = "Supervivencia";
      state.hud.objective = "Oleadas infinitas. Resistí para marcar tu racha.";
      state.survivalWave = 0;
      state.survivalWavesCleared = 0;
      state.survivalMinibossesCleared = 0;
      return;
    }

    state.scene.type = "carriage_combat";
    state.hud.completionTitle = null;
    state.hud.completionSummary = null;
  };

  const advanceToNextLevel = () => {
    const nextLevelIndex = state.currentLevelIndex + 1;

    if (nextLevelIndex >= state.totalLevels) {
      return;
    }

    applyLevelToState(state, nextLevelIndex);
    state.phase = "station_intro";
    state.scene.type = "carriage_intro";
    state.hud.completionTitle = null;
    state.hud.completionSummary = null;
  };

  const sendCommand = (command: GameCommand) => {
    switch (command.type) {
      case "start":
        startRun();
        emit();
        return;
      case "set-mode":
        state.mode = command.payload.mode;
        if (state.phase === "title") {
          const campaignState = createInitialGameState("campaign");
          state.hud.levelName =
            command.payload.mode === "survival"
              ? "Supervivencia"
              : campaignState.hud.levelName;
          state.hud.objective =
            command.payload.mode === "survival"
              ? "Oleadas infinitas. Elegí cómo querés arrancar."
              : campaignState.hud.objective;
        }
        emit();
        return;
      case "pause-toggle":
        if (state.phase === "title" || state.phase === "station_intro") {
          startRun();
        } else {
          state.phase = state.phase === "paused" ? "playing" : "paused";
        }
        emit();
        return;
      case "next-level":
        if (state.phase === "victory") {
          advanceToNextLevel();
        }
        emit();
        return;
      case "reset":
        state = createInitialGameState(state.mode);
        lastFrameTime = 0;
        emit();
        return;
      case "input":
        state.input = {
          ...state.input,
          ...command.payload,
        };

        if (command.payload.pause) {
          state.input.pause = false;
          sendCommand({ type: "pause-toggle" });
          return;
        }

        emit();
        return;
      case "debug-set-player-position":
        state.player.x = command.payload.x;
        if (typeof command.payload.y === "number") {
          state.player.y = command.payload.y;
        }
        emit();
        return;
      case "debug-defeat-enemies":
        state.enemies = state.enemies.map((enemy) => ({
          ...enemy,
          hp: 0,
          state: "defeated",
        }));
        emit();
        return;
    }
  };

  return {
    start() {
      if (running) {
        return;
      }

      running = true;
      lastFrameTime = 0;
      frameHandle = raf(loop);
    },
    stop() {
      running = false;

      if (frameHandle !== null) {
        caf(frameHandle);
        frameHandle = null;
      }
    },
    reset() {
      sendCommand({ type: "reset" });
    },
    sendCommand,
    sendInput(input) {
      sendCommand({ type: "input", payload: input });
    },
    subscribe(subscriber) {
      subscribers.add(subscriber);
      subscriber(state);

      return () => {
        subscribers.delete(subscriber);
      };
    },
    getSnapshot() {
      return createSnapshot();
    },
    step(dtMs: number) {
      tick(dtMs);
    },
    isRunning() {
      return running;
    },
  };
}
