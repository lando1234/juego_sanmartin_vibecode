"use client";

import type { GameSnapshot } from "@/game/types/gameTypes";

type GameHudProps = {
  snapshot: GameSnapshot;
  variant?: "panel" | "overlay";
};

export function GameHud({ snapshot, variant = "panel" }: GameHudProps) {
  const hpPercent = (snapshot.player.hp / snapshot.player.maxHp) * 100;
  const seconds = Math.floor(snapshot.hud.elapsedMs / 1000);
  const boss = snapshot.enemies.find((enemy) => enemy.isBoss && enemy.hp > 0);
  const availableItems = snapshot.items.filter((item) => !item.collected).length;
  const bossHpPercent = boss ? (boss.hp / boss.maxHp) * 100 : 0;
  const activeEffects = [
    snapshot.player.speedBoostMs > 0
      ? `Mate ${Math.ceil(snapshot.player.speedBoostMs / 1000)}s`
      : null,
    snapshot.player.attackBoostMs > 0
      ? `SUBE ${Math.ceil(snapshot.player.attackBoostMs / 1000)}s`
      : null,
    snapshot.player.shieldMs > 0
      ? `Paraguas ${Math.ceil(snapshot.player.shieldMs / 1000)}s`
      : null,
  ].filter(Boolean);
  const stageLabel =
    snapshot.scene.type === "boss_combat"
      ? "Furgon en disputa"
      : snapshot.scene.type === "boss_intro"
        ? "Antesala del capo"
        : "Pasillo central";
  if (variant === "overlay") {
    return (
      <div className="grid gap-2 rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(35,25,20,0.86),rgba(16,12,10,0.88))] p-3 text-[#f7ead4] shadow-[0_18px_60px_rgba(20,15,12,0.35)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
          <span>{snapshot.hud.levelName}</span>
          <span>
            Nivel {snapshot.currentLevelIndex + 1}/{snapshot.totalLevels} · {stageLabel}
          </span>
        </div>
        <div className="grid gap-2 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="grid gap-2 rounded-[18px] border border-white/8 bg-black/16 p-3">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f6d0a6]">
              <span>Ricky</span>
              <span>{snapshot.player.hp} / {snapshot.player.maxHp} HP</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-black/30">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#e06a2c,#ffbf5a)] transition-[width] duration-150"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
          <div className="grid gap-1 rounded-[18px] border border-white/8 bg-black/12 p-3 text-xs text-[#f7ead4]/78">
            <span className="font-semibold uppercase tracking-[0.16em] text-[#f4c992]">
              Estado
            </span>
            <span>Fase: {snapshot.phase}</span>
            <span>En vagón: {snapshot.hud.enemyCount} rivales</span>
            <span>Tiempo: {seconds}s</span>
          </div>
          {boss ? (
            <div className="grid gap-1 rounded-[18px] border border-[#b85d56]/24 bg-[linear-gradient(180deg,rgba(104,28,28,0.34),rgba(53,11,11,0.42))] p-3">
              <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ffb6a9]">
                <span className="truncate">{boss.name}</span>
                <span>{boss.hp} HP</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#8d1d1d,#df5a43)] transition-[width] duration-150"
                  style={{ width: `${bossHpPercent}%` }}
                />
              </div>
            </div>
          ) : null}
          <div className="grid gap-1 rounded-[18px] border border-white/8 bg-black/12 p-3 text-xs text-[#f7ead4]/78">
            <span className="font-semibold uppercase tracking-[0.16em] text-[#f4c992]">
              Objetivo
            </span>
            <span>{snapshot.hud.objective}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid gap-4 overflow-hidden rounded-[30px] border border-white/18 bg-[linear-gradient(180deg,rgba(63,45,33,0.96),rgba(24,20,16,0.96))] p-4 text-[#f7ead4] shadow-[0_34px_100px_rgba(25,18,15,0.4)] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[30px] before:bg-[radial-gradient(circle_at_top,rgba(255,211,150,0.14),transparent_44%)] md:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
          <span>{snapshot.hud.levelName}</span>
          <span>
            Nivel {snapshot.currentLevelIndex + 1}/{snapshot.totalLevels} · {stageLabel}
          </span>
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
        <div className="grid gap-2 rounded-[22px] border border-white/10 bg-black/18 p-3">
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
            <span>Items del vagón</span>
            <span>{availableItems} activos</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[#f7ead4]/82">
            <span className="rounded-full border border-[#7ca464]/35 bg-[#7ca464]/12 px-2 py-1">
              Mate
            </span>
            <span className="rounded-full border border-[#6a4127]/35 bg-[#6a4127]/12 px-2 py-1">
              Tortita
            </span>
            <span className="rounded-full border border-[#4b6da0]/35 bg-[#4b6da0]/12 px-2 py-1">
              SUBE
            </span>
            <span className="rounded-full border border-[#76678a]/35 bg-[#76678a]/12 px-2 py-1">
              Paraguas
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-black/16 p-3 text-sm text-[#f7ead4]">
        <div className="grid gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
            Estado del viaje
          </span>
          <span>Fase: {snapshot.phase}</span>
          <span>Tiempo: {seconds}s</span>
          <span>En vagón: {snapshot.hud.enemyCount} rivales</span>
          <span>Pickups visibles: {availableItems}</span>
        </div>
        <div className="grid gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
            Objetivo
          </span>
          <span>{snapshot.hud.objective}</span>
        </div>
        <div className="grid gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4c992]">
            Buffs activos
          </span>
          <span>{activeEffects.length > 0 ? activeEffects.join(" · ") : "Sin boosts activos"}</span>
        </div>
        {snapshot.hud.pickupMessage ? (
          <div className="rounded-[18px] border border-[#f4c992]/18 bg-[#f4c992]/8 p-3 text-sm text-[#ffe7c5]">
            {snapshot.hud.pickupMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}
