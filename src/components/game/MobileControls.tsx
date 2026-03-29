"use client";

import type { InputState } from "@/game/types/gameTypes";

type MobileControlsProps = {
  onInput: (input: Partial<InputState>) => void;
};

function pressHandlers(
  key: keyof InputState,
  onInput: (input: Partial<InputState>) => void,
) {
  return {
    onPointerDown: () => onInput({ [key]: true }),
    onPointerUp: () => onInput({ [key]: false }),
    onPointerCancel: () => onInput({ [key]: false }),
    onPointerLeave: () => onInput({ [key]: false }),
  };
}

export function MobileControls({ onInput }: MobileControlsProps) {
  return (
    <section className="grid gap-4 rounded-[24px] border border-black/10 bg-[var(--panel)] p-4 shadow-[0_20px_60px_var(--shadow)] backdrop-blur-sm lg:hidden">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Controles Mobile
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <button
            type="button"
            aria-label="Mover arriba"
            className="rounded-2xl bg-black/8 px-4 py-3 font-semibold"
            {...pressHandlers("up", onInput)}
          >
            ↑
          </button>
          <div />
          <button
            type="button"
            aria-label="Mover izquierda"
            className="rounded-2xl bg-black/8 px-4 py-3 font-semibold"
            {...pressHandlers("left", onInput)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Mover abajo"
            className="rounded-2xl bg-black/8 px-4 py-3 font-semibold"
            {...pressHandlers("down", onInput)}
          >
            ↓
          </button>
          <button
            type="button"
            aria-label="Mover derecha"
            className="rounded-2xl bg-black/8 px-4 py-3 font-semibold"
            {...pressHandlers("right", onInput)}
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            aria-label="Saltar"
            className="rounded-2xl bg-[var(--accent)] px-4 py-3 font-semibold text-white"
            {...pressHandlers("jump", onInput)}
          >
            Saltar
          </button>
          <button
            type="button"
            aria-label="Golpear"
            className="rounded-2xl bg-black px-4 py-3 font-semibold text-white"
            {...pressHandlers("attack", onInput)}
          >
            Golpe
          </button>
        </div>
      </div>
    </section>
  );
}
