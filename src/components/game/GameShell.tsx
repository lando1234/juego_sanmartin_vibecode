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

function detectMobileBrowser(win: Window) {
  const userAgentData = (navigator as Navigator & {
    userAgentData?: { mobile?: boolean };
  }).userAgentData;
  const ua = navigator.userAgent;
  const isMobileUa =
    userAgentData?.mobile === true ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isIpadDesktopMode =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return (
    isMobileUa ||
    isIpadDesktopMode ||
    (typeof win.matchMedia === "function" &&
      win.matchMedia("(max-width: 820px)").matches)
  );
}

export function GameShell() {
  const engineRef = useRef<GameEngine | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(createInitialGameState);
  const [mobileBrowser, setMobileBrowser] = useState(false);

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

  useEffect(() => {
    const sync = () => {
      setMobileBrowser(detectMobileBrowser(window));
    };

    sync();

    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(max-width: 820px)")
        : null;
    mediaQuery?.addEventListener?.("change", sync);
    window.addEventListener("orientationchange", sync);

    return () => {
      mediaQuery?.removeEventListener?.("change", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  const sendCommand = (type: "start" | "pause-toggle" | "reset" | "next-level") => {
    engineRef.current?.sendCommand({ type });
  };

  const isIntermission =
    snapshot.phase === "title" ||
    snapshot.phase === "station_intro" ||
    snapshot.phase === "victory" ||
    snapshot.phase === "game_over";
  const showPauseOverlay = snapshot.phase === "paused";

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,240,205,0.86),rgba(241,216,168,0.72)_34%,rgba(214,175,112,0.42)_58%,rgba(68,48,35,0.98)_100%)] text-[#f7ead4]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_20%,transparent_80%,rgba(0,0,0,0.16))]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:16px_16px]" />

      {isIntermission ? (
        <GameOverlay
          snapshot={snapshot}
          onStart={() => sendCommand("start")}
          onPauseToggle={() => sendCommand("pause-toggle")}
          onNextLevel={() => sendCommand("next-level")}
          onReset={() => sendCommand("reset")}
        />
      ) : (
        <section className="relative mx-auto flex min-h-dvh w-full max-w-[1600px] items-center justify-center px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-[36px] border border-white/14 bg-[linear-gradient(180deg,rgba(34,24,20,0.9),rgba(13,9,8,0.98))] p-3 shadow-[0_36px_120px_rgba(16,12,10,0.52)]">
              <div className="mb-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
                <GameHud snapshot={snapshot} variant="overlay" />

                <div className="grid gap-3">
                  <DesktopControlsHint snapshot={snapshot} variant="overlay" />
                  <div className="flex flex-wrap items-center gap-2 rounded-[20px] border border-white/12 bg-[linear-gradient(180deg,rgba(35,25,20,0.78),rgba(16,12,10,0.82))] p-3 shadow-[0_16px_50px_rgba(20,15,12,0.28)] backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => sendCommand("pause-toggle")}
                      className="rounded-full bg-[linear-gradient(90deg,#1c1c1c,#3d3d3d)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      {snapshot.phase === "paused" ? "Reanudar" : "Pausar"}
                    </button>
                    <button
                      type="button"
                      onClick={() => sendCommand("reset")}
                      className="rounded-full border border-white/18 px-4 py-2 text-sm font-semibold text-[#f7ead4] transition hover:bg-white/8"
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-[28px] bg-[#2b211d]">
                <GameCanvas
                  snapshot={snapshot}
                  className="absolute inset-0 h-full w-full rounded-none border-0 bg-[#2b211d] shadow-none ring-0"
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,240,220,0.08),transparent_24%,rgba(0,0,0,0.08)_72%,rgba(12,8,7,0.16)_100%)] mix-blend-soft-light" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.18)_0.8px,transparent_0.8px)] [background-size:10px_10px]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.08)_72%,rgba(0,0,0,0.34)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),transparent)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(0,0,0,0.54),transparent)]" />

                {mobileBrowser ? (
                  <MobileControls
                    variant="overlay"
                    onInput={(input) => engineRef.current?.sendInput(input)}
                  />
                ) : null}

                {showPauseOverlay ? (
                  <div className="absolute inset-0 z-20 grid place-items-center bg-black/26 px-4">
                    <GameOverlay
                      snapshot={snapshot}
                      onStart={() => sendCommand("start")}
                      onPauseToggle={() => sendCommand("pause-toggle")}
                      onNextLevel={() => sendCommand("next-level")}
                      onReset={() => sendCommand("reset")}
                    />
                  </div>
                ) : null}

              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
