"use client";

import type { GameSnapshot } from "@/game/types/gameTypes";

type DesktopControlsHintProps = {
  snapshot: GameSnapshot;
};

export function DesktopControlsHint({ snapshot }: DesktopControlsHintProps) {
  return (
    <aside className="rounded-[24px] border border-black/10 bg-[var(--panel)] p-5 shadow-[0_20px_60px_var(--shadow)] backdrop-blur-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Controles
      </p>
      <ul className="grid gap-2 text-sm text-black/72">
        {snapshot.hud.hints.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
        <li>Golpe: J</li>
        <li>Mobile: d-pad virtual + salto + golpe</li>
      </ul>
    </aside>
  );
}
