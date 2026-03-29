"use client";

import type { GameSnapshot } from "@/game/types/gameTypes";

type GameHudProps = {
  snapshot: GameSnapshot;
};

export function GameHud({ snapshot }: GameHudProps) {
  const hpPercent = (snapshot.player.hp / snapshot.player.maxHp) * 100;
  const seconds = Math.floor(snapshot.hud.elapsedMs / 1000);
  const boss = snapshot.enemies.find((enemy) => enemy.isBoss && enemy.hp > 0);
  const bossHpPercent = boss ? (boss.hp / boss.maxHp) * 100 : 0;
  const stageLabel =
    snapshot.scene.type === "boss_combat"
      ? "Furgon en disputa"
      : snapshot.scene.type === "boss_intro"
        ? "Antesala del capo"
        : "Pasillo central";

  return (
    <div className="grid gap-4 rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(63,45,33,0.94),rgba(30,24,20,0.94))] p-4 text-[#f7ead4] shadow-[0_28px_80px_rgba(25,18,15,0.35)] backdrop-blur-sm md:grid-cols-[1.3fr_0.7fr]">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
          <span>{snapshot.hud.levelName}</span>
          <span>{stageLabel}</span>
        </div>
        <div className="grid gap-2 rounded-[22px] border border-white/10 bg-black/18 p-3">
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span className="uppercase tracking-[0.18em] text-[#f6d0a6]">Ricky</span>
            <span>{snapshot.player.hp} / {snapshot.player.maxHp} HP</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#e06a2c,#ffbf5a)] transition-[width] duration-150"
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>
        {boss ? (
          <div className="grid gap-2 rounded-[22px] border border-[#b85d56]/25 bg-[linear-gradient(180deg,rgba(104,28,28,0.4),rgba(53,11,11,0.5))] p-3">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb6a9]">
              <span>{boss.name}</span>
              <span>{boss.hp} HP</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-black/30">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#8d1d1d,#df5a43)] transition-[width] duration-150"
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-black/16 p-3 text-sm text-[#f7ead4]">
        <div className="grid gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
            Estado del viaje
          </span>
          <span>Fase: {snapshot.phase}</span>
          <span>Tiempo: {seconds}s</span>
          <span>En vagón: {snapshot.hud.enemyCount} rivales</span>
        </div>
        <div className="grid gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
            Objetivo
          </span>
          <span>{snapshot.hud.objective}</span>
        </div>
      </div>
    </div>
  );
}
