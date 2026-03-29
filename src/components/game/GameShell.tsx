"use client";

import { useEffect, useRef, useState } from "react";

import { attachKeyboardInput } from "@/game/input/keyboardInput";
import { createGameEngine } from "@/game/core/createGameEngine";
import { createInitialGameState } from "@/game/state/createInitialGameState";
import type { GameEngine } from "@/game/core/createGameEngine";
import type { GameSnapshot } from "@/game/types/gameTypes";

import { DesktopControlsHint } from "./DesktopControlsHint";
import { GameCanvas } from "./GameCanvas";
import { GameHud } from "./GameHud";
import { GameOverlay } from "./GameOverlay";
import { MobileControls } from "./MobileControls";

export function GameShell() {
  const engineRef = useRef<GameEngine | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(createInitialGameState);

  useEffect(() => {
    const engine = createGameEngine();
    engineRef.current = engine;

    const unsubscribe = engine.subscribe(setSnapshot);
    const sendInput = (input: Partial<GameSnapshot["input"]>) => {
      engine.sendInput(input);
    };
    const detachKeyboard = attachKeyboardInput(window, sendInput);

    engine.start();

    return () => {
      detachKeyboard();
      unsubscribe();
      engine.stop();
      engineRef.current = null;
    };
  }, []);

  const sendCommand = (type: "start" | "pause-toggle" | "reset" | "next-level") => {
    engineRef.current?.sendCommand({ type });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
        <div className="grid gap-4">
          <GameOverlay
            snapshot={snapshot}
            onStart={() => sendCommand("start")}
            onPauseToggle={() => sendCommand("pause-toggle")}
            onNextLevel={() => sendCommand("next-level")}
            onReset={() => sendCommand("reset")}
          />
          <GameHud snapshot={snapshot} />
          <GameCanvas snapshot={snapshot} />
          <MobileControls onInput={(input) => engineRef.current?.sendInput(input)} />
        </div>
        <div className="grid content-start gap-4">
          <DesktopControlsHint snapshot={snapshot} />
          <section className="relative overflow-hidden rounded-[26px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,246,225,0.92),rgba(244,223,185,0.82))] p-5 shadow-[0_24px_70px_var(--shadow)] backdrop-blur-sm">
            <div className="pointer-events-none absolute right-[-36px] top-[-28px] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(224,106,44,0.26),transparent_68%)]" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              El viaje
            </p>
            <div className="grid gap-2 text-sm text-black/72">
              <p>Moreno, hora pico, diez vagones con tensión creciente.</p>
              <p>Ricky avanza entre empujones, vendedores y bloqueos del pasillo.</p>
              <p>Cada jefe abre el paso al siguiente tramo hasta llegar al furgón final.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
