"use client";

import type { GameSnapshot } from "@/game/types/gameTypes";

type DesktopControlsHintProps = {
  snapshot: GameSnapshot;
  variant?: "panel" | "overlay";
};

export function DesktopControlsHint({
  snapshot,
  variant = "panel",
}: DesktopControlsHintProps) {
  const controlGuide = [
    "Moverse: WASD o flechas",
    "Combo: J x3 para cerrar la cadena",
    "Especial: K, gasta vida recuperable",
    "Agarrar / lanzar: L, y L otra vez para soltar",
    "Esquive: Shift para reposicionarte",
    "Cubrirse: con Paraguas activo",
    "Pausa: P",
  ];

  if (variant === "overlay") {
    return (
      <aside className="grid gap-2 rounded-[20px] border border-white/12 bg-[linear-gradient(180deg,rgba(35,25,20,0.78),rgba(16,12,10,0.82))] p-3 text-[#f7ead4] shadow-[0_16px_50px_rgba(20,15,12,0.28)] backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f4c992]">
          Controles
        </p>
        <ul className="grid gap-1 text-xs text-[#f7ead4]/80">
          {controlGuide.slice(0, 5).map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      </aside>
    );
  }

  return (
    <aside className="relative overflow-hidden rounded-[26px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,248,233,0.92),rgba(247,231,198,0.82))] p-5 shadow-[0_24px_70px_var(--shadow)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[4.5rem] bg-[linear-gradient(180deg,rgba(255,219,148,0.26),transparent)]" />
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Controles
      </p>
      <ul className="grid gap-2 text-sm text-black/72">
        {controlGuide.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
        <li>Mobile: d-pad virtual con captura de toque</li>
        <li>Pickups: mate, tortita, SUBE y paraguas repartidos por el vagón</li>
      </ul>
    </aside>
  );
}
