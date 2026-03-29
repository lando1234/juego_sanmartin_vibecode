"use client";

import type { GameSnapshot } from "@/game/types/gameTypes";

type GameOverlayProps = {
  snapshot: GameSnapshot;
  onStart: () => void;
  onPauseToggle: () => void;
  onNextLevel: () => void;
  onReset: () => void;
};

export function GameOverlay({
  snapshot,
  onStart,
  onPauseToggle,
  onNextLevel,
  onReset,
}: GameOverlayProps) {
  if (snapshot.phase === "title") {
    return (
      <div className="grid gap-4 rounded-[32px] border border-white/20 bg-[linear-gradient(180deg,rgba(61,44,32,0.96),rgba(29,22,18,0.96))] p-6 text-[#f7ead4] shadow-[0_28px_90px_rgba(20,15,12,0.35)] backdrop-blur-sm">
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
            Furgon Final
          </p>
          <h1 className="text-4xl font-black tracking-tight text-balance">
            Ricky tiene que llegar al laburo y el vagon ya entro en modo guerra.
          </h1>
          <p className="max-w-2xl text-base text-[#f7ead4]/78">
            Peleá vagón por vagón en el San Martín, bancate la hora pico y
            abríte paso hasta el furgón final antes de que te pasen por arriba.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-[auto_auto_1fr] md:items-center">
          <button
            type="button"
            onClick={onStart}
            className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Empezar partida
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/18 px-5 py-3 font-semibold text-[#f7ead4] transition hover:bg-white/8"
          >
            Reiniciar estado
          </button>
          <div className="text-sm text-[#f7ead4]/74">
            Objetivo inicial: limpiar diez vagones, recuperar terreno y llegar al furgón.
          </div>
        </div>
      </div>
    );
  }

  if (snapshot.phase === "victory") {
    const currentLevelNumber = snapshot.currentLevelIndex + 1;
    const isFinalLevel = currentLevelNumber >= snapshot.totalLevels;

    if (!isFinalLevel) {
      return (
        <div className="grid gap-4 rounded-[32px] border border-white/20 bg-[linear-gradient(180deg,rgba(71,54,34,0.94),rgba(34,28,20,0.94))] p-6 text-[#f7ead4] shadow-[0_28px_90px_rgba(20,15,12,0.35)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
            Vagón {currentLevelNumber} despejado
          </p>
          <h1 className="text-3xl font-black tracking-tight">
            {snapshot.hud.completionTitle ?? "Ricky limpió el vagón."}
          </h1>
          <p className="text-[#f7ead4]/78">
            {snapshot.hud.completionSummary ??
              "El tren sigue cargado y todavía queda camino por delante."}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onNextLevel}
              className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
            >
              Seguir al siguiente vagón
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/18 px-5 py-3 font-semibold text-[#f7ead4] transition hover:bg-white/8"
            >
              Reiniciar campaña
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-4 rounded-[32px] border border-white/20 bg-[linear-gradient(180deg,rgba(71,54,34,0.94),rgba(34,28,20,0.94))] p-6 text-[#f7ead4] shadow-[0_28px_90px_rgba(20,15,12,0.35)] backdrop-blur-sm">
        <h1 className="text-3xl font-black tracking-tight">
          Ricky limpió los diez vagones y se quedó con el furgón final.
        </h1>
        <p className="text-[#f7ead4]/78">
          El tren quedó despejado de punta a punta. La mochila sigue viva y el
          recorrido también.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (snapshot.phase === "game_over") {
    return (
      <div className="grid gap-4 rounded-[32px] border border-white/20 bg-[linear-gradient(180deg,rgba(78,33,23,0.94),rgba(31,19,17,0.94))] p-6 text-[#f7ead4] shadow-[0_28px_90px_rgba(20,15,12,0.35)] backdrop-blur-sm">
        <h1 className="text-3xl font-black tracking-tight">
          Ricky perdio la pulseada del horario pico.
        </h1>
        <p className="text-[#f7ead4]/78">
          Lo voltearon antes de llegar al furgón. Hora pico 1, Ricky 0.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[24px] border border-white/18 bg-[linear-gradient(180deg,rgba(57,43,34,0.9),rgba(28,22,18,0.9))] p-4 text-[#f7ead4] shadow-[0_20px_60px_rgba(20,15,12,0.3)] backdrop-blur-sm">
      <button
        type="button"
        onClick={onPauseToggle}
        className="rounded-full bg-[linear-gradient(90deg,#1c1c1c,#3d3d3d)] px-4 py-2 font-semibold text-white transition hover:brightness-110"
      >
        {snapshot.phase === "paused" ? "Reanudar" : "Pausar"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-white/18 px-4 py-2 font-semibold text-[#f7ead4] transition hover:bg-white/8"
      >
        Reiniciar
      </button>
      <div className="text-sm text-[#f7ead4]/74">
        {snapshot.phase === "paused"
          ? "El tren quedó en pausa."
          : "Seguì avanzando, controlá el pasillo y no regales espacio."}
      </div>
    </div>
  );
}
