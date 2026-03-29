"use client";

import type { GameSnapshot } from "@/game/types/gameTypes";

type DesktopControlsHintProps = {
  snapshot: GameSnapshot;
};

export function DesktopControlsHint({ snapshot }: DesktopControlsHintProps) {
  return (
    <aside className="relative overflow-hidden rounded-[26px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,248,233,0.92),rgba(247,231,198,0.82))] p-5 shadow-[0_24px_70px_var(--shadow)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[4.5rem] bg-[linear-gradient(180deg,rgba(255,219,148,0.26),transparent)]" />
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Controles
      </p>
      <ul className="grid gap-2 text-sm text-black/72">
        {snapshot.hud.hints.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
        <li>Moverse: mantener apretado, soltar para frenar</li>
        <li>Golpe: J o click/tap en Golpear</li>
        <li>Pausa: P una sola vez, sin dejarla apretada</li>
        <li>Mobile: d-pad virtual con captura de toque</li>
        <li>Pickups: mate, tortita, SUBE y paraguas repartidos por el vagón</li>
      </ul>
    </aside>
  );
}
