"use client";

import { getCampaignLevel } from "@/game/data/campaignLevels";
import type { GameMode, GameSnapshot } from "@/game/types/gameTypes";

type GameOverlayProps = {
  snapshot: GameSnapshot;
  onStart: () => void;
  onSelectMode: (mode: GameMode) => void;
  onPauseToggle: () => void;
  onNextLevel: () => void;
  onReset: () => void;
};

export function GameOverlay({
  snapshot,
  onStart,
  onSelectMode,
  onPauseToggle,
  onNextLevel,
  onReset,
}: GameOverlayProps) {
  const currentLevel = getCampaignLevel(snapshot.currentLevelIndex);
  const isSurvivalMode = snapshot.mode === "survival";

  if (snapshot.phase === "title") {
    return (
      <div className="grid min-h-[min(100dvh,1000px)] place-items-center bg-[radial-gradient(circle_at_top,rgba(255,229,183,0.12),transparent_42%)] px-4 py-10">
        <div className="grid w-full max-w-5xl gap-6 rounded-[36px] border border-white/18 bg-[linear-gradient(180deg,rgba(48,34,26,0.96),rgba(22,17,14,0.96))] p-6 text-[#f7ead4] shadow-[0_32px_100px_rgba(20,15,12,0.5)] backdrop-blur-sm md:p-8">
          <div className="grid gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
              Furgon Final
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-balance md:text-6xl">
              {isSurvivalMode
                ? "Supervivencia: bancá las oleadas y no aflojes el pasillo."
                : "Ricky tiene que llegar al laburo y el vagon ya entro en modo guerra."}
            </h1>
            <p className="max-w-2xl text-base text-[#f7ead4]/78 md:text-lg">
              {isSurvivalMode
                ? "Oleadas infinitas, minibosses cada cinco rondas y una sola corrida para medir cuánto aguantás."
                : "Peleá estación por estación en el San Martín, desde Dr. Cabred hasta Retiro, bancate la hora pico y abríte paso hasta la terminal."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-[auto_auto_auto_1fr] md:items-center">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSelectMode("campaign")}
                aria-pressed={!isSurvivalMode}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !isSurvivalMode
                    ? "bg-[linear-gradient(90deg,#e06a2c,#c44310)] text-white"
                    : "border border-white/18 text-[#f7ead4] hover:bg-white/8"
                }`}
              >
                Campaña
              </button>
              <button
                type="button"
                onClick={() => onSelectMode("survival")}
                aria-pressed={isSurvivalMode}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isSurvivalMode
                    ? "bg-[linear-gradient(90deg,#5c8fd6,#335a98)] text-white"
                    : "border border-white/18 text-[#f7ead4] hover:bg-white/8"
                }`}
              >
                Supervivencia
              </button>
            </div>
            <button
              type="button"
              onClick={onStart}
              className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
            >
              {isSurvivalMode ? "Empezar supervivencia" : "Empezar partida"}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/18 px-5 py-3 font-semibold text-[#f7ead4] transition hover:bg-white/8"
            >
              Reiniciar estado
            </button>
            <div className="text-sm text-[#f7ead4]/74">
              {isSurvivalMode
                ? "Objetivo inicial: aguantá la primera oleada y abrí racha."
                : "Objetivo inicial: cruzar 18 estaciones, escalar la dificultad y llegar a Retiro."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (snapshot.phase === "station_intro") {
    return (
      <div className="grid min-h-[min(100dvh,1000px)] place-items-center bg-[radial-gradient(circle_at_top,rgba(255,211,150,0.14),transparent_42%)] px-4 py-10">
        <div className="grid w-full max-w-5xl gap-6 rounded-[36px] border border-white/18 bg-[linear-gradient(180deg,rgba(36,27,23,0.96),rgba(15,12,10,0.98))] p-6 text-[#f7ead4] shadow-[0_32px_100px_rgba(20,15,12,0.5)] backdrop-blur-sm md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div className="grid gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
              Próxima estación
            </p>
            <h1 className="text-4xl font-black tracking-tight text-balance md:text-6xl">
              {snapshot.hud.levelName}
            </h1>
            <p className="max-w-2xl text-base text-[#f7ead4]/76 md:text-lg">
              {currentLevel.intro}
            </p>
          </div>
          <div className="grid content-between gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5">
            <div className="grid gap-2 text-sm text-[#f7ead4]/78">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
                Briefing
              </p>
              <p>{snapshot.hud.objective}</p>
              <p>HP actual: {snapshot.player.hp} / {snapshot.player.maxHp}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStart}
                className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
              >
                Subir al vagón
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
        </div>
      </div>
    );
  }

  if (snapshot.phase === "victory") {
    const currentLevelNumber = snapshot.currentLevelIndex + 1;
    const isFinalLevel = currentLevelNumber >= snapshot.totalLevels;

    if (!isFinalLevel) {
      return (
        <div className="grid min-h-[min(100dvh,1000px)] place-items-center bg-[radial-gradient(circle_at_top,rgba(255,223,159,0.12),transparent_40%)] px-4 py-10">
          <div className="grid w-full max-w-4xl gap-5 rounded-[34px] border border-white/18 bg-[linear-gradient(180deg,rgba(55,40,28,0.96),rgba(24,18,15,0.96))] p-6 text-[#f7ead4] shadow-[0_30px_90px_rgba(20,15,12,0.46)] backdrop-blur-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
              Estación {currentLevelNumber} despejada
            </p>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              {snapshot.hud.completionTitle ?? "Ricky limpió el vagón."}
            </h1>
            <p className="max-w-2xl text-[#f7ead4]/78 md:text-lg">
              {snapshot.hud.completionSummary ??
                "El tren sigue cargado y todavía queda camino por delante."}
            </p>
            {snapshot.hud.stationResult ? (
              <div className="grid gap-2 rounded-[24px] border border-white/12 bg-black/20 p-4 text-sm text-[#f7ead4]/82 md:grid-cols-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                    Rango
                  </p>
                  <p className="text-xl font-black text-white">{snapshot.hud.stationResult.rank}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                    Puntaje
                  </p>
                  <p>{snapshot.hud.stationResult.scoreDelta}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                    Combo
                  </p>
                  <p>x{snapshot.hud.stationResult.comboBest || 1}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                    Daño
                  </p>
                  <p>{snapshot.hud.stationResult.damageTaken}</p>
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onNextLevel}
                className="rounded-full bg-[linear-gradient(90deg,#e06a2c,#c44310)] px-5 py-3 font-semibold text-white transition hover:brightness-110"
              >
                Seguir a la próxima estación
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
        </div>
      );
    }

    return (
      <div className="grid min-h-[min(100dvh,1000px)] place-items-center bg-[radial-gradient(circle_at_top,rgba(255,223,159,0.15),transparent_40%)] px-4 py-10">
        <div className="grid w-full max-w-4xl gap-5 rounded-[34px] border border-white/18 bg-[linear-gradient(180deg,rgba(55,40,28,0.96),rgba(24,18,15,0.96))] p-6 text-[#f7ead4] shadow-[0_30px_90px_rgba(20,15,12,0.46)] backdrop-blur-sm md:p-8">
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            Ricky cruzó todo el San Martín y dominó Retiro.
          </h1>
          <p className="max-w-2xl text-[#f7ead4]/78 md:text-lg">
            Desde Dr. Cabred hasta la terminal, el recorrido quedó despejado de punta a punta.
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
      </div>
    );
  }

  if (snapshot.phase === "game_over") {
    const summaryTitle =
      snapshot.mode === "survival"
        ? snapshot.hud.completionTitle ?? "Supervivencia terminada"
        : "Ricky perdio la pulseada del horario pico.";
    const summaryBody =
      snapshot.mode === "survival"
        ? snapshot.hud.completionSummary ??
          `Llegaste a la oleada ${Math.max(1, snapshot.survivalWave)}.`
        : "Lo voltearon antes de llegar al furgón. Hora pico 1, Ricky 0.";

    return (
      <div className="grid min-h-[min(100dvh,1000px)] place-items-center bg-[radial-gradient(circle_at_top,rgba(125,38,25,0.18),transparent_42%)] px-4 py-10">
        <div className="grid w-full max-w-4xl gap-5 rounded-[34px] border border-white/18 bg-[linear-gradient(180deg,rgba(64,26,19,0.96),rgba(22,14,12,0.98))] p-6 text-[#f7ead4] shadow-[0_30px_90px_rgba(20,15,12,0.5)] backdrop-blur-sm md:p-8">
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            {summaryTitle}
          </h1>
          <p className="max-w-2xl text-[#f7ead4]/78 md:text-lg">
            {summaryBody}
          </p>
          {snapshot.mode === "survival" ? (
            <div className="grid gap-2 rounded-[24px] border border-white/12 bg-black/20 p-4 text-sm text-[#f7ead4]/80 md:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                  Oleadas superadas
                </p>
                <p className="text-xl font-black text-white">{snapshot.survivalWavesCleared}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                  Minibosses
                </p>
                <p className="text-xl font-black text-white">{snapshot.survivalMinibossesCleared}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4c992]">
                  Oleada alcanzada
                </p>
                <p className="text-xl font-black text-white">{Math.max(1, snapshot.survivalWave)}</p>
              </div>
            </div>
          ) : null}
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
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[24px] border border-white/18 bg-[linear-gradient(180deg,rgba(57,43,34,0.82),rgba(28,22,18,0.86))] p-4 text-[#f7ead4] shadow-[0_20px_60px_rgba(20,15,12,0.28)] backdrop-blur-sm">
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
