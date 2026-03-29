import { createInitialGameState } from "@/game/state/createInitialGameState";
import { updateCombat } from "@/game/systems/combatSystem";
import { updateCamera } from "@/game/systems/cameraSystem";
import { updateEnemies } from "@/game/systems/enemySystem";
import { updateHud } from "@/game/systems/hudSystem";
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
    player: { ...state.player },
    enemies: state.enemies.map((enemy) => ({ ...enemy })),
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
  };

  const sendCommand = (command: GameCommand) => {
    switch (command.type) {
      case "start":
        startRun();
        emit();
        return;
      case "pause-toggle":
        if (state.phase === "title") {
          startRun();
        } else {
          state.phase = state.phase === "paused" ? "playing" : "paused";
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
