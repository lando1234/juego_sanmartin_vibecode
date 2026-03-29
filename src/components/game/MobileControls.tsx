"use client";

import type { MouseEvent, PointerEvent } from "react";

import type { InputState } from "@/game/types/gameTypes";

type MobileControlsProps = {
  onInput: (input: Partial<InputState>) => void;
};

function pressHandlers(
  key: keyof InputState,
  onInput: (input: Partial<InputState>) => void,
) {
  const release = () => onInput({ [key]: false });

  return {
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (event.currentTarget.setPointerCapture) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      onInput({ [key]: true });
    },
    onPointerUp: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      release();
      if (
        event.currentTarget.hasPointerCapture &&
        event.currentTarget.hasPointerCapture(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    onPointerCancel: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      release();
    },
    onLostPointerCapture: release,
    onContextMenu: (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
  };
}

export function MobileControls({ onInput }: MobileControlsProps) {
  return (
    <section className="grid gap-4 rounded-[24px] border border-black/10 bg-[var(--panel)] p-4 shadow-[0_20px_60px_var(--shadow)] backdrop-blur-sm lg:hidden [touch-action:none] [user-select:none]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Controles Mobile
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <button
            type="button"
            aria-label="Mover arriba"
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
            {...pressHandlers("up", onInput)}
          >
            ↑
          </button>
          <div />
          <button
            type="button"
            aria-label="Mover izquierda"
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
            {...pressHandlers("left", onInput)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Mover abajo"
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
            {...pressHandlers("down", onInput)}
          >
            ↓
          </button>
          <button
            type="button"
            aria-label="Mover derecha"
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
            {...pressHandlers("right", onInput)}
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            aria-label="Saltar"
            className="rounded-2xl border border-black/8 bg-[var(--accent)] px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(187,77,0,0.26)] transition active:scale-[0.98]"
            {...pressHandlers("jump", onInput)}
          >
            Saltar
          </button>
          <button
            type="button"
            aria-label="Golpear"
            className="rounded-2xl border border-black/8 bg-black px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition active:scale-[0.98]"
            {...pressHandlers("attack", onInput)}
          >
            Golpe
          </button>
        </div>
      </div>
    </section>
  );
}
