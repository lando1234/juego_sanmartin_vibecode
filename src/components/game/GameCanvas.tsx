"use client";

import { useEffect, useRef, useState } from "react";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/game/data/levelCofradiaPasillo";
import { loadCharacterSprites, getLoadedCharacterSprites } from "@/game/render/loadCharacterSprites";
import { renderFrame } from "@/game/render/renderFrame";
import type { GameSnapshot } from "@/game/types/gameTypes";

type GameCanvasProps = {
  snapshot: GameSnapshot;
};

export function GameCanvas({ snapshot }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spritesReady, setSpritesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadCharacterSprites()
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

    if (!context) {
      return;
    }

    renderFrame(context, snapshot, getLoadedCharacterSprites());
  }, [snapshot, spritesReady]);

  return (
    <canvas
      ref={canvasRef}
      width={VIEWPORT_WIDTH}
      height={VIEWPORT_HEIGHT}
      className="h-auto w-full rounded-[28px] border border-black/15 bg-[#3b302b] shadow-[0_18px_70px_rgba(30,24,20,0.25)]"
      aria-label="Lienzo del juego"
    />
  );
}
