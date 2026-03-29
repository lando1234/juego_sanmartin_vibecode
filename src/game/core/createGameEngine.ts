import { applyLevelToState } from "@/game/data/campaignLevels";
import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateCombat } from "@/game/systems/combatSystem";
import { updateCamera } from "@/game/systems/cameraSystem";
import { updateEnemies } from "@/game/systems/enemySystem";
import { updateHud } from "@/game/systems/hudSystem";
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

  const createSnapshot = (): GameSnapshot => ({
    ...state,
    scene: { ...state.scene },
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
      wave1Spawns: [...state.levelLayout.wave1Spawns],
      wave2Spawns: [...state.levelLayout.wave2Spawns],
      bossSpawn: { ...state.levelLayout.bossSpawn },
    },
    hud: {
      ...state.hud,
      hints: [...state.hud.hints],
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
    updateCombat(state, dtMs);
    updateEnemies(state, dtMs);
    updateItems(state, dtMs);
    updateCamera(state);
    updateHud(state, now());
    emit();
  };

  const startRun = () => {
    if (state.startedAtMs === null) {
      state.startedAtMs = now();
    }

    state.phase = "playing";
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
        state = createInitialGameState();
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
