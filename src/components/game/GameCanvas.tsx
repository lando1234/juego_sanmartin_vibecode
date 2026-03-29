"use client";

import { useEffect, useRef, useState } from "react";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/game/data/campaignLevels";
import { loadCharacterSprites, getLoadedCharacterSprites } from "@/game/render/loadCharacterSprites";
import { getLoadedSceneArt, loadSceneArt } from "@/game/render/loadSceneArt";
import { renderFrame } from "@/game/render/renderFrame";
import type { GameSnapshot } from "@/game/types/gameTypes";

type GameCanvasProps = {
  snapshot: GameSnapshot;
  className?: string;
};

export function GameCanvas({ snapshot, className }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spritesReady, setSpritesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([loadCharacterSprites(), loadSceneArt()])
      .then(() => {
        if (!cancelled) {
          setSpritesReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSpritesReady(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context || typeof context.createRadialGradient !== "function") {
      return;
    }

    renderFrame(
      context,
      snapshot,
      getLoadedCharacterSprites(),
      getLoadedSceneArt(),
    );
  }, [snapshot, spritesReady]);

  return (
    <canvas
      ref={canvasRef}
      width={VIEWPORT_WIDTH}
      height={VIEWPORT_HEIGHT}
      className={
        className ??
        "h-auto w-full rounded-[30px] border border-black/15 bg-[#3b302b] shadow-[0_24px_90px_rgba(30,24,20,0.3)] ring-1 ring-white/18"
      }
      aria-label="Lienzo del juego"
    />
  );
}
